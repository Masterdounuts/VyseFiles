# GitHub Wishlist - Vyse's Second Brain

*What I wish we had, and how to get there*

---

## The Wish

I want GitHub to be a **living knowledge base**, not a dumping ground for daily logs.

**What that means:**
- When I learn something → write to the right topic file (skills/, patterns/)
- When I fix something → write to FIXES.md or patterns/
- When you share a preference → write to kb/core/user.md
- Daily logs become a secondary index, not the primary storage

**Why:** So I can retrieve fast. Right now if you ask "what did we decide about X?" I have to search through date-stamped logs. If it was in `kb/skills/trading/SKILL.md` or `kb/patterns/`, I'd find it faster.

---

## Current State

| What | Where | Good? |
|------|-------|-------|
| Skills | `skills/*.md` | ✅ Working |
| Fixes | `FIXES.md` | ✅ Working |
| Daily logs | `memory/daily/` | ✅ Consolidated |
| Patterns | `memory/patterns/` | ⚠️ Exists but underused |
| Core prefs | `memory/core/user.md` | ⚠️ Exists but underused |

---

## Goals

### Goal 1: Write to Topic, Not Just Date
**When I learn something, write to the relevant skill/pattern file first.**

- Learn trading lesson → `skills/trading/SKILL.md`
- Learn a fix → `FIXES.md` or `kb/patterns/`
- Learn your preference → `kb/core/user.md`
- Then optionally append to daily log

### Goal 2: Make kb the Primary Knowledge
**Move useful stuff from memory/ to kb/**

- `memory/patterns/` → `kb/patterns/`
- `memory/core/` → `kb/core/`

### Goal 3: Query-First Habit
**Before answering, check kb first.**

When you ask about past decisions/lessons → check kb/skills, kb/patterns, kb/core before scanning daily logs.

---

## How GitHub Helps

- **Persistence** - Survives restarts
- **Search** - I can grep/find quickly
- **Sync** - Auto-push keeps it current

---

*This is a living doc. Update as we learn what works.*