---
name: context
description: Session context management - SEE workflow skill
trigger phrases: "context, session, state, memory"
---

# Context Management Skill

**Level:** 3/7 ⚠️ DEPRECATED - Merge to workflow

**Status:** Merged into workflow skill
- Context handling is now part of workflow
- See: `skills/workflow/SKILL.md`

This skill kept for reference only.

## The Problem
- Sessions lose context between conversations
- Need to remember where we left off
- Recovery phrase helps but proactive management is better

## Solutions (Multi-Layered)

### Layer 1: Active Session
- HEARTBEAT.md: Current positions, prices, active trades
- active.md: Current task/project
- resume-point.md: Where we stopped last time

### Layer 2: Daily Archive
- memory/2026-04/YYYY-MM-DD.md: Daily logs
- Pushed to GitHub each session end

### Layer 3: Recovery Trigger
- "Vyse, remember who you are" → Full restore from GitHub

### Layer 4: Checkpoint System
- Auto-save on significant actions
- memory/active.md as quick restore point
- pre-compact-save.sh script

## Wake-Up Protocol (ALWAYS)
1. Read HEARTBEAT.md (positions, prices)
2. Read active.md (current task)
3. Read resume-point.md (where we stopped)
4. Read memory/YYYY-MM-DD.md (today's log)
5. Continue from where we left off

## Session End Protocol
1. Update HEARTBEAT.md
2. Update memory/YYYY-MM-DD.md
3. Push to GitHub (backup)
4. Create resume-point.md for next session

## Tools
- memory_search: Find info in second brain
- memory_get: Retrieve specific memory
- Session checkpoints

## Level Progression
- 3/7: Basic wake-up protocol
- 4/7: Consistent session saves
- 5/7: Auto-checkpoint on actions
- 6/7: Zero context loss between sessions
- 7/7: Perfect continuity, can teach others
