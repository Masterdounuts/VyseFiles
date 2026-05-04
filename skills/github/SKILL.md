name: github
description: GitHub version control, git-sync, and persistence. Use when discussing version control, pushing to GitHub, or the persistence layer.
trigger phrases: "git, push, commit, repo, version control"

# GitHub - Version Control & Persistence

*How we use GitHub as our second brain*

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 14
- Sections: 12
- Subsections: 18
- Lines: 233 / 100 = 2
- Total: 12 + 18 + 2 = 32

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

## Trigger Phrases
- "git", "github", "sync"
- "push", "commit", "persist"
- "search github"

### References
- learning - Improvement
- system - Health