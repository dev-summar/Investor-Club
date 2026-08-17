// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Finance Lab & Department TV Wallboard / Kiosk Mode
// ============================================================================

import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Clock,
  X,
  Maximize2,
  Minimize2,
  Award,
  ShieldCheck
} from 'lucide-react';

export const KioskWallDisplay = () => {
  const {
    students,
    benchmarks,
    scrips,
    setUserRole,
    selectedWeek,
    isLiveSimulating
  } = useDashboard();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-IN'));
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const top3 = students.slice(0, 3);
  const totalAUM = students.reduce((sum, s) => sum + s.portfolioValue, 0);
  const totalPnL = totalAUM - (students.length * 500000);

  const formatINR = (val) => {
    return '₹' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'var(--font-heading)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box'
    }}>
      
      {/* Top TV Bar: Institution Branding + Live Clock + Exit Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        borderBottom: '1px solid #1f293d'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '20px',
            color: '#ffffff',
            boxShadow: '0 0 16px rgba(2, 132, 199, 0.5)'
          }}>
            SOM
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
                SCHOOL OF MANAGEMENT
              </h1>
              <span style={{ backgroundColor: '#1e3a8a', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '800' }}>
                FINANCE LAB DISPLAY
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
              Investor's Club Trading Challenge • Mega Bull Engine (₹5,00,000 Virtual Capital)
            </div>
          </div>
        </div>

        {/* Center Live Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Total Fund Pool</span>
            <div className="mono-num" style={{ fontSize: '18px', fontWeight: '900', color: '#38bdf8' }}>
              {formatINR(totalAUM)}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Collective Gain</span>
            <div className="mono-num" style={{ fontSize: '18px', fontWeight: '900', color: '#34d399' }}>
              +{formatINR(totalPnL)} (+6.00%)
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>MEGA BULL ONLINE</span>
            </div>
            <div className="mono-num" style={{ fontSize: '16px', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
              {currentTime} IST
            </div>
          </div>

          {/* Fullscreen & Exit Controls */}
          <div style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
            <button
              onClick={toggleFullscreen}
              style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '6px 10px', borderRadius: '6px' }}
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={() => setUserRole('faculty')}
              style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <X size={14} />
              <span>Exit TV Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Market Indices Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        margin: '16px 0'
      }}>
        {Object.entries(benchmarks).map(([k, b]) => (
          <div key={k} style={{
            backgroundColor: '#111827',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #1f293d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>{b.name}</div>
              <div className="mono-num" style={{ fontSize: '15px', fontWeight: '800', color: '#f8fafc' }}>
                {b.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="mono-num" style={{ color: '#34d399', fontWeight: '800', fontSize: '13px' }}>
                +{b.changePercent}%
              </span>
              <div style={{ fontSize: '10px', color: '#64748b' }}>Wk: +{b.weeklyReturn}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Centerpiece: Podium + Live Top Leaderboard Standings */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '20px',
        flex: 1,
        marginBottom: '16px'
      }}>
        
        {/* Left Column: Spotlight on Top 3 Champions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={16} />
            <span>Friday MTM Podium Spotlight</span>
          </div>

          {top3.map((student, idx) => {
            const colors = ['#f59e0b', '#94a3b8', '#b45309'];
            return (
              <div
                key={student.id}
                style={{
                  backgroundColor: '#111827',
                  borderRadius: '10px',
                  border: `2px solid ${idx === 0 ? '#f59e0b' : '#1f293d'}`,
                  padding: '16px',
                  boxShadow: idx === 0 ? '0 0 16px rgba(245, 158, 11, 0.2)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: colors[idx],
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '900',
                      fontSize: '14px'
                    }}>
                      #{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#f8fafc' }}>
                        {student.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {student.rollNo} • {student.batch.split(' ')[0]}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div className="mono-num" style={{ fontSize: '15px', fontWeight: '800', color: '#34d399' }}>
                      +{student.returnPct}%
                    </div>
                    <div className="mono-num" style={{ fontSize: '11px', color: '#38bdf8' }}>
                      Sharpe {student.sharpeRatio}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #1f293d', fontSize: '11px' }}>
                  <span style={{ color: '#64748b' }}>MTM Value:</span>
                  <span className="mono-num" style={{ fontWeight: '800', color: '#f8fafc' }}>{formatINR(student.portfolioValue)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Wallboard Standings Table */}
        <div style={{
          backgroundColor: '#111827',
          borderRadius: '12px',
          border: '1px solid #1f293d',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#f8fafc' }}>
              Official Week {selectedWeek} Trading Standings
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Valuation: Friday 15:30 IST
            </span>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', borderBottom: '1px solid #1f293d' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Rank</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Student Name</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Batch & Section</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>MTM Portfolio (₹)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Net Return %</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Sharpe Ratio</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Max Drawdown</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #161f30', backgroundColor: idx % 2 === 0 ? '#111827' : '#0d131f' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        fontWeight: '900',
                        color: student.rank <= 3 ? '#fbbf24' : '#94a3b8'
                      }}>
                        #{student.rank}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: '800', color: '#f8fafc' }}>
                      {student.name}
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: '11px', color: '#94a3b8' }}>
                      {student.rollNo} • {student.section}
                    </td>
                    <td className="mono-num" style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: '#f8fafc' }}>
                      {formatINR(student.portfolioValue)}
                    </td>
                    <td className="mono-num" style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '800', color: student.netPnL >= 0 ? '#34d399' : '#f87171' }}>
                      {student.netPnL >= 0 ? `+${student.returnPct}%` : `${student.returnPct}%`}
                    </td>
                    <td className="mono-num" style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '700', color: '#38bdf8' }}>
                      {student.sharpeRatio}
                    </td>
                    <td className="mono-num" style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '700', color: '#94a3b8' }}>
                      {student.maxDrawdown}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Live Equity Scrips Ticker */}
      <div style={{
        backgroundColor: '#0b111e',
        borderRadius: '8px',
        border: '1px solid #1f293d',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        gap: '24px',
        whiteSpace: 'nowrap'
      }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase' }}>
          MEGA BULL TAPE:
        </span>
        {scrips.slice(0, 10).map(s => (
          <div key={s.symbol} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
            <span style={{ fontWeight: '800', color: '#f8fafc' }}>{s.symbol}</span>
            <span className="mono-num" style={{ color: '#cbd5e1' }}>₹{s.price}</span>
            <span className="mono-num" style={{ color: s.changePct >= 0 ? '#34d399' : '#f87171', fontWeight: '700', fontSize: '11px' }}>
              {s.changePct >= 0 ? `+${s.changePct}%` : `${s.changePct}%`}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
