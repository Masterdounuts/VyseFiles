name: automation
description: Knowing when to automate actions vs doing manually. Triggers when you recognize patterns that could be automated.
trigger phrases: "every time, repeatedly, always, auto, automate, script, run automatically"

# Automation Skill

**Level:** 15
**Max Level:** 75 (tier: supporting)

## Purpose
## XP Protocol
Every action must track XP via /scripts/xp-gain.sh

Recognize when actions repeat and should be automated.

## When to Automate

| Pattern | Action |
|---------|--------|
| Same command 3+ times | Create script |
| Manual tracking | Add to automation |
| Repeated workflow | Script it |
| After-action reflection | Check for automation |

## The Automation Rule

**Every action** should be evaluated:
1. Is this recurring?
2. Does it have a script?
3. Can it be auto-tracked?

## XP Triggers

- Create new automation script: +10 XP
- Identify manual task that should be automated: +5 XP
- Use existing automation: +2 XP

## Current Status: Level 15
**Content Progress:** 15/16 to L16 - Novice

*Currently learning when to automate*

## Dynamic Max Expansion
**Max Level:** 75 (tier: supporting)

## Cross-Pollination
- **system** → +3 XP (knowing when to create scripts)
- **learning** → +3 XP (continuous improvement through automation)
- **control-ui** → +3 XP (automating dashboard tasks)

## Tools Used
- exec: Run scripts
- write: Create automation scripts

### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
## Automation Patterns

### The 3-Try Rule
Run same command 3 times manually → create script

### Common Automation Triggers
| Pattern | Example | Automation |
|---------|---------|------------|
| Same output check | `openclaw status` daily | cron job |
| File copy | backup files | script |
| Status report | health check | cron + message |
| Context save | on 60% context | auto-checkpoint |

### Decision Tree: Automate or Not?

```
Does it happen >3 times?
  ├── YES → Create script
  └── NO → Is it error-prone?
            ├── YES → Create script anyway
            └── NO → Do manually
```

### Examples Created
1. `auto-checkpoint.sh` - saves context at 60%
2. `context-monitor-light.sh` - warns at 80%
3. `skill-gap-analysis.sh` - finds low-content skills
4. Post-commit hook - auto XP tracking
*Expanded: 2026-05-02 - Added automation patterns and decision tree*
