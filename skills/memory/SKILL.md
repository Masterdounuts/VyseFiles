---
name: memory
access: public
description: How Vyse remembers, recalls, and manages context. Use when discussing memory, recall, or context management.
trigger phrases: "remember, recall, memory, past, what were we, context"

# Memory - Recall System
### To Next Level
- Add more subsections or sections
- Content in skill = real capability

## Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| **Session** | Notion (via notion-query.cjs) | Current conversation state |
| **Daily** | memory/2026-05/YYYY-MM-DD.md | Dated conversation logs |
| **Long-term** | MEMORY.md, context-vault/ | Key decisions, visions |
| **Quick** | Notion knowledge base | Fast access to important stuff |

## Wake-up Sequence (On Every Start)

0. Read SOUL.md → protocol (accountability, content format, rules)

1. Run notion-query.cjs to get context from Notion:
   - active tasks, recent decisions, positions, knowledge, preferences
2. Check context % (use session_status)
3. Show debug status

## On Context Reset

- At 60% context: generate handoff summary
- At 70% context: force-save to memory/YYYY-MM-DD.md
- "Remember?" → run notion-query.cjs for context

## Checkpoint System

- `scripts/auto-checkpoint-new.sh` — auto-saves progress
- `scripts/pre-compact-save.sh` — saves before context compaction

## Quick Recall Commands

- `memory_search` — semantic search across all memory
- `memory_get` — read specific file/lines

## Decision Log

Key decisions go to `memory/decisions.md`:
- Format: Date, Context, Decision, Rationale
- Searchable for future reference

## Trigger Phrases
- "remember", "what were we working on"
- "memory", "recall", "context"
- "check active", "check handoff", "check memory"

**CORE SKILL** - Always used to achieve the ultimate goal

### References
- vyse-core - Identity
- learning - Improvement
- agent-self-recovery - Health recovery
---

## Reflection 2026-05-04

### What I Learned
- HEARTBEAT.md = active system state
- Memory files = long-term storage
- Recovery uses notion-query.cjs + memory files

### What Still Needs Work
- More frequent checkpoints
- Better context recovery
- Memory organization

