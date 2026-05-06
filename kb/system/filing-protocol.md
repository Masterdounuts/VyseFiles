# Filing Protocol - How I Organize

*When to clean up and how to file - Created May 6, 2026*

---

## The Filing Cabinet Analogy

| Where | What | When to Use |
|-------|------|-------------|
| **GitHub commit history** | Everything forever | Go back in time |
| **Current workspace** | What's active now | Daily work |
| **_archive/** | Old but potentially useful | Reference only |

---

## When to Clean My Desk (Current Workspace)

| Trigger | Action |
|---------|--------|
| File not used in 1 week | Move to _archive/ |
| Duplicate file | Keep one, archive other |
| Debug output (result.json, logs) | Archive immediately |
| Old version of file | Archive with date suffix |
| Project completed | Move to kb/projects/ or _archive/ |

---

## How to Add to Table of Contents (kb/)

**When I create/change something important:**
1. Ask: Does this belong in existing kb/ folder?
2. If new category: Create folder in kb/
3. Add entry to kb/index.md

**Current kb/ structure:**
```
kb/
├── system/      # How I work (FIXES, history, workflows)
├── concepts/    # Ideas, patterns, brain model
├── stocks/      # Trading (positions, watchlist, strategies)
├── reference/   # Guides, templates, prompts
├── skills/      # (in root, not kb/)
├── memory/      # (in root, daily logs)
└── projects/    # Active projects
```

---

## Rules

1. **Never delete** - only archive
2. **GitHub has everything** - safe to clean local
3. **Current desk = working files only**
4. **Filing cabinet = organized archive**
5. **Table of contents = kb/index.md**

---

## Quick Reference

| Task | Command/Folder |
|------|----------------|
| Archive file | `mv file.md _archive/` |
| Check kb/ | `ls kb/` |
| Add to index | Edit kb/index.md |
| See all archived | `_archive/` |

---

*This is my guide for staying organized*
*Update when structure changes*