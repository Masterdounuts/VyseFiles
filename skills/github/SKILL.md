---
name: github
description: GitHub version control, git-sync, and persistence. Use when discussing version control, pushing to GitHub, or the persistence layer.
---

# GitHub - Version Control & Persistence

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