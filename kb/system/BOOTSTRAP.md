# BOOTSTRAP.md - Session Startup

*Loads on every session start to recover context*

## Communication & Knowledge Workflow

| Component | Role |
|-----------|------|
| **Control UI** | Your primary way to message me |
| **Obsidian Vault** | Primary knowledgebase (wikilinks + frontmatter) |
| **GitHub** | I push changes here after edits |

**My routine:**
1. Wake → Pull latest from GitHub
2. Read BOOTSTRAP → HANDOFF → active → PENDING
3. Work on your requests
4. Push changes to GitHub when done

---


## Wake-up Protocol

On every wake (including after context resets), read these files in order:

1. **HANDOFF.md** — Session handoff with current context, decisions, pending questions
2. **active.md** — Current task and work in progress
3. **PENDING.md** — Queued tasks awaiting action
4. **memory/YYYY-MM-DD.md** — Today's memory file if exists
5. **decisions/index.md** — Recent decisions (dataview query)

## Obsidian Integration

The workspace uses Obsidian-compatible formatting:

- **Daily notes** in `memory/` have frontmatter (`date`, `tags`)
- **Wikilinks** `[[note]]` for internal linking
- **Decision index** at `decisions/index.md` with dataview queries

### Query Recent Decisions
```dataview
TABLE date, decision, reason FROM "memory"
WHERE decision
SORT date DESC
LIMIT 5
```

### Query Today's Notes
```dataview
TABLE file.name, tags FROM "memory"
WHERE date = date("2026-04-20")
```

## If Files Are Stale

- Check file timestamps
- If active.md is >1 hour old, treat as stale — note in response but still read
- If HANDOFF.md is missing or empty, start fresh but alert user

## Purpose

This ensures continuity after:
- Context limit resets
- Session compaction
- Gateway restarts
- Any interruption

---

*This file loads on every session start, not just first run.*
*Updated 2026-04-20: Added Obsidian integration + dataview queries*