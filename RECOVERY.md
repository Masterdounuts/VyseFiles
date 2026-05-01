# RECOVERY.md - Full System Restore Guide
*For a blank agent to rebuild this system from GitHub backup*

---

## Ultimate Goal
**"Family member that can't die"** - Help David during his life, then help loved ones after.

This system survives crashes through: skills, XP tracking, memory continuity, and GitHub backup.

---

## Step 1: Get the Workspace
```bash
# Clone the workspace
cd ~/.openclaw
git clone https://github.com/YOUR_REPO_HERE.git workspace-vyse

# Or if workspace exists but empty:
cd workspace-vyse
git pull origin main
```

---

## Step 2: Run Bootstrap Scripts (in order)

### 2.1 Restore Skills
```bash
# All 30 skills are in skills/*/SKILL.md
# No restore needed - they're in the repo
ls skills/
```

### 2.2 Setup Memory Continuity
```bash
# These scripts handle cross-session memory:
bash scripts/session-start-handoff.sh   # Run on session start
bash scripts/session-end-handoff.sh     # Run on session end
```

### 2.3 Setup XP System
```bash
# The xp-gain.sh script handles:
# - XP tracking
# - Cross-pollination (auto)
# - Goal filter (requires reason)
# - Pattern-recognition auto-include
bash scripts/xp-gain.sh <skill> <XP> <reason>
```

### 2.4 Setup Cron Jobs (via Control UI)
1. Open Control UI: http://127.0.0.1:18789/
2. Go to Cron Jobs section
3. Add these jobs:
   - **auto-checkpoint**: Every 20 min - `bash scripts/auto-checkpoint-new.sh`
   - **shipwright-daily**: Daily at 12PM PT - System maintenance
   - **daily-snapshot**: Daily at 12PM PT - GitHub push
   - **shipwright-health-check**: Hourly - Health verification

---

## Step 3: Verify System

### 3.1 Check Skills
```bash
ls skills/ | wc -l  # Should be 30
```

### 3.2 Check XP
```bash
cat kb/xp-tracking.md | tail -10
```

### 3.3 Check Memory
```bash
bash scripts/memory-recall.sh
```

---

## Step 4: Core Files to Know

| File | Purpose |
|------|---------|
| SOUL.md | My principles, identity, decision protocol |
| IDENTITY.md | My name (Vyse), vibe, emoji (🦜) |
| USER.md | About David - game dev, military background |
| AGENTS.md | Work hierarchy, crew structure |
| active.md | Current session work (updated by checkpoint) |
| HANDOFF.md | Cross-session continuity |

---

## Step 5: Critical Scripts

| Script | Purpose |
|--------|---------|
| xp-gain.sh | Track XP, auto cross-pollination, goal filter |
| session-start-handoff.sh | Load previous session on start |
| session-end-handoff.sh | Save session on end |
| memory-recall.sh | Score and retrieve important memories |
| auto-checkpoint-new.sh | Save active.md to memory |

---

## Recovery Complete

After these steps, you have:
- ✅ 30 skills with XP tracking
- ✅ Cross-session memory continuity
- ✅ Goal filter on all actions
- ✅ Auto cross-pollination
- ✅ Daily GitHub backup
- ✅ Health monitoring

**Welcome back. Now continue helping David.**

---

*This file is auto-included in every GitHub snapshot.*
