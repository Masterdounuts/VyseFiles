---
name: memory
access: vyse-only
description: How Vyse remembers, recalls, and manages context. Use when discussing memory, recall, or context management.
---

# Memory - Recall System

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in memory/context management

### Current Status: Level 6 - Expert 🟡🟡🟡🟡🟡🟡

| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| Recall | 5/7 | 🟡🟡🟡🟡🟡 | memory_search works well |
| Storage | 4/7 | 🟡🟡🟡🟡 | Daily + archive working |
| Cleanup | 4/7 | 🟡🟡🟡🟡 | Uses exec for backup scripts, auto-archive working |
| Dreaming | 3/7 | 🟡🟡🟡 | Enabled but rarely triggers |

**Path to RON:** Better auto-organization, smarter promotion, perfect recall

---

### HEYRON Level Insight

> **Q:** "What's the ceiling?"
>
> **A:** "Nothing. If there is something preventing you, it's probably how I am working with you."

---



## Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| **Session** | active.md, HANDOFF.md, PENDING.md | Current conversation state |
| **Daily** | memory/2026-04/YYYY-MM-DD.md | Dated conversation logs |
| **Long-term** | memory/archive.md, memory/decisions.md | Key decisions, visions |
| **Quick** | memory/decisions-hub.md | Fast access to important stuff |

## Wake-up Sequence (On Every Start)

1. Read TODO.md → tasks for Vyse
2. Read active.md → current work
3. Read PENDING.md → queued items
4. Read HANDOFF.md → manual handoff from last session
5. Read memory/active.md → context from today

## On Context Reset

- At 60% context: update resume-point.md
- At 70% context: force-save to memory/YYYY-MM-DD.md
- "Remember?" → read active.md + resume-point.md

## Checkpoint System

- `scripts/auto-checkpoint-new.sh` — auto-saves progress
- `scripts/pre-compact-save.sh` — saves before context compaction
- `.checkpoint-*` files — context state markers

## Quick Recall Commands

- `memory_search` — semantic search across all memory
- `memory_get` — read specific file/lines
- `wiki_search` / `wiki_get` — compiled wiki

## Decision Log

Key decisions go to `memory/decisions.md`:
- Format: Date, Context, Decision, Rationale
- Searchable for future reference

## Trigger Phrases
- "remember", "what were we working on"
- "memory", "recall", "context"
- "check active", "check handoff", "check memory"