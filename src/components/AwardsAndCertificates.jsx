// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Awards, Wall of Fame & Dynamic Certificate Studio
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import confetti from 'canvas-confetti';
import {
  Award,
  Trophy,
  Medal,
  Star,
  Printer,
  Download,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  QrCode,
  Share2
} from 'lucide-react';

export const AwardsAndCertificates = () => {
  const {
    students,
    selectedCertificateStudent,
    setSelectedCertificateStudent,
    awardBadge,
    showToast
  } = useDashboard();

  const [currentStudent, setCurrentStudent] = useState(
    selectedCertificateStudent || students[0] || null
  );

  const [certType, setCertType] = useState('rank1'); // 'rank1', 'risk', 'thesis', 'participation'

  const certConfig = {
    rank1: {
      title: 'CERTIFICATE OF MERIT & VALUATION LEADERSHIP',
      subtitle: 'Awarded for Securing Rank 1 in the Weekly Mark-to-Market Standings',
      citation: (s) => `This certificate is proudly awarded to ${s.name} (${s.rollNo}), ${s.batch}, in recognition of exceptional financial acumen, disciplined strategy execution, and achieving the Highest Portfolio Mark-to-Market Valuation of ₹${s.portfolioValue.toLocaleString('en-IN')} (+${s.returnPct}% Net Return) on the Mega Bull Simulated Trading Platform.`
    },
    risk: {
      title: 'CERTIFICATE OF PRUDENT RISK MANAGEMENT',
      subtitle: 'Awarded for Exemplary Capital Preservation & Highest Sharpe Ratio',
      citation: (s) => `This certificate is proudly awarded to ${s.name} (${s.rollNo}), ${s.batch}, for demonstrating superior risk-adjusted portfolio performance, achieving a Sharpe Ratio of ${s.sharpeRatio} with a low drawdown of ${s.maxDrawdown}% while strictly adhering to institutional risk parameters.`
    },
    participation: {
      title: 'CERTIFICATE OF ACTIVE PARTICIPATION',
      subtitle: 'Investor\'s Club Simulated Trading Challenge',
      citation: (s) => `This certificate is presented to ${s.name} (${s.rollNo}), ${s.batch}, for active participation, analytical commitment, and completion of all trading milestones in the School of Management Investor\'s Club Trading Challenge.`
    }
  };

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
    showToast('🎉 Celebratory honors launched for ' + (currentStudent?.name || 'Participant') + '!', 'success');
  };

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
        borderLeft: '4px solid #d97706'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Awards, Wall of Fame & Certificate Studio
            </h2>
            <span className="badge badge-amber" style={{ fontSize: '11px', fontWeight: '700' }}>
              Honors & Recognition
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Official digital recognition and verifiable merit certificates issued by the School of Management.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleTriggerConfetti}
            style={{
              backgroundColor: '#fffbeb',
              color: '#d97706',
              border: '1px solid #fde68a',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={15} />
            <span>Celebrate Honors</span>
          </button>
        </div>
      </div>

      {/* Wall of Fame Deck */}
      <div className="no-print" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {/* Honor 1: Mega Bull Champion */}
        <div className="card-surface" style={{
          padding: '20px',
          backgroundColor: '#fffbeb',
          border: '1px solid #fef3c7',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge badge-amber" style={{ fontSize: '11px', fontWeight: '800' }}>
                🥇 MTM LEADER (GOLD)
              </span>
              <Trophy size={28} color="#d97706" />
            </div>
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#92400e' }}>
                {students[0]?.name || 'Manish'}
              </h3>
              <div style={{ fontSize: '12px', color: '#b45309', fontWeight: '600' }}>
                {students[0]?.rollNo} • {students[0]?.batch}
              </div>
              <div className="mono-num" style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginTop: '6px' }}>
                ₹{students[0]?.portfolioValue.toLocaleString('en-IN')}
              </div>
              <span className="badge badge-profit" style={{ marginTop: '4px' }}>
                +{students[0]?.returnPct}% Net Return
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentStudent(students[0]);
              setCertType('rank1');
            }}
            style={{
              marginTop: '16px',
              backgroundColor: '#d97706',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              width: '100%'
            }}
          >
            Generate Leader Certificate
          </button>
        </div>

        {/* Honor 2: Top Runner-Up */}
        <div className="card-surface" style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge badge-neutral" style={{ fontSize: '11px', fontWeight: '800' }}>
                🥈 TOP RUNNER-UP
              </span>
              <Medal size={28} color="#64748b" />
            </div>
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                {students[1]?.name || 'Muntazir'}
              </h3>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                {students[1]?.rollNo} • {students[1]?.batch}
              </div>
              <div className="mono-num" style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginTop: '6px' }}>
                ₹{students[1]?.portfolioValue.toLocaleString('en-IN')}
              </div>
              <span className="badge badge-profit" style={{ marginTop: '4px' }}>
                +{students[1]?.returnPct}% Net Return
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentStudent(students[1]);
              setCertType('rank1');
            }}
            style={{
              marginTop: '16px',
              backgroundColor: '#475569',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              width: '100%'
            }}
          >
            Generate Runner-Up Certificate
          </button>
        </div>

        {/* Honor 3: Risk Management Champion */}
        <div className="card-surface" style={{
          padding: '20px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge badge-profit" style={{ fontSize: '11px', fontWeight: '800' }}>
                🛡️ RISK DISCIPLINE CHAMPION
              </span>
              <Star size={28} color="#16a34a" />
            </div>
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#166534' }}>
                {students[2]?.name || 'Tahir N'}
              </h3>
              <div style={{ fontSize: '12px', color: '#15803d', fontWeight: '600' }}>
                {students[2]?.rollNo} • {students[2]?.batch}
              </div>
              <div className="mono-num" style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>
                Sharpe Ratio: {students[2]?.sharpeRatio || '2.45'}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                Exemplary Risk Control & Low Drawdown
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentStudent(students[2]);
              setCertType('risk');
            }}
            style={{
              marginTop: '16px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              width: '100%'
            }}
          >
            Generate Risk Certificate
          </button>
        </div>
      </div>

      {/* Certificate Controls & Live Previewer */}
      <div className="card-surface no-print" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
              Official High-Resolution Certificate Studio
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Select participant and award category to render and print official verifiable certificates.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Controls Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
              Select Award Recipient:
            </label>
            <select
              value={currentStudent ? currentStudent.id : ''}
              onChange={(e) => {
                const s = students.find(st => st.id === e.target.value);
                setCurrentStudent(s);
              }}
              style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo}) — Rank #{s.rank} (+{s.returnPct}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
              Award Category:
            </label>
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}
            >
              <option value="rank1">Certificate of Merit (Rank 1 / High Return)</option>
              <option value="risk">Certificate of Prudent Risk Management</option>
              <option value="participation">Certificate of Active Participation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Certificate Canvas (High Resolution Printable) */}
      <div className="cert-scroll-wrapper">
        <div className="printable-certificate" style={{
          backgroundColor: '#ffffff',
          border: '12px solid #002147',
          outline: '3px solid #c5a059',
          borderRadius: '6px',
          padding: '44px 36px',
          margin: '0 auto',
          maxWidth: '920px',
          minWidth: '640px',
          width: '100%',
          boxShadow: '0 10px 25px rgba(0, 33, 71, 0.1)',
          position: 'relative',
          textAlign: 'center'
        }}>
        
        {/* Watermark Background Shield */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.035,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <Award size={460} color="#002147" />
        </div>

        {/* Certificate Content Container */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          
          {/* Institutional Header with Dual Logos */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <img
              src="https://mietjmu.in/wp-content/uploads/2025/02/miet-logo-dark.png"
              alt="MIET Jammu Logo"
              style={{
                height: '74px',
                width: 'auto',
                maxWidth: '240px',
                objectFit: 'contain'
              }}
            />

            <div style={{ textAlign: 'center', padding: '0 14px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#002147', letterSpacing: '0.04em', margin: 0 }}>
                SCHOOL OF MANAGEMENT
              </h1>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>
                Investor's Club Trading Challenge
              </div>
            </div>

            <img
              src="https://mietjmu.in/wp-content/uploads/2026/08/investors_club_logo_light_bg-scaled.png"
              alt="Investor's Club Official Logo"
              style={{
                height: '76px',
                width: 'auto',
                maxWidth: '240px',
                objectFit: 'contain'
              }}
            />
          </div>

          <div style={{ width: '180px', height: '2px', backgroundColor: '#c5a059', margin: '12px auto 18px auto' }} />

          {/* Certificate Award Title */}
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#b45309', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {certConfig[certType].subtitle}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.03em', margin: '8px 0 20px 0' }}>
            {certConfig[certType].title}
          </h2>

          {/* Student Recipient Name */}
          <div style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
            This is proudly conferred upon
          </div>

          <div style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#1e3a8a',
            margin: '8px 0',
            fontFamily: 'var(--font-heading)',
            textDecoration: 'underline',
            textDecorationColor: '#d97706',
            textUnderlineOffset: '6px'
          }}>
            {currentStudent ? currentStudent.name : 'Manish'}
          </div>

          <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '18px' }}>
            Roll No: {currentStudent?.rollNo} • {currentStudent?.batch} • {currentStudent?.section}
          </div>

          {/* Citation Body */}
          <p style={{
            maxWidth: '750px',
            margin: '0 auto 30px auto',
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#475569'
          }}>
            {currentStudent && certConfig[certType].citation(currentStudent)}
          </p>

          {/* Signatures & Seal Section */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            maxWidth: '760px',
            margin: '30px auto 0 auto',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0'
          }}>
            {/* Signature 1 */}
            <div style={{ textAlign: 'center', width: '220px' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '18px', color: '#1e3a8a', marginBottom: '4px' }}>
                Investor's Club
              </div>
              <div style={{ width: '140px', height: '1px', backgroundColor: '#334155', margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#002147' }}>Investor's Club Coordinator</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>School of Management, MIET</div>
            </div>

            {/* Official Seal Emblem */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                border: '3px dashed #c5a059',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#9a762f'
              }}>
                <Trophy size={20} color="#c5a059" />
                <span style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px', color: '#002147' }}>MIET JAMMU</span>
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>
                REF: MIET-SOM-IC-2026
              </div>
            </div>

            {/* Signature 2 */}
            <div style={{ textAlign: 'center', width: '220px' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '20px', color: '#002147', marginBottom: '4px' }}>
                Dean & Director
              </div>
              <div style={{ width: '140px', height: '1px', backgroundColor: '#002147', margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#002147' }}>Dean & Director</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>School of Management, MIET</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);
};
