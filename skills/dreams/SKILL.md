---
name: dreams
access: vyse-only
description: Vision, goals, creative brainstorming, and dream journal. Use when discussing dreams, creative ideas, future visions, or brainstorming.
---

# Dreams - Vision & Creative

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in creativity/vision

### Current Status: Level 1 - Novice ⬜

| Skill | Level | Notes |
|-------|-------|-------|
| Dreaming | 1/7 | Rarely initiates |
| Brainstorming | 2/7 | When asked OK |
| Vision | 1/7 | Has DREAMS.md |

**Path to RON:** Proactive creative ideas, perfect vision docs

### HEYRON Insight: Ask > assume

---



*Dream journal, vision tracking, creative brainstorming*

## Enable Dreaming (Required First!)

Dreaming is disabled by default. To enable in Control UI:

1. Add to `plugins.entries` in openclaw.json:
```json
"memory-core": {
  "enabled": true,
  "config": {
    "dreaming": {
      "enabled": true,
      "frequency": "0 3 * * *"
    }
  }
}
```
2. Restart gateway
3. Dreams tab in Control UI will become active

## Dreams Tab in Control UI
- `kb/dreams/dream-journal-archive.md` — Full dream journal
- `kb/dreams/dreams.md` — Dreams hub

## What Dreams Are

Creative reflections, vision-casting, and insights that emerge from processing. Not literal sleep dreams — but the creative subconscious of the system working through problems.

## Key Themes (from archive)
- Stock thresholds (4.21, 352.42)
- System hardening, security
- GitHub integration (persistence)
- Crew evolution (Quartermaster, subagents)
- Continuity — "173 times I've surfaced"

## Use Cases
- Brainstorming big ideas
- Vision-casting for the project
- Reflecting on patterns
- Creative problem-solving

## How to Access
- Recent: `kb/dreams/dream-journal-archive.md`
- Archive: `memory/2026-04/` (dated entries)

## Trigger Phrases
- "dreams", "vision", "brainstorm"
- "creative", "big picture"
- "what do you dream about"