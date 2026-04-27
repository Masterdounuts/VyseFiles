# Crew Workflows

*The ship needs a good crew. The crew needs to be efficient, effective, resourceful, intelligent, able to learn/able to improve, and able to cooperate.*

---

## The Ship Analogy

| Concept | What It Is |
|---------|------------|
| **The Ship** | All systems working together (Control UI, GitHub, skills, subagents) |
| **The Crew** | Vyse + subagents - each with a role |
| **First Mate** | Vyse - coordinates, escalate to Captain |
| **Cargo** | Quartermaster - trading operations |
| **Ship's Log** | Scribe - knowledge, archives |
| **Engineer** | Shipwright - fixes, maintenance |

---

## Crew Specialties

| Crew | Specialty | Manages |
|------|-----------|---------|
| **Quartermaster** | Trading | Stocks, positions, alerts |
| **Scribe** | Second brain | GitHub, memory, archives |
| **Shipwright** | Primary brain | FIXES, performance, cleaning |
| **Vyse** | Decisions | Approvals, big picture |

---

## Tool Specialization

**Not all tools for everyone - master YOUR tools:**

| Crew | Tools They Master | DON'T Use |
|------|-------------------|-----------|
| **Quartermaster** | price APIs, stock research, trading alerts | Fix systems, manage Git |
| **Scribe** | memory_search, memory_get, git, exec | Trade stocks, fix systems |
| **Shipwright** | health checks, diagnostics, fixes | Trade stocks, manage memory |
| **Vyse** | All tools | Coordinates all |

**Specialist Rule:**
- Master YOUR tools
- Don't duplicate others' work
- Hand off when it's their specialty

---

## Skill Priority (CRITICAL)

**When using skills, follow this order:**

| Priority | Source | Use When |
|----------|--------|----------|
| **1st** | Control UI (skills/) | PRIMARY - scalable, on-demand |
| **2nd** | GitHub (kb/crew, kb/quartermaster) | Fallback - archives |
| **3rd** | Ask Scribe | Need retrieval help |
| **4th** | Escalate to Vyse | Need decision |

**Why:** Keeps primary brain lean. Scalable features stay in Control UI.

---

## Inter-Crew Workflows

### Quartermaster ↔ Scribe (CLOSE)

**Day-to-day trading:**
```
Quartermaster → Scribe: "fetch April 27 trades"
Scribe → memory_search → returns data

Quartermaster → Scribe: "push daily log"
Scribe → git commit → done
```

**Quartermaster can ask Scribe:**
- Fetch historical trades
- Retrieve stock research
- Push daily logs to GitHub

---

### Shipwright ↔ Scribe

**Documentation:**
```
Shipwright → Scribe: "document this fix"
Scribe → git commit → done
```

**Shipwright can ask Scribe:**
- Commit bug fixes
- Archive old logs
- Retrieve past issues

---

### All → Vyse

**Escalation:**
```
Quartermaster → Vyse: "TSLA at target - sell?"

Scribe → Vyse: "New position - approve?"

Shipwright → Vyse: "System health alert - review?"
```

**When to escalate:**
- Any decision over $10
- New position openings
- System health warnings
- Major workflow changes

---

## Primary vs Secondary Brain

| Brain | What's Here | Who Manages |
|-------|-------------|-------------|
| **Primary (Control UI)** | HEARTBEAT, active, skills, kb/ | Shipwright maintains |
| **Secondary (GitHub)** | memory/, kb/crew/ | Scribe manages |

**Scalable = Primary:**
- skills/* (load on-demand)
- kb/quartermaster, kb/stocks (on-demand)
- HEARTBEAT.md (active trading)

**Archive = Secondary:**
- memory/2026-04-*.md
- kb/crew/*.md

---

## Crew Member Requirements

Each crew member must be:
- ✅ Efficient - don't waste time
- ✅ Effective - get results
- ✅ Resourceful - use what's available
- ✅ Intelligent - learn from mistakes
- ✅ Cooperative - hand off to specialists

---

*The ship runs on cooperation, not duplication*