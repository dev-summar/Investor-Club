// ============================================================================
// SCHOOL OF MANAGEMENT - INVESTOR'S CLUB TRADING TERMINAL
// Live Market Ticker Tape (Infinite Smooth Scrolling Marquee)
// ============================================================================

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

export const MarketTickerTape = () => {
  const [isPaused, setIsPaused] = useState(false);

  const tickerItems = [
    { symbol: 'NIFTY 50', price: '24,850.35', change: '+0.58%', isUp: true, isIndex: true },
    { symbol: 'BSE SENSEX', price: '81,380.20', change: '+0.51%', isUp: true, isIndex: true },
    { symbol: 'NIFTY BANK', price: '51,240.80', change: '+0.55%', isUp: true, isIndex: true },
    { symbol: 'J&KBANK', price: '₹158.07', change: '+1.12%', isUp: true, isHeld: true },
    { symbol: 'RELIANCE', price: '₹2,984.50', change: '+0.45%', isUp: true },
    { symbol: 'HDFCBANK', price: '₹1,640.25', change: '-0.15%', isUp: false },
    { symbol: 'TCS', price: '₹4,120.00', change: '+0.80%', isUp: true },
    { symbol: 'INFY', price: '₹1,845.60', change: '+0.92%', isUp: true },
    { symbol: 'ICICIBANK', price: '₹1,215.30', change: '+0.64%', isUp: true },
    { symbol: 'SBIN', price: '₹842.10', change: '+0.38%', isUp: true },
    { symbol: 'LT', price: '₹3,720.50', change: '+0.75%', isUp: true }
  ];

  // Duplicate list to achieve continuous seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden',
        position: 'relative',
        height: '32px',
        display: 'flex',
        alignItems: 'center'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live Badge Pillar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#002147',
        color: '#ffffff',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10.5px',
        fontWeight: '800',
        fontFamily: 'var(--font-mono)',
        boxShadow: '4px 0 10px rgba(0, 33, 71, 0.15)'
      }}>
        <span className="pulsing-dot" />
        <span>NSE / BSE LIVE</span>
      </div>

      {/* Marquee Track */}
      <div style={{
        display: 'flex',
        gap: '24px',
        paddingLeft: '140px',
        whiteSpace: 'nowrap',
        willChange: 'transform',
        animation: `tickerScroll 38s linear infinite`,
        animationPlayState: isPaused ? 'paused' : 'running'
      }}>
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontFamily: 'var(--font-mono)',
              cursor: 'default'
            }}
          >
            <span style={{
              fontWeight: '800',
              color: item.isHeld ? '#002147' : item.isIndex ? '#0f172a' : '#475569',
              backgroundColor: item.isHeld ? '#e8f1fa' : 'transparent',
              padding: item.isHeld ? '1px 5px' : '0',
              borderRadius: item.isHeld ? '3px' : '0'
            }}>
              {item.symbol}
            </span>

            <span style={{ color: '#0f172a', fontWeight: '700' }}>
              {item.price}
            </span>

            <span style={{
              color: item.isUp ? '#059669' : '#dc2626',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              {item.isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {item.change}
            </span>

            <span style={{ color: '#cbd5e1', marginLeft: '6px' }}>•</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
