// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Editorial Light Portfolio Slide-Over Drawer
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  X,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Key,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const StudentPortfolioModal = () => {
  const {
    selectedStudent,
    setSelectedStudentId,
    syncUserApi,
    updateStudentApiKey,
    setSelectedCertificateStudent,
    setActiveTab,
    showToast
  } = useDashboard();

  const [copiedKey, setCopiedKey] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [keyInput, setKeyInput] = useState(selectedStudent?.apiKey || '');

  if (!selectedStudent) return null;

  const formatINR = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleCopyKey = () => {
    if (!selectedStudent.apiKey) return;
    navigator.clipboard.writeText(selectedStudent.apiKey);
    setCopiedKey(true);
    showToast(`📋 Copied API Key to clipboard`, 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveApiKey = () => {
    if (!keyInput.trim()) return;
    updateStudentApiKey(selectedStudent.id, keyInput.trim());
    setIsEditingKey(false);
    showToast('✅ Updated Mega Bull API Key!', 'success');
  };

  return (
    <div className="slideover-overlay" onClick={() => setSelectedStudentId(null)}>
      <div className="slideover-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div style={{
          padding: '16px 22px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="mono-num" style={{ fontSize: '11.5px', fontWeight: '800', color: '#d97706', backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '2px 6px', borderRadius: '4px' }}>
                RANK #{selectedStudent.rank || 1}
              </span>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>
                {selectedStudent.name}
              </h2>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
              <strong style={{ color: '#0f172a' }}>{selectedStudent.email || `${selectedStudent.rollNo} • mietjammu.in`}</strong> • {selectedStudent.batch}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => syncUserApi(selectedStudent.id)}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)'
              }}
              title="Sync live holdings with Mega Bull"
            >
              <RefreshCw size={11} />
              <span>SYNC</span>
            </button>

            <button
              onClick={() => setSelectedStudentId(null)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* API Key Status Bar */}
        <div style={{
          padding: '9px 22px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11.5px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Key size={13} color="#0f172a" />
            <span style={{ color: '#64748b', fontWeight: '600' }}>API Key:</span>
            {isEditingKey ? (
              <div style={{ display: 'flex', gap: '4px' }}>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  style={{ padding: '2px 6px', fontSize: '11px', width: '220px', fontFamily: 'var(--font-mono)' }}
                />
                <button onClick={handleSaveApiKey} style={{ backgroundColor: '#059669', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '700' }}>Save</button>
                <button onClick={() => setIsEditingKey(false)} style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <code style={{ backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: '700', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                  {selectedStudent.apiKey}
                </code>
                <button onClick={handleCopyKey} style={{ color: copiedKey ? '#059669' : '#64748b', padding: '2px' }}>
                  {copiedKey ? <Check size={12} /> : <Copy size={12} />}
                </button>
                <button onClick={() => { setIsEditingKey(true); setKeyInput(selectedStudent.apiKey); }} style={{ color: '#4f46e5', fontSize: '11px', fontWeight: '600' }}>
                  Edit
                </button>
              </div>
            )}
          </div>

          <span style={{ color: '#059669', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="pulsing-dot" /> Account Connected & Active
          </span>
        </div>

        {/* 4 Financial Metric Tiles */}
        <div style={{
          padding: '16px 22px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Portfolio Valuation
            </div>
            <div className="mono-num" style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', marginTop: '3px' }}>
              {formatINR(selectedStudent.portfolioValue)}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              ₹5,00,000 Baseline
            </div>
          </div>

          <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Unallocated Cash Margin
            </div>
            <div className="mono-num" style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', marginTop: '3px' }}>
              {formatINR(selectedStudent.cashBalance)}
            </div>
            <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600', marginTop: '2px' }}>
              Ready for Orders
            </div>
          </div>

          <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Invested Stock Equity
            </div>
            <div className="mono-num" style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', marginTop: '3px' }}>
              {formatINR(selectedStudent.equityValue)}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              {(selectedStudent.holdings || []).length} Open Positions
            </div>
          </div>

          <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Unrealized MTM P&L
            </div>
            <div className="mono-num" style={{ fontSize: '19px', fontWeight: '800', color: (selectedStudent.unrealizedPnL || 0) >= 0 ? '#059669' : '#dc2626', marginTop: '3px' }}>
              {(selectedStudent.unrealizedPnL || 0) >= 0 ? `+${formatINR(selectedStudent.unrealizedPnL || 0)}` : formatINR(selectedStudent.unrealizedPnL || 0)}
            </div>
            <div style={{ fontSize: '11px', color: (selectedStudent.unrealizedPnL || 0) >= 0 ? '#059669' : '#dc2626', fontWeight: '600', marginTop: '2px' }}>
              Return: {selectedStudent.returnPct >= 0 ? `+${selectedStudent.returnPct}%` : `${selectedStudent.returnPct}%`}
            </div>
          </div>
        </div>

        {/* Drawer Body: Stock Holdings */}
        <div style={{ padding: '20px 22px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.01em' }}>
            Live Stock Holdings & Positions
          </div>

          {(!selectedStudent.holdings || selectedStudent.holdings.length === 0) ? (
            <div style={{ padding: '28px 16px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Briefcase size={28} color="#94a3b8" style={{ margin: '0 auto 6px auto' }} />
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>No open stock positions</div>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                100% of capital ({formatINR(selectedStudent.cashBalance)}) is held as available cash balance on Mega Bull.
              </p>
            </div>
          ) : (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <table className="editorial-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Instrument</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Buy Price</th>
                    <th style={{ textAlign: 'right' }}>Position Value</th>
                    <th style={{ textAlign: 'right' }}>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.holdings.map((h) => {
                    const isProfit = (h.pnl || 0) >= 0;
                    return (
                      <tr key={h.symbol}>
                        <td>
                          <div style={{ fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{h.symbol}</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>NSE EQ</div>
                        </td>
                        <td className="mono-num" style={{ textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                          {h.qty}
                        </td>
                        <td className="mono-num" style={{ textAlign: 'right', color: '#475569' }}>
                          {formatINR(h.buyPrice)}
                        </td>
                        <td className="mono-num" style={{ textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>
                          {formatINR(h.value)}
                        </td>
                        <td className="mono-num" style={{ textAlign: 'right' }}>
                          <span className={`editorial-badge ${isProfit ? 'editorial-badge-profit' : 'editorial-badge-loss'}`}>
                            {isProfit ? `+${formatINR(h.pnl || 0)}` : formatINR(h.pnl || 0)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Action: Issue Certificate */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => {
                setSelectedCertificateStudent(selectedStudent);
                setActiveTab('awards-certificates');
                setSelectedStudentId(null);
              }}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #d97706',
                color: '#b45309',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 1px 2px rgba(217, 119, 6, 0.08)'
              }}
            >
              <Award size={15} />
              <span>Generate Certificate of Merit</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div style={{
          padding: '14px 22px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={() => setSelectedStudentId(null)}
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '6px 16px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
