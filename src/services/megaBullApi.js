// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Official Mega Bull Live API Client (Header: 'api-key')
// ============================================================================

export const DEFAULT_MEGABULL_API_URL = '/api/megabull';

/**
 * Fetch full live profile, holdings, and orders for a participant API Key
 * @param {string} apiKey - Mega Bull API Key UUID
 * @param {string} baseUrl - Base URL (defaults to '/api/megabull' Vite proxy)
 */
export async function fetchLiveMegaBullParticipant(apiKey, baseUrl = DEFAULT_MEGABULL_API_URL) {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const headers = {
    'Accept': 'application/json',
    'api-key': apiKey
  };

  const startTime = Date.now();
  const summary = {
    apiKey,
    user: null,
    holdings: [],
    positions: [],
    orders: { open: [], executed: [] },
    isSuccess: false,
    durationMs: 0,
    error: null,
    statusText: ''
  };

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`${cleanBase}/api/user/my`, { headers });
    summary.durationMs = Date.now() - startTime;

    if (!userRes.ok) {
      const errText = await userRes.text();
      summary.error = `HTTP ${userRes.status}: ${errText || userRes.statusText}`;
      summary.statusText = `HTTP ${userRes.status}`;
      return summary;
    }

    summary.user = await userRes.json();
    summary.isSuccess = true;
    summary.statusText = 'HTTP 200 OK (Live)';

    // 2. Fetch Holdings & Orders in parallel
    const [holdingsRes, posRes, ordersRes] = await Promise.all([
      fetch(`${cleanBase}/api/holding/my`, { headers }).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${cleanBase}/api/position/my`, { headers }).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${cleanBase}/api/order/my`, { headers }).then(r => r.ok ? r.json() : { open: [], executed: [] }).catch(() => ({ open: [], executed: [] }))
    ]);

    summary.holdings = Array.isArray(holdingsRes) ? holdingsRes : [];
    summary.positions = Array.isArray(posRes) ? posRes : [];
    summary.orders = ordersRes || { open: [], executed: [] };

  } catch (err) {
    summary.durationMs = Date.now() - startTime;
    summary.error = err.message || 'Failed to connect to Mega Bull server';
    summary.statusText = 'Network Error';
  }

  return summary;
}

/**
 * Normalize real Mega Bull live response into Dashboard Student Model
 */
export function normalizeLiveMegaBullData(apiSummary, currentStudent) {
  if (!apiSummary || !apiSummary.isSuccess || !apiSummary.user) {
    return currentStudent;
  }

  const u = apiSummary.user;
  const realName = (u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : currentStudent.name);
  const cashBalance = Number(u.virtualMoneyLeft ?? u.virtualMoney ?? 500000);
  const totalVirtualCapital = Number(u.virtualMoney ?? 500000);
  const blockedMoney = Number(u.virtualMoneyBlocked ?? 0);

  // Parse real holdings
  let calculatedEquity = 0;
  let calculatedUnrealized = 0;

  const parsedHoldings = apiSummary.holdings.map(h => {
    const symbol = h.instrumentName || h.symbol || 'EQUITY';
    const qty = Number(h.qty || 0);
    const buyPrice = Number(h.avgBuyPrice || h.priceAvg || 0);
    const mtmPrice = Number(h.ltp || h.currentPrice || buyPrice);
    const value = qty * mtmPrice;
    const pnl = Number(h.pl ?? (value - (qty * buyPrice)));
    const pnlPct = buyPrice > 0 ? Math.round((pnl / (qty * buyPrice)) * 10000) / 100 : 0;

    calculatedEquity += value;
    calculatedUnrealized += pnl;

    return {
      symbol,
      name: `${symbol} (NSE)`,
      sector: symbol.includes('BANK') ? 'Banking & Financials' : 'General',
      qty,
      buyPrice,
      mtmPrice,
      value,
      pnl,
      pnlPct,
      weightPct: 0,
      stopLoss: Math.round(buyPrice * 0.95 * 100) / 100
    };
  });

  const portfolioValue = Math.round((cashBalance + calculatedEquity + blockedMoney) * 100) / 100;
  const netPnL = Math.round((portfolioValue - 500000) * 100) / 100;
  const returnPct = Math.round(((portfolioValue - 500000) / 500000) * 10000) / 100;

  const holdingsWithWeights = parsedHoldings.map(h => ({
    ...h,
    weightPct: portfolioValue > 0 ? Math.round((h.value / portfolioValue) * 10000) / 100 : 0
  }));

  // Parse executed orders
  const executedOrders = (apiSummary.orders?.executed || []).map((o, idx) => ({
    id: o.orderId || o.id || `MB-ORD-${idx + 1}`,
    timestamp: o.timestamp || o.time || new Date().toISOString().replace('T', ' ').substring(0, 19),
    symbol: o.instrumentName || o.symbol || 'EQUITY',
    type: (o.type || o.side || 'BUY').toUpperCase(),
    qty: Number(o.qty || 0),
    price: Number(o.price || 0),
    value: Number(o.qty * o.price || 0),
    platformRef: `MB-LIVE`
  }));

  return {
    ...currentStudent,
    name: realName,
    email: u.emailId || currentStudent.email,
    cashBalance,
    equityValue: calculatedEquity,
    portfolioValue,
    realizedPnL: 0,
    unrealizedPnL: calculatedUnrealized,
    netPnL,
    returnPct,
    holdings: holdingsWithWeights,
    tradeHistory: executedOrders,
    tradeCount: executedOrders.length + parsedHoldings.length,
    lastApiSync: `Just now • Verified Account`,
    apiSyncStatus: '🟢 Active'
  };
}
