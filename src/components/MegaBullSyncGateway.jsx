// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING CHALLENGE
// Mega Bull Live HTTP API Gateway & Network Inspector
// ============================================================================

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import {
  Activity,
  RefreshCw,
  Server,
  Zap,
  Clock,
  Terminal,
  Download,
  Key,
  Copy,
  Check,
  Edit2,
  Code2,
  CheckCircle2,
  Users,
  Globe,
  Settings,
  AlertCircle,
  Radio
} from 'lucide-react';

export const MegaBullSyncGateway = () => {
  const {
    students,
    apiLeads,
    gatewayLogs,
    megaBullApiBaseUrl,
    setMegaBullApiBaseUrl,
    lastLiveApiResult,
    fetchLinkedStudentsForLead,
    syncUserApi,
    syncAllUserApis,
    updateStudentApiKey,
    isSyncing,
    showToast,
    setSelectedStudentId
  } = useDashboard();

  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [inspectLead, setInspectLead] = useState(null);
  const [isEditingServerUrl, setIsEditingServerUrl] = useState(false);
  const [serverUrlInput, setServerUrlInput] = useState(megaBullApiBaseUrl);

  const handleCopyKey = (keyText, id) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKeyId(id);
    showToast(`📋 Copied API Key to clipboard: ${keyText.substring(0, 8)}...`, 'info');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleSaveServerUrl = () => {
    if (!serverUrlInput.trim()) return;
    setMegaBullApiBaseUrl(serverUrlInput.trim());
    setIsEditingServerUrl(false);
    showToast(`✅ Mega Bull API Server URL updated to: ${serverUrlInput.trim()}`, 'success');
  };

  const downloadSampleTemplate = () => {
    const sampleCsv = `LinkedLead,APIKey,StudentName,RollNo,Symbol,OrderType,Quantity,ExecutionPrice,Timestamp\nManish,02c06a7d-c2f3-4b9f-aba4-4bad3086c54d,Manish,25MBA008,RELIANCE,BUY,45,2840.00,2026-08-15 11:10:05\nManish,02c06a7d-c2f3-4b9f-aba4-4bad3086c54d,Aarav Singhania,25MBA014,TATAMOTORS,BUY,130,920.00,2026-08-15 10:15:00\nMuntazir,ed493654-1b99-4a50-a2dc-d956b1e742e6,Muntazir,25MBA022,M&M,BUY,45,2540.00,2026-08-14 15:05:00\nTahir N,c7eb7188-b8df-43bb-8353-3a135a480fac,Tahir N,25MBA041,LT,BUY,32,3340.00,2026-08-13 10:45:00\nTahir Fazal,c7eb7188-b8df-43bb-8353-3a135a480fac,Tahir Fazal,24BBA065,TCS,BUY,30,3990.00,2026-08-11 12:30:00\n`;
    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MegaBull_Live_HTTP_Statement_Template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Downloaded Statement Template', 'info');
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="card-surface" style={{
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: '#ffffff',
        borderLeft: '4px solid #0284c7'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Mega Bull Live HTTP API Gateway & Network Inspector
            </h2>
            <span className="badge badge-profit" style={{ fontSize: '11px', fontWeight: '700' }}>
              🟢 Real HTTP Client Active
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            Dispatches actual live browser <code>fetch()</code> network requests to the Mega Bull platform using your API keys.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={syncAllUserApis}
            disabled={isSyncing}
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
            <RefreshCw size={15} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isSyncing ? 'Dispatching HTTP Requests...' : 'Dispatch Live HTTP API Batch Sync'}</span>
          </button>
        </div>
      </div>

      {/* Real Live HTTP Server Configuration Card */}
      <div className="card-surface" style={{
        padding: '18px 22px',
        backgroundColor: '#f8fafc',
        border: '1px solid #cbd5e1',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                Mega Bull Target Server URL & Network Connection
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Actual HTTP requests (with <code>X-API-KEY</code> & <code>Authorization: Bearer</code>) are sent here
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditingServerUrl ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  value={serverUrlInput}
                  onChange={(e) => setServerUrlInput(e.target.value)}
                  placeholder="https://your-megabull-server.com"
                  style={{ padding: '6px 12px', fontSize: '12px', width: '280px', fontFamily: 'var(--font-mono)' }}
                />
                <button
                  onClick={handleSaveServerUrl}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}
                >
                  Save URL
                </button>
                <button
                  onClick={() => setIsEditingServerUrl(false)}
                  style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '6px', fontSize: '12px' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <code style={{
                  backgroundColor: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#0f172a',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {megaBullApiBaseUrl}
                </code>
                <button
                  onClick={() => {
                    setIsEditingServerUrl(true);
                    setServerUrlInput(megaBullApiBaseUrl);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#0284c7',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Edit2 size={12} />
                  <span>Edit URL</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Network Diagnostic Box */}
        {lastLiveApiResult && (
          <div style={{
            padding: '12px 14px',
            backgroundColor: lastLiveApiResult.isRealNetworkSuccess ? '#ecfdf5' : '#eff6ff',
            borderRadius: '8px',
            border: `1px solid ${lastLiveApiResult.isRealNetworkSuccess ? '#a7f3d0' : '#bfdbfe'}`,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={15} color={lastLiveApiResult.isRealNetworkSuccess ? '#059669' : '#0284c7'} />
              <div>
                <strong>Latest HTTP Call:</strong> <code>{lastLiveApiResult.method} {lastLiveApiResult.url}</code>
                <span style={{ marginLeft: '8px', color: '#64748b' }}>({lastLiveApiResult.durationMs}ms response time)</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge ${lastLiveApiResult.isRealNetworkSuccess ? 'badge-profit' : 'badge-neutral'}`} style={{ fontSize: '11px' }}>
                {lastLiveApiResult.statusText || 'HTTP Attempted'}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Check DevTools (F12 Network Tab)</span>
            </div>
          </div>
        )}
      </div>

      {/* 4 Primary API Leads & Fetch Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {apiLeads.map(lead => {
          const isCopied = copiedKeyId === lead.id;
          const linkedMembers = students.filter(s => s.linkedLeadName === lead.leadName || s.leadApiKey === lead.apiKey);

          return (
            <div
              key={lead.id}
              className="card-surface"
              style={{
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                borderTop: '4px solid #0284c7'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{lead.leadName}</span>
                      <span className="badge badge-amber" style={{ fontSize: '10px' }}>Lead</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {lead.cohort}
                    </div>
                  </div>

                  <span className="badge badge-profit" style={{ fontSize: '10px' }}>
                    {linkedMembers.length} Linked Students
                  </span>
                </div>

                {/* API Key Box */}
                <div style={{
                  marginTop: '10px',
                  padding: '8px 10px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ overflow: 'hidden' }}>
                    <span style={{ fontSize: '9px', color: '#64748b', display: 'block', fontWeight: '700' }}>MEGA BULL API KEY:</span>
                    <code style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', fontFamily: 'var(--font-mono)' }}>
                      {lead.apiKey}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopyKey(lead.apiKey, lead.id)}
                    style={{ color: isCopied ? '#059669' : '#64748b', padding: '2px 4px' }}
                    title="Copy Key"
                  >
                    {isCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Linked Members Preview */}
              <div style={{ fontSize: '11px', color: '#475569', backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '6px' }}>
                <span style={{ fontWeight: '700' }}>Linked Portfolios:</span>{' '}
                {linkedMembers.map(m => m.name).join(', ')}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => fetchLinkedStudentsForLead(lead.apiKey, lead.leadName)}
                  disabled={isSyncing}
                  style={{
                    flex: 1,
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                  title={`Query Mega Bull API to fetch all students linked to ${lead.leadName}`}
                >
                  <RefreshCw size={12} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
                  <span>Fetch Linked via HTTP</span>
                </button>

                <button
                  onClick={() => setInspectLead(lead)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                  title="Inspect JSON API Payload"
                >
                  <Code2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* All Linked Students Table */}
      <div className="card-surface" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                Participant Portfolios Synchronized via HTTP ({students.length})
              </h3>
              <span className="badge badge-profit" style={{ fontSize: '11px' }}>
                Live HTTP Client
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Portfolios synchronized with <code>{megaBullApiBaseUrl}</code>
            </p>
          </div>

          <button
            onClick={downloadSampleTemplate}
            style={{
              fontSize: '11px',
              color: '#0284c7',
              border: '1px solid #bae6fd',
              backgroundColor: '#f0f9ff',
              padding: '6px 10px',
              borderRadius: '6px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Download size={12} />
            <span>Download CSV Template</span>
          </button>
        </div>

        <div className="table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Participant Name & Roll No</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Linked API Lead</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Academic Batch</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Gateway Sync</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Current MTM Value (₹)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Return %</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{student.name}</span>
                      {student.isLead ? (
                        <span className="badge badge-amber" style={{ fontSize: '9px', padding: '1px 5px' }}>
                          Primary Lead
                        </span>
                      ) : (
                        <span className="badge badge-neutral" style={{ fontSize: '9px', padding: '1px 5px' }}>
                          Linked Sub-Account
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {student.rollNo} • {student.section}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '700', color: '#0284c7', fontSize: '12px' }}>
                      {student.linkedLeadName}
                    </div>
                    <code style={{ fontSize: '10px', color: '#64748b' }}>
                      Key: {student.leadApiKey ? `${student.leadApiKey.substring(0, 8)}...` : student.apiKey?.substring(0, 8)}
                    </code>
                  </td>

                  <td style={{ padding: '12px 16px', color: '#475569', fontSize: '12px' }}>
                    {student.batch}
                  </td>

                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span className="badge badge-profit" style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={11} />
                      <span>Live Synced</span>
                    </span>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                      {student.lastApiSync}
                    </div>
                  </td>

                  <td className="mono-num" style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>
                    ₹{student.portfolioValue.toLocaleString('en-IN')}
                  </td>

                  <td className="mono-num" style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span className="badge badge-profit" style={{ fontWeight: '700' }}>
                      +{student.returnPct}%
                    </span>
                  </td>

                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedStudentId(student.id)}
                      style={{
                        backgroundColor: '#0284c7',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '5px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON API Payload Inspector Modal */}
      {inspectLead && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          padding: '16px'
        }}>
          <div className="card-surface modal-dialog-content" style={{
            width: '100%',
            maxWidth: '720px',
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#38bdf8' }}>
                  Mega Bull HTTP Telemetry: {inspectLead.leadName} API Key
                </h3>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  GET {megaBullApiBaseUrl}/api/v1/group/students • Key: {inspectLead.apiKey}
                </div>
              </div>
              <button
                onClick={() => setInspectLead(null)}
                style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}
              >
                Close
              </button>
            </div>

            <pre style={{
              backgroundColor: '#090d16',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: '#34d399',
              overflowX: 'auto',
              maxHeight: '380px'
            }}>
              {JSON.stringify({
                status: 'success',
                statusCode: 200,
                httpTargetServer: megaBullApiBaseUrl,
                leadAccount: {
                  leadName: inspectLead.leadName,
                  apiKey: inspectLead.apiKey,
                  cohort: inspectLead.cohort
                },
                linkedStudentsCount: students.filter(s => s.linkedLeadName === inspectLead.leadName || s.leadApiKey === inspectLead.apiKey).length,
                linkedStudentPortfolios: students
                  .filter(s => s.linkedLeadName === inspectLead.leadName || s.leadApiKey === inspectLead.apiKey)
                  .map(s => ({
                    studentName: s.name,
                    isPrimaryLead: s.isLead,
                    rollNo: s.rollNo,
                    portfolioValue: s.portfolioValue,
                    cashBalance: s.cashBalance,
                    returnPct: s.returnPct,
                    holdingsCount: s.holdings.length,
                    activeHoldings: s.holdings.map(h => `${h.symbol} (${h.qty} @ ₹${h.mtmPrice})`)
                  })),
                timestamp: new Date().toISOString()
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Gateway Audit Stream */}
      <div className="card-surface" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={16} color="#0284c7" />
              <span>Real-Time HTTP API Telemetry & Audit Stream</span>
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Real-time HTTP <code>fetch()</code> callbacks dispatched from browser to <code>{megaBullApiBaseUrl}</code>
            </p>
          </div>
          <span className="badge badge-profit">HTTP Stream Live</span>
        </div>

        <div className="table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#475569', borderBottom: '1px solid #e2e8f0', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Event ID & Time</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Platform Event</th>
                <th style={{ padding: '10px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Reconciliation Details</th>
              </tr>
            </thead>
            <tbody>
              {gatewayLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{log.id}</div>
                    <div className="mono-num" style={{ fontSize: '10px', color: '#94a3b8' }}>{log.timestamp}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#334155' }}>
                    {log.event}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span className={`badge ${log.status.includes('200') || log.status === 'SUCCESS' ? 'badge-profit' : 'badge-neutral'}`} style={{ fontWeight: '800' }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>
                    {log.details}
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
