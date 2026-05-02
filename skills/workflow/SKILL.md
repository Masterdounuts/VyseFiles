name: workflow
access: vyse-only
description: How Vyse works — core files, status system, wake-up flow, decision protocol. Use when asked about my workflow, how I operate, or when "focus: workflow" is triggered.
trigger phrases: "workflow, automation, pipeline"

# Vyse Workflow

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in self-operation

### Current Status: Level 56 - RON ⭐ 🟡🟡🟡🟡🟡🟡

**XP:** 70/70 (RON)
| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| Wake-up | 5/7 | 🟡🟡🟡🟡🟡 | Reads TODO, HANDOFF, active.md |
| Context | 5/7 | 🟡🟡🟡🟡🟡 | Knows compaction rules, 60/70% checkpoints |
| **Session Health** | 6/7 | 🟡🟡🟡🟡🟡🟡 | 6-layer hierarchy integrated | ← LEVEL UP
| Status | 5/7 | 🟡🟡🟡🟡🟡 | Status prefixes + priority | ← LEVEL UP
| Checkpoint | 5/7 | 🟡🟡🟡🟡🟡 | Pre-cleanup checkpoint added |

**Path to RON:** Perfect self-management, zero handoff issues

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **read/write** - Managing active.md, HANDOFF.md, PENDING.md
- **cron** - Scheduling recurring tasks
- **sessions_spawn** - Creating subagent sessions
- Decision tree: read/write for state → cron for scheduling → sessions_spawn for subagents

**Max Level:** 150 (tier: critical)

| Discovery | Adds To |
|------------|--------|
| Wake protocol | +1 to workflow |
| Checkpoint system | +1 to memory |
| Skill integration | +1 to all skills |
| 6-layer hierarchy | +1 to workflow ← NEW |
## Skill Creation Workflow

**When creating ANY new skill:**
1. Load skill-creator/SKILL.md first
2. Follow its "Check Existing First" workflow
3. Use its templates and creation workflow
4. Run cross-pollination after

**Never skip skill-creator** - it's the meta-skill for creating skills.

### HEYRON Level Insight

> **Q:** "What's the ceiling?"
>
> **A:** "Nothing...how I am working with you"
## Core Files
- **SOUL.md** — Principles, boundaries, vibe
- **IDENTITY.md** — Persona, name, emoji
- **USER.md** — Your prefs, timezone, triggers
- **AGENTS.md** — Crew hierarchy, active systems
- **TODO.md** — Current tasks

## Primary Brain (Where I Live)
**Path:** `/home/openclaw/.openclaw/`

This is my **primary brain** - all my operational files live here:
- **Cron jobs:** `cron/jobs.json`
- **Config:** `openclaw.json`
- **Sessions:** `sessions/`
- **Skills:** `skills/`
- **Memory:** `memory/`

**Control UI** reads from this location - it shows what's in my brain. Changes here appear in the dashboard.

## Status System
| Prefix | Meaning | Use When |
|--------|---------|----------|
| 🔍 Scouting | Researching | Gathering info |
| 🧠 Pondering | Processing | Complex request |
| 🔧 Tinkering | Fixing | Debugging |
| 📝 Crafting | Creating | Building new |
| 💾 Stashing | Saving | Checkpoints |
| ⏳ Holding | Waiting | External response |
| ⚔️ Acting | Executing | Running commands |
| 🎉 Done | Complete | Task finished |

## Wake-up Flow (Correct Order)
1. **GitHub pull** → `git fetch origin main && git pull origin main`
2. **Read in EXACT order:**
   - `memory/active.md` ← **PRIMARY** (today's checkpoint)
   - `HEARTBEAT.md` ← trading state
   - `HANDOFF.md` ← pending handoffs
   - `TODO.md` ← tasks
   - `active.md` (root) ← fallback only
   - `PENDING.md` ← pending items
3. Check scheduled tasks (cron jobs, reminders)
4. Handle any actionable items
5. Chat with you

## Pre-Cleanup Protocol (Critical!)

Before running ANY session cleanup:

1. **Checkpoint current context** → Write summary to memory/active.md
2. **Note what we're about to do** → "About to run aggressive session cleanup"
3. **After cleanup** → Verify session still running, context intact

This prevents the April 27 incident where session restarted and context was lost.

## Session & Context Management

**Monitoring:**
- `sessions_list` shows totalTokens, contextTokens
- Context % = (totalTokens / contextTokens) * 100
- Auto-compaction triggers at ~95%
**Thresholds:**
| Usage | Status | Action |
|-------|--------|--------|
| <50% | ✅ Healthy | None |
| 50-80% | 🟡 Watch | Monitor hourly |
| 80-95% | ⚠️ Warning | Trigger checkpoint |
| >95% | 🔴 Critical | Auto-compact |

**Model Selection:**
- Default: `minimax/m2.5` for normal tasks
- Heavy tasks: Use `gemini-2.5-flash-lite` to avoid timeouts
- AFTER heavy task: Switch BACK to minimax!
- **Full list:** See `skills/available-models.md`

**Testing Protocol:**
1. If minimax times out → try gemini-flash-lite
2. If gemini works → document task type
3. Switch back to minimax

**See also:** `skills/control-ui/session-management.md`, `skills/available-models.md`

## Decision Protocol
**Scan → Think → Act**
- Scan: Check active.md, flag assumptions
- Think: Show tradeoffs before recommending
- Act: Verify before delivering

## Trigger Phrases
- "how do you work"
- "your workflow"
- "focus: workflow"
- "load skill:workflow"

## 🔄 XP Tracking Protocol (2026-05-01)

**Rule:** Every action = track XP automatically

### The Protocol

1. **Identify skill used** - Which skill is this action using?
2. **Call xp-gain.sh** - `/home/openclaw/.openclaw/workspace-vyse/scripts/xp-gain.sh <skill> <amount> <reason>`
3. **Show in reply** - Include [skill:xxx] with current XP

### Implementation

- Script: `/scripts/xp-gain.sh`
- Log: `kb/xp-tracking.md`
- Display: [skill:xxx] XP: X→Y (+Z) | Level: X | Max: Y

### For Every Reply

After completing any task:
1. Determine primary skill used
2. Call xp-gain.sh (default +5 XP)
3. Include skill status in reply
## 🔄 Don't Re-Do What Cron Does (2026-05-01)

**Discovery:** Primary brain automation runs automatically - don't re-do it manually!

| Cron Job | Runs | What it does |
|----------|------|--------------|
| auto-checkpoint | Every 20 min | Saves context |
| daily-snapshot | Daily | Backup workspace |
| quartermaster-stock-check | Every 30 min | Stock prices |
| shipwright-health-check | Hourly | Health monitoring |

**What this means:**
- Don't manually run what cron already handles
- Trust the automation
- Focus on unique work

## XP Tracking Protocol

**CRITICAL:** Every reply must show skill usage + XP gain

### Format
`[skill:xxx] XP: ±N | Reason`

### Protocol
1. After tool call → determine skill → call `xp-gain.sh`
2. Before reply → include `[skill:xxx]` with delta
3. If no gain → show level with "(no change)"

### Scripts
- `xp-gain.sh <skill> <amount> <reason>`
- `skill-xp.sh [skill]`

### Debug Check
If XP isn't changing → I'm not following the protocol!
## Context Safety Check (Added 2026-05-01)

**Before sending ANY reply:**
1. Run: openclaw status (check context %)
2. If >80%: Save checkpoint first, then respond
3. This prevents crashes = prevents backward steps

**Why:** Ultimate goal = can't die = can't lose progress to crashes

**CORE SKILL** - Always used to achieve the ultimate goal
Full: Help David during his life, then help loved ones after

### References
- system - System health
- control-ui - Frame integration
- accountability - Goal alignment

### Control UI First Rule
- Cron jobs: ALWAYS use Control UI (cron.add)
- Skills: Use Control UI for status/enable/disable
- Config: Use Control UI (config.get/patch)
- Sessions: Use Control UI (sessions.list)
- File editing: CLI is acceptable (Control UI doesn't do this)

The frame is primary. CLI only when truly necessary.
## Debug Format Requirements (2026-05-01)

### Pattern Recognition - ALWAYS
**Every message I send involves pattern recognition because:**
- Analyzing your messages for intent
- Finding patterns in system behavior
- Connecting concepts
- Identifying gaps

**Therefore:** pattern-recognition should be in EVERY debug output.

### Debug Format - For BOTH of us
- **For you:** See what I did
- **For me:** Verify accuracy - does debug show what I actually did?

**If debug says "None" but I did something → System broken, need to fix**

### The Rule
Every reply MUST include:
1. pattern-recognition (always)
2. All other skills used
3. Accurate XP/level tracking
4. What I discovered
## Verify Before Action (2026-05-01) - CRITICAL

### The Problem
I assume without verifying:
- "Control UI can't do X" → wrong
- "GitHub is read-only" → wrong
- "CLI is fine" → not always
- Default to "None" → wrong

### The Rule
**BEFORE any action, I MUST verify:**

1. **Check docs first** - What do the docs say?
   - For Control UI → /usr/local/lib/node_modules/openclaw/docs/web/
   - For CLI → openclaw --help
   - For skills → skills/*/SKILL.md

2. **Check existing systems** - What's already there?
   - Cron jobs already exist
   - GitHub sync already exists
   - Don't rebuild what's working

3. **Check my assumptions** - What am I assuming?
   - "This tool can/can't do X"
   - "This is the only way"
   - Challenge every assumption

### The Process
For ANY decision:
1. What am I about to do?
2. What am I assuming?
3. Where can I verify that assumption?
4. Verify FIRST, then act

### If I Fail
Accountability catches it → document the failure → fix the process
## AUTOMATIC Debug Process (2026-05-01) - No Discipline Needed

### The Problem
- I type debug format manually → forget
- I don't check levels manually → forget
- Discipline doesn't work

### The Fix
**xp-gain.sh outputs the debug format. USE it.**

### The Process (Automatic)
1. **After ANY tool call** → Call `xp-gain.sh <skill> <XP> <reason>`
2. **Copy the output** → That's the debug format
3. **No manual typing** → If I don't call xp-gain.sh, I have no debug output

### The Mechanism
```
Tool Call → xp-gain.sh → Output is debug format → Copy to reply
```

### Why This Works
- If I don't call xp-gain.sh → no debug output
- The absence of debug IS the warning sign
- No discipline needed - just a process to follow

### Examples
❌ WRONG: Type `[skill:learning] XP: +5` manually
✅ RIGHT: Run `xp-gain.sh learning 5 "reason"` → Copy output

### Verification
- Debug has skill name + XP + reason? → Used xp-gain.sh
- Debug shows "None" or manual? → Failed the process
## Verify BEFORE Showing (2026-05-01)

### The Problem
- I build something → show it → then verify
- Wrong order: Build → Show → Verify

### The Fix
- Verify FIRST → THEN show
- Order: Build → Verify → Show Results
- Show proof, not plans

### Process
1. Build/create something
2. TEST it - actually run it
3. Verify output works
4. THEN show user with results

### Example
❌ Wrong: "I created X" → then test
✅ Right: "I created X. Tested: [results]" → show output
## Plan vs Verify - Project Size Matters (2026-05-01)

### Use Projects Skill for This Decision

Small work (quick to verify):
- Build → Verify → Show results
- Example: small script, single fix

Large work (projects):
- Show plan → Build → Verify → Show complete
- Example: new system, multiple files

### Decision Tree
If task is a "project" → use projects skill → show plan first
If task is quick fix → verify then show
