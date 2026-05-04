name: automation
description: Knowing when to automate actions vs doing manually. Triggers when you recognize patterns that could be automated.
trigger phrases: "every time, repeatedly, always, auto, automate, script, run automatically"

# Automation Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 15
- Sections: 10
- Subsections: 5
- Lines: 65 / 100 = 0
- Total: 10 + 5 + 0 = 15

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

### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
