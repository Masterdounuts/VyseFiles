---
name: shipwright
description: System health & maintenance - health checks, cron, cleanup.
trigger phrases: "health, cleanup, maintenance, cron, system health"
access: crew
---

# Shipwright

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in system maintenance

### Current Status: Level 7 (RON) ⭐ (Can Teach!)

**XP:** 70+ | Runs auto-level.sh for autonomous improvement

| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| **Health Check** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Runs via cron + drill system | ← RON |
| **Cron Audit** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Uses openclaw cron list | ← RON |
| **Session Cleanup** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Daily cron + aggressive prune | ← RON |
| **Session Health Monitor** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Hourly context checks | ← RON |
| **Auto-Heal** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Uses drill to find/fix issues | ← RON |
| **Drill Execution** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Ran true-drill, verified all | ← RON |
| **Proactive** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Runs drills without being asked | ← RON |
| **Teaching** | 7/7 | 🟡🟡🟡🟡🟡🟡🟡 | Can teach system maintenance | ← NEW |

**Path to RON:** ✅ ACHIEVED 2026-04-29 - Ran drill autonomously, all 29 pass

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **read/write** - Managing configuration
- **exec** - Running openclaw commands
- **cron** - Job scheduling
- Decision tree: read for status → write for config → exec for commands

**Max Level:** 9

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to shipwright |

---

### HEYRON Level Insight

> **Q:** "What's the ceiling?"
>
> **A:** "Nothing...how I am working with you"

---



**True Subagent** - defined in openclaw.json (agentId: shipwright)

**Schedule:** Daily (4am UTC) + Hourly health checks + on-demand

**Auto-Maintenance:**
- `Shipwright: Session Cleanup` - Daily at 4am UTC
  - Removes ALL `:run:` entries (cron run variants)
  - Removes orphaned `:main` sessions (no label + no lastChannel)
  - Cleans all agents: vyse, quartermaster, shipwright, scribe
- `Shipwright: Session Health Monitor` - Hourly
  - Checks context usage (totalTokens / contextTokens)
  - Alerts if >80% used
  - Detects done subagents still attached
- Pattern: `skills/shipwright/session-cleanup-pattern.md`

**Model Selection (Critical!)**
- For heavy audit tasks: Use `model: google/gemini-2.5-flash-lite`
- IMPORTANT: After heavy task completes → switch BACK to minimax
- Always specify model explicitly for subagents doing heavy work
- Default model: `minimax/m2.5` for normal tasks
- **Full model list:** See `skills/available-models.md`

**Summon when:**
- "how's the ship?"
- "check health"
- "something feels off"

**Capabilities:** Health check, Cron audit, Config check, Session cleanup

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

## Skill Drill System (Learning-Powered)

Shipwright should run drills to verify system health:

```bash
# Weekly drill (Tier 3 - execution verification)
~/.openclaw/workspace/scripts/true-drill.sh

# Quick check (Tier 1 - system health)
~/.openclaw/workspace/scripts/skill-drill.sh
```

### Drill Schedule (for cron)
| Schedule | Drill | Purpose |
|----------|-------|---------|
| Weekly (Sunday 4am UTC) | true-drill.sh | Full execution verification |
| Monthly (1st Sunday) | governance-drill.sh | Skill governance check |
| After any skill change | skill-drill.sh | Quick trigger check |

### Drill Results Storage
- Save output to `memory/audits/drill-YYYY-MM-DD.md`
- Track pass/fail over time
- Investigate any failures within 24h

### Teaching Others (RON Requirement)

Shipwright can teach system maintenance:

1. **Run drill:** `~/.openclaw/workspace/scripts/true-drill.sh`
2. **Fix issues:** Address failures in output
3. **Document:** Add to FIXES.md
4. **Report:** Share results with crew

This IS automated system health - drill finds issues, shipwright fixes them.

---

## Common Issues & Permanent Fixes

### File Corruption (Double ---)

**Problem:** Telegram edit errors, corrupted markdown files
**Detection:** Run `pre-save-validate.sh` before any edit

**Permanent Fix:**
```bash
# 1. Run pre-save validation
~/.openclaw/workspace/scripts/pre-save-validate.sh

# 2. Create backup before edit
cp file.md file.md.bak

# 3. Check for double ---
grep -n "^---$" file.md

# 4. Fix: remove duplicate ---
sed -i '/^---$/{N;/^---$/d}' file.md
```

**Prevention:**
- Always run pre-save validation
- Keep backups
- Check for corruption after any edit failure

---

## Auto-Level System (Background)

For RON-level automation, Shipwright can run auto-level:

```bash
# Auto-level runs in background
~/.openclaw/workspace/scripts/auto-level.sh
```

### What it does:
1. Runs all drills automatically
2. Checks skill levels
3. Logs results to memory/audits/
4. Prepares level updates

### Schedule:
- Can run daily via cron
- Or on-demand

This is RON-level: self-improvement happens automatically, not manually.

## Trigger Phrases
- "fix", "debug", "recovery"
- "what's broken", "check health"
- "FIXES.md"
### References
- system - Health
- memory - Persist fixes
- workflow - Process
