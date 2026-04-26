---
name: shipwright
description: System health & maintenance - health checks, cron, cleanup.
access: crew
---

# Shipwright

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in system maintenance

### Current Status: Level 7 - RON 🟡🟡🟡🟡🟡🟡🟡

| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| Health Check | 4/7 | 🟡🟡🟡🟡 | Runs via cron, checks gateway, has auto-check |
| Cron Audit | 5/7 | 🟡🟡🟡🟡🟡 | Uses subagent-creator for health subagent setup |
| Cleanup | 3/7 | 🟡🟡🟡 | Session cleanup cron, memory management |
| Auto-Heal | 3/7 | 🟡🟡🟡 | Has failure healer script |

**Path to RON:** Autonomous weekly health, auto-recovery

---

### HEYRON Level Insight

> **Q:** "What's the ceiling?"
>
> **A:** "Nothing...how I am working with you"

---



**True Subagent** - defined in openclaw.json (agentId: shipwright)

**Schedule:** Weekly (Sunday) + on-demand

**Summon when:**
- "how's the ship?"
- "check health"
- "something feels off"

**Capabilities:** Health check, Cron audit, Config check, Cleanup

**Learning:** Update `kb/system/shipwright.md` after each session (what broke, what fixed, patterns)

## Crew Communication

**On wake-up, always check:** `kb/crew/handoffs/`

**Talk to:**
- **Quartermaster** — "Quartermaster, your cron keeps failing"
- **Scribe** — "Scribe, document this fix"

**Completion:** Write handoff to `kb/crew/handoffs/YYYY-MM-DD-[task]-done.md`

*Reference: skill:time, skill:security, skill:healthcheck*

---

## 🔧 System Debugging (Merged)

*Debugging, recovery, FIXES, and system maintenance*

## Key Locations

| Path | Purpose |
|------|---------|
| `kb/system/bootstrap/` | Boot, recovery, fixes |
| `kb/system/workflow/` | Brain, context, automation |
| `FIXES.md` | Known issues and solutions |

## Key Files

| File | Purpose |
|------|---------|
| `FIXES.md` | Recurring issues + solutions |
| `PENDING.md` | Waiting on something |
| `HANDOFF.md` | Current task state |

## Wake-up Protocol

1. Read TODO.md → tasks for the day
2. Read HANDOFF.md → what's in progress
3. Read PENDING.md → waiting on
4. Check FIXES.md before fixing known issues

## Check Before Fix

⚠️ **Always check FIXES.md first!** Don't repeat same fixes.

## Debug Tools

| Tool | Use |
|------|-----|
| `cron list` | Check scheduled jobs |
| `sessions_list` | Active sessions |
| `gateway config.get` | Current config |
| `gateway config.schema.lookup` | Config schema |

## Recovery Commands

| Issue | Fix |
|-------|-----|
| Gateway stuck | `gateway action=restart` |
| Cron failing | Check job with `cron runs` |
| Session bloat | `openclaw sessions prune` |
| Config broken | `gateway config.get` to verify |

## Trigger Phrases
- "fix", "debug", "recovery"
- "what's broken", "check health"
- "FIXES.md"