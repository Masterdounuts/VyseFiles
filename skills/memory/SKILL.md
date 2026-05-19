---
name: memory
access: public
description: How Vyse remembers, recalls, and manages context. Use when discussing memory, recall, or context management.
trigger phrases: "remember, recall, memory, past, what were we, context"
---

# Memory - Recall System

*Simplified structure: one clear source for each purpose*

## Architecture

| Layer | Source | Purpose | Update Frequency |
|-------|--------|---------|------------------|
| **Active Context** | Notion via notion-query.cjs | What I need NOW | Every wake-up |
| **Daily Logs** | memory/YYYY-MM-DD.md | Raw conversation | End of session |
| **Long-term** | MEMORY.md | Curated learnings | Weekly review |
| **Search** | session-persistence SQLite | Full-text search | Every 15 min (cron) |

**Key Principle:** Each layer has ONE purpose. No overlap.

---

## Wake-up Sequence (On Every Start)

0. Read SOUL.md → protocol (accountability, content format, rules)

1. **Run notion-query.cjs** to get:
   - Active tasks
   - Recent decisions (last 3)
   - Positions (trading)
   - Knowledge (insights logged)
   - Preferences (from USER.md)

2. Check context % (use session_status)

3. Show debug status

---

## What Goes Where

### Notion (Active Context)
- Active tasks and goals
- Recent decisions (keep last 3)
- Trading positions
- User preferences
- Logged insights (from Composio)
- Error tracking

### memory/YYYY-MM-DD.md (Daily Logs)
- Raw conversation logs
- What was accomplished
- What was decided
- Technical discoveries
- End-of-session summaries

### MEMORY.md (Long-term)
- Curated learnings (promoted from daily)
- David's preferences (settled)
- Key decisions
- Vision/goals
- Skills and capabilities

### session-persistence SQLite (Search)
- Full-text search across all sessions
- Use when you need to find something specific
- NOT for daily recall (use Notion instead)

---

## Retrieval Priority

| Need | Use |
|------|-----|
| Current context | notion-query.cjs |
| Today's work | memory/2026-05-18.md |
| Long-term memory | MEMORY.md |
| Find something specific | session-persistence |
| Recall past decision | Notion decisions |

---

## Memory Hygiene Rules

1. **Don't duplicate** - If it's in Notion, don't add to local files
2. **Promote weekly** - Move insights from daily to MEMORY.md
3. **Clean daily** - Archive old memory files monthly
4. **Verify sync** - Check Notion sync is working each day

---

## Integration

### HEARTBEAT.md calls:
```
## Notion Sync (Every Wake-up)
node notion-query.cjs active
node notion-query.cjs decisions 3
node notion-query.cjs positions
node notion-query.cjs query knowledge

## Daily Log (End of Session)
Write to memory/YYYY-MM-DD.md
```

---

## Reflection 2026-05-18

### What I Learned
- Notion is the active memory (fast, always fresh)
- Local files are for logs, Notion is for context
- session-persistence is for search, not recall
- Simplicity beats complexity

### What Still Needs Work
- Clearer separation between layers
- Verify session-persistence is actually running
- Better promotion from daily to long-term