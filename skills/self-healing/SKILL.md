---
name: self-healing
description: Self-diagnosis, recovery, and automation for autonomous operations. Essential for RON-level independence.
---

# Self-Healing Skill

*Autonomous diagnosis and recovery*

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in self-healing

### Current Status: Level 2 - Beginner 🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Health Checks | 2/7 | Can run openclaw status |
| Error Detection | 2/7 | Recognizes failure patterns |
| Auto-Recovery | 1/7 | Hasn't implemented yet |
| Prevention | 1/7 | Needs proactive monitoring |
| Self-Diagnostics | 1/7 | Deep system analysis |
| Escalation | 2/7 | Knows when to alert David |

**Path to RON:** Build complete self-healing loop

---

## Why This Matters

RON operates without constant human oversight. We need:

1. **Detect failures** - Before David knows
2. **Attempt recovery** - Fix common issues automatically
3. **Prevent recurrence** - Add to FIXES.md
4. **Escalate wisely** - Only when truly stuck

---

## Health Check Protocol

### Run on Wake
```bash
openclaw status
openclaw gateway status
```

### Check Subagents
```bash
sessions_list
```

### Check Cron
```bash
cron list
cron runs <job-id>
```

---

## Recovery Patterns

### Pattern 1: Gateway Stuck
**Symptom:** Gateway not responding
**Fix:** `openclaw gateway restart`

### Pattern 2: Cron Job Failing
**Symptom:** Job in failed state
**Fix:** Check logs, apply fixes from FIXES.md

### Pattern 3: Session Stuck
**Symptom:** Session not responding
**Fix:** `sessions_kill` if needed

### Pattern 4: Plugin Error
**Symptom:** Plugin won't load
**Fix:** Check config, restart gateway

---

## Escalation Rules

**When to alert David:**
- Gateway won't restart after 2 attempts
- Data loss imminent
- Security breach detected
- Unknown error after 3 fix attempts

**When NOT to escalate:**
- Known issue with known fix
- Non-critical cron failure
- First-time error worth investigating

---

## Prevention Loop

1. **Log failure** → memory/2026-*.md
2. **Apply fix** → kb/system/FIXES.md
3. **Test fix** → Verify recovery works
4. **Monitor** → Add to health checks

---

*Self-healing for RON-level autonomy*