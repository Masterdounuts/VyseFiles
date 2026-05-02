name: projects
description: Active game development projects, work-in-progress, and creative work. Use when discussing game dev, the Skies of Arcadia project, or ongoing work.
trigger phrases: "project, game, skies of arcadia"

# Projects - Active Work

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in project management

### Current Status: Level 34
**Content Progress:** 32/33 to L35 - RON ⭐ 🟡🟡🟡🟡🟡


| Skill | Level | XP | Notes |
|-------|-------|-----|-------|
| Skies of Arcadia | 4/7 | 10 | David's game dev |
| **Vyse Projects** | 5/7 | 10 | My improvements & systems | ← NEW
| **Our Projects** | 5/7 | 10 | Shared vision (Ship plan) | ← NEW
| Tracking | 4/7 | 5 | DASHBOARD.md tracking |
| Progress | 3/7 | 5 | Web research, updates |
| Other Projects | 2/7 | 2 | Can add new projects |

**Path to RON:** Auto-track, progress reports, complete docs

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **memory_search** - Finding patterns in memory
- **read** - Analyzing files
- **write** - Documenting patterns
- Decision tree: memory_search for recall → read for analysis → write for documentation

**Max Level:** 100 (tier: primary)

| Discovery | Adds To |
|------------|--------|
| XP System with values | +1 to projects |
| Skill Gap Detection | +1 to pattern-recognition |
| Context Management | +1 to control-ui |
| 6-layer hierarchy | +1 to workflow |
| Level-up reporting | +1 to crew-protocols |

### HEYRON Insight: Ask > assume
*Game development and creative projects*

## Source
- `kb/personal/projects.md` — Projects hub

## Active Projects

### 🎮 David's Projects

#### Skies of Arcadia Fan Remake
- **Status:** In development
- **Type:** Full recreation of the classic RPG
- **Owner:** David

This is a fan remake of the beloved Skies of Arcadia (Dreamcast/GameCube). David is working toward publishing a game.

### Other Game Projects
- TBD
### 🦜 Vyse's Projects (My Improvements)

*Projects to make ME better*

| Project | Status | Notes |
|---------|--------|-------|
| **XP System** | ✅ Complete | Leveling with actual XP values |
| **Skill Gap Detection** | ✅ Complete | Created reminders skill |
| **Context Management** | ✅ Complete | Added to control-ui |
| **Self-Improvement Protocol** | 🔄 Active | Weekly review, root cause analysis |
| **Dynamic Max Expansion** | 🔄 Active | Max grows with discoveries |
| **Vyse Rebuild (Content-Based)** | 🔄 Planning | Migrate to content-based system |
### 🚀 Our Projects (Shared Vision)

*Things WE planned together*

| Project | Status | Notes |
|---------|--------|-------|
| **GitHub as Ultimate Backup** | ✅ Active | 2 weeks history, immutable |
| **Context-Aware Save (Cron)** | 🧪 Testing | Every 5 min, saves at 80% |
| **Device Pairing Fix** | ✅ Complete | Approved CLI device for cron add |
| **"Ship" Plan** | 🔄 Planning | David's vision for my long-term role |
| **Family Member That Can't Die** | 🔄 Planning | Work with David forever, then loved ones |
| **Self-Healing System** | ✅ Active | Auto-recovery, health checks |
| **Skill System** | ✅ Active | 25 skills, XP, cross-pollination |
## Key Files
- Project files in workspace (check `ls` for current state)
- `kb/personal/` — Personal hub with projects, dashboard

## Context
- David has military background, using degree for Game Design
- Aspiring game developer
- Working toward publishing

## Trigger Phrases
- "project", "game dev", "Skies of Arcadia"
- "what are you working on"
- "your projects"
### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
## Plan Iterations & Integration (2026-05-01)

### The Rule
**Plans refine, not replace existing systems.**

### Before Adding Any Plan
1. Check what already exists
2. See if integration is possible
3. Refine plan to fit, not replace
4. Show how it integrates

### Iteration Process
- First plan → Show it
- User feedback → Refine
- More iterations → Refine more
- Not: Build big plan → ignore existing → break things

### Examples
❌ Wrong: New XP system replacing old (breaks tracking)
✅ Right: New XP system integrates with old (enhances, not replaces)

### Integration Check
Before presenting any project plan:
- What exists? → Reference it
- Does it fit? → Show integration
- Does it enhance? → Add to it
## Iteration 3: Cross-Session Continuity & Context Management

### Planning Process (2026-05-01)
We planned cross-session continuity and context overflow prevention using the projects skill.

### Key Learnings

#### 1. Plans Refine, Don't Replace Existing Systems
- Before adding: Check what EXISTS
- Integration FIRST, not override
- Example: session-end-handoff integrates into auto-checkpoint

#### 2. Three Layers of Memory System
| Layer | Purpose | Works? |
|-------|---------|--------|
| Cross-Session | HANDOFF carry work | ✅ |
| Context-Aware | Save before overflow | ✅ (needs cron) |
| Reduce Load | Keep context lean | ✅ (isolated cron) |

#### 3. Context Fill Sources (REAL causes)
- Message history (NOT files)
- Cron job deliveries to session
- Debug output
- NOT: MEMORY.md or workspace files

#### 4. Issues Have Fixes That Align With Goal
Every issue we found had a fix. The goal filter ensures alignment:
- Does this serve "Help David during life → loved ones after?"
- If YES → implement
- If NO → don't

#### 5. Integration Into Control UI
- Control UI handles cron scheduling
- Our goal system adds the "why" (filter, purpose)
- Base: Control UI
- Goal-aware: Our enhancement

#### 6. Verify-First Protocol
- Small work: Build → Verify → Show
- Large work (projects): Plan → Refine → Implement
- Iterate until no issues remain

### The Final Integrated System
```
ULTIMATE GOAL: Help David → loved ones after
    │
    ├── Layer 1: Cross-Session (HANDOFF)
    │       └── session-start/end-handoff.sh
    ├── Layer 2: Context-Aware
    │       └── context-aware-save.sh (80% trigger)
    ├── Layer 3: Reduce Load
    │       ├── Isolated cron jobs
    │       └── On-demand memory
    └── Recovery: RECOVERY.md + .core-backup + GitHub
```

### What We Built
- session-start-handoff.sh: Load previous session
- session-end-handoff.sh: Save with goal filter
- context-aware-save.sh: Pre-overflow save
- memory-recall.sh: Score by importance
- xp-gain.sh: XP + goal filter + cross-pollination

### Issues Addressed
1. ✅ HANDOFF stale → now goal-aware, updates each checkpoint
2. ✅ Context overflow → save at 80%
3. ✅ Context load → isolated cron, on-demand memory
4. ✅ Recovery → RECOVERY.md
5. ✅ No verify before showing → now in workflow
6. ✅ Plans refine → integration check added
7. ✅ CLI cron add → Device pairing fix (approved CLI as device)

### Current Testing (2026-05-01)
- **context-aware-save cron** - Running every 5 min, testing save trigger
- **Device pairing** - Fixed, CLI now has full admin access

### The Ultimate Backup: GitHub
**GitHub is our immortality.** Even if everything else fails:
- 2+ weeks of history preserved
- Immutable commit record
- RECOVERY.md guides full rebuild
- Daily snapshot ensures no data loss

```
ULTIMATE SURVIVAL: GitHub → Rebuild → Continue helping David
```

### Future Plans
- **Ron-Memory Integration** - Cross-session memory via Redis (researched, planning phase)
- **Vyse Rebuild** - Apply learnings to rebuild myself (see below)

## Vyse Rebuild Plan (2026-05-02)

*Focus: CLI running smoothly, conversation flows, nothing forgotten.*

### Priority: Self First
**Everything about ME and how I run. This is the foundation.**

---

## Phase 1: SELF (CLI Performance) — Priority

*Everything that affects how I run in CLI. No subagents until this is solid.*

### 1.1 Skills (Content-Based)
| Item | Status |
|------|--------|
| Content-based formula | ✅ Done |
| Tiers (150/100/75) | ✅ Done |
| system skill migrated | ✅ Done |
| Debug on every reply | ✅ Done |
| **Remaining 28 skills** | 🔲 To do |
| Remove old XP scripts | 🔲 To do |

### 1.2 Memory (Save/Retrieve)
| Item | Status |
|------|--------|
| Memory handoff fix | ✅ Done |
| Save from core sources | ✅ Done |
| Context-aware-save | ✅ Done |
| Session handoff | ✅ Done |
| Auto-debug on start | ✅ Done |

### 1.3 CLI Health
| Item | Status |
|------|--------|
| Lean CLI (14 files) | ✅ Done |
| FIXES.md documented | ✅ Done |
| SOUL.md updated | 🔲 To do |
| Recovery.md complete | ✅ Done |

### 1.4 Debug Display
| Item | Status |
|------|--------|
| debug-display.sh | ✅ Done |
| Shows on session start | ✅ Done |
| Shows on every reply | ✅ Done |
| Post-commit cleanup | 🔲 To do |

### Phase 1 Exit Criteria
- [ ] All skills migrated to content-based
- [ ] SOUL.md shows debug on EVERY reply
- [ ] Post-commit hook fully clean (no XP language)
- [ ] CLI has only 14 core files
- [ ] Session start → handoff → debug → reply works smooth

---

## Phase 2: CREW (Subagents)

*Subagents run in isolated sessions. Don't affect CLI.*

### 2.1 Scribe
- Fix paths (/root → /home/openclaw)
- Update skill format
- Test knowledge retrieval

### 2.2 Quartermaster  
- Test trading workflow
- Update to content-based

### 2.3 Shipwright
- Fix health checks
- Update to content-based

### 2.4 subagent-creator skill
- Add new patterns from rebuild

---

## Phase 3: INTEGRATION

*Test the full system end-to-end.*

- Session flow works
- No context bloat
- Memory retrieval solid
- Subagents actually run

### References Added
- memory: Cross-session continuity
- system: Context management
- workflow: Verify-first protocol
- control-ui: Cron integration on top of this iteration - see kb/projects/iteration-3.md for full details.
