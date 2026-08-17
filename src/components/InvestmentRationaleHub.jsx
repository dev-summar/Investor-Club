// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Investment Rationale & Academic Documentation Hub
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Filter,
  PlusCircle,
  Send,
  Star,
  FileText,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Search,
  UserCheck
} from 'lucide-react';

export const InvestmentRationaleHub = () => {
  const {
    theses,
    students,
    scrips,
    gradeThesis,
    submitNewThesis,
    userRole,
    activeStudentLogin
  } = useDashboard();

  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'evaluated', 'exemplary'
  const [selectedThesisForGrading, setSelectedThesisForGrading] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Grading form state
  const [gradingForm, setGradingForm] = useState({
    researchDepth: 5,
    riskDiscipline: 5,
    valuationRigor: 5,
    evaluatorName: 'Dr. A. K. Sharma (Prof. of Finance)',
    feedback: 'Well-structured thesis with rigorous cash flow projections and clear catalyst identification.'
  });

  // Submission form state
  const [newThesisForm, setNewThesisForm] = useState({
    studentId: students[0]?.id || 'SOM-MBA-2501',
    symbol: 'RELIANCE',
    title: '',
    type: 'Fundamental Valuation & DCF',
    action: 'BUY',
    targetPrice: 3250,
    stopLoss: 2840,
    horizon: '8 Weeks',
    researchNote: '',
    riskMitigation: ''
  });

  // Filtered Theses
  const filteredTheses = theses.filter(t => {
    const matchesStatus = filterStatus === 'all'
      ? true
      : filterStatus === 'pending'
      ? t.status === 'Pending Review'
      : filterStatus === 'exemplary'
      ? t.status === 'Approved & Exemplary'
      : t.status !== 'Pending Review';

    const matchesSearch = searchQuery === '' ||
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.rollNo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const pendingCount = theses.filter(t => t.status === 'Pending Review').length;
  const exemplaryCount = theses.filter(t => t.status === 'Approved & Exemplary').length;
  const totalCount = theses.length;

  const handleOpenGrading = (thesis) => {
    setSelectedThesisForGrading(thesis);
    if (thesis.facultyScore) {
      setGradingForm({
        researchDepth: thesis.facultyScore.researchDepth,
        riskDiscipline: thesis.facultyScore.riskDiscipline,
        valuationRigor: thesis.facultyScore.valuationRigor,
        evaluatorName: thesis.facultyScore.evaluator,
        feedback: thesis.facultyScore.feedback
      });
    } else {
      setGradingForm({
        researchDepth: 4,
        riskDiscipline: 4,
        valuationRigor: 4,
        evaluatorName: 'Faculty Coordinator - Investor\'s Club',
        feedback: 'Good fundamental research. Recommend tightening stop-loss parameter and tracking earnings call commentary.'
      });
    }
  };

  const handleSaveGrading = (e) => {
    e.preventDefault();
    if (!selectedThesisForGrading) return;
    gradeThesis(selectedThesisForGrading.id, gradingForm);
    setSelectedThesisForGrading(null);
  };

  const handleSubmitNewThesis = (e) => {
    e.preventDefault();
    if (!newThesisForm.title || !newThesisForm.researchNote) {
      alert('Please fill out the Thesis Title and Research Note before submitting.');
      return;
    }
    submitNewThesis(newThesisForm);
    setIsSubmitModalOpen(false);
    setNewThesisForm({
      studentId: students[0]?.id || 'SOM-MBA-2501',
      symbol: 'RELIANCE',
      title: '',
      type: 'Fundamental Valuation & DCF',
      action: 'BUY',
      targetPrice: 3250,
      stopLoss: 2840,
      horizon: '8 Weeks',
      researchNote: '',
      riskMitigation: ''
    });
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="card-surface" style={{
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #7c3aed'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Investment Rationale & Documentation Hub
            </h2>
            <span className="badge badge-purple" style={{ fontSize: '11px', fontWeight: '700' }}>
              Academic Pedagogy Core
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Mandatory trading justification repository. Every Mega Bull simulated execution is evaluated against faculty research rubrics.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            style={{
              backgroundColor: '#7c3aed',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
            }}
          >
            <PlusCircle size={15} />
            <span>Submit Trade Rationale</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: Submissions & Evaluation Progress */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="card-surface" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="#7c3aed" />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Theses</span>
            <div className="mono-num" style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              {totalCount} Logged
            </div>
          </div>
        </div>

        <div className="card-surface" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} color="#d97706" />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Pending Review</span>
            <div className="mono-num" style={{ fontSize: '20px', fontWeight: '800', color: '#d97706' }}>
              {pendingCount} Awaiting
            </div>
          </div>
        </div>

        <div className="card-surface" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={20} color="#059669" />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Exemplary Theses</span>
            <div className="mono-num" style={{ fontSize: '20px', fontWeight: '800', color: '#059669' }}>
              {exemplaryCount} Hall of Fame
            </div>
          </div>
        </div>

        <div className="card-surface" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={20} color="#0284c7" />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Avg Rubric Score</span>
            <div className="mono-num" style={{ fontSize: '20px', fontWeight: '800', color: '#0284c7' }}>
              9.2 / 10.0
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="card-surface" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterStatus('all')}
            style={{
              backgroundColor: filterStatus === 'all' ? '#7c3aed' : '#f8fafc',
              color: filterStatus === 'all' ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            All Submissions ({totalCount})
          </button>

          <button
            onClick={() => setFilterStatus('pending')}
            style={{
              backgroundColor: filterStatus === 'pending' ? '#d97706' : '#f8fafc',
              color: filterStatus === 'pending' ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Clock size={12} />
            <span>Pending Review ({pendingCount})</span>
          </button>

          <button
            onClick={() => setFilterStatus('exemplary')}
            style={{
              backgroundColor: filterStatus === 'exemplary' ? '#059669' : '#f8fafc',
              color: filterStatus === 'exemplary' ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Star size={12} />
            <span>Exemplary Showcase ({exemplaryCount})</span>
          </button>

          <button
            onClick={() => setFilterStatus('evaluated')}
            style={{
              backgroundColor: filterStatus === 'evaluated' ? '#0284c7' : '#f8fafc',
              color: filterStatus === 'evaluated' ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            Evaluated
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search theses by student, scrip, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '6px 10px 6px 30px', fontSize: '12px', width: '260px' }}
          />
        </div>
      </div>

      {/* Theses Dossier Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {filteredTheses.map(thesis => {
          const isPending = thesis.status === 'Pending Review';
          const isExemplary = thesis.status === 'Approved & Exemplary';

          return (
            <div
              key={thesis.id}
              className="card-surface"
              style={{
                padding: '22px',
                borderLeft: `5px solid ${isExemplary ? '#10b981' : isPending ? '#f59e0b' : '#0284c7'}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                {/* Header Tag Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-neutral" style={{ fontWeight: '800', fontSize: '12px' }}>
                      {thesis.symbol}
                    </span>
                    <span className={`badge ${thesis.action === 'BUY' ? 'badge-profit' : 'badge-loss'}`} style={{ fontWeight: '700' }}>
                      {thesis.action}
                    </span>
                    <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px' }}>
                      {thesis.type}
                    </span>
                  </div>

                  <span className={`badge ${isExemplary ? 'badge-profit' : isPending ? 'badge-amber' : 'badge-neutral'}`} style={{ fontWeight: '700' }}>
                    {isExemplary ? '⭐ Exemplary' : thesis.status}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', lineHeight: '1.35' }}>
                  {thesis.title}
                </h3>

                {/* Author Info */}
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Submitted by <strong>{thesis.studentName}</strong> ({thesis.rollNo})</span>
                  <span>•</span>
                  <span>{thesis.submittedAt}</span>
                </div>

                {/* Price Targets */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                  backgroundColor: '#f8fafc',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  margin: '12px 0',
                  fontSize: '12px'
                }}>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Target Price:</span>
                    <div className="mono-num" style={{ fontWeight: '800', color: '#059669' }}>
                      ₹{thesis.targetPrice}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Stop-Loss:</span>
                    <div className="mono-num" style={{ fontWeight: '800', color: '#dc2626' }}>
                      ₹{thesis.stopLoss}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Time Horizon:</span>
                    <div style={{ fontWeight: '700', color: '#334155' }}>
                      {thesis.horizon}
                    </div>
                  </div>
                </div>

                {/* Research Note Snippet */}
                <div style={{
                  fontSize: '12px',
                  color: '#334155',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-line',
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  maxHeight: '180px',
                  overflowY: 'auto'
                }}>
                  {thesis.researchNote}
                </div>

                {/* Risk Mitigation Strategy */}
                {thesis.riskMitigation && (
                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <ShieldCheck size={14} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Risk Management Plan:</strong> {thesis.riskMitigation}</span>
                  </div>
                )}
              </div>

              {/* Faculty Evaluation Score Card or Grade Button */}
              <div>
                {thesis.facultyScore ? (
                  <div style={{
                    padding: '12px',
                    backgroundColor: isExemplary ? '#ecfdf5' : '#eff6ff',
                    border: `1px solid ${isExemplary ? '#a7f3d0' : '#bfdbfe'}`,
                    borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Award size={16} color={isExemplary ? '#059669' : '#1e40af'} />
                        <span style={{ fontWeight: '800', color: isExemplary ? '#065f46' : '#1e3a8a' }}>
                          Rubric Score: {thesis.facultyScore.normalized} / 10 ({thesis.facultyScore.total}/15)
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {thesis.facultyScore.evaluatedAt}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: '#334155', marginTop: '6px', fontStyle: 'italic', lineHeight: '1.4' }}>
                      "{thesis.facultyScore.feedback}"
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '11px', color: '#64748b' }}>
                      <span>Evaluator: <strong>{thesis.facultyScore.evaluator}</strong></span>
                      <button
                        onClick={() => handleOpenGrading(thesis)}
                        style={{ color: '#0284c7', fontWeight: '700', fontSize: '11px' }}
                      >
                        Re-evaluate / Edit Rubric
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fffbeb', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fde68a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#b45309', fontWeight: '600' }}>
                      <Clock size={14} />
                      <span>Awaiting Faculty Coordinator Review</span>
                    </div>
                    <button
                      onClick={() => handleOpenGrading(thesis)}
                      style={{
                        backgroundColor: '#d97706',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckCircle size={13} />
                      <span>Grade Thesis</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal 1: Faculty Rubric Grading Drawer */}
      {selectedThesisForGrading && (
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
            maxWidth: '650px',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
              Faculty Rubric Evaluation Panel
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '18px' }}>
              Evaluating thesis for <strong>{selectedThesisForGrading.symbol}</strong> submitted by {selectedThesisForGrading.studentName} ({selectedThesisForGrading.rollNo})
            </p>

            <form onSubmit={handleSaveGrading} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Criterion 1: Research Depth */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <label style={{ fontWeight: '700', color: '#334155' }}>
                    1. Research Depth & Industry Rigor (1 to 5):
                  </label>
                  <span className="mono-num" style={{ fontWeight: '800', color: '#0284c7' }}>{gradingForm.researchDepth} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={gradingForm.researchDepth}
                  onChange={(e) => setGradingForm({ ...gradingForm, researchDepth: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Criterion 2: Risk Management Discipline */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <label style={{ fontWeight: '700', color: '#334155' }}>
                    2. Risk Management & Stop-Loss Discipline (1 to 5):
                  </label>
                  <span className="mono-num" style={{ fontWeight: '800', color: '#0284c7' }}>{gradingForm.riskDiscipline} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={gradingForm.riskDiscipline}
                  onChange={(e) => setGradingForm({ ...gradingForm, riskDiscipline: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Criterion 3: Valuation Modeling */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <label style={{ fontWeight: '700', color: '#334155' }}>
                    3. Valuation Logic & Financial Modeling (1 to 5):
                  </label>
                  <span className="mono-num" style={{ fontWeight: '800', color: '#0284c7' }}>{gradingForm.valuationRigor} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={gradingForm.valuationRigor}
                  onChange={(e) => setGradingForm({ ...gradingForm, valuationRigor: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Computed Score Pill */}
              <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#166534' }}>
                  Normalized Academic Score:
                </span>
                <span className="mono-num" style={{ fontSize: '16px', fontWeight: '800', color: '#15803d' }}>
                  {Math.round(((gradingForm.researchDepth + gradingForm.riskDiscipline + gradingForm.valuationRigor) / 15) * 100) / 10} / 10.0
                </span>
              </div>

              {/* Evaluator Comments */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Faculty Feedback / Coaching Comments:
                </label>
                <textarea
                  rows="3"
                  value={gradingForm.feedback}
                  onChange={(e) => setGradingForm({ ...gradingForm, feedback: e.target.value })}
                  style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedThesisForGrading(null)}
                  style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '8px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                >
                  Save & Record Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Submit New Trade Rationale */}
      {isSubmitModalOpen && (
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
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
              Submit Trade Investment Rationale
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '18px' }}>
              Academic requirement: Document the investment thesis, valuation drivers, and stop-loss logic for your Mega Bull trade.
            </p>

            <form onSubmit={handleSubmitNewThesis} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Student Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Student Author:
                </label>
                <select
                  value={newThesisForm.studentId}
                  onChange={(e) => setNewThesisForm({ ...newThesisForm, studentId: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12px' }}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNo}) - {s.batch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scrip + Direction + Type */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Equity Scrip:
                  </label>
                  <select
                    value={newThesisForm.symbol}
                    onChange={(e) => setNewThesisForm({ ...newThesisForm, symbol: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12px' }}
                  >
                    {scrips.map(s => (
                      <option key={s.symbol} value={s.symbol}>
                        {s.symbol} (₹{s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Direction:
                  </label>
                  <select
                    value={newThesisForm.action}
                    onChange={(e) => setNewThesisForm({ ...newThesisForm, action: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12px' }}
                  >
                    <option value="BUY">BUY (Long)</option>
                    <option value="SELL">SELL (Short/Exit)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Analysis Framework:
                  </label>
                  <select
                    value={newThesisForm.type}
                    onChange={(e) => setNewThesisForm({ ...newThesisForm, type: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12px' }}
                  >
                    <option value="Fundamental Valuation & DCF">Fundamental & DCF</option>
                    <option value="Quantitative Momentum">Quant Momentum</option>
                    <option value="Technical Breakout">Technical Breakout</option>
                    <option value="Macro Sectoral Tailwind">Macro Tailwind</option>
                    <option value="ESG & Special Situation">ESG Theme</option>
                  </select>
                </div>
              </div>

              {/* Thesis Title */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Thesis Headline / Catalyst Summary:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Reliance: ARPU Expansion & Solar Giga-factory Commissioning"
                  value={newThesisForm.title}
                  onChange={(e) => setNewThesisForm({ ...newThesisForm, title: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12px' }}
                  required
                />
              </div>

              {/* Targets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Target Price (₹):
                  </label>
                  <input
                    type="number"
                    value={newThesisForm.targetPrice}
                    onChange={(e) => setNewThesisForm({ ...newThesisForm, targetPrice: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Mandatory Stop-Loss (₹):
                  </label>
                  <input
                    type="number"
                    value={newThesisForm.stopLoss}
                    onChange={(e) => setNewThesisForm({ ...newThesisForm, stopLoss: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                    Time Horizon:
                  </label>
                  <select
                    value={newThesisForm.horizon}
                    onChange={(e) => setNewThesisForm({ ...newThesisForm, horizon: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '12px' }}
                  >
                    <option value="2-4 Weeks">2-4 Weeks (Swing)</option>
                    <option value="6-8 Weeks">6-8 Weeks (Medium)</option>
                    <option value="12+ Weeks">12+ Weeks (Long Term)</option>
                  </select>
                </div>
              </div>

              {/* Research Note */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Detailed Investment Justification & Valuation Logic:
                </label>
                <textarea
                  rows="4"
                  placeholder="Outline key financial drivers, DCF assumptions, EPS growth triggers, or technical indicator confirmations..."
                  value={newThesisForm.researchNote}
                  onChange={(e) => setNewThesisForm({ ...newThesisForm, researchNote: e.target.value })}
                  style={{ width: '100%', padding: '10px', fontSize: '12px' }}
                  required
                />
              </div>

              {/* Risk Mitigation */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  Downside Risk & Position Sizing Plan:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Risk of input cost inflation monitored; position restricted to 15% of virtual capital."
                  value={newThesisForm.riskMitigation}
                  onChange={(e) => setNewThesisForm({ ...newThesisForm, riskMitigation: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12px' }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#7c3aed', color: '#ffffff', padding: '8px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                >
                  Submit for Faculty Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
