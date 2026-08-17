// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Pure Real API Data Store - No Simulated Holdings or Synthetic Data
// ============================================================================

export const INITIAL_CAPITAL = 500000; // ₹5,00,000 Virtual Capital baseline

export const BENCHMARKS = {
  nifty50: { name: 'NIFTY 50', current: 24850.35, change: +142.60, changePercent: +0.58, weeklyReturn: +3.42 },
  sensex: { name: 'BSE SENSEX', current: 81380.20, change: +410.15, changePercent: +0.51, weeklyReturn: +2.95 },
  niftyBank: { name: 'NIFTY BANK', current: 51240.80, change: +280.90, changePercent: +0.55, weeklyReturn: +4.10 }
};

export const SECTORS = [
  'Banking & Financials',
  'IT & Software',
  'Automobiles & EV',
  'Pharmaceuticals',
  'Energy & Utilities',
  'Infrastructure & Capital Goods',
  'FMCG & Consumer'
];

export const SCRIPS = [];

// The 4 Primary API Leads with provided Mega Bull API Keys
export const API_LEADS = [
  {
    id: 'LEAD-01',
    leadName: 'Manish',
    apiKey: '02c06a7d-c2f3-4b9f-aba4-4bad3086c54d',
    cohort: 'MBA Batch 2025-27',
    status: 'API Key Active'
  },
  {
    id: 'LEAD-02',
    leadName: 'Muntazir',
    apiKey: 'ed493654-1b99-4a50-a2dc-d956b1e742e6',
    cohort: 'MBA Batch 2025-27',
    status: 'API Key Active'
  },
  {
    id: 'LEAD-03',
    leadName: 'Tahir N',
    apiKey: 'c7eb7188-b8df-43bb-8353-3a135a480fac',
    cohort: 'MBA Batch 2025-27',
    status: 'API Key Active'
  },
  {
    id: 'LEAD-04',
    leadName: 'Tahir Fazal',
    apiKey: 'c7eb7188-b8df-43bb-8353-3a135a480fac',
    cohort: 'BBA (Financial Services) 2024-27',
    status: 'API Key Active'
  }
];

