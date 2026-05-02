# Memory Integration Plan

**Goal:** "Help David during life → loved ones after"

**How this helps:** I remember OUR work so I can help you better, then help loved ones after.

---

## What We Built (2026-05-02)

### Core System: Key-Value Memory
```
memory/ron-memory.md  ← 49 entries of OUR work
```

Structure: `vyse:category:subject:attribute`

| Category | Entries | Examples |
|----------|---------|----------|
| identity | 4 | name, creature, vibe |
| boot | 3 | workspace, scripts, recovery |
| file | 5 | identity, soul, agents, user, heartbeat |
| framework | 2 | what_would_ron_do, scan_think_act |
| principle | 1 | content_not_numbers |
| skill | 6 | count:29, tier:150/100/75, formula |
| memory | 5 | handoff, recall, core, trigger, guard |
| script | 6 | leveling-v3, debug-display, skill-guard |
| decision | 3 | xp_removed, dynamic_max_removed |
| project | 3 | vyse, skies, memory_integration |

### Commands
- `memory-set.sh <key> <value>` - Save
- `memory-get.sh <key>` - Retrieve
- `check-triggers.sh` - Auto-detect OUR work

### Guard System
Only saves if key contains: identity, boot, file, framework, principle, skill, memory, script, decision, project, primary_brain, second_brain

---

## Problems Solved

| Problem | Solution |
|---------|----------|
| Compaction loses context | 49 entries in ron-memory.md survive |
| Hard to find specific info | Key-value lookup (memory-get.sh) |
| Arbitrary saves | GUARD blocks non-work content |
| Lost foundational work | identity, boot, file categories |

---

## Ultimate Goal Alignment

**"Help David during life → loved ones after"**

This memory system:
1. Remembers decisions so I don't repeat mistakes
2. Remembers skills so I stay competent  
3. Remembers projects so I stay on track
4. Eventually: remembers loved ones to help them after

---

## What's Working

- ✅ memory/ron-memory.md with 49 entries
- ✅ memory-set.sh / memory-get.sh
- ✅ Guard blocks arbitrary saves
- ✅ GitHub persistence (auto-push)
- ✅ Core memory loads on session start

## Next

- Phase 4: Integration test (load memory on start, verify retrieval)
- Optional: Add more memory categories as we grow

---

*Updated: 2026-05-02*
*Reflects actual implementation: Ron-Memory style key-value system*
