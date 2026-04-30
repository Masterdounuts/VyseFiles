## Pattern: Cron Job Timeout Failures

**Detected:** 2026-04-30
**Category:** system
**Occurrences:** 2 cron jobs, 20+ failures each

### What
Two cron jobs consistently timeout:
1. `context-monitor` - 20 consecutive errors
2. `vyse-status-auto-update` - 7 consecutive errors

Both set to 30s timeout, both fail with "cron: job execution timed out"

### Root Cause
**context-monitor-light.sh issues:**
1. Wrong API endpoint: `/api/session/status` returns 404
2. Missing dependency: `hand-off-summary.sh` doesn't exist
3. Falls back to failing silently, cron waits full timeout

**vyse-status-auto-update:**
1. Runs `openclaw status --json` which can be slow
2. Timeout too short for the command

### Impact
- Context monitoring broken
- Status not auto-updating
- Resource waste (cron keeps retrying)

### Action Needed
Option 1: Fix scripts (system skill)
Option 2: Increase timeout (shipwright skill)
Option 3: Disable until fixed (self-healing)

### Related Skills
- system: debugging
- shipwright: cron management
- self-healing: error detection
- pattern-recognition: detecting the pattern

---

## Pattern: Skill Creation Workflow Missing

**Detected:** 2026-04-30
**Category:** workflow
**Occurrences:** Multiple times before being caught

### What
When asked to create a new skill, I was not using skill-creator skill first

### Root Cause
- workflow skill didn't enforce using skill-creator
- No reminder in the workflow

### Impact
- Inconsistent skill creation
- Could create duplicate/overlapping skills

### Action Taken
- Updated workflow SKILL.md to include skill creation reminder
- pattern-recognition now tracks this

### Related Skills
- skill-creator: meta-skill for creation
- workflow: my operating procedure
- pattern-recognition: detecting gaps