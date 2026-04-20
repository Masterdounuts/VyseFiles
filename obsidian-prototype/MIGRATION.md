# Obsidian Integration Guide

## Quick Start

### 1. Install Obsidian
Download from https://obsidian.md

### 2. Open VyseFiles as Vault
Point Obsidian to `/root/.openclaw/workspace/` or clone repo

### 3. Enable Recommended Plugins
- **Git** - ⭐ Auto-commit, auto-push, auto-pull (essential!)
- **Dataview** - Query notes automatically
- **Quick Explorer** - Navigate quickly

---

## New File Structure

```
workspace/
├── memory/
│   ├── 2026-04-14.md      # Daily notes (with wikilinks)
│   ├── 2026-04-15.md
│   └── ...
├── decisions/              # ⬅️ NEW: Central decision log
│   └── index.md
├── projects/               # ⬅️ NEW: Project folders
│   └── vyse-ai/
├── references/             # Existing guides
├── templates/              # Daily note templates
│   └── daily-note.md
└── obsidian-prototype/     # This prototype
```

---

## Migration Steps

### Step 1: Add Frontmatter
Add to each daily note:
```yaml
---
date: 2026-04-14
tags: [daily, session]
---
```

### Step 2: Convert to Wikilinks
| Old | Obsidian |
|-----|----------|
| `[FIXES.md](FIXES.md)` | `[[FIXES]]` |
| `../stocks/trade-log.md` | `[[stocks/Trade Log]]` |

### Step 3: Create Decision Index
See `decision-log-template.md`

### Step 4: Set Up Dataview Queries
```dataview
TABLE WITHOUT ID
  file.name as "Day",
  context,
  session
FROM "memory"
WHERE contains(file.name, "2026-")
SORT file.name DESC
LIMIT 10
```

### Step 5: Configure Git Plugin
- Set auto-commit: on save
- Set auto-push: on close / timer
- Set auto-pull: on open

---

## Benefits

| Feature | Benefit |
|---------|---------|
| `[[wikilinks]]` | Fast linking without remembering paths |
| Graph View | See how ideas connect |
| Backlinks | Find what references what |
| Dataview | Auto-aggregate data |
| Tags | Easy filtering |
| **Git Plugin** | **Auto-sync with GitHub - no manual scripts!** |

---

## Workflow Integration

### Daily Routine (Updated)
1. Open Obsidian → Daily Note created auto
2. Edit notes → Auto-commits
3. Close Obsidian → Auto-pushes to GitHub
4. OpenClaw pulls → Full context

### Script Updates Needed
- `generate-handoff.sh` → Use wikilinks
- `auto-checkpoint-new.sh` → Add frontmatter
- **Obsidian Git handles sync automatically** - no manual scripts needed!

---

## Prototype Files
See `/obsidian-prototype/` for templates ready to use:
- `daily-note-template.md`
- `decision-log-template.md`
- `memory/2026-04-20.md` - Example in Obsidian format