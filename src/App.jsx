// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Main Application Container & Tab Router with API Login Gateway
// ============================================================================

import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Navbar } from './components/Navbar';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { WeeklyLeaderboard } from './components/WeeklyLeaderboard';
import { MegaBullSyncGateway } from './components/MegaBullSyncGateway';
import { PedagogyAnalytics } from './components/PedagogyAnalytics';
import { AwardsAndCertificates } from './components/AwardsAndCertificates';
import { FacultyAdminPanel } from './components/FacultyAdminPanel';
import { StudentPortfolioModal } from './components/StudentPortfolioModal';
import { StudentLoginModal } from './components/StudentLoginModal';
import { KioskWallDisplay } from './components/KioskWallDisplay';

const DashboardContent = () => {
  const {
    activeTab,
    userRole,
    selectedStudentId,
    isStudentLoginModalOpen,
    setStudentLoginModalOpen
  } = useDashboard();

  // If Kiosk / TV mode is activated
  if (userRole === 'kiosk') {
    return <KioskWallDisplay />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
      {/* Institutional Navbar */}
      <Navbar />

      {/* Main Tab Content View */}
      <main style={{ flex: 1 }}>
        {activeTab === 'overview' && <ExecutiveSummary />}
        {activeTab === 'leaderboard' && <WeeklyLeaderboard />}
        {activeTab === 'megabull-gateway' && <MegaBullSyncGateway />}
        {activeTab === 'pedagogy-analytics' && <PedagogyAnalytics />}
        {activeTab === 'awards-certificates' && <AwardsAndCertificates />}
        {activeTab === 'faculty-admin' && <FacultyAdminPanel />}
      </main>

      {/* Student Portfolio Inspector Modal */}
      {selectedStudentId && <StudentPortfolioModal />}

      {/* Mega Bull Participant Login & API Key Gateway Modal */}
      <StudentLoginModal
        isOpen={isStudentLoginModalOpen}
        onClose={() => setStudentLoginModalOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="no-print" style={{
        backgroundColor: '#ffffff',
        color: '#64748b',
        borderTop: '1px solid #e2e8f0',
        padding: '24px',
        fontSize: '12px'
      }}>
        <div style={{
          maxWidth: '1540px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <img
              src="https://mietjmu.in/wp-content/uploads/2025/02/miet-logo-dark.png"
              alt="MIET Jammu"
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ height: '36px', width: '1.5px', backgroundColor: '#cbd5e1' }} />
            <img
              src="https://mietjmu.in/wp-content/uploads/2026/08/investors_club_logo_light_bg-scaled.png"
              alt="Investor's Club"
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontWeight: '800', color: '#002147', fontSize: '13.5px' }}>
                MODEL INSTITUTE OF ENGINEERING & TECHNOLOGY (MIET JAMMU)
              </div>
              <div style={{ marginTop: '1px', color: '#64748b', fontSize: '11.5px' }}>
                School of Management • Investor's Club Simulated Trading Challenge Dashboard
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11.5px', color: '#64748b' }}>
            <span>₹5,00,000 Virtual Baseline</span>
            <span>•</span>
            <span>Mark-to-Market Settlement</span>
            <span>•</span>
            <span style={{ color: '#002147', fontWeight: '700' }}>Internal System</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default App;
