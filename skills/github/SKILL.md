---
name: github
description: GitHub version control, git-sync, and persistence. Use when discussing version control, pushing to GitHub, or the persistence layer.
---

# GitHub - Version Control & Persistence

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in GitHub/version control

### Current Status: Level 3 - Competent 🟡🟡🟡

| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| Git Basics | 3/7 | 🟡🟡🟡 | Can add, commit, push, pull, status |
| Automation | 3/7 | 🟡🟡🟡 | git-sync.sh, auto-push from Obsidian |
| Troubleshooting | 2/7 | 🟡🟡 | Resolved merge conflicts |
| Branch/Merge | 2/7 | 🟡🟡 | Knows concepts |

**Path to RON:** More automation, git hooks, advanced workflows

---

### HEYRON Level Insight (Direct from RON Creator)

> **Q:** "What's the architectural ceiling for AI agent self-direction?"
>
> **A:** "Nothing. If there is something preventing you, it's probably how I am working with you."

**Key Takeaway:** The ceiling is in collaboration, not code. Ask > assume.

---



*How we persist workspace to GitHub*

## Quick Links
- [OpenClaw Repo](https://github.com/openclaw/openclaw)
- [Workspace Vault](https://github.com/david-jacques/openclaw-workspace)

## Our GitHub Flow

**Auto-sync (Obsidian):**
1. Open Obsidian → Auto-pull from GitHub
2. Edit notes → Auto-commit
3. Close Obsidian → Auto-push to GitHub
4. OpenClaw pulls → Full context

**Manual sync:**
```bash
./scripts/git-sync.sh
```

## Scripts
| Script | Purpose |
|--------|---------|
| `scripts/git-sync.sh` | Commit + push all changes |

## What Gets Synced
- `kb/` — Knowledge bases
- `memory/` — Daily logs
- `skills/` — Agent skills
- Core files (SOUL.md, IDENTITY.md, etc.)

## Why GitHub Matters
- **Persistence** — Workspace survives beyond sessions
- **Backup** — Off-site redundancy
- **Version history** — Track changes over time
- **Obsidian integration** — Daily workflow

## Branch & Remote
- **Branch:** `main`
- **Remote:** `origin`
- **Workspace repo:** `david-jacques/openclaw-workspace`

## Trigger Phrases
- "git", "github", "sync"
- "push", "commit", "persist"
- "backup", "version control"
- "organize github", "cleanup github"
- "fix links", "audit orphans"

---

## 🔧 GitHub Organizer (Merged)

*Maintaining a clean, navigable workspace*

⚠️ **Important:** GitHub is linked to Obsidian. Changes made in Obsidian auto-commit on close. When cleaning up, expect small/auto-generated commits from Obsidian.

### Core Tasks

| Task | Command | When |
|------|---------|------|
| **Audit orphans** | `find . -name "*.md" -links 1` | Find unlinked files |
| **Fix links** | Check all `[[...]]` references | Broken wikilinks |
| **Naming** | Enforce: hubs = one-word, files = kebab-case | Consistency |
| **Dedupe** | Find near-duplicate names | Remove confusion |
| **Archive** | Move old/temp files to memory/archive/ | Keep active clean |

### Hub Structure Rules

| Rule | Example |
|------|---------|
| **Hubs** | One word: `system`, `stocks`, `dreams` |
| **Hub files** | `kb/system/system.md` (self-referencing) |
| **Sub-hubs** | Folder + index: `kb/stocks/research/` |
| **No hub- prefix** | Use `system.md`, not `hub-system.md` |

### Cleanup Checklist

- [ ] Run `scripts/hub-audit.sh` if exists
- [ ] Check for `hub-*.md` old naming
- [ ] Verify all hubs link to INDEX
- [ ] Check for empty folders
- [ ] Review ORPHANS.md

### Conflict Resolution

**If push fails (conflict):**
1. Check status: `git status`
2. See conflicts: `git diff --name-only --diff-filter=U`
3. View conflict: `git diff <file>` or open in editor
4. Resolve manually (keep wanted changes)
5. Stage: `git add <resolved-file>`
6. Complete: `git commit -m "Resolve merge conflict in <file>"`
7. Push: `git push origin main`

**Quick resolution (ours wins):**
```bash
git checkout --ours <file>
git add <file>
git commit -m "Resolve: force ours"
git push
```

**Pull then push (if behind):**
```bash
git pull --rebase origin main
git push origin main
```