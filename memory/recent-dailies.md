---
date: 2026-04-20
tags: [meta, dataview]
---

# Recent Daily Notes

```dataview
TABLE WITHOUT ID
  file.name as "Date",
  date as "Logged",
  tags
FROM "memory"
WHERE contains(file.name, "2026-04-")
SORT file.name DESC
LIMIT 10
```

---

*This file auto-updates based on dataview queries. Open in Obsidian to see the rendered table.*