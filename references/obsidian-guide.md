# Obsidian Quick Reference

## Wikilinks
| Type | Syntax |
|------|--------|
| Link to note | `[[note-name]]` |
| Link with display | `[[note-name|display text]]` |
| Link to heading | `[[note-name#heading]]` |
| Link to block | `[[note-name^block]]` |

## Frontmatter
```yaml
---
date: 2026-04-20
tags: [daily, trading]
---
```

## Dataview Queries
```dataview
TABLE date, tags FROM "memory"
```

## Plugins to Enable
- **Git** - Auto-sync (essential!)
- **Dataview** - Query notes
- **Quick Explorer** - Fast navigation

## Daily Workflow
1. Open Obsidian → Auto-pull from GitHub
2. Edit notes → Auto-commit
3. Close Obsidian → Auto-push to GitHub
4. OpenClaw pulls → Full context

## File Structure
```
workspace/
├── memory/          # Daily notes
├── decisions/       # Decision log
├── projects/        # Project folders
├── references/      # Guides
├── templates/       # Note templates
└── obsidian-prototype/
```

---
*Part of VyseFiles Obsidian Integration*