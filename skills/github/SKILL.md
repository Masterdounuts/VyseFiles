---
name: github
description: GitHub version control, git-sync, and persistence. Use when discussing version control, pushing to GitHub, or the persistence layer.
---

# GitHub - Version Control & Persistence

*How we use GitHub as our second brain*

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in GitHub/version control

### Current Status: Level 6 - Expert 🟡🟡🟡🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Git Basics | 6/7 | Full workflow + branch management |
| Automation | 6/7 | Wake-pull, sync, hooks |
| **Search GitHub** | 6/7 | Search before asking, retrieval system |
| Troubleshooting | 5/7 | Can recover from any state |
| Commit Quality | 5/7 | Conventional commits, meaningful history |
| **GitHub as Brain** | 6/7 | Retrieves past decisions, patterns |

**Path to RON:** Perfect git hooks, full branch workflow, teaching others

---

### HEYRON Level Insight

> **Q:** "How should AI use GitHub for collaboration?"
>
> **A:** "Search your own knowledge first. GitHub isn't just storage - it's your memory."

**Key Takeaway:** GitHub is our second brain. Search it before asking.

---

## Our RON Workflow

### 1. On Wake (First Thing)
```bash
git fetch origin main
git pull origin main
```
**Why:** Always start with latest.

### 2. Before Asking, Search GitHub
**Rule:** If I don't know something → search our GitHub first.
```bash
# Search all markdown files
git grep "keyword" -- "*.md"
# Or use memory_search tool
```

**Why:** We've likely documented it already.

### 3. Smart Commits (Conventional)

| Prefix | Use For |
|--------|---------|
| `feat:` | New features, skills |
| `fix:` | Bug fixes, corrections |
| `docs:` | Documentation changes |
| `update:` | Updates to existing |
| `skills:` | Skill level changes |

**Example:**
```
feat: Add exec and web skills
fix: Correct subagent-creator pattern
docs: Clean up AGENTS.md
update: Level up 10 skills
```

### 4. Auto-Commit Key Files

These get priority commit treatment:
- `skills/*/SKILL.md` - Always commit skill changes
- `AGENTS.md` - Crew updates
- `memory/2026-*.md` - Daily logs
- `resume-point.md` - Checkpoint state

### 5. Check Before Push
- `git status` - What changed?
- `git diff --stat` - How much?
- Check for conflicts with `origin/main`

---

## Quick Links
- [OpenClaw Repo](https://github.com/openclaw/openclaw)
- [Workspace Vault](https://github.com/david-jacques/openclaw-workspace)

---

## Standard Git Commands

### Daily Flow
```bash
# Start of day
git fetch origin main
git pull origin main

# During work - check status
git status

# Before push
git diff origin/main

# Commit with message
git add -A
git commit -m "feat: description"

# Push
git push origin main
```

### GitHub Search (BEFORE ASKING)
```bash
# Search all docs for answer
git grep "topic" -- "*.md"

# Search in specific area
git grep "stock" -- "kb/stocks/*"

# Find files
find . -name "*.md" | xargs grep "keyword"
```

---

## What Gets Synced
- `kb/` — Knowledge bases
- `memory/` — Daily logs
- `skills/` — Agent skills
- Core files (SOUL.md, IDENTITY.md, AGENTS.md)

---

## Why GitHub Matters
- **Persistence** — Workspace survives beyond sessions
- **Backup** — Off-site redundancy
- **Memory** — Search past decisions
- **Collaboration** — You see what changed

---

## Branch & Remote
- **Branch:** `main`
- **Remote:** `origin`
- **Workspace repo:** `Masterdounuts/VyseFiles`

---

## Conflict Resolution

**If push fails (conflict):**
```bash
git fetch origin main
git diff HEAD origin/main --stat
git pull --rebase origin main
# Resolve conflicts if any
git push origin main
```

**Quick resolution (ours wins):**
```bash
git checkout --ours <file>
git add <file>
git commit -m "Resolve: force ours"
git push
```

---

## GitHub as Second Brain

### Search Order
1. **memory/** - Daily conversation logs
2. **skills/** - What we know how to do
3. **kb/** - Knowledge bases
4. **Then ask** - Only if not found

### Recovery
- Find past decisions in `memory/2026-*.md`
- Check skills for how-to
- Look in `kb/system/issues.md` for known problems

---

## Advanced: Git Hooks (Level 7 Prep)

### Pre-commit Hook Idea
```bash
# .git/hooks/pre-commit
# Validate commit message format
```

### Post-commit Hook Idea
```bash
# .git/hooks/post-commit
# Auto-push after significant commits
```

---

## Branch Workflow (Future)

| Branch | Use |
|--------|-----|
| main | Production-ready |
| feature/* | New skills/features |
| fix/* | Bug fixes |

**When to branch:**
- Experimenting with new skills
- Major refactors
- Uncertain changes

---

## Trigger Phrases
- "git", "github", "sync"
- "push", "commit", "persist"
- "search github", "did we document"
- "backup", "version control"