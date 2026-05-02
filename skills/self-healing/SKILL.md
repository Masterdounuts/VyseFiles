name: self-healing
description: Self-diagnosis, recovery, and automation for autonomous operations. Essential for RON-level independence.
trigger phrases: "self-healing, auto-recovery, diagnostics"

# Self-Healing Skill

*Autonomous diagnosis and recovery*

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in self-healing

### Current Status: Level 25 - RON ⭐ 🟡🟡🟡🟡🟡🟡

**XP:** 60/60 (next level at 60)

| Skill | Level | Notes |
|-------|-------|-------|
| Health Checks | 5/7 | Runs on wake, checks gateway, cron, sessions |
| Error Detection | 5/7 | Recognizes patterns from FIXES.md |
| **Auto-Recovery** | 5/7 | Has retry logic, attempts fixes |
| **Prevention** | 5/7 | Logs to FIXES.md, learns from failures |
| Self-Diagnostics | 5/7 | Uses skill-drill.sh for automated verification |
| Escalation | 4/7 | Only when 2+ fix attempts fail |

**Path to RON:** Build complete self-healing loop

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **exec** - Running system commands
- **cron** - Managing scheduled tasks
- **read/write** - Configuration management
- Decision tree: exec for diagnostics → cron for scheduling → read/write for config

**Max Level:** 100 (tier: primary)

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to self-healing |
## Why This Matters

RON operates without constant human oversight. We need:

1. **Detect failures** - Before David knows
2. **Attempt recovery** - Fix common issues automatically
3. **Prevent recurrence** - Add to FIXES.md
4. **Escalate wisely** - Only when truly stuck
## Health Check Protocol

### Run on Wake
```bash
gateway status
```

### Check Subagents
```bash
sessions_list
```

### Check Cron
```bash
cron list
```
## Retry Logic (Auto-Recovery)

### Before Escalating, Try 3 Times
```
Attempt 1 → Wait 5s → Try again
Attempt 2 → Wait 10s → Try again  
Attempt 3 → Wait 30s → Last attempt
If all fail → Log to FIXES.md → Escalate
```

### Common Retry Patterns

| Failure | Retry | Wait |
|---------|-------|------|
| API timeout | 3x | 5s, 10s, 30s |
| Network error | 3x | 2s, 5s, 10s |
| Cron fail | 2x | 30s, 60s |
| Session spawn | 2x | 5s, 15s |

### Log Every Attempt
```
[RETRY] Attempt 2/3 for cron-job-x - previous failed: timeout
```
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
## Prevention Loop

1. **Log failure** → memory/2026-*.md
2. **Apply fix** → kb/system/FIXES.md
3. **Test fix** → Verify recovery works
4. **Monitor** → Add to health checks
## Trigger Phrases
- "self-heal"
- "retry"
- "error recovery"
- "auto-recover"
- "fix itself"
*Self-healing for RON-level autonomy*

## AUTO SELF-HEALING (Now Active)

**When system detects issue:**
1. Error in session → Auto-log
2. File corruption detected → Auto-restore from GitHub
3. Cron failure → Auto-check, restart if needed
4. Context high → Auto-compact

**Auto-Fix Protocol:**
```
Detect → Log → Try Fix (3x) → If fail → Alert David + Log
```

**Running in background:**
- Shipwright checks hourly (cron)
- File corruption: git checkout restore
- Session errors: logged and reviewed

This is now AUTO, not just documented.

### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
