# Ship Architecture

*The foundational blueprint for the Vyse operational system.*

---

## Reality vs Metaphor

| Metaphor | Technical Reality |
|----------|-------------------|
| Ship | The entire running system (container + all software) |
| Crew | Subagents (Quartermaster, Scribe, Shipwright) |
| Primary Brain | Control UI + workspace |
| Second Brain | GitHub - unlimited storage |
| Shipwright | System maintenance |
| Scribe | Knowledge management |
| Quartermaster | Financial research |

---

## The Three Layers

### 1. Primary Brain (Control UI / Workspace)
Everything that makes Vyse function - without this, I cannot operate.

### 2. Second Brain (GitHub)  
Unlimited data storage. Stores ALL accumulated knowledge:
- Research, Past Ideas, Future Ideas
- Crew History, Research History
- Long-term Memory
- Memory Hooks (Scribe's domain)

### 3. The Ship (Interconnected Systems)
All systems working flawlessly together.

---

## The Crew (Role Clarity)

| Agent | Specialty | Focus |
|-------|-----------|-------|
| Vyse | First Mate | Orchestrates crew |
| Shipwright | System health | Fixes, improvements |
| Scribe | Knowledge | Second brain, hooks |
| Quartermaster | Finance | Stock research (Phase 2+) |

**Collaboration:** One-way only - Shipwright/Scribe tell Scribe what to store.

---

# PHASE 1: Ship Building

**Goal:** Build the ship with Shipwright + Scribe. Quartermaster saved for Phase 2.

---

## Priority 1: System Cleanliness

| Task | Status |
|------|--------|
| No Rube Goldberg machines | ✅ 7 scripts |
| No duplicate cron | ✅ 0 duplicates |
| Clear system map | ✅ Documented |

## Priority 2: Reliable Spawns

| Task | Status |
|------|--------|
| Sessions clean before spawn | ✅ Configured |
| Cron checks for active sessions | ✅ Done |
| Spawns return fresh data | ✅ Tested |

## Priority 3: Subagent Truth Rule

**CRITICAL RULE:** All crew must ONLY provide:
1. Data from primary brain (workspace)
2. Data from second brain (GitHub)
3. Fresh data from commands/search

**NEVER:** Internal training, stale context

**Verified:**
- Shipwright ✅ (tested with openclaw status)
- Scribe ✅ (tested with memory_search)

## Priority 4: Shipwright → Scribe Collaboration

Shipwright learns during building → tells Scribe what to store in second brain.

**Test:** Ask Shipwright to document what he learned today.

## Priority 5: Second Brain Structure

Defined in architecture:
- Research, Past Ideas, Future Ideas
- Crew History, Research History  
- Memory Hooks (Scribe owns)

---

## Phase 1 Exit Criteria

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | System clean | ≤10 scripts, 0 cron dups |
| 2 | Spawns reliable | Shipwright + Scribe respond correctly |
| 3 | Truth Rule enforced | All crew prompts updated |
| 4 | Collaboration works | Shipwright can direct Scribe |
| 5 | Second brain defined | Architecture documented |

---

*Phase 1 Status: IN PROGRESS*

---

# PHASE 2: Ship Complete + Quartermaster Joins

**Goal:** Ship is built. Add Quartermaster for finance.

- Ship is complete (Shipwright + Scribe working)
- Quartermaster joins (research, recommendations)
- David decides on trades

---

# PHASE 3: Managed Autonomy

- Crew operates within defined bounds
- Only exceptions escalate

---

*Document updated: 2024-04-29*
