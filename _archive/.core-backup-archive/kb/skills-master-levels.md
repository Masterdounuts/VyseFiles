# Skills Master Levels List

*Central source of truth for all skill levels - Updated 2026-04-29*

> 🎯 RON Principle: Max level is NOT fixed at 7. It EXPANDS as we discover new knowledge.
> 
> - Every new drill/script/tool adds to the ceiling
> - When we learn something NEW → max level grows
> - RON = ability to expand, not fixed endpoint

## Dynamic Max for ALL Skills

**Every skill inherits dynamic max from discoveries:**

| Discovery | Adds To |
|------------|--------|
| New drill | +1 to any skill |
| New tool/technique | +1 to skills that use it |
| Pre-save validation | +1 to skill integrity |
| Skill merge | Combined max |

**How it works:**
1. Any new discovery applies to all skills that can use it
2. Max level grows, not fixed
3. RON = expanding capability, not hitting a ceiling

**Master list shows current max:** 11 (was 7)

| Discovery | Max Level Impact |
|------------|------------------|
| Added governance-drill | skill-creator ceiling expands |
| Added 3-tier drill system | learning ceiling expands |
| Merged skills | new skill inherits combined max |
| New tool/technique discovered | Overall ceiling expands |

**Current discovery state:**
- Drills: 4 (skill-drill, master-drill, true-drill, governance-drill)
- Subagents: 3 (Quartermaster, Scribe, Shipwright)
- Tools: All OpenClaw tools now accessible

## RON-Level Skills (7/7) ⭐

| Skill | Level | Achieved | Evidence |
|-------|-------|----------|----------|
| skill-creator | 7/7 | 2026-04-28 | Created 29 skills + 3 drills, can teach |
| learning | 7/7 | 2026-04-28 | Drill system, teaches subagents |
| shipwright | 7/7 | 2026-04-29 | Ran true-drill.sh, autonomous health |

## Level 6 Skills

| Skill | Level | Achieved | Evidence |
|-------|-------|----------|----------|
| control-ui | 6/7 | 2026-04-28 | Added skill loading backbone |
| self-healing | 6/7 | 2026-04-28 | Uses skill-drill.sh |
| system | 6/7 | Before | Debug/recovery expert |
| vyse-core | 6/7 | Before | Identity defined |
| web | 6/7 | Before | Search/fetch/browse |
| alerts | 6/7 | Before | Alert templates |
| scribe | 6/7 | 2026-04-29 | Ran governance drill |
| quartermaster | 6/7 | 2026-04-29 | Stock fetch verified |

## Level 5 Skills

| Skill | Level | Notes |
|-------|-------|-------|
| crew-protocols | 5/7 | Decision framework |
| exec | 5/7 | Shell commands |
| github | 5/7 | Version control |
| memory | 5/7 | Recall system |
| time | 5/7 | Scheduling |
| workflow | 5/7 | Wake/protocol |
| projects | 5/7 | Game dev |
| dreams | 5/7 | Vision |
| security | 5/7 | Hardening |
| telegram-crew | 5/7 | Group |
| subagent-creator | 5/7 | Spawn patterns |
| **alerts** | 6/7 | ⚠️ DEPRECATED → messaging |
| **telegram** | 3/7 | ⚠️ DEPRECATED → messaging |
| **scribe** | 6/7 | ⚠️ DEPRECATED → knowledge |
| **obsidian** | 5/7 | ⚠️ DEPRECATED → knowledge |

## NEW Merged Skills

| Skill | Level | Combined From |
## New Skills (As-Needed)

| Skill | Level | Created When |
|-------|-------|---------------|
| drill-runner | 5/7 | Needed systematic drill execution |
|-------|-------|---------------|
| messaging | 6/7 | alerts (6) + telegram (3) |
| knowledge | 6/7 | scribe (6) + obsidian (5) |

## Level 4 Skills

| Skill | Level | Notes |
|-------|-------|-------|
| learning | 4/7 | Was 3→4 tonight |
| shipwright | 4/7 | Was 4→6 tonight |

## Level 3 Skills (Deprecated - Merged)

| Skill | Level | Notes |
|-------|-------|-------|
| context | 3/7 | ⚠️ DEPRECATED - merged to workflow |
| recovery | 3/7 | ⚠️ DEPRECATED - merged to self-healing |
| self-audit | 3/7 | ⚠️ DEPRECATED - merged to learning |
| system-admin | 3/7 | Process management |

> Note: context, recovery, self-audit are now merged into parent skills. Kept for reference only.

## Core Skills (always:true)

These load on every session - essential operations:

| Skill | Purpose |
|-------|---------|
| system | Debugging, recovery, fixes |
| control-ui | Dashboard, status monitoring |
| exec | Shell command execution |
| web | Search, fetch, browser |
| time | Timezone, scheduling, cron |
| crew-protocols | Decision framework, communication |

---

## Drill System

Three tiers of verification:

| Tier | Drill | Purpose |
|------|-------|---------|
| 1 | skill-drill.sh | System health (triggers, orphans) |
| 2 | master-drill.sh | Basic capability (files exist) |
| 3 | true-drill.sh | Execution verification (real ops) |
| 4 | governance-drill.sh | Skill governance (conflicts, bloat) |

---

## Subagents (Crew)

| Subagent | Role | Current Level | Soul/Config |
|----------|------|---------------|-------------|
| Quartermaster | Stock trading | 6/7 | `agents/quartermaster/agent/` |
| Scribe | Knowledge management | 6/7 | `agents/scribe/agent/` |
| Shipwright | System health | RON ⭐ | `agents/shipwright/agent/` |

> Note: Each subagent's config is in `agents/{name}/agent/` - that's their soul. Don't duplicate here.

---

---

## Viewing in Control UI

This master list can be viewed via:
- **Control UI → Settings → Infrastructure** (view cron/services)
- Or have Scribe retrieve: "show me skills-master-levels"

## Second Brain Backup

This file is the second brain - Scribe can retrieve if context is lost.

*Updated: 2026-04-29 00:48 UTC*