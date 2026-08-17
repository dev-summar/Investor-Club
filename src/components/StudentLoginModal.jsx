// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Participant Login & Mega Bull API Authentication Modal (4 Designated Participants)
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  Key,
  CheckCircle2,
  Shield,
  Zap,
  User,
  ArrowRight,
  RefreshCw,
  X,
  Lock,
  Copy,
  Check
} from 'lucide-react';

export const StudentLoginModal = ({ isOpen, onClose }) => {
  const {
    students,
    activeStudentLogin,
    setActiveStudentLogin,
    syncUserApi,
    updateStudentApiKey,
    setUserRole,
    showToast
  } = useDashboard();

  const [selectedStudentId, setSelectedStudentId] = useState(activeStudentLogin || 'PART-01');
  const [isValidating, setIsValidating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleCopyKey = (keyText) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(true);
    showToast('📋 Copied API Key to clipboard', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleLoginAndSync = (e) => {
    e.preventDefault();
    setIsValidating(true);
    setTimeout(() => {
      syncUserApi(selectedStudentId);
      setActiveStudentLogin(selectedStudentId);
      setUserRole('student');
      setIsValidating(false);
      showToast(`🟢 Authenticated & Synced ${currentStudent.name}'s Mega Bull Terminal!`, 'success');
      onClose();
    }, 700);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px'
    }}>
      <div className="card-surface" style={{
        width: '100%',
        maxWidth: '620px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Key size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff' }}>
                Mega Bull Participant API Authentication
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                School of Management Trading Challenge Terminal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleLoginAndSync} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Select Active Participant:
            </label>

            {/* 4 Participant Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {students.map(s => {
                const isSelected = selectedStudentId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: `2px solid ${isSelected ? '#0284c7' : '#e2e8f0'}`,
                      backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>
                        {s.name}
                      </span>
                      <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                        {s.rollNo}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      {s.batch}
                    </div>

                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Key size={11} color="#0284c7" />
                      <code style={{ fontSize: '10px', color: '#0369a1', fontWeight: '700' }}>
                        {s.apiKey.substring(0, 8)}...
                      </code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Key Details Card */}
          <div style={{
            padding: '14px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>
                Mega Bull Assigned API Key:
              </span>
              <span className="badge badge-profit" style={{ fontSize: '10px' }}>
                🟢 Verified & Active
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <code style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                {currentStudent.apiKey}
              </code>
              <button
                type="button"
                onClick={() => handleCopyKey(currentStudent.apiKey)}
                style={{ color: copiedKey ? '#059669' : '#64748b', padding: '2px 4px' }}
                title="Copy Key"
              >
                {copiedKey ? <Check size={14} color="#059669" /> : <Copy size={14} />}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
              <span>Initial Capital: ₹5,00,000</span>
              <span>Current MTM: ₹{currentStudent.portfolioValue.toLocaleString('en-IN')} (+{currentStudent.returnPct}%)</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '700' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isValidating}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
              }}
            >
              {isValidating ? (
                <>
                  <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Syncing Mega Bull API...</span>
                </>
              ) : (
                <>
                  <Zap size={15} />
                  <span>Connect & Sync {currentStudent.name}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
