---
name: github-organizer
description: GitHub organization, cleanup, and structure enforcement. Use when auditing, cleaning, or organizing the workspace repo.
access: vyse-only
---

# GitHub Organizer - Cleanup & Structure

*Maintaining a clean, navigable workspace*

---

## Core Tasks

| Task | Command | When |
|------|---------|------|
| **Audit orphans** | `find . -name "*.md" -links 1` | Find unlinked files |
| **Fix links** | Check all `[[...]]` references | Broken wikilinks |
| **Naming** | Enforce: hubs = one-word, files = kebab-case | Consistency |
| **Dedupe** | Find near-duplicate names | Remove confusion |
| **Archive** | Move old/temp files to memory/archive/ | Keep active clean |

## Quick Commands

```bash
# Find broken links
grep -r "\[\[.*\]\]" --include="*.md" . | grep -v "index\|INDEX"

# Find orphans (no incoming links)
find . -name "*.md" -exec sh -c 'grep -q "{}" ../*.md 2>/dev/null || echo "{}"' \;

# List all hubs
ls kb/*/ -d

# Check for duplicate names
find . -name "*.md" | sort | uniq -d -w 20
```

## Hub Structure Rules

| Rule | Example |
|------|---------|
| **Hubs** | One word: `system`, `stocks`, `dreams` |
| **Hub files** | `kb/system/system.md` (self-referencing) |
| **Sub-hubs** | Folder + index: `kb/stocks/research/` |
| **No hub- prefix** | Use `system.md`, not `hub-system.md` |

## Cleanup Checklist

- [ ] Run `scripts/hub-audit.sh` if exists
- [ ] Check for `hub-*.md` old naming
- [ ] Verify all hubs link to INDEX
- [ ] Check for empty folders
- [ ] Review ORPHANS.md

## When to Run

- After bulk imports
- If graph looks messy in Obsidian
- Before major changes
- "Clean up github"

## Output

After cleanup, commit with descriptive message:
```
git add -A && git commit -m "Cleanup: <what was fixed>"
```

---

## Trigger Phrases
- "organize github", "cleanup github"
- "fix links", "audit orphans"
- "hub structure", "enforce naming"