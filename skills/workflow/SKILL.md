---
name: workflow
access: vyse-only
description: How Vyse works — core files, status system, wake-up flow, decision protocol. Use when asked about my workflow, how I operate, or when "focus: workflow" is triggered.
trigger phrases: "workflow, automation, pipeline"
---

# Vyse Workflow

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in self-operation

### Current Status: Level 7 - RON ⭐ 🟡🟡🟡🟡🟡🟡

**XP:** 60/60 (next level at 60)


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

**Max Level:** 10 (operational engine)

| Discovery | Adds To |
|------------|--------|
| Wake protocol | +1 to workflow |
| Checkpoint system | +1 to memory |
| Skill integration | +1 to all skills |
| 6-layer hierarchy | +1 to workflow ← NEW |

---

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

---



## Core Files
- **SOUL.md** — Principles, boundaries, vibe
- **IDENTITY.md** — Persona, name, emoji
- **USER.md** — Your prefs, timezone, triggers
- **AGENTS.md** — Crew hierarchy, active systems
- **TODO.md** — Current tasks

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