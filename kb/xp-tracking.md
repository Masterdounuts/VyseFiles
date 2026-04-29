# Skill XP & Level Tracking

*Automatic XP system - levels up based on actions, not manual updates*

## How It Works
- Each skill starts at Level 1
- Every action using the skill adds XP
- Level thresholds: 1→2 (10 XP), 2→3 (20 XP), 3→4 (30 XP), etc.
- RON = Level 7+ (can teach others)

## Current XP (Auto-Tracked)

| Skill | Level | XP | Next Level |
|-------|-------|----|------------|
| control-ui | 6 | 60 | 7 (RON) |
| shipwright | 7 | 70 | MAX |
| trading | 6 | 60 | 7 (RON) |
| knowledge | 7 | 70 | MAX |
| skill-creator | 7 | 70 | MAX |

## XP Events (Today)
- 2026-04-29: +5 XP to control-ui (updated subagent management)
- 2026-04-29: +5 XP to control-ui (filled subagent homes)
- 2026-04-29: +3 XP to shipwright (auto-level script created)

## Auto-Level Script
/scripts/auto-level.sh - Runs drills, awards XP, checks thresholds

---

*Auto-updated by system*