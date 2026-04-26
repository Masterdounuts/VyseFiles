---
name: system
always: true
description: Debugging, recovery, FIXES, and health checks. Use when something breaks or needs investigation.
---

# System - Debugging & Recovery

*Debugging, recovery, FIXES, and health checks*

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in system debugging

### Current Status: Level 6 - Expert 🟡🟡🟡🟡🟡🟡

| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| Debugging | 5/7 | 🟡🟡🟡🟡🟡 | Uses exec for diagnostics, fixes cron, session issues |
| Recovery | 4/7 | 🟡🟡🟡🟡 | Wake-up protocol, context recovery |
| FIXES | 4/7 | 🟡🟡🟡🟡 | 6+ fixes logged, recursive fix detection |
| Health | 4/7 | 🟡🟡🟡🟡 | Knows all health commands |

**Path to RON:** Auto-recovery, handle complex multi-layer issues

---

## 🎯 Key Principle: Check OpenClaw First

Before building ANY new feature, script, or automation:
1. **Check OpenClaw docs** - what does it already provide?
2. **Check Control UI** - is there a panel for it?
3. **Check existing skills** - skills already installed handle many cases
4. Only build custom if nothing exists

**OpenClaw handles natively:**
- ✅ Context compaction (auto)
- ✅ Session management (built-in)
- ✅ Gateway health monitoring (built-in)
- ✅ Memory/dreaming (native system)
- ✅ Cron job management (UI panel)
- ✅ Logs panel (built-in)
- ✅ Config UI (built-in)

---

## 🔧 FIXES Log

*Never fix the same problem twice*

**Location:** `kb/system/bootstrap/FIXES.md`

### Recent Fixes (2026-04)

| Date | Issue | Fix |
|------|-------|-----|
| Apr 16 | Cron Telegram delivery failing | Changed to numeric chat ID 8742211590 |
| Apr 17 | Gateway watch path bug | Corrected /root vs /home/openclaw path |
| Apr 14 | GGB price fetch blocked | Use CNBC `/quotes/{TICKER}` |
| Apr 14 | PDF formatting not applying | Use LaTeX, not HTML |
| Apr 13 | Web search not working | Enable duckduckgo plugin |

---

## 🔍 Debugging Flow

1. **Identify** - What's broken? Get exact error.
2. **Locate** - Which component? (gateway, cron, session, plugin)
3. **Check** - Use appropriate tool:
   - Gateway: `gateway action=status`
   - Cron: `cron action=list`
   - Sessions: `sessions_list`
   - Logs: Control UI → Logs panel
4. **Fix** - Apply solution or create script
5. **Log** - Add to FIXES.md
6. **Verify** - Confirm fix works

---

## 🏥 Health Checks

| Check | Command | Frequency |
|-------|---------|-----------|
| Gateway | `gateway action=restart` if needed | Daily |
| Context | `session_status` | On wake |
| Cron | `cron action=list` | Weekly |
| Sessions | `sessions_list` | Weekly |

---

## 🆘 Recovery Procedures

### Session Crash
1. Check `sessions_list` for stale sessions
2. Identify last good state in `memory/`
3. Resume from `resume-point.md`

### Gateway Unresponsive
1. `gateway action=restart`
2. Wait 30s, check status

### Cron Job Failing
1. `cron action=runs` for job ID
2. Check error in output
3. Fix path/permission/timeout
4. Re-enable if needed

---

## 📝 Creating FIXES

When you solve a problem:
1. Add to `kb/system/bootstrap/FIXES.md`:
   - Date
   - Problem (exact error)
   - Root Cause
   - Fix applied
   - Status
2. Include code snippets if helpful

---

## Trigger Phrases
- "fix", "debug", "broken"
- "error", "failed", "not working"
- "health check", "recover"
- "FIXES", "what's broken"
