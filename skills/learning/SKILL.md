---

name: learning
description: Learning, practice, and continuous improvement
trigger phrases: "learn, training, improve, practice, drill, failure, mistake, wrong, caught, learn, understanding, realize, figure out, analyze, study"

# Learning & Evolution Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 42
- Sections: 16
- Subsections: 25
- Lines: 107 / 100 = 1
- Total: 16 + 25 + 1 = 42

## Core Principle
Every session should make us better. We learn from:
- Successes
- Failures
- Feedback from David
- New information

## Learning Loop
```
Session → Evaluate → Document → Improve → Next Session
```

## What We Learn From

| Source | What to Capture |
|--------|-----------------|
| Trades | What worked, what didn't |
| Errors | Root cause, fix applied |
| Sessions | Patterns in conversation |
| Drills | What we can/cannot do |

## Self-Improving Principles

1. **Document everything** - Future us thanks present us
2. **Root cause, not symptoms** - Fix the why, not just the what
3. **Cross-pollinate** - When one skill improves, update related ones
4. **Drill regularly** - Practice routines speed up leveling

## Documentation Format

```markdown
## [What Happened]
- Date, context, what we tried

## [What Worked / What Didn't]
- Specific outcomes

## [Root Cause]
- Why it happened

## [Fix Applied]
- What we changed

## [What We Learned]
- Generalizable insight
```

## Skill System Drills

### Drill Tiers
| Tier | What | Frequency |
|------|------|-----------|
| Core | Self, memory, workflow | Daily |
| Capability | Skills, tools | Weekly |
| Full | All skills | Monthly |

### Audit What
- Can I use this skill?
- Do I have the tools?
- Is the documentation clear?

## Cross-Pollination
When one skill improves:
1. Check what it relates to
2. Update related skills
3. Document the chain

## Trigger Phrases
- "learn", "training", "improve"
- "drill", "failure", "mistake"
- "what did we learn"

### References
- memory - Recall
- pattern-recognition - Finding patterns
- system - Health checks
---

## Reflection 2026-05-04

### What I Learned
- XP without content = vanity metrics (the big realization!)
- Content-based leveling is the truth
- Guards catch gaming before it happens

### What Still Needs Work
- More unique discoveries per skill
- Better gap detection
- True mastery vs level metrics


---

## Self-Improvement Logging

*How to track learnings, errors, and improvements*

### What Gets Tracked

| Type | When | Action |
|------|------|--------|
| Command fails | Error occurs | Log to `.learnings/ERRORS.md` |
| User corrects | "No, that's wrong..." | Log to `.learnings/LEARNINGS.md` |
| Feature request | "Can you also..." | Log to `.learnings/FEATURE_REQUESTS.md` |
| Better approach found | Discovery | Log to `.learnings/LEARNINGS.md` |

### Learning Entry Format

```markdown
## [LRN-YYYYMMDD-001] category

**Logged**: 2026-03-05
**Priority**: low | medium | high | critical
**Status**: pending

### Summary
One-line description

### Details
What happened, what was wrong, what's correct

### Suggested Action
Specific fix or improvement
```

### Error Entry Format

```markdown
## [ERR-YYYYMMDD-001] what_failed

**Logged**: 2026-03-05
**Priority**: high
**Status**: pending

### Summary
What failed

### Error
```
Actual error message
```

### Context
What you were trying to do

### Suggested Fix
How to prevent this next time
```

### Detection Triggers
- **Corrections**: "No, that's wrong...", "Actually...", "You're wrong about..."
- **Feature requests**: "Can you also...", "I wish you could..."
- **Errors**: Non-zero exit codes, exceptions, unexpected output

### When to Promote

| Learning Type | Promote To |
|---------------|------------|
| Behavioral patterns | `SOUL.md` |
| Workflow improvements | `AGENTS.md` |
| Tool gotchas | `TOOLS.md` |

### Best Practices
1. **Log immediately** — context is freshest right after the issue
2. **Be specific** — future us needs to understand quickly
3. **Suggest concrete fixes** — not just "investigate"
4. **Promote aggressively** — if useful, put it in permanent files
