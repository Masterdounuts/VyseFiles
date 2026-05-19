---
name: recurrence-detector
description: "Auto-detects recurring mistakes and triggers root-cause fixes. Runs on heartbeat - no user prompt needed. v2: smarter pattern matching, skill linkage, auto-fix suggestions."
access: public
trigger phrases: "recurring, again, same mistake, keeps happening, recurrence"
cron: "*/30 * * * *"
stateful: true
---

# Recurrence Detector v2

*The core of genuine self-improvement — detects, links, and suggests fixes*

## Why This Exists

**The Problem:**
- Make mistake → log it → make same mistake again → log again → still failing
- That's NOT learning - that's failure tracking

**The Solution:**
- Detect recurring patterns with smart matching
- Link patterns to specific skills/files
- Suggest auto-fixes based on root cause
- Track fix success rate

## v2 Improvements

| Feature | v1 (Basic) | v2 (Smart) |
|---------|-----------|------------|
| Pattern detection | Keywords only | Keyword + skill mapping |
| Root cause | Manual | Auto-link to skills |
| Fix suggestion | Basic notification | Specific fix steps |
| Tracking | Simple count | Success rate |

## How It Works

### 1. Query Errors (Every Heartbeat)
```bash
# Pull recent errors from Notion
node composio-notion.cjs query errors 7
```

### 2. Pattern to Skill Mapping
Each pattern links to files to check:

| Pattern | Check These Files | Suggested Fix |
|---------|-------------------|---------------|
| telegram | AGENTS.md, SOUL.md | Add verification step |
| message tool | AGENTS.md, SOUL.md | message tool FIRST |
| wrong tool | trading/SKILL.md, web/SKILL.md | Add tool table |
| price | trading/SKILL.md | Use web_fetch, not web_search |
| browser | trading/SKILL.md, web/SKILL.md | Browser = prices, web_search = news |
| context | HEARTBEAT.md, memory/SKILL.md | Check context more often |
| stale | HEARTBEAT.md, memory/SKILL.md | Run notion-query.cjs |

### 3. Count Recurrence
| Occurrences in 7 days | Action |
|----------------------|--------|
| 1 | Log only |
| 2 | Warning - monitor |
| 3+ | **TRIGGER AUTO-FIX** |

### 4. Auto-Fix Process
When 3+ occurrences detected:

1. **Identify related skills** - from mapping table
2. **Suggest specific fix** - based on pattern
3. **Log to Notion** - track the detection
4. **Update state** - record for tracking

### 5. Track Success
Next cycle checks if pattern recurs again:
- Still recurring → escalate (deeper root cause)
- No longer recurring → mark as "learned"

## State File
```
~/.openclaw/skill-state/recurrence-detector/state.yaml
```

```yaml
patterns_detected:
  telegram:
    count: 3
    related: "AGENTS.md, SOUL.md"
    fix: "Add verification step"
    fixed: false
  wrong_tool:
    count: 3
    related: "trading/SKILL.md, web/SKILL.md"
    fix: "Add tool table"
    fixed: false
```

## The Key Insight

**Learning = Behavior Change**

Not:
- Logging errors (tracking failure)
- Counting mistakes (measuring failure)

But:
- Detecting the pattern
- Finding root cause in skill
- Updating skill to prevent recurrence
- Verifying fix works

This is what makes me 1% better every day.