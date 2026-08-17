# School of Management — Investor's Club Trading Challenge Dashboard

An institutional internal dashboard developed for the **School of Management** to digitally monitor, analyse, and display student performance in the **Investor's Club Trading Challenge**, synchronised with the **Mega Bull Simulated Trading Platform**.

---

## 🏛️ Platform Overview

The dashboard serves as the central command terminal for faculty coordinators, department administrators, and students. Each student is allocated **₹5,00,000 virtual capital**, with portfolio valuations and leaderboard standings settled using official **Friday Mark-to-Market (MTM)** closing values.

---

## 🚀 Key Modules & Capabilities

### 1. Executive Summary & KPI Deck
- **Aggregate Fund Pool Monitoring**: Real-time tracking of total student capital AUM (e.g. ₹6.40 Cr pool across cohorts).
- **Collective Alpha & Benchmarks**: Real-time comparison against **NIFTY 50**, **BSE SENSEX**, **NIFTY BANK**, and **NIFTY IT**.
- **Cohort Return Distribution**: Interactive frequency distribution histogram of student returns.
- **Aggregate Sector Exposure**: Capital allocation breakdown across Banking & NBFC, IT, Auto, Pharma, Energy, Infrastructure, FMCG, and Metals.

### 2. Friday Mark-To-Market (MTM) Leaderboard
- **Weekly Settlement Engine**: Standings calculated on Friday 15:30 IST official market closing prices.
- **Top 3 Podium Celebration**: Gold Trophy (Rank 1), Silver Medal (Rank 2), Bronze Medal (Rank 3).
- **Multi-Factor Sorting**: Sort by Absolute Return %, Risk-Adjusted Sharpe Ratio, Pedagogical Rationale Score, or Lowest Drawdown.
- **Weekly Delta Indicators**: Tracks rank movements (▲ +3, ▼ -2, ━) across trading sessions.

### 3. Student Portfolio Deep-Dive Inspector
- **Capital Breakdown**: Starting capital (₹5,00,000), available virtual cash, invested equity, realized P&L, unrealized P&L, and net return %.
- **Sector Diversification Bar**: Visual single-stock exposure gauge with prudential limits.
- **Active Holdings Table**: Scrip, quantity, average buy cost, Friday MTM price, current value, P&L (₹ & %), portfolio weight %, and trailing stop-loss.
- **Mega Bull Trade Book**: Full execution logs with timestamps and platform reference IDs.
- **Interactive Trade Simulator**: Allows simulating buy/sell orders directly on the Mega Bull simulated engine.

### 4. Investment Rationale & Academic Documentation Hub
- **Pedagogical Requirement**: Every trade execution requires documented rationale (Fundamental DCF, Technical Breakout, Macro Tailwind, or ESG Theme).
- **Faculty Evaluation Rubric**: Faculty coordinators grade submissions on:
  1. *Research Depth & Industry Rigor* (1 to 5)
  2. *Risk Management & Stop-Loss Discipline* (1 to 5)
  3. *Valuation Logic & Financial Modeling* (1 to 5)
- **Exemplary Showcase**: High-scoring theses (9.0+ / 10.0) are featured on the Wall of Fame to inspire peer cohorts.

### 5. Mega Bull Platform Synchronization & Risk Gateway
- **Gateway Telemetry**: Live connection status, WebSocket heartbeat, latency monitoring, and audit log.
- **Friday MTM Settlement Trigger**: One-click reconciliation engine recalculating all 128 student portfolios.
- **Bulk CSV Statement Importer**: Drag-and-drop parser for bulk trade statements exported from the Mega Bull platform.
- **Prudential Risk Flags**: Automated alerts for single-stock exposure > 25%, missing rationale within 24 hours, or severe drawdown.

### 6. Learning, Engagement & NAAC Analytics
- **NAAC Criterion 2.3.1 Alignment**: Experiential learning evidence documentation for student-centric teaching.
- **Bloom's Taxonomy Attainment**: Quantifies student mastery in valuation modeling, risk hedging, and market psychology.
- **Cohort Benchmarking**: Cross-cohort performance comparison (MBA vs BBA vs Executive PGDM).
- **Mentorship Tracking**: 100% faculty mentoring coverage with thesis review progress.

### 7. Awards & Dynamic Certificate Studio
- **Wall of Fame**: Weekly honors including *Mega Bull Champion*, *Prudent Risk Master*, *Best Investment Thesis*, and *Rookie of the Week*.
- **High-Resolution Certificate Studio**: Dynamic printable/downloadable official merit certificates featuring the School of Management seal, Director and Faculty Coordinator digital signatures, QR code verification, and confetti celebration launcher.

### 8. Faculty Admin & Governance Panel
- **Challenge Parameter Controls**: Baseline capital (₹5,00,000), allowable scrips, trading hours, and stop-loss rules.
- **Broadcast Announcement Broadcaster**: Real-time notification tool for market briefings and competition notices.
- **Dean's Executive Dossier**: One-click printable briefing for Dean, HOD, and Academic Council.

### 9. Finance Lab TV Kiosk / Wallboard Mode
- High-contrast terminal display tailored for business school trading lab screens and lobby TV monitors.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Bespoke Institutional CSS Design System (Google Fonts: *Plus Jakarta Sans*, *Inter*, *JetBrains Mono*)
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti
- **State Management**: React Context with LocalStorage Persistence & Live Tick Simulation

---

## 💻 Running the Application Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
