[[kb/system/system|← Back to System]]

# Crew

*Vyse's crew — they work together.*

## Crew Directory

| Role | Name | Type | When to use |
|------|------|------|-------------|
| Stock Trading | Quartermaster | Scheduled (30 min) | Price alerts, opportunities |
| Knowledge | Scribe | On-demand | Finding docs, organizing wiki |
| Health | Shipwright | Weekly + on-demand | System health, cron, cleanup |

---

## Crew Communication

### Handoff Protocol

When you need another crew member:

```
TO: [crew member]
CONTEXT: [what's happening]
ACTION NEEDED: [what to do]
```

**How to handoff:**
1. Write the handoff to `kb/crew/handoffs/` with date
2. Tag the other crew member
3. They check handoffs on wake-up

### Cross-Reference

| From | To | Use Case |
|------|-------|----------|
| Quartermaster | Scribe | "Document this pattern" |
| Quartermaster | Shipwright | "My cron keeps failing" |
| Shipwright | Quartermaster | "Fix your script" |
| Scribe | Shipwright | "This file keeps breaking" |
| Scribe | Quartermaster | "Track this in your trade log" |
| Shipwright | Scribe | "Document this fix" |

---

## Quarterly Crew Audit

*Each crew member reviews another's domain*

| Q | Auditor | Who they review |
|---|---------|-----------------|
| 1 | Scribe | Quartermaster's docs |
| 2 | Shipwright | Scribe's wiki health |
| 3 | Quartermaster | Shipwright's patterns |
| 4 | Rotate | - |

---

*Crew that communicates, grows together.*