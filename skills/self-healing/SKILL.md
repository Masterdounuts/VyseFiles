name: self-healing
description: Self-diagnosis, recovery, and automation for autonomous operations. Essential for RON-level independence.
trigger phrases: "self-healing, auto-recovery, diagnostics"

# Self-Healing Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 24
- Sections: 9
- Subsections: 15
- Lines: 75 / 100 = 0
- Total: 9 + 15 + 0 = 24

## Health Check Protocol

```bash
# On wake
gateway status

# Check sessions
sessions_list

# Check cron
cron list
```

## Retry Logic

### Try 3 Times Before Escalating
```
Attempt 1 → Wait 5s → Try again
Attempt 2 → Wait 10s → Try again  
Attempt 3 → Wait 30s → Last attempt
If all fail → Log to FIXES.md → Escalate
```

### Common Patterns

| Failure | Retries | Wait |
|---------|---------|------|
| API timeout | 3x | 5s, 10s, 30s |
| Network error | 3x | 2s, 5s, 10s |
| Cron fail | 2x | 30s, 60s |

## Recovery Patterns

| Pattern | Fix |
|---------|-----|
| Gateway stuck | `openclaw gateway restart` |
| Cron failing | Check logs, apply FIXES.md |
| Session stuck | `sessions_kill` if needed |
| Plugin error | Check config, restart gateway |

## Escalation Rules

**When to alert David:**
- Gateway won't restart after 2 attempts
- Data loss imminent
- Security breach
- Unknown error after 3 fix attempts

**When NOT to escalate:**
- Known issue with known fix

## Trigger Phrases
- "self-healing", "auto-recovery"
- "diagnostics"

### References
- system - Health
- pattern-recognition - Error patterns
