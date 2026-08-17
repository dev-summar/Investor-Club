// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Editorial Light Friday Mark-To-Market Leaderboard Deck
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Sparkline } from './common/Sparkline';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Download
} from 'lucide-react';

export const WeeklyLeaderboard = () => {
  const {
    students,
    setSelectedStudentId,
    selectedWeek,
    exportDataBookCSV
  } = useDashboard();

  const [sortBy, setSortBy] = useState('portfolioValue');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sorting
  const sortedStudents = [...students].sort((a, b) => {
    let valA = a[sortBy] || 0;
    let valB = b[sortBy] || 0;
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const top3 = sortedStudents.slice(0, 3);

  const formatINR = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. Header Bar */}
      <div className="editorial-card" style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#d97706'
          }}>
            <Trophy size={18} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                Friday Mark-to-Market Official Standings
              </h2>
              <span className="editorial-badge editorial-badge-profit">
                Week {selectedWeek} Published
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>
              Settled at 15:30 IST NSE closing prices across all student trading accounts.
            </p>
          </div>
        </div>

        <button
          onClick={exportDataBookCSV}
          style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            padding: '7px 14px',
            borderRadius: '7px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
          }}
        >
          <Download size={13} />
          <span>Export CSV Statement</span>
        </button>
      </div>

      {/* 2. Top 3 Podium Cards */}
      <div className="grid-4col-responsive" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px'
      }}>
        {top3.map((student, idx) => {
          const medalConfig = [
            { badgeBg: '#fffbeb', badgeText: '#d97706', badgeBorder: '#fde68a', label: 'Rank 1 • Gold Medal' },
            { badgeBg: '#f1f5f9', badgeText: '#475569', badgeBorder: '#cbd5e1', label: 'Rank 2 • Silver Medal' },
            { badgeBg: '#fff7ed', badgeText: '#c2410c', badgeBorder: '#ffedd5', label: 'Rank 3 • Bronze Medal' }
          ][idx];

          return (
            <div key={student.id} className="editorial-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: '800',
                    backgroundColor: medalConfig.badgeBg,
                    color: medalConfig.badgeText,
                    border: `1px solid ${medalConfig.badgeBorder}`,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {medalConfig.label}
                  </span>

                  <span className={`editorial-badge ${student.returnPct >= 0 ? 'editorial-badge-profit' : 'editorial-badge-loss'}`}>
                    {student.returnPct >= 0 ? `+${student.returnPct}%` : `${student.returnPct}%`}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                  {student.name}
                </h3>
                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                  {student.email || student.rollNo} • {student.batch}
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
                    Portfolio Valuation
                  </div>
                  <div className="mono-num" style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                    {formatINR(student.portfolioValue)}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudentId(student.id)}
                  style={{
                    color: '#0f172a',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <span>Inspect</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Full Cohort Matrix Table */}
      <div className="editorial-card" style={{ overflow: 'hidden' }}>
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
            Full Cohort Leaderboard Matrix
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Click column headers to sort rankings
          </span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="editorial-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>Rank</th>
                <th style={{ textAlign: 'left' }}>Participant</th>
                <th style={{ textAlign: 'left' }}>Cohort</th>
                <th style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => handleSort('cashBalance')}>
                  Cash Balance ↕
                </th>
                <th style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => handleSort('equityValue')}>
                  Equity Value ↕
                </th>
                <th style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => handleSort('portfolioValue')}>
                  Total Net Worth ▾
                </th>
                <th style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => handleSort('returnPct')}>
                  Return % ↕
                </th>
                <th style={{ textAlign: 'center', width: '140px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, idx) => (
                <tr key={student.id}>
                  <td style={{ textAlign: 'center', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                    {idx === 0 ? (
                      <span className="editorial-badge editorial-badge-amber" style={{ padding: '2px 6px' }}>#1</span>
                    ) : (
                      <span style={{ color: '#64748b' }}>#{idx + 1}</span>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{student.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{student.email || student.rollNo}</div>
                  </td>
                  <td style={{ color: '#475569', fontSize: '12px' }}>
                    {student.batch}
                  </td>
                  <td className="mono-num" style={{ textAlign: 'right', color: '#334155', fontWeight: '600' }}>
                    {formatINR(student.cashBalance)}
                  </td>
                  <td className="mono-num" style={{ textAlign: 'right', color: '#334155', fontWeight: '600' }}>
                    {formatINR(student.equityValue)}
                  </td>
                  <td className="mono-num" style={{ textAlign: 'right', fontWeight: '800', color: '#002147', fontSize: '13.5px' }}>
                    {formatINR(student.portfolioValue)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkline
                        data={[
                          500000,
                          500000 + (student.portfolioValue - 500000) * 0.25,
                          500000 + (student.portfolioValue - 500000) * 0.15,
                          500000 + (student.portfolioValue - 500000) * 0.55,
                          500000 + (student.portfolioValue - 500000) * 0.45,
                          500000 + (student.portfolioValue - 500000) * 0.85,
                          student.portfolioValue
                        ]}
                        width={52}
                        height={20}
                        isPositive={student.returnPct >= 0}
                        strokeWidth={1.5}
                      />
                      <span className={`editorial-badge ${student.returnPct >= 0 ? 'editorial-badge-profit' : 'editorial-badge-loss'}`} style={{ minWidth: '54px', justifyContent: 'center' }}>
                        {student.returnPct >= 0 ? `+${student.returnPct}%` : `${student.returnPct}%`}
                      </span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedStudentId(student.id)}
                      style={{
                        color: '#0f172a',
                        fontSize: '12px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <span>View Portfolio</span>
                      <ChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
