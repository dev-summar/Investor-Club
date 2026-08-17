// ============================================================================
// MODEL INSTITUTE OF ENGINEERING & TECHNOLOGY (MIET JAMMU)
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Fully Responsive Unified Single-Bar Header & Navigation
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
    <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          backgroundColor: toastMessage.type === 'success' ? '#ecfdf5' : toastMessage.type === 'error' ? '#fef2f2' : '#e8f1fa',
          color: toastMessage.type === 'success' ? '#065f46' : toastMessage.type === 'error' ? '#991b1b' : '#002147',
          borderBottom: `1px solid ${toastMessage.type === 'success' ? '#a7f3d0' : toastMessage.type === 'error' ? '#fecaca' : '#bfdbfe'}`,
          padding: '5px 16px',
          textAlign: 'center',
          fontSize: '11.5px',
          fontWeight: '500'
        }}>
          {toastMessage.message}
        </div>
      )}

      {/* 1. Unified Single-Bar Header */}
      <div style={{
        maxWidth: '1540px',
        margin: '0 auto',
        padding: '8px 16px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Left Side: Dual Branding Lockup & Compact Two-Line Stack */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* MIET Institutional Logo */}
          <img
            src="https://mietjmu.in/wp-content/uploads/2025/02/miet-logo-dark.png"
            alt="MIET Jammu"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          {/* Subtle Vertical Border */}
          <div style={{ height: '20px', width: '1px', backgroundColor: '#cbd5e1' }} />

          {/* Investor's Club Official Emblem */}
          <img
            src="https://mietjmu.in/wp-content/uploads/2026/08/investors_club_logo_light_bg-scaled.png"
            alt="Investor's Club"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          {/* Subtle Vertical Border */}
          <div style={{ height: '20px', width: '1px', backgroundColor: '#cbd5e1' }} />

          {/* Compact Two-Line Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontSize: '13.5px',
              fontWeight: '700',
              color: '#002147',
              letterSpacing: '-0.015em',
              lineHeight: '1.2'
            }}>
              Investor's Club
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#64748b',
              lineHeight: '1.2',
              marginTop: '1px'
            }}>
              Trading Challenge
            </div>
          </div>
        </div>

        {/* Right Side: Live Pulse Badge + Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: '600'
          }}>
            <span className="pulsing-dot" /> Active MTM
          </span>

          <button
            onClick={syncAllUserApis}
            disabled={isSyncing}
            style={{
              backgroundColor: '#002147',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0, 33, 71, 0.12)',
              transition: 'background-color 150ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#003366'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002147'}
            title="Refresh live portfolio valuations"
          >
            <RefreshCw size={12} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isSyncing ? 'Updating...' : 'Refresh'}</span>
          </button>

          <button
            onClick={exportDataBookCSV}
            style={{
              backgroundColor: '#ffffff',
              color: '#374151',
              border: '1px solid #d1d5db',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
            }}
            title="Export CSV Statement"
          >
            <Download size={12} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Responsive Segmented Navigation Bar */}
      <div style={{
        maxWidth: '1540px',
        margin: '0 auto',
        padding: '0 16px 8px 16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          display: 'inline-flex',
          gap: '2px',
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
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? '#111827' : '#4b5563',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  borderRadius: '6px',
                  boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  whiteSpace: 'nowrap',
                  transition: 'all 120ms ease'
                }}
              >
                <Icon size={13} color={isActive ? '#002147' : '#6b7280'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Compact Horizontal Metadata Bar */}
      <div style={{
        backgroundColor: '#fafbfc',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #e5e7eb',
        padding: '6px 16px'
      }}>
        <div style={{
          maxWidth: '1540px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px 12px',
          fontSize: '11.5px',
          color: '#6b7280'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>Baseline: <strong style={{ color: '#111827', fontWeight: '500' }}>₹5,00,000/Student</strong></span>
            <span style={{ color: '#d1d5db' }}>•</span>
            <span>Total AUM: <strong style={{ color: '#111827', fontWeight: '600' }} className="mono-num">{formatINR(currentTotalAUM)}</strong></span>
            <span style={{ color: '#d1d5db' }}>•</span>
            <span>Participants: <strong style={{ color: '#111827', fontWeight: '500' }}>{students.length} Verified</strong></span>
            <span style={{ color: '#d1d5db' }}>•</span>
            <span>Settlement: <strong style={{ color: '#b45309', fontWeight: '500' }}>Friday 15:30 IST</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: '500' }}>
            <span>School of Management, MIET Jammu</span>
          </div>
        </div>
      </div>
    </header>
  );
};
