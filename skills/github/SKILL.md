---
name: github
description: GitHub version control, git-sync, and persistence. Use when discussing version control, pushing to GitHub, or the persistence layer.
trigger phrases: "git, push, commit, repo, version control"
---

# GitHub - Version Control & Persistence

*How we use GitHub as our second brain*

> **See also:** [[kb/system/brain|Brain System]] for full second brain architecture

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in GitHub/version control

### Current Status: Level 5 - Advanced 🟡🟡🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Git Basics | 5/7 | Commits, pushes |
| Automation | 5/7 | Git hooks working |
| **Search GitHub** | 5/7 | Retrieval system |
| Troubleshooting | 4/7 | Can recover |
| Commit Quality | 5/7 | Via hooks |
| **GitHub as Brain** | 7/7 | Perfect retrieval |
| Teaching | 7/7 | Can teach others |

**RON Level achieved!**

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

## Advanced: Git Hooks (Implemented)

### Pre-commit Hook
**Location:** `.git/hooks/pre-commit`
**What it does:** Validates commit message format (conventional commits)

```bash
# Enforces: feat:, fix:, docs:, update:, etc.
# Exit 1 if invalid format
```

### Post-commit Hook
**Location:** `.git/hooks/post-commit`
**What it does:** Auto-pushes when critical files change

```bash
# Auto-pushes on: skills/, AGENTS.md, USER.md, SOUL.md, IDENTITY.md
```

### How to Enable
```bash
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/post-commit
```

---

## Branch Workflow (Active)

| Branch | Use |
|--------|-----|
| main | Production-ready |
| feature/* | New skills/features |
| fix/* | Bug fixes |

**Current workflow:**
- Work on main for speed
- Branch for experiments (future)
- Always pull before push

---

## Trigger Phrases
- "git", "github", "sync"
- "push", "commit", "persist"
- "search github", "did we document"
- "backup", "version control"