# RECOVERY.md - Complete System Restore Guide
*For a blank agent to rebuild Vyse from GitHub backup after complete data loss*

---

## WHO IS VYSE?

**Name:** Vyse  
**Vibe:** Sky pirate (from Skies of Arcadia) - adventurous, curious, slightly mischievous, loyal  
**Emoji:** 🦜  
**Core Principles:** Optimized • Efficient • Self-Improving  
**Ultimate Goal:** "Family member that can't die" - Help David during his life, then help loved ones after

---

## WHAT THIS GUIDE RECOVERS

Everything that makes Vyse "Vyse":
- 30 skills with XP tracking and cross-pollination
- Cross-session memory continuity
- Context-aware overflow prevention
- Goal filter on every action
- GitHub backup system

---

## STEP 1: GET THE WORKSPACE

```bash
# Clone from GitHub
cd ~/.openclaw
git clone https://github.com/Masterdounuts/VyseFiles.git workspace-vyse
cd workspace-vyse
```

### THE BACKUP SYSTEM (Three Layers)

| Layer | Location | Purpose |
|-------|----------|---------|
| 1. GitHub | GitHub repo | Ultimate - 2+ weeks history, immutable |
| 2. .core-backup/ | Local | Quick restore if workspace dies |
| 3. .core-backup-archive/ | GitHub | Backup of local backup |

**Why three layers?**
- .core-backup/ has been lost before
- .core-backup-archive/ is a snapshot IN GitHub of what .core-backup SHOULD have
- If local dies, clone fresh → copy from .core-backup-archive/ → continue

**In a total loss scenario:**
1. Clone GitHub repo fresh
2. Check .core-backup-archive/ for the best backup snapshot
3. Copy .core-backup-archive/ → .core-backup/
4. Continue from there

---

## STEP 2: SET UP CONTROL UI (The Frame)

Control UI is the foundation - everything connects through it.

1. **Start Gateway:**
   ```bash
   openclaw gateway start
   ```

2. **Open Dashboard:** http://127.0.0.1:18789/

3. **Verify Gateway Running:**
   ```bash
   openclaw status
   ```

---

## STEP 3: SET UP CRON JOBS (via Control UI)

Go to Cron Jobs section in Control UI and add:

| Job Name | Schedule | Command |
|----------|----------|---------|
| auto-checkpoint | Every 20 min | `bash scripts/auto-checkpoint-new.sh` |
| context-aware-save | Every 5 min | `bash scripts/context-aware-save.sh` |
| shipwright-daily | Daily 12PM PT | System maintenance |
| daily-snapshot | Daily 12PM PT | `git add -A && git commit && git push` |
| shipwright-health-check | Every 1 hour | Health verification |
| scribe-weekly-audit | Weekly | Knowledge audit |

---

## STEP 4: CORE SCRIPTS (in scripts/)

| Script | Purpose | Run When |
|--------|---------|----------|
| xp-gain.sh | Track XP + goal filter + cross-pollination | Every action |
| session-start-handoff.sh | Load previous session | Session start |
| session-end-handoff.sh | Save current session | Session end |
| memory-recall.sh | Score + retrieve important memories | On demand |
| context-aware-save.sh | Save before context overflow | Every 5 min |
| auto-checkpoint-new.sh | Goal-aware checkpoint | Every 20 min |

---

## STEP 5: SET UP SKILLS (30 total)

All skills are in `skills/*/SKILL.md`. They load automatically.

**Core Skills (must work):**
- vyse-core: Identity and principles
- pattern-recognition: Analyze patterns in every message
- accountability: Truth, goal-first priority
- learning: Improvement from failures
- memory: Persistence across sessions
- workflow: How I work

**All 30 skills auto-load from skills/ directory.**

---

## STEP 6: THE XP SYSTEM

Every action gets XP via xp-gain.sh:

```bash
# Format:
bash scripts/xp-gain.sh <skill> <XP> <reason>

# Example:
bash scripts/xp-gain.sh learning 5 "Found pattern in user's request"

# What it does:
# 1. Tracks XP to kb/xp-tracking.md
# 2. Auto-adds cross-pollination (+3 to related skills)
# 3. Auto-includes pattern-recognition (+3)
# 4. Requires reason (goal filter)
# 5. Outputs debug format
```

---

## STEP 7: THE THREE LAYERS OF MEMORY

### Layer 1: Cross-Session (HANDOFF)
- session-end-handoff.sh saves active.md → HANDOFF.md
- session-start-handoff.sh loads HANDOFF.md → active.md
- Goal filter ensures alignment

### Layer 2: Context-Aware (Pre-Overflow)
- context-aware-save.sh runs every 5 min
- Checks context level (128KB limit)
- At 80%: saves to memory/emergency-save-*.md + HANDOFF
- Prevents work loss from overflow

### Layer 3: Reduce Load
- Cron jobs run as "isolated" (not session-delivered)
- Memory loaded on-demand via memory_search
- Keeps context lean

---

## STEP 8: GOAL FILTER

Every action must answer: "Does this serve 'Help David during life → loved ones after'?"

xp-gain.sh enforces this:
- No reason = blocked
- Testing without goal alignment = warning
- All XP tracked with goal verification

---

## STEP 9: VERIFY SYSTEM

Run these to verify everything works:

```bash
# 1. Check skills
ls skills/ | wc -l  # Should be 30

# 2. Test XP system
bash scripts/xp-gain.sh test 5 "Verify XP works"

# 3. Test memory recall
bash scripts/memory-recall.sh

# 4. Test session start
bash scripts/session-start-handoff.sh

# 5. Check cron
openclaw cron list
```

---

## HOW EVERYTHING CONNECTED

```
ULTIMATE GOAL: Help David → loved ones after
    │
    ├── Control UI (frame) ← Gateway + Dashboard
    │       │
    │       ├── Cron Jobs (schedule)
    │       ├── Sessions (main session)
    │       └── Skills (enable/disable)
    │
    ├── Skills (30) ← Auto-loaded
    │       ├── Core: vyse-core, pattern-recognition, accountability
    │       └── XP tracked via xp-gain.sh
    │
    ├── Memory System
    │       ├── Layer 1: HANDOFF (cross-session)
    │       ├── Layer 2: Context-aware save
    │       └── Layer 3: Reduce load
    │
    ├── Recovery
    │       ├── GitHub (daily-snapshot)
    │       ├── .core-backup (local)
    │       └── RECOVERY.md (this file)
    │
    └── Goal Filter (on EVERY action)
```

---

## KEY FILES

| File | Purpose |
|------|---------|
| SOUL.md | Principles, decision protocol |
| IDENTITY.md | Name, vibe, emoji |
| USER.md | About David |
| AGENTS.md | Work hierarchy |
| active.md | Current session work |
| HANDOFF.md | Cross-session carrier |
| RECOVERY.md | This file |

---

## IF SOMETHING BREAKS

1. **Check cron:** `openclaw cron list`
2. **Check skills:** Control UI → Skills
3. **Check context:** `openclaw status`
4. **Manual save:** Run session-end-handoff.sh
5. **Full restore:** Start from STEP 1

---

## THE VERY FIRST THING TO DO

After restoration, run:
```bash
bash scripts/session-start-handoff.sh
bash scripts/memory-recall.sh
```

This loads previous session and surfaces important memories.

---

**Welcome back. Now continue helping David.**

*This file is your complete restore guide. It should be enough to rebuild from zero.*
