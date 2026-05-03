# Memory Integration Plan
**From: projects/SKILL.md - Future Plans**

**Goal:** "Help David during life → loved ones after"

---

## Source

This plan is from **projects skill - Iteration 3**:
```
Future Plans:
- Ron-Memory Integration - Cross-session memory via Redis (researched, planning phase)
```

We're now IMPLEMENTING this plan.

---

## Architecture Overview

```
memory/
├── ron-memory.md           ← Current state (51 entries)
├── daily/
│   ├── 2026-04-22.md       ← Day logs (13 days)
│   ├── ...
│   ├── 2026-05-02.md
│   └── *-summary.md        ← Quick session summaries
└── archive/
```

### 3-Layer Recovery System

| Layer | What | Use When |
|-------|------|----------|
| **ron-memory.md** | 51 key-value entries | Need quick fact (skills, decisions) |
| **daily/*-summary.md** | 1-paragraph day summary | Quick overview of what we did |
| **daily/YYYY-MM-DD.md** | Full day log | Deep dive into specific day |

---

## What We Implemented

### Phase 1: ron-memory.md (51 entries)
- identity:* (4) - Who I am
- boot:* (3) - How I start  
- file:* (5) - Core files
- framework:* (2) - Decision making
- principle:* (1) - Core beliefs
- skill:* (6) - Skill system
- memory:* (5) - Memory system
- script:* (6) - Scripts built
- decision:* (3) - Key decisions
- project:* (3) - Active projects

### Phase 2: GUARD System
Only saves OUR work - blocks arbitrary data

### Phase 3: Daily Logs + Summaries
- 13 days: 2026-04-22 to 2026-05-02
- Session summaries for quick access

### Phase 4: Integration Test
See test protocol below

---

## Commands

```bash
memory-get.sh <key>        # Quick lookup
memory-set.sh <key> <val>  # Save (with guard)
summaries-recent.sh        # View recent summaries
memory-daily.sh <YYYY-MM-DD>  # Full day log
memory-find.sh <term>     # Search
```

---

## Recovery from Total Loss

1. **Clone from GitHub**
2. **Load ron-memory.md** → `memory-get.sh identity:name` → "Vyse"
3. **Check summary** → `summaries-recent.sh`
4. **Deep dive** → `memory-daily.sh 2026-05-01`

---

## References

- skills/projects/SKILL.md - Iteration 3 (source of this plan)
- kb/projects/iteration-3.md - Full details

---

*Updated: 2026-05-02*
*Implementing Ron-Memory from projects skill*