// Pure Initial Participant State - ZERO Fake Data (Populated strictly by live Mega Bull API)
export const INITIAL_STUDENTS = [
  {
    id: 'PART-01',
    name: 'Manish',
    isLead: true,
    linkedLeadName: 'Manish',
    leadApiKey: '02c06a7d-c2f3-4b9f-aba4-4bad3086c54d',
    rollNo: '25MBA008',
    batch: 'MBA Batch 2025-27',
    section: 'Section A',
    investmentPhilosophy: 'Live Trading Account',
    apiKey: '02c06a7d-c2f3-4b9f-aba4-4bad3086c54d',
    apiSyncStatus: 'Awaiting Live API Fetch',
    lastApiSync: 'Not synced yet',
    initialCapital: 500000,
    cashBalance: 500000,
    equityValue: 0,
    portfolioValue: 500000,
    realizedPnL: 0,
    unrealizedPnL: 0,
    netPnL: 0,
    returnPct: 0.0,
    fridayMtmHistory: [500000],
    weeklyDelta: 0,
    rank: 1,
    sharpeRatio: 0.0,
    beta: 1.0,
    maxDrawdown: 0.0,
    winRate: 0.0,
    tradeCount: 0,
    rationaleScore: 0.0,
    thesesCount: 0,
    thesesReviewed: 0,
    badges: ['Mega Bull API Key Bound'],
    complianceStatus: 'Pending API Fetch',
    lastActive: 'Ready to sync',
    holdings: [],
    tradeHistory: []
  },
  {
    id: 'PART-02',
    name: 'Muntazir',
    isLead: true,
    linkedLeadName: 'Muntazir',
    leadApiKey: 'ed493654-1b99-4a50-a2dc-d956b1e742e6',
    rollNo: '25MBA022',
    batch: 'MBA Batch 2025-27',
    section: 'Section B',
    investmentPhilosophy: 'Live Trading Account',
    apiKey: 'ed493654-1b99-4a50-a2dc-d956b1e742e6',
    apiSyncStatus: 'Awaiting Live API Fetch',
    lastApiSync: 'Not synced yet',
    initialCapital: 500000,
    cashBalance: 500000,
    equityValue: 0,
    portfolioValue: 500000,
    realizedPnL: 0,
    unrealizedPnL: 0,
    netPnL: 0,
    returnPct: 0.0,
    fridayMtmHistory: [500000],
    weeklyDelta: 0,
    rank: 2,
    sharpeRatio: 0.0,
    beta: 1.0,
    maxDrawdown: 0.0,
    winRate: 0.0,
    tradeCount: 0,
    rationaleScore: 0.0,
    thesesCount: 0,
    thesesReviewed: 0,
    badges: ['Mega Bull API Key Bound'],
    complianceStatus: 'Pending API Fetch',
    lastActive: 'Ready to sync',
    holdings: [],
    tradeHistory: []
  },
  {
    id: 'PART-03',
    name: 'Tahir N',
    isLead: true,
    linkedLeadName: 'Tahir N',
    leadApiKey: 'c7eb7188-b8df-43bb-8353-3a135a480fac',
    rollNo: '25MBA041',
    batch: 'MBA Batch 2025-27',
    section: 'Section C',
    investmentPhilosophy: 'Live Trading Account',
    apiKey: 'c7eb7188-b8df-43bb-8353-3a135a480fac',
    apiSyncStatus: 'Awaiting Live API Fetch',
    lastApiSync: 'Not synced yet',
    initialCapital: 500000,
    cashBalance: 500000,
    equityValue: 0,
    portfolioValue: 500000,
    realizedPnL: 0,
    unrealizedPnL: 0,
    netPnL: 0,
    returnPct: 0.0,
    fridayMtmHistory: [500000],
    weeklyDelta: 0,
    rank: 3,
    sharpeRatio: 0.0,
    beta: 1.0,
    maxDrawdown: 0.0,
    winRate: 0.0,
    tradeCount: 0,
    rationaleScore: 0.0,
    thesesCount: 0,
    thesesReviewed: 0,
    badges: ['Mega Bull API Key Bound'],
    complianceStatus: 'Pending API Fetch',
    lastActive: 'Ready to sync',
    holdings: [],
    tradeHistory: []
  },
  {
    id: 'PART-04',
    name: 'Tahir Fazal',
    isLead: true,
    linkedLeadName: 'Tahir Fazal',
    leadApiKey: 'c7eb7188-b8df-43bb-8353-3a135a480fac',
    rollNo: '24BBA065',
    batch: 'BBA (Financial Services) 2024-27',
    section: 'Section A',
    investmentPhilosophy: 'Live Trading Account',
    apiKey: 'c7eb7188-b8df-43bb-8353-3a135a480fac',
    apiSyncStatus: 'Awaiting Live API Fetch',
    lastApiSync: 'Not synced yet',
    initialCapital: 500000,
    cashBalance: 500000,
    equityValue: 0,
    portfolioValue: 500000,
    realizedPnL: 0,
    unrealizedPnL: 0,
    netPnL: 0,
    returnPct: 0.0,
    fridayMtmHistory: [500000],
    weeklyDelta: 0,
    rank: 4,
    sharpeRatio: 0.0,
    beta: 1.0,
    maxDrawdown: 0.0,
    winRate: 0.0,
    tradeCount: 0,
    rationaleScore: 0.0,
    thesesCount: 0,
    thesesReviewed: 0,
    badges: ['Mega Bull API Key Bound'],
    complianceStatus: 'Pending API Fetch',
    lastActive: 'Ready to sync',
    holdings: [],
    tradeHistory: []
  }
];

export const INITIAL_THESES = [];

export const MEGA_BULL_GATEWAY_LOGS = [
  {
    id: 'LOG-0001',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    event: 'Mega Bull Live Gateway Initialized',
    status: 'READY',
    details: 'Real HTTP Gateway loaded with participant API keys.'
  }
];

export const PEDAGOGICAL_MILESTONES = [
  { id: 'M-01', title: 'Macroeconomic & Industry Analysis', targetWeek: 'Week 1-2', completionPct: 100, status: 'Completed' },
  { id: 'M-02', title: 'Financial Statement & Ratio Modeling', targetWeek: 'Week 3-4', completionPct: 100, status: 'Completed' },
  { id: 'M-03', title: 'DCF & Intrinsic Valuation Workshop', targetWeek: 'Week 5-6', completionPct: 95, status: 'Completed' },
  { id: 'M-04', title: 'Live Mega Bull Trading & Risk Management', targetWeek: 'Week 7-8', completionPct: 80, status: 'In Progress' }
];

export const ANNOUNCEMENTS = [
  {
    id: 'ANN-01',
    date: new Date().toISOString().substring(0, 10),
    author: 'Investor\'s Club Coordinator',
    title: 'Live Mega Bull API Integration Active',
    content: 'The dashboard synchronizes exclusively with live responses returned by the Mega Bull platform API.'
  }
];
