# Dynamic Max Level System

*Every skill inherits dynamic max - discoveries expand the ceiling*

## How Levels Work (With XP)

| Level | XP Required | What It Means |
|-------|-------------|---------------|
| L1-L6 | 10-50 | Can perform the skill |
| L7 (RON) | 70+ | **Can TEACH** - autonomous, creates subagents |
| L8+ | 80+ | Expands via discoveries |

**XP Thresholds**: L1→L2 (10), L2→L3 (20), L3→L4 (30), L4→L5 (40), L5→L6 (50), L6→L7 (60), L7→L8 (70)

## XP System (Auto-Tracking)
Every action using a skill awards XP:
- Track: `scripts/add-xp.sh <skill> <amount> <reason>`
- Log: `kb/xp-events.md`
- Summary: `kb/xp-tracking.md`

## Discoveries That Expand Max

| Discovery | Adds To Max |
|------------|-------------|
| New drill script | +1 per drill |
| Pre-save validation | +1 |
| Sub-agent drill | +1 |
| Canvas dashboard | +1 |
| New skill created | +1 |
| Dynamic max concept | +1 |

## Current Max: 15 (from 8 discoveries)

## How to Check Any Skill's Max

```bash
# Quick check
grep "Max Level" skills/*/SKILL.md

# Master list
cat kb/skills-master-levels.md
```

---

*This file is inherited by ALL skills - the max is NOT fixed at 7*