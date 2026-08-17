// ============================================================================
// MODEL INSTITUTE OF ENGINEERING & TECHNOLOGY (MIET JAMMU)
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Modernized Unified Single-Bar Header & Sleek Editorial Navigation
// ============================================================================

import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  TrendingUp,
  RefreshCw,
  Award,
  Layers,
  Activity,
  BarChart3,
  Download
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    syncAllUserApis,
    isSyncing,
    exportDataBookCSV,
    toastMessage,
    selectedWeek,
    students
  } = useDashboard();

  const navTabs = [
    { id: 'overview', label: 'Overview & Holdings', icon: BarChart3 },
    { id: 'leaderboard', label: 'Friday MTM Standings', icon: TrendingUp },
    { id: 'pedagogy-analytics', label: 'Milestones & Cohorts', icon: Layers },
    { id: 'awards-certificates', label: 'Merit Studio', icon: Award },
    { id: 'megabull-gateway', label: 'Platform Gateway', icon: Activity }
  ];

  const currentTotalAUM = students.reduce((sum, s) => sum + s.portfolioValue, 0);

  const formatINR = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <header className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          backgroundColor: toastMessage.type === 'success' ? '#ecfdf5' : toastMessage.type === 'error' ? '#fef2f2' : '#e8f1fa',
          color: toastMessage.type === 'success' ? '#065f46' : toastMessage.type === 'error' ? '#991b1b' : '#002147',
          borderBottom: `1px solid ${toastMessage.type === 'success' ? '#a7f3d0' : toastMessage.type === 'error' ? '#fecaca' : '#bfdbfe'}`,
          padding: '5px 16px',
          textAlign: 'center',
          fontSize: '11.5px',
          fontWeight: '600'
        }}>
          {toastMessage.message}
        </div>
      )}

      {/* 1. Unified Single-Bar Header */}
      <div style={{
        maxWidth: '1540px',
        margin: '0 auto',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Left Side: Dual Branding Lockup (MIET + Investor's Club) & Compact Two-Line Stack */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* MIET Institutional Logo */}
          <img
            src="https://mietjmu.in/wp-content/uploads/2025/02/miet-logo-dark.png"
            alt="MIET Jammu"
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          {/* Subtle Vertical Border */}
          <div style={{ height: '24px', width: '1px', backgroundColor: '#cbd5e1' }} />

          {/* Investor's Club Official Emblem */}
          <img
            src="https://mietjmu.in/wp-content/uploads/2026/08/investors_club_logo_light_bg-scaled.png"
            alt="Investor's Club"
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          {/* Subtle Vertical Border */}
          <div style={{ height: '24px', width: '1px', backgroundColor: '#cbd5e1' }} />

          {/* Compact Two-Line Stack for Visual Symmetry */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '900',
              color: '#002147',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Investor's Club
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#64748b',
              lineHeight: '1.2',
              marginTop: '1px'
            }}>
              Trading Challenge • School of Management
            </div>
          </div>
        </div>

        {/* Right Side: Live Pulse Badge + Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)'
          }}>
            <span className="pulsing-dot" /> Active MTM
          </span>

          <button
            onClick={syncAllUserApis}
            disabled={isSyncing}
            style={{
              backgroundColor: '#002147',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0, 33, 71, 0.15)',
              fontFamily: 'var(--font-mono)',
              transition: 'background-color 150ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#003366'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002147'}
            title="Refresh live portfolio valuations"
          >
            <RefreshCw size={12} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isSyncing ? 'Updating...' : 'Refresh Portfolios'}</span>
          </button>

          <button
            onClick={exportDataBookCSV}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
              fontFamily: 'var(--font-mono)'
            }}
            title="Export CSV Statement"
          >
            <Download size={12} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Sleek Editorial Segmented Navigation Bar */}
      <div style={{
        maxWidth: '1540px',
        margin: '0 auto',
        padding: '0 24px 8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '3px',
          borderRadius: '9px',
          border: '1px solid #e2e8f0',
          display: 'inline-flex',
          gap: '3px',
          minWidth: 'max-content'
        }}>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '5px 14px',
                  fontSize: '12px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#0f172a' : '#64748b',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  borderRadius: '6px',
                  boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 120ms ease'
                }}
              >
                <Icon size={13} color={isActive ? '#002147' : '#94a3b8'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Compact Horizontal 1-Line Metadata Bar */}
      <div style={{
        backgroundColor: '#fafbfc',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #e2e8f0',
        padding: '6px 24px'
      }}>
        <div style={{
          maxWidth: '1540px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span>Baseline: <strong style={{ color: '#002147' }}>₹5,00,000/Student</strong></span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span>Total AUM: <strong style={{ color: '#002147' }}>{formatINR(currentTotalAUM)}</strong></span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span>Participants: <strong style={{ color: '#002147' }}>{students.length} Verified</strong></span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span>Settlement: <strong style={{ color: '#b45309' }}>Friday 15:30 IST</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: '600' }}>
            <span>School of Management, MIET Jammu</span>
          </div>
        </div>
      </div>
    </header>
  );
};
