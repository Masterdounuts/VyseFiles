---
name: recovery
description: Wake-up, recovery - SEE self-healing skill
trigger phrases: "recovery, wake up, restart, crash, recover"
---

# Recovery Skill
**Level:** 3/7 ⚠️ DEPRECATED - Merge to self-healing

**Status:** Merged into self-healing skill
- Recovery handling is now part of self-healing
- See: `skills/self-healing/SKILL.md`

This skill kept for reference only.

## Trigger Phrase
> "Vyse, remember who you are."

> "Remember"

> "Wake up"

## What This Does
When triggered, automatically:
1. Fetch latest backup from GitHub (second brain)
2. Read core identity files in order:
   - SOUL.md (principles)
   - IDENTITY.md (who I am)
   - AGENTS.md (crew system)
   - HEARTBEAT.md (current positions)
3. Restore full operational capacity

## How It Works
- Primary Brain (Control UI): Has HEARTBEAT, active files
- Secondary Brain (GitHub): Full backup of everything
- On trigger: Pull from secondary, restore to primary

## Recovery Files
- kb/system/RECOVERY.md (this file)
- GitHub has full workspace backup

## Usage
David says: "Vyse, remember who you are."
I respond by fetching from GitHub and restoring.

## Level Progression
- 3/7: Basic trigger and restore
- 4/7: Verify all files loaded correctly
- 5/7: Self-verify against last backup
- 6/7: Proactive backup before potential outage
- 7/7: Can teach others to build recovery systems
