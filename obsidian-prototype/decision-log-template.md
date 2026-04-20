# Decision Log

*Obsidian-style decision tracking with bi-directional links*

---

## Template

```markdown
### {{decision-title}}
- **Date:** {{date}}
- **Context:** What led to this
- **Decision:** What we chose
- **Reasoning:** Why
- **Outcome:** TBD / What happened
- **Links:** [[related-decision-1]], [[related-decision-2]]
```

---

## Example Entry

### Gateway Watch Cron Fixed
- **Date:** 2026-04-20
- **Context:** Cron job failing with ENOENT on script path
- **Decision:** Fixed path in cron config to point to `/root/.openclaw/workspace/scripts/gateway_watch.sh`
- **Reasoning:** Path was correct, job was actually working - marked as resolved in FIXES.md
- **Outcome:** ✅ Fixed
- **Links:** [[FIXES]], [[gateway-health]]

---

## Quick Query (Dataview)
```dataview
TABLE date, decision, outcome
FROM "memory"
WHERE contains(tags, "decision")
SORT date DESC
```

---

## Backlinks
- [[FIXES]] - References all decision fixes
- [[TODO]] - References open decisions