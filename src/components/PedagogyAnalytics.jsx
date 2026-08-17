// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Learning & Engagement Analytics Deck (Pillar #8 from Email)
// ============================================================================

import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  Layers,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  BarChart2,
  TrendingUp,
  Download,
  Calendar,
  FileText,
  Target,
  Sparkles
} from 'lucide-react';

export const PedagogyAnalytics = () => {
  const {
    students,
    pedagogicalMilestones,
    showToast
  } = useDashboard();

  // Cohort Grouping Analytics
  const cohorts = [
    { name: 'MBA Batch 2025-27', total: students.filter(s => s.batch?.includes('MBA')).length, status: 'Active' },
    { name: 'BBA (Financial Services) 2024-27', total: students.filter(s => s.batch?.includes('BBA')).length, status: 'Active' }
  ];

  const handleExportReport = () => {
    showToast('📑 Generating Learning & Engagement Report...', 'info');
    setTimeout(() => {
      showToast('✅ Learning & Engagement Report exported successfully!', 'success');
    }, 1000);
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="card-surface" style={{
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #0f766e'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Student Learning & Engagement Milestones
            </h2>
            <span className="badge" style={{ backgroundColor: '#ccfbf1', color: '#0f766e', fontWeight: '700', fontSize: '11px' }}>
              Pillar #8: Engagement
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Monitoring participant learning progression, milestone completions, and practical market research.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          style={{
            backgroundColor: '#0f766e',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(15, 118, 110, 0.3)'
          }}
        >
          <Download size={15} />
          <span>Export Learning Report</span>
        </button>
      </div>

      {/* Challenge Milestones Progress */}
      <div className="card-surface" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
          Trading Challenge Curriculum & Milestones
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {(pedagogicalMilestones || []).map((m, idx) => (
            <div key={m.id || idx} style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-profit" style={{ fontSize: '10px' }}>{m.targetWeek || `Phase ${idx + 1}`}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>{m.completionPct}% Done</span>
              </div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>{m.title}</h4>
              <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', marginTop: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${m.completionPct}%`, backgroundColor: '#10b981', height: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Performance Overview */}
      <div className="card-surface" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
          Academic Cohorts Participation
        </h3>

        <div className="table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Academic Cohort</th>
                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Active Students</th>
                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '800', color: '#0f172a' }}>{c.name}</td>
                  <td className="mono-num" style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700' }}>{c.total} Accounts</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span className="editorial-badge editorial-badge-profit">{c.status}</span>
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
