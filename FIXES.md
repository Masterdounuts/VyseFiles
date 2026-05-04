# FIXES.md - Known Issues & Resolutions

*Track fixes and known issues here*

## 2026-05-04

### Subagent Model Preference (CRITICAL FIX)
- **Problem:** Scribe kept timing out - didn't know which models work or to try different ones
- **Root Cause:** Subagent system prompts missing model preference section
- **Fix:** Added "Model Preference" section to all 3 subagent prompts:
  - Scribe: minimax-m2.5 preferred, claude-3-haiku fallback
  - Quartermaster: minimax-m2.5 preferred, gemini-2.0-flash fallback
  - Shipwright: minimax-m2.5 preferred, gemini-2.0-flash fallback
- **Added:** "If timeout/fail: Try different model, report what works"
- **Status:** ✅ Fixed

---

### Memory Handoff Stacking (CRITICAL FIX)
- **Problem:** HANDOFF.md accumulated 50+ stacked sessions (circular bug)
- **Root Cause:** Save scripts read from active.md (which had old handoffs) instead of memory/core/
- **Fix:** Rewrote context-aware-save.sh + auto-checkpoint-new.sh to pull from memory/core/ + ron-memory.md (core sources)
- **Test:** Verified clean handoff (55 lines vs 500+), no stacking
- **Status:** ✅ Fixed & Tested 2026-05-02

### Phase 4 Integration Complete
- **Problem:** Memory phases 1-3 built but never tested end-to-end
- **Fix:** Ran full save→recover cycle, confirmed working
- **Status:** ✅ Complete 2026-05-02

### CLI Cleanup
- **Problem:** 20 root files (bloated)
- **Fix:** Deleted 10 old docs (BOOTSTRAP, REBUILD-3, PENDING, ORPHANS, POST-MIGRATION, OUTAGE-RECOVERY, README, TODO, brain-audit, skill-status)
- **Result:** 14 core files remain
- **Status:** ✅ Done 2026-05-02

### RECOVERY.md Updated
- **Problem:** Critical files list was in OUTAGE-RECOVERY.md (deleted)
- **Fix:** Added P0/P1/P2 critical files section to RECOVERY.md
- **Status:** ✅ Done 2026-05-02

---

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
