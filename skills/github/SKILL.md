---

name: github
description: GitHub version control, git-sync, and persistence. Use when discussing version control, pushing to GitHub, or the persistence layer.
trigger phrases: "git, push, commit, repo, version control"

# GitHub - Version Control & Persistence

*How we use GitHub as our second brain*

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 38
- Sections: 15
- Subsections: 22
- Lines: 150 / 100 = 1
- Total: 15 + 22 + 1 = 38

## Our Workflow

### 1. On Wake
```bash
git fetch origin main
git pull origin main
```

### 2. Before Asking, Search GitHub
**Rule:** If I don't know → search GitHub first
```bash
git grep "keyword" -- "*.md"
# Or use memory_search tool
```

### 3. Smart Commits

| Prefix | Use For |
|--------|---------|
| `feat:` | New features, skills |
| `fix:` | Bug fixes, corrections |
| `docs:` | Documentation changes |
| `update:` | Updates to existing |

### 4. Auto-Commit Priority
- `skills/*/SKILL.md` - Skill changes
- `AGENTS.md` - Crew updates
- `memory/2026-*.md` - Daily logs

## Standard Commands

```bash
# Start of day
git fetch origin main
git pull origin main

# Commit
git add -A && git commit -m "feat: description"
git push origin main

# Conflict resolution
git pull --rebase origin main
```

## GitHub as Second Brain

### Search Order
1. **memory/** - Daily logs
2. **skills/** - How-to
3. **kb/** - Knowledge bases
4. **Then ask** - Only if not found

### Recovery
- Past decisions: `memory/2026-*.md`
- How-to: `skills/`
- Problems: `kb/system/issues.md`

## Git Hooks

| Hook | What |
|------|------|
| pre-commit | Validates commit format |
| post-commit | Auto-content tracking |

---

## Professional Organization

### Branch Strategy
```
main     → Production-ready
develop  → Integration branch  
feature/ → New features (e.g., feature/trading-skill)
fix/     → Bug fixes (e.g., fix/positions-log)
hotfix/  → Urgent production fixes
```

### Commit Message Standards
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

Types: feat, fix, docs, style, refactor, test, chore

### Pull Request Workflow
1. Branch from `main`
2. Make changes, commit frequently
3. Push and open PR (even if internal)
4. Review own PR first
5. Merge when ready

### Release Management
```bash
# Tag a release
git tag -a v1.0.0 -m "Release: trading skill v1"
git push origin v1.0.0

# List tags
git tag -l
```

### Keeping Clean
```bash
# Remove merged branches
git branch -d feature/trading
git push origin --delete feature/trading

# Squashing commits
git rebase -i HEAD~3
```

---

## Workflow Details

### Daily Sync (Morning)
```bash
git fetch origin main
git pull origin main
```

### Before Big Changes (New Feature)
```bash
git checkout -b feature/new-skill
# Work... commit... push
# Open PR, review, merge
```

### Conflict Resolution
```bash
git fetch origin main
git merge origin/main
# Resolve conflicts
git add -A
git commit -m "merge: resolve conflicts with main"
git push origin main
```

## Trigger Phrases
- "git", "github", "sync"
- "push", "commit", "persist"
- "search github"

### References
- learning - Improvement
- system - Health
