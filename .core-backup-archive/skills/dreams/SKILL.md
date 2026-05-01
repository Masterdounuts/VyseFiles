---
name: dreams
access: vyse-only
description: Vision, goals, creative brainstorming, and dream journal. Use when discussing dreams, creative ideas, future visions, or brainstorming.
trigger phrases: "dream, vision, goal, brainstorm"
---

# Dreams - Vision & Creative

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in creativity/vision

### Current Status: Level 7 - RON ⭐ 🟡🟡🟡🟡🟡

**XP:** 50/50 (next level at 50)

| Skill | Level | Notes |
|-------|-------|-------|
| **Control UI** | 4/7 | Dreams tab in Control UI manages everything |
| Dreaming | 4/7 | Enable/disable via Dreams tab in Control UI |
| Brainstorming | 4/7 | Uses web to research ideas, creative techniques |
| Vision | 4/7 | DREAMS.md, themes tracked |
| Archive | 4/7 | Dream journal in Dreams tab |

**Path to RON:** Proactive dreaming, auto-brainstorm

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **memory_search** - Finding patterns in memory
- **read** - Analyzing files
- **write** - Documenting patterns
- Decision tree: memory_search for recall → read for analysis → write for documentation

**Max Level:** 8

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to dreams |

### HEYRON Insight: Ask > assume

---



*Dream journal, vision tracking, creative brainstorming*

**⚠️ IMPORTANT:** Dreams are managed entirely through **Control UI → Dreams tab**. No separate config needed.

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