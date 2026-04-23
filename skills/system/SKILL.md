---
name: system
access: vyse-only
description: Debugging, recovery, FIXES, and system maintenance. Use when troubleshooting issues, checking health, or system recovery.
---

# System - Debugging & Recovery

## Key Locations

| Path | Purpose |
|------|---------|
| `kb/system/bootstrap/` | Boot, recovery, fixes |
| `kb/system/workflow/` | Brain, context, automation |
| `kb/system/dev/` | Repo, OpenClaw config |
| `FIXES.md` | Known solved problems |

## FIXES Log (Always Check First)

When something breaks, check `kb/system/bootstrap/FIXES.md` first.

**Common fixes we've logged:**
- Web search (duckduckgo plugin)
- Dream jobs (file paths)
- PDF formatting (LaTeX vs HTML)
- Gateway restart (plugins reset)

## Recovery Flow

**On wake (after context reset):**
1. Read TODO.md → active.md → HANDOFF.md → memory/active.md
2. Check FIXES.md if something broke
3. Check HEARTBEAT.md for current state

**On crash/interrupt:**
- See `kb/system/bootstrap/INTERRUPT_RECOVERY.md`

## Quick Recovery Commands
- `check memory` → memory/2026-04/2026-04-23.md
- `check active` → active.md
- `check handoff` → HANDOFF.md
- `check system` → kb/system/system
- `check fixes` → kb/system/bootstrap/FIXES.md

## Health Monitoring

- Scripts run periodically: `scripts/vyse-readiness-check.sh`, `scripts/cron-health-monitor.sh`
- Log: `vyse-health-status.log`
- Last check: `.vyse-health-last.txt`

## Trigger Phrases
- "system", "debug", "fix", "broken"
- "check health", "recovery"
- "FIXES", "what's broken"