# FIXES.md - Known Issues & Resolutions

*Track fixes and known issues here*

## 2026-05-01

### Session Refresh Issue
- **Problem:** Session lost context at 04:01 UTC (May 1)
- **Root Cause:** Manual `/new` triggered, not context overflow
- **Fix:** Added XP protocol to SOUL.md (survives refresh)
- **Status:** ✅ Documented

### Context Overflow
- **Problem:** Session grew to 1.1MB (319 messages) vs 128KB context
- **Root Cause:** Auto-compaction can't keep up with message rate
- **Fix:** Added contextPruning (3m TTL), auto-checkpoint saves to memory
- **Status:** ✅ Configured

### Cron Jobs Scattered
- **Problem:** Jobs in VyseFiles/cron, not in primary brain
- **Fix:** Copied to kb/cron/jobs.json
- **Status:** ✅ Fixed

### WhatsApp Plugin
- **Problem:** Missing register/activate export
- **Status:** ⚠️ Known issue, not using WhatsApp

### Security Flags
- **Problem:** 3 dangerous flags enabled
- **Status:** ⚠️ Known, local container environment

---

## 2026-04-30

### Telegram Session Context
- **Problem:** Telegram messages created fresh sessions
- **Fix:** Added session.dmScope: "main" to openclaw.json
- **Status:** ✅ Fixed

### CLI Cron Scope
- **Problem:** openclaw cron add fails with "pairing required"
- **Root Cause:** CLI has read-only scope
- **Fix:** Use Control UI dashboard for cron management
- **Status:** ✅ Documented
