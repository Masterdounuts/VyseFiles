---
name: learning
access: public
description: Learning, practice, and continuous improvement
trigger phrases: "learn, training, improve, practice, drill, failure, mistake, wrong, caught, learn, understanding, realize, figure out, analyze, study"

# Learning & Evolution Skill
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
4. **Drill regularly** - Practice routines improve capability

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
- Content in skill = real capability (no arbitrary XP)
- Skills should be used, not just collected
- Self-improvement requires consistent habits

### What Still Needs Work
- More unique discoveries per skill
- Better gap detection
- Consistent logging to Composio
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

---

## What I Learned (2026-05-05)

### From Fixing Skills
- YAML frontmatter MUST have closing `---` or skills won't load
- Blank lines after opening `---` break parsing
- Dashboard shows different count than CLI (cache issue)
- All 18 skills working after fixing frontmatter format

### The Pattern
When I learn something that affects ANY skill:
1. Update that skill's SKILL.md immediately
2. Add to relevant section or create "What I Learned"
3. Git push (persists across sessions)
4. Mention in response so you know

### Why This Matters
- Skills are MY knowledge base
- GitHub is my second brain
- Every lesson learned should be in a skill, not just my context
