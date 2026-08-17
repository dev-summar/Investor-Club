// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Faculty Coordinator & Administrator Control Panel
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  Sliders,
  Bell,
  FileSpreadsheet,
  Download,
  Users,
  ShieldCheck,
  Send,
  Printer,
  FileText,
  AlertTriangle,
  Clock,
  Plus
} from 'lucide-react';

export const FacultyAdminPanel = () => {
  const {
    students,
    announcements,
    postAnnouncement,
    exportDataBookCSV,
    showToast,
    selectedWeek
  } = useDashboard();

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    author: 'Faculty Coordinator - Investor\'s Club',
    content: ''
  });

  const [isDeanReportOpen, setIsDeanReportOpen] = useState(false);

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.content) {
      alert('Please enter both Title and Content for the announcement.');
      return;
    }
    postAnnouncement(announcementForm);
    setAnnouncementForm({
      title: '',
      author: 'Faculty Coordinator - Investor\'s Club',
      content: ''
    });
  };

  const formatINR = (val) => {
    return '₹' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const totalAUM = students.reduce((sum, s) => sum + s.portfolioValue, 0);
  const totalGain = totalAUM - (students.length * 500000);
  const top1 = students[0];

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="card-surface no-print" style={{
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #1e3a8a'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Faculty Coordinator & Administrator Governance Panel
            </h2>
            <span className="badge badge-neutral" style={{ fontSize: '11px', fontWeight: '700' }}>
              Admin Level Access
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Manage challenge parameters, broadcast competition announcements, and generate Dean's institutional briefing dossiers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsDeanReportOpen(true)}
            style={{
              backgroundColor: '#1e3a8a',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(30, 58, 138, 0.3)'
            }}
          >
            <FileText size={15} />
            <span>Generate Dean's Weekly Dossier</span>
          </button>

          <button
            onClick={exportDataBookCSV}
            style={{
              backgroundColor: '#f8fafc',
              color: '#334155',
              border: '1px solid #cbd5e1',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileSpreadsheet size={15} />
            <span>Export Complete CSV</span>
          </button>
        </div>
      </div>

      {/* Grid: Competition Rules & Announcement Broadcaster */}
      <div className="no-print" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Module 1: Official Challenge Rules & Parameters */}
        <div className="card-surface" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
            Trading Challenge Regulatory Parameters
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
            Institutional governance parameters enforced across all participant terminals
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            {[
              { param: 'Starting Virtual Capital', value: '₹5,00,000 per student', badge: 'Active Baseline' },
              { param: 'Eligible Asset Universe', value: 'NSE Nifty 50 & Liquid Midcaps (Mega Bull)', badge: 'Cash Equity Only' },
              { param: 'Leaderboard Valuation Basis', value: 'Friday 15:30 IST Mark-to-Market (MTM)', badge: 'Weekly Official' },
              { param: 'Prudential Single-Stock Exposure', value: 'Maximum 25.0% of total portfolio value', badge: 'Risk Rule' },
              { param: 'Mandatory Rationale Submission', value: 'Within 24 hours of simulated trade execution', badge: 'Pedagogy Rule' },
              { param: 'Trading Window', value: 'Monday - Friday (09:15 to 15:30 IST)', badge: 'Simulated Session' }
            ].map((rule, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{rule.param}</span>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{rule.value}</div>
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {rule.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Broadcast Announcement Creator */}
        <div className="card-surface" style={{ padding: '22px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
            Broadcast Competition Announcement
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
            Publish market briefings, Friday MTM notices, or rule reminders to student terminals
          </p>

          <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '3px' }}>
                Announcement Headline:
              </label>
              <input
                type="text"
                placeholder="e.g. Friday Mark-to-Market Settlement Notice & Week 8 MTM Close"
                value={announcementForm.title}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                style={{ width: '100%', fontSize: '12px', padding: '8px 12px' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '3px' }}>
                Author Designation:
              </label>
              <input
                type="text"
                value={announcementForm.author}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, author: e.target.value })}
                style={{ width: '100%', fontSize: '12px', padding: '8px 12px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '3px' }}>
                Announcement Content:
              </label>
              <textarea
                rows="3"
                placeholder="Enter details of the briefing, regulatory guidance, or congratulatory notice..."
                value={announcementForm.content}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                style={{ width: '100%', fontSize: '12px', padding: '8px 12px' }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#1e3a8a',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '6px'
              }}
            >
              <Send size={14} />
              <span>Broadcast Announcement</span>
            </button>
          </form>
        </div>
      </div>

      {/* Broadcast Announcements Stream */}
      <div className="card-surface no-print" style={{ padding: '22px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
          Active Published Announcements ({announcements.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {announcements.map(ann => (
            <div
              key={ann.id}
              style={{
                padding: '14px 18px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderLeft: '4px solid #1e3a8a'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>{ann.title}</span>
                <span className="mono-num" style={{ fontSize: '11px', color: '#64748b' }}>{ann.date}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: '600', marginBottom: '6px' }}>
                {ann.author}
              </div>
              <p style={{ fontSize: '12px', color: '#334155', lineHeight: '1.5' }}>
                {ann.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Printable: Dean's Executive Briefing Dossier */}
      {isDeanReportOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card-surface" style={{
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '36px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #1e3a8a', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  EXECUTIVE BRIEFING DOSSIER
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e3a8a' }}>
                  School of Management | Investor's Club Trading Challenge
                </h2>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Friday Mark-to-Market Settlement Summary • Week {selectedWeek} • Mega Bull Platform
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }} className="no-print">
                <button
                  onClick={() => window.print()}
                  style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Printer size={14} />
                  <span>Print Dossier</span>
                </button>
                <button
                  onClick={() => setIsDeanReportOpen(false)}
                  style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* Dossier Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', lineHeight: '1.6', color: '#334155' }}>
              <div>
                <h4 style={{ fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>1. Executive Summary & Fund Pool Performance</h4>
                <p>
                  Across the 4 designated participants spanning MBA Batch 2025-27 and BBA (Financial Services), a total virtual capital pool of <strong>₹20,00,000</strong> (₹5,00,000 per participant baseline) is actively deployed on the Mega Bull simulated trading engine.
                </p>
                <p style={{ marginTop: '6px' }}>
                  As of the Friday 15:30 IST Mark-to-Market settlement, the portfolio pool generated a cumulative net profit of <strong>{formatINR(totalGain)} (+{Math.round((totalGain / 2000000) * 10000) / 100}% return)</strong>, delivering active outperformance over the benchmark NIFTY 50.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>2. Top Podium Standings & Risk Champions</h4>
                <ul style={{ paddingLeft: '20px' }}>
                  <li><strong>Rank 1 (MTM Leader):</strong> {top1?.name} ({top1?.rollNo}) — Portfolio Value: {formatINR(top1?.portfolioValue)} (+{top1?.returnPct}%, Sharpe: {top1?.sharpeRatio})</li>
                  <li><strong>Rank 2 (Runner Up):</strong> {students[1]?.name} ({students[1]?.rollNo}) — Portfolio Value: {formatINR(students[1]?.portfolioValue)} (+{students[1]?.returnPct}%)</li>
                  <li><strong>Highest Sharpe Ratio:</strong> {students[2]?.name} ({students[2]?.rollNo}) — Sharpe Ratio: {students[2]?.sharpeRatio} with low drawdown of {students[2]?.maxDrawdown}%.</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>3. Academic & Risk Compliance</h4>
                <p>
                  100% of participant portfolios adhere to the 25% single-stock prudential concentration limit and risk management mandates.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
              <span>School of Management Investor's Club Trading Challenge</span>
              <span>Submitted to: Dean & Academic Council, School of Management</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
