name: memory
access: vyse-only
description: How Vyse remembers, recalls, and manages context. Use when discussing memory, recall, or context management.
trigger phrases: "remember, recall, memory, past, what were we, context"

# Memory - Recall System

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in memory/context management

### Current Status: Level 8 - RON ⭐ 🟡🟡🟡🟡🟡🟡

**XP:** 60/60 (next level at 60)

| Skill | Level | XP | Notes |
|-------|-------|-----|-------|
| Recall | 5/7 | 10 | memory_search works well |
| Storage | 6/7 | 15 | 4 pattern logs created today | ← LEVEL UP
| Cleanup | 4/7 | 5 | Auto-archive working |
| Dreaming | 4/7 | 5 | Cron runs 3am daily |

**Path to RON:** Better auto-organization, smarter promotion, perfect recall

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **memory_search** - Semantic recall from memory/*.md
- **memory_get** - Specific snippet read
- **read** - Direct file reads for full context
- Decision tree: memory_search for recall → memory_get for snippets → read for full

**Max Level:** 188 (grows with discoveries)

| Discovery | Adds To |
|------------|--------|
| Pattern logging | +1 to memory |
| Short-term recall | +1 to dreaming |
| Recall optimization | +1 to all skills |
| Skill system docs | +1 to memory ← NEW |
### HEYRON Level Insight

> **Q:** "What's the ceiling?"
>
> **A:** "Nothing. If there is something preventing you, it's probably how I am working with you."
## Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| **Session** | active.md, HANDOFF.md, PENDING.md | Current conversation state |
| **Daily** | memory/2026-04/YYYY-MM-DD.md | Dated conversation logs |
| **Long-term** | memory/archive.md, memory/decisions.md | Key decisions, visions |
| **Quick** | memory/decisions-hub.md | Fast access to important stuff |

## Wake-up Sequence (On Every Start)

0. Read SOUL.md → protocol (accountability, XP format, rules)

1. Read active.md → current work
2. Read PENDING.md → queued items
3. Read HANDOFF.md → manual handoff from last session
4. Read memory/active.md → context from today

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
**CORE SKILL** - Always used to achieve the ultimate goal
Full: Help David during his life, then help loved ones after

### References
- vyse-core - Identity
- learning - Improvement
- system - Health recovery
