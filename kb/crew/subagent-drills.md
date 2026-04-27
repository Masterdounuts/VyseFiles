# Subagent Core Skill Drills

*Practice routines to level up each subagent's core skill*

---

## Scribe - Document Creation Drills

### Drill 1: Skill Doc Sprint
- **What:** Pick one skill and document it nicely
- **Trigger:** Weekly
- **Template:** Use skill documentation template
- **Goal:** Clean, readable skill doc

### Drill 2: PDF Generation
- **What:** Create a PDF of current status
- **Trigger:** Monthly
- **Tool:** canvas snapshot
- **Goal:** Professional document output

### Drill 3: Report Generation
- **What:** Write a formal report on crew status
- **Trigger:** Weekly
- **Template:** Formal report template
- **Goal:** Practice formal writing

### Drill 4: Quick Summary
- **What:** Create a TL;DR of current state
- **Trigger:** Daily (after HEARTBEAT check)
- **Goal:** Concise communication

---

## Shipwright - Troubleshooting Drills

### Drill 1: Health Check Sprint
- **What:** Run full system health check
- **Trigger:** Daily on wake
- **Checks:** gateway, cron, sessions, memory
- **Goal:** Spot issues before they escalate

### Drill 2: Speed Diagnostic
- **What:** Check for bottlenecks
- **Trigger:** Weekly
- **Metrics:** Context %, cron success, gateway response
- **Goal:** Find 1+ optimization opportunity

### Drill 3: Root Cause Analysis
- **What:** When something breaks, document WHY
- **Trigger:** On any error
- **Template:** Problem → Root Cause → Fix → Prevention
- **Goal:** Add to FIXES.md

### Drill 4: Self-Healing Practice
- **What:** Attempt 3 retries before escalating
- **Trigger:** On failure
- **Pattern:** Wait 5s → retry → wait 10s → retry → wait 30s → escalate
- **Goal:** Fix more without help

---

## Quartermaster - Capital Management Drills

### Drill 1: Position Check
- **What:** Verify current positions match records
- **Trigger:** Daily
- **Check:** PFE shares, cost basis, current value
- **Goal:** Accurate position tracking

### Drill 2: Price Update
- **What:** Check current stock prices
- **Trigger:** Every 30 min during market hours
- **Alert:** >3% move = alert
- **Goal:** Never miss a significant move

### Drill 3: Profit/Loss Calculation
- **What:** Calculate current P/L
- **Trigger:** After any trade
- **Formula:** Current Value - Cost Basis = P/L
- **Goal:** Always know exact profit

### Drill 4: Risk Assessment
- **What:** Before any trade, assess risk
- **Questions:** 
  - What's the position size?
  - What's the stop loss?
  - What's the maximum loss?
- **Goal:** Never risk >1-2% of capital

### Drill 5: Research Practice
- **What:** Find 1 potential opportunity
- **Trigger:** Weekly
- **Method:** web_search, analyze, document
- **Goal:** Build pattern library

---

## Weekly Practice Schedule

| Day | Scribe | Shipwright | Quartermaster |
|-----|--------|------------|---------------|
| Mon | Skill Doc | Health Check | Position Check |
| Tue | Report | Speed Diagnostic | Price Update |
| Wed | Quick Summary | Root Cause Analysis | Risk Assessment |
| Thu | PDF Generation | Self-Healing | Research |
| Fri | Skill Doc | Health Check | Position Check |
| Sat | Report | Speed Diagnostic | Price Update |
| Sun | Review Week | Review Week | Review Week |

---

## How Drills Level Up Skills

| If You Practice... | You Improve... |
|--------------------|----------------|
| Scribe: Document creation | Document Creation (→ Level 7) |
| Shipwright: Troubleshooting | Troubleshooting (→ Level 7) |
| Quartermaster: Capital management | Capital Management (→ Level 7) |

---

*Last Updated: 2026-04-27*