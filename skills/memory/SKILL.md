name: memory
access: vyse-only
description: How Vyse remembers, recalls, and manages context. Use when discussing memory, recall, or context management.
trigger phrases: "remember, recall, memory, past, what were we, context"

# Memory - Recall System

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Primary (100 max)

### Current: Level 15
- Sections: 8
- Subsections: 6
- Lines: 103 / 100 = 1
- Total: 8 + 6 + 1 = 15

### To Next Level
- Add more subsections or sections
- Content in skill = real capability

## Architecture

| Layer | Location | Purpose |
|-------|----------|---------|
| **Session** | active.md, HANDOFF.md, PENDING.md | Current conversation state |
| **Daily** | memory/2026-04/YYYY-MM-DD.md | Dated conversation logs |
| **Long-term** | memory/archive.md, memory/decisions.md | Key decisions, visions |
| **Quick** | memory/decisions-hub.md | Fast access to important stuff |

## Wake-up Sequence (On Every Start)

0. Read SOUL.md → protocol (accountability, content format, rules)

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
- system - Health recovery