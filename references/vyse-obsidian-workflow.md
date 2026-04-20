# Vyse + Obsidian Workflow
---
[[INDEX.md|← Back]]

## Daily Flow

### Morning (You)
1. Open Obsidian → Pull from GitHub
2. Today's note auto-created (or use template)
3. Work throughout the day

### After Our Sessions (Me)
1. I write to memory files
2. Auto-commits + pushes to GitHub
3. You pull → see updates in Obsidian

### On My Wake (After compaction/restart)
1. Read `BOOTSTRAP.md` → knows Obsidian structure
2. Query `decisions/index.md` for recent decisions
3. Read today's memory file
4. Continue work

## Key Files

| File | Purpose |
|------|---------|
| `memory/YYYY-MM-DD.md` | Daily log with frontmatter |
| `decisions/index.md` | Central decision tracker (dataview) |
| `templates/daily-note.md` | Template for new notes |
| `BOOTSTRAP.md` | My startup protocol |

## Scripts

| Script | Purpose |
|--------|---------|
| `generate-handoff.sh` | Creates session handoff (dynamic date) |
| `create-daily-note.sh` | Creates daily note with frontmatter |

## Dataview Queries

### Recent Decisions
````dataview
TABLE date, decision, reason FROM "memory"
WHERE decision
SORT date DESC
LIMIT 5
````

### Today's Tasks
````dataview
TASK FROM "memory"
WHERE date = date("2026-04-20")
````

## Git Workflow
- Obsidian Git plugin: auto-commit on save, auto-push on close
- My scripts commit + push after changes
- No manual sync needed

---
*Updated 2026-04-20*-e 
---
[[INDEX.md|← Back]]
