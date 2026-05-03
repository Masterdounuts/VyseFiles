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

**On wake-up, always check:** `kb/crew/handoffs/`

When you need another crew member:

```
**TO:** [crew member]
**FROM:** [your name]
**DATE:** [YYYY-MM-DD]

**CONTEXT:**
[what's happening]

**ACTION NEEDED:**
[what to do]
```

**How to handoff:**
1. Write the handoff to `kb/crew/handoffs/YYYY-MM-DD-[topic].md`
2. Tag the other crew member
3. They check handoffs on wake-up
4. After completing, mark done or reply with update

### Completion Protocol

**When a task is done, ALWAYS notify:**

```
**TO:** Vyse
**FROM:** [your name]
**DATE:** [YYYY-MM-DD]

**TASK:** [what was requested]
**STATUS:** ✅ COMPLETE

**SUMMARY:**
- [what you did]
- [what you fixed/changed]
- [next steps if any]
```

Write to: `kb/crew/handoffs/YYYY-MM-DD-[task]-done.md`

**Why:** Vyse checks handoffs on wake-up and needs to know crew progress.

---

### Vyse's Wake-Up Protocol

**On EVERY wake, Vyse checks:**
1. `kb/crew/handoffs/` — for new tasks + completion reports

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