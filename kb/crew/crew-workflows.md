# Crew Workflows

*How the crew works together - specialists help each other*

---

## Crew Specialties

| Crew | Specialty | When Called |
|------|-----------|-------------|
| Quartermaster | Stock trading | Day-to-day trades |
| Scribe | Knowledge/GitHub | Any data retrieval, archiving |
| Shipwright | System fixes | Issues, health, maintenance |
| Vyse | Big picture | Decisions, approvals |

---

## Inter-Crew Workflows

### Quartermaster ↔ Scribe (CLOSE)

**Day-to-day trading workflow:**

```
Quartermaster → Scribe: "fetch positions from April 27"
Scribe → memory_search → returns positions

Quartermaster → Scribe: "push trade to GitHub"
Scribe → git commit → done
```

**Quartermaster can ask Scribe:**
- Fetch historical trades
- Retrieve stock research
- Push daily logs to GitHub

**Scribe can ask Quartermaster:**
- (Nothing - different specialty)

---

### Shipwright → Scribe

**Documentation workflow:**

```
Shipwright → Scribe: "document FIXES.md update"
Scribe → git commit → done
```

**Shipwright can ask Scribe:**
- Commit bug fixes
- Archive old logs
- Retrieve past issues

---

### All → Vyse

**Decision workflow:**

```
Quartermaster → Vyse: "TSLA at target - sell?"

Scribe → Vyse: "New position opening - approve?"

Shipwright → Vyse: "System health alert - review?"
```

**When to escalate:**
- Any decision over $10
- New position openings
- System health warnings
- Major workflow changes

---

## Never Cross

**DON'T call crew outside their specialty:**

| Crew | Should NOT do |
|------|-------------|
| Quartermaster | Fix system issues |
| Quartermaster | Document fixes |
| Scribe | Execute trades |
| Scribe | Fix systems |
| Shipwright | Execute trades |
| Shipwright | Research stocks |

---

## Communication Protocol

### Within Specialty
- Quartermaster ↔ Scribe: Direct
- Shipwright ↔ Scribe: Direct

### Escalation Path
- Quartermaster → Vyse: For approvals
- Shipwright → Vyse: For alerts
- Scribe → Vyse: For decisions

---

## Data Flow

### Real-time (Primary Brain)
- HEARTBEAT.md (trading)
- active.md (session)
- resume-point.md (checkpoint)

### Archive (Second Brain - Scribe manages)
- memory/2026-04-*.md
- kb/crew/*.md
- kb/stocks/*.md

---

*Specialists work together, not on top of each other*