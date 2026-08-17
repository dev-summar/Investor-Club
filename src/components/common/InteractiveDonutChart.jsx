// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Interactive Allocation Ring (Recharts Donut Chart with Hover States)
// ============================================================================

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const InteractiveDonutChart = ({
  students = [],
  totalAUM = 1999623.21,
  totalCash = 1998042.51,
  totalEquity = 1580.70
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Compile data from real holdings & cash
  const sectorMap = {};
  students.forEach(s => {
    (s.holdings || []).forEach(h => {
      sectorMap[h.sector || 'Banking & Financials'] = (sectorMap[h.sector || 'Banking & Financials'] || 0) + h.value;
    });
  });

  const rawData = [];
  
  // Add equity sectors
  Object.keys(sectorMap).forEach(sec => {
    if (sectorMap[sec] > 0) {
      rawData.push({
        name: sec,
        value: Math.round(sectorMap[sec] * 100) / 100,
        type: 'equity'
      });
    }
  });

  // Add cash balance
  rawData.push({
    name: 'Unallocated Cash Margin',
    value: Math.round(totalCash * 100) / 100,
    type: 'cash'
  });

  const COLORS = [
    '#002147', // MIET Navy
    '#059669', // Emerald
    '#0284c7', // Sky Blue
    '#c5a059', // MIET Gold
    '#7c3aed', // Purple
    '#e2e8f0'  // Subtle slate for remaining
  ];

  const formatINR = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const activeItem = activeIndex !== null ? rawData[activeIndex] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ position: 'relative', width: '100%', height: '190px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rawData}
              cx="50%"
              cy="50%"
              innerRadius={54}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              cursor="pointer"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {rawData.map((entry, index) => {
                const isSelected = activeIndex === index;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.type === 'cash' ? '#002147' : COLORS[(index + 1) % COLORS.length]}
                    opacity={activeIndex === null || isSelected ? 1 : 0.45}
                    style={{
                      transition: 'all 200ms ease',
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                      transformOrigin: 'center center'
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0];
                  const pct = totalAUM > 0 ? ((data.value / totalAUM) * 100).toFixed(2) : 0;
                  return (
                    <div style={{
                      backgroundColor: '#002147',
                      color: '#ffffff',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontFamily: 'var(--font-mono)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      <div style={{ fontWeight: '800' }}>{data.name}</div>
                      <div style={{ color: '#38bdf8', marginTop: '2px' }}>
                        {formatINR(data.value)} ({pct}%)
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Ring Indicator */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          {activeItem ? (
            <div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>
                {activeItem.type === 'cash' ? 'CASH' : 'EQUITY'}
              </div>
              <div className="mono-num" style={{ fontSize: '14px', fontWeight: '800', color: '#002147' }}>
                {totalAUM > 0 ? ((activeItem.value / totalAUM) * 100).toFixed(1) : 0}%
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>
                FUND AUM
              </div>
              <div className="mono-num" style={{ fontSize: '13.5px', fontWeight: '800', color: '#002147' }}>
                100%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {rawData.map((item, idx) => {
          const isSelected = activeIndex === idx;
          const pct = totalAUM > 0 ? ((item.value / totalAUM) * 100).toFixed(2) : 0;
          const color = item.type === 'cash' ? '#002147' : COLORS[(idx + 1) % COLORS.length];

          return (
            <div
              key={item.name}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11.5px',
                padding: '4px 8px',
                borderRadius: '5px',
                backgroundColor: isSelected ? '#f1f5f9' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 120ms ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  display: 'inline-block'
                }} />
                <span style={{ color: '#334155', fontWeight: isSelected ? '700' : '500' }}>
                  {item.name}
                </span>
              </div>

              <span className="mono-num" style={{ fontWeight: '700', color: '#002147' }}>
                {pct}% <span style={{ color: '#64748b', fontWeight: '500' }}>({formatINR(item.value)})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
