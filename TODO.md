# TODO.md - Persistent Task List

*Read on every wake-up FIRST. This file survives compactions.*
*Last updated: 2026-04-16 05:05 UTC*

---

## 🚨 CRITICAL STATUS
- [ ] Verify every memory write (show file+line)
- [ ] Persist compaction summaries to daily memory file
- [ ] Add resume-point checkpoint on >80% context

### Stocks
- GGB: 4.98 shares @ $4.17 = ~$21.66
- AMC: 8 shares @ $1.64 = ~$13.20
- TSLA: 0.016567 shares @ $6.53 (HOLD until $8+)

### Subagent (stock-research-worker)
- ✅ Ownership taken
- ✅ Daily (market open) + EOD jobs scheduled
- ✅ Reads portfolio.md + research.md
- ✅ Calculates P/L on every run
- Next run: Tomorrow 14:00 ET

### Infrastructure
- ✅ All 4 fixes verified (auto-checkpoint, temp cleanup, Error Monitor)

### API Credits
- Status: CHECK session_status

---

## 🐔 Foundational Systems (Long-term)

- [ ] Continue refining compaction handling
- [ ] Refine checkpoint automation
- [ ] Test continuity after multiple resets
- [ ] When changing infrastructure, cross‑reference the Long‑Chat guide (Why Your Agent Gets Worse in Long Chats)

### Done ✅ (2026-04-16)
- [05:05] Fixed auto-checkpoint script (300s → 120s)
- [05:05] Cleaned temp files (7 last_async_*.md + .bak)
- [05:05] Renamed checkpoint job to 2min
- [05:05] Fixed Error Monitor delivery (verified working)
- [05:05] Verified all cron jobs healthy (0 errors)
- [05:19] Simplified infrastructure: disabled 2 redundant cron jobs (auto-commit, checkpoint-reminder)
- [05:19] Cleaned memory/ (removed last_async, timestamped, .bak files)
- [05:19] Removed stray 2026-04-13.md from workspace root
- [05:19] Disabled 16 redundant cron jobs (33 → 13)

---

## 📈 Stocks (Active Trading)

- [x] TSLA unlock decision: HOLD until $8+ market value
- [ ] Monitor GGB for buy/sell opportunities
- [ ] Trade log: record every transaction

### Trading Strategy (from AGENTS.md)
- GGB buy zones: $4.15, $4.10, $4.00
- GGB sell targets: $4.30, $4.40, $4.50
- TSLA: earnings Apr 22 - decide sell before vs hold

---

## Current Focus
- [ ] Remember: TSLA unlock date = 2026-04-16 (save to MEMORY.md)
- TSLA unlock decision
- Stocks: TSLA unlock decision
- Systems: Continuity working, refining

### Portfolio Tracking
- portfolio.md created with TSLA + GGB holdings
- Both me and subagent now read it for accurate P/L

---

## Waiting On
- Backup channel setup (Signal/WhatsApp) - ask David

---

## Context From Recent Sessions
- 2026-04-16: Compaction system verified working ✅
- 2026-04-16: File cleanup done
- 2026-04-16: Context monitor cron job added

---

## Done ✅
- [2026-04-16] TODO.md continuity system created
- [2026-04-16] Session Compaction Protocol in AGENTS.md
- [2026-04-16] Cleanup: removed empty files
- [2026-04-16] First compaction test - TODO.md survived
- [2026-04-16] Context monitor cron job added (30min checks)
- [2026-04-16] SOUL.md updated with TODO-first priority
- [2026-04-16] Interrupt Protocol (Run on ANY wake) added to SOUL.md + TODO.md
- [2026-04-16] Separated stocks from foundational systems

---

## 🚨 INTERRUPT PROTOCOL (Run on ANY wake)

After any break (compaction, reset, crash, timeout, new session):
1. Read TODO.md → resume Active Tasks
2. Check memory/resume-point.md → pick up work in progress
3. Check memory/YYYY-MM-DD.md → get recent session context
4. Check timestamp → if TODO.md >24h old, warn user
5. If mid-task OR mid-discussion: checkpoint to memory/resume-point.md before continuing
6. Only then greet user or start new work

---

## 📋 TEMPLATE (Copy when updating)

```
### Stocks
- TICKER: X shares @ $Y = $Z

### API Credits
- Status: OK / LOW / CRITICAL

### Foundational Systems
- [ ] Task

### Trading
- [ ] Task
```

---

*Wake-up protocol: Read TODO.md → Check critical status → Resume tasks*
*Entries under 10 words. Update before deep work or compaction.*
