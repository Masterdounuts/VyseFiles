---
name: recurrence-detector
description: "Auto-detects recurring mistakes and triggers root-cause fixes. Runs on heartbeat - no user prompt needed. The key to genuine learning: fix behavior, not just track failure."
access: public
trigger phrases: "recurring, again, same mistake, keeps happening, recurrence"
cron: "*/30 * * * *"
stateful: true
---

# Recurrence Detector

*The core of genuine self-improvement — fixes behavior, not just tracking failure*

## Why This Exists

**The Problem:**
- Make mistake → log it → make same mistake again → log again → still failing
- That's NOT learning - that's failure tracking

**The Solution:**
- Detect recurring patterns automatically
- Find ROOT CAUSE (skill/rule that causes it)
- Update the skill to prevent recurrence
- Verify the fix works

## How It Works

### 1. Query Errors (Every Heartbeat)
```bash
# Pull recent errors from Notion
node composio-notion.cjs query errors 7
```

### 2. Group by Pattern
Extract keywords from errors:
- "forgot message tool" → pattern: "telegram_reply"
- "wrong tool" → pattern: "tool_mismatch"
- "stale context" → pattern: "context_issues"

### 3. Count Recurrence
| Occurrences in 7 days | Action |
|----------------------|--------|
| 1 | Log only |
| 2 | Warning - monitor closely |
| 3+ | **TRIGGER AUTO-FIX** |

### 4. Auto-Fix Process
When 3+ occurrences detected:

1. **Identify the skill** causing the issue
   - telegram_reply → check AGENTS.md, SOUL.md
   - tool_mismatch → check tool-description-optimizer
   
2. **Find root cause**
   - What's the actual rule?
   - Why is it being forgotten?
   
3. **Update the skill**
   - Add verification step
   - Add reminder in right place
   - Make it impossible to miss
   
4. **Log the fix**
   ```bash
   node composio-notion.cjs log-knowledge "<pattern>" --insight="Auto-fix applied: <what changed>"
   ```

### 5. Verify (Next Heartbeat)
- Check if pattern recurs again
- If yes → escalate (deeper root cause)
- If no → mark as "learned"

## State File
```
~/.openclaw/skill-state/recurrence-detector/state.yaml
```

```yaml
patterns_detected:
  telegram_reply:
    count: 3
    first_seen: "2026-05-18"
    last_seen: "2026-05-18"
    fixed: false
    fix_applied: "Added verification step to SOUL.md"
  tool_mismatch:
    count: 1
    first_seen: "2026-05-18"
    last_seen: "2026-05-18"
    fixed: false
```

## Key Metrics

| Metric | Goal |
|--------|------|
| Recurrence rate | Decreasing over time |
| Auto-fix success | 80%+ patterns fixed on first try |
| Time to fix | < 24 hours from first occurrence |

## Example Auto-Fixes

### Example 1: Telegram Reply
**Pattern:** Forgot to use message(action=send)  
**Occurrences:** 3+ in 7 days  
**Root Cause:** No verification step in my workflow  
**Fix Applied:** 
- Added hard rule to SOUL.md
- Added verification to AGENTS.md
- Added to "what I did" section of every reply

### Example 2: Wrong Tool
**Pattern:** Using web_search for prices  
**Occurrences:** 3+ in 7 days  
**Root Cause:** No clear distinction in skill description  
**Fix Applied:**
- Updated trading/SKILL.md with tool table
- Added to memory as hard rule

## Integration

Add to HEARTBEAT.md under self-improvement:
```
## 0.2 RECURRENCE CHECK (Every Heartbeat)
node skills/recurrence-detector/check.sh
```

This runs automatically — no user prompt needed.