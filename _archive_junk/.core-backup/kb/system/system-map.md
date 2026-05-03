# System Interconnections Map

*How all systems connect and depend on each other*

---

## Technical Reality

| Component | What It Actually Is |
|-----------|---------------------|
| Container | Linux 5.15 on Heyron AI infrastructure |
| Node | v22.22.0 running OpenClaw |
| Gateway | WebSocket server (ws://127.0.0.1:18789) |
| Storage | Local filesystem at /root/.openclaw/ |
| Communication | Telegram bot via OpenClaw channel |

---

## Cron Jobs → Scripts Dependency

```
┌─────────────────────────────────────────────────────────────────┐
│ CRON JOBS                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                               │
│  quartermaster-stock-monitor ──────────► (checks sessions)    │
│       │                                                       │
│       ▼                                                       │
│  shipwright-daily-cleanup ────────────► openclaw sessions     │
│       │                                 cleanup               │
│       │                                                       │
│       ▼                                                       │
│  Shipwright: Session Health Monitor ─► sessions_list check    │
│                                                               │
│  Pre-Market Research ────────────────► stock-research-        │
│       │                                    scanner.sh         │
│       │                                                       │
│       ▼                                                       │
│  Credit Watch ───────────────────────► credit-watch.sh        │
│                                                               │
│  Daily Memory Audit ─────────────────► memory_audit           │
│                                                               │
│  Scribe Knowledge Audit ─────────────► kb/ audit             │
│                                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Active Scripts (8)

| Script | Location | Purpose | Trigger |
|--------|----------|---------|---------|
| backup-memory.sh | /openclaw/scripts/ | Auto-commits memory to GitHub | Daily cron |
| credit-watch.sh | /openclaw/scripts/ | Monitors OpenRouter credits, alerts if low | Cron |
| protocol-compliance-check.sh | /openclaw/scripts/ | Validates decision protocol | After assistant turn |
| auto-checkpoint-new.sh | /workspace/scripts/ | Creates structured handoff | Manual/cron |
| check-pending-opportunities.sh | /workspace/scripts/ | Reviews Quartermaster alerts, alerts David | Cron |
| core-files-guard.sh | /workspace/scripts/ | Verifies core identity files unchanged | Cron |
| stock-research-scanner.sh | /workspace/scripts/ | Scans for volatile/gapping stocks | Cron |
| get-stock-price.js | /workspace/scripts/ | Fetches stock prices (Yahoo Finance) | Used by Quartermaster |

---

### What Each Script Does (Internal Understanding)

#### /root/.openclaw/scripts/
- **backup-memory.sh**: Navigates to workspace, commits memory changes to GitHub
- **credit-watch.sh**: Checks OpenRouter API credits, sends Telegram alert if below threshold
- **protocol-compliance-check.sh**: Reads session file, validates Decision Protocol was followed

#### /root/.openclaw/workspace/scripts/
- **auto-checkpoint-new.sh**: Generates structured handoff for next session
- **check-pending-opportunities.sh**: Scans for opportunities, formats alert for David
- **core-files-guard.sh**: Hashes core files, compares to known hashes
- **stock-research-scanner.sh**: Scans for gapping/volatile stocks
- **get-stock-price.js**: Node script hitting Yahoo Finance API for prices

---

## Orphaned Scripts - CLEANED

All 16 orphaned scripts deleted 2026-04-29.

---

## Channel Connections

```
Telegram ──► OpenClaw Gateway ──► Vyse (main session)
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              Quartermaster    Shipwright       Scribe
               (stocks)        (systems)       (memory)
```

---

## Data Flow Paths

| Path | Direction | What Flows |
|------|-----------|------------|
| Prices | External → Quartermaster | Stock prices via web |
| Trades | David → Quartermaster → Execute | Decisions |
| Memory | Vyse ↔ Scribe | Read/write operations |
| Health | Shipwright → Vyse → David | Status updates |
| Alerts | Quartermaster → Vyse → David | Opportunities |

---

## System Health Indicators

| Component | Health Check | Warning Signs |
|-----------|--------------|---------------|
| Gateway | openclaw status | Not reachable |
| Sessions | sessions_list | >200 active |
| Memory | file count | >100 files |
| Cron | last run status | consecutive errors |
| Skills | loadable | Missing SKILL.md |

---

*Map updated: 2026-04-29*