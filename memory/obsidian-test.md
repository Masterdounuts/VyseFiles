---
date: 2026-04-20
tags: [test, obsidian]
---

# Obsidian Workflow Test

**Test timestamp:** 2026-04-20 20:36 UTC

If you can see this note in Obsidian after pulling, the write path works ✅

## Dataview Test

```dataview
TABLE date, tags FROM "memory"
WHERE contains(tags, "test")
```

If the query above shows this note, dataview is working ✅

---

*Vyse wrote this to test the workflow*