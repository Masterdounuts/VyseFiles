---
name: obsidian
description: Obsidian vault, wikilinks, daily notes, and knowledge management. Use when discussing Obsidian, note-taking, or the wiki system.
---

# Obsidian - Knowledge Management

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in knowledge management

### Current Status: Level 5 - Advanced 🟡🟡🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Vault | 4/7 | Full kb/ structure, 8 hubs |
| Wikilinks | 4/7 | All types: link, display, heading, block |
| Daily Notes | 4/7 | memory/ with date files, auto-sync |
| Git Sync | 5/7 | Auto-push on skills/AGENTS.md, pre-commit validates, post-commit auto-pushes |

**Path to RON:** Auto-linking, perfect recall, perfect organization

### HEYRON Insight: Ask > assume

---



*Vault for memory, wikis, and structured notes*

## Quick Links
- **Vault:** `/home/openclaw/.openclaw/workspace/`
- **Hub:** `kb/system/system.md`

## Wikilinks
| Type | Syntax |
|------|--------|
| Link | `[[note-name]]` |
| Display | `[[note-name|display]]` |
| Heading | `[[note-name#heading]]` |
| Block | `[[note-name^block]]` |

## Structure
```
workspace/
├── kb/              # Knowledge bases (dreams, stocks, etc.)
├── memory/          # Daily conversation logs
├── skills/          # Agent skills
└── AGENTS.md        # Crew hierarchy
```

## Daily Workflow
1. Open Obsidian → Auto-pull from GitHub
2. Edit notes → Auto-commit
3. Close Obsidian → Auto-push to GitHub
4. OpenClaw pulls → Full context

## Plugins
- **Git** — Auto-sync
- **Dataview** — Query notes
- **Quick Explorer** — Fast navigation

## Frontmatter
```yaml
---
date: 2026-04-23
tags: [daily, trading]
---
```

## Wiki Commands
- `wiki_search` — Search pages
- `wiki_get` — Read specific page
- `wiki_apply` — Add synthesis/metadata

## Trigger Phrases
- "obsidian", "wikilink", "vault"
- "knowledge", "notes"