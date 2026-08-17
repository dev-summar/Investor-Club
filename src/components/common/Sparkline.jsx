// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Mini Sparkline Chart Component (Ultra-Lightweight Precision SVG)
// ============================================================================

import React from 'react';

export const Sparkline = ({
  data = [500000, 500500, 499800, 501200, 500800, 502000, 501600],
  width = 72,
  height = 24,
  isPositive = true,
  showDot = true,
  strokeWidth = 1.75
}) => {
  if (!data || data.length < 2) {
    data = [500000, 500000];
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const paddingY = 3;
  const usableHeight = height - paddingY * 2;

  // Generate coordinates
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 6) + 3;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Build SVG Path
  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Fill gradient path
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const fillD = `${pathD} L ${lastPoint.x} ${height} L ${firstPoint.x} ${height} Z`;

  const strokeColor = isPositive ? '#059669' : '#dc2626';
  const fillColor = isPositive ? 'rgba(5, 150, 105, 0.12)' : 'rgba(220, 38, 38, 0.12)';
  const gradId = `spark-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible', display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
          <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
        </linearGradient>
      </defs>

      {/* Subtle Fill Area */}
      <path d={fillD} fill={`url(#${gradId})`} />

      {/* Main Trend Line */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terminal Dot at current price */}
      {showDot && (
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r={2.5}
          fill={strokeColor}
          stroke="#ffffff"
          strokeWidth={1}
        />
      )}
    </svg>
  );
};
