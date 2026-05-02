# Memory Integration Plan

**Goal:** Solve compaction memory loss

---

## Our Problems

| Problem | Solution |
|---------|---------|
| Compaction loses context | memory/core/ loads first |
| Hard to find memories | Organized folders |
| No auto-detection | Trigger with GUARD |

---

## Architecture

```
memory/
├── core/      ← User skills, goals, system info
├── daily/     ← Day logs
└── archive/   ← Old memories
```

---

## Phases Completed

| Phase | What | Done |
|-------|------|------|
| 1 | Create memory/core/ | ✅ |
| 2 | Trigger detection with GUARD | ✅ |
| 3 | Organize daily/ | ✅ |
| 4 | Integration test | TODO |

---

## Guard System

**Only saves if content relates to OUR work:**

Keywords: skill, memory, script, github, project, decision, drill, learning, level, progress, system, vyse, david, game, arcadia

If content doesn't match → **SKIP**

---

## What Works

- GitHub persistence
- HANDOFF system  
- Core memory loads on start
- Trigger detection (GUARDED)

---

*Updated: 2026-05-02*
