---
date: 2026-04-20
tags: [decisions, index]
---

# Decision Index

> Central log of all major decisions made by Vyse

## Dataview Query

```dataview
TABLE WITHOUT ID
  date as "Date",
  decision as "Decision",
  reason as "Reason"
FROM "memory"
WHERE decision
SORT date DESC
```

---

## Recent Decisions

### 2026-04-20
- [[memory/2026-04-20|Obsidian Integration]] - Adopt Obsidian workflow with Git sync

### 2026-04-17
- [[memory/2026-04-17|Workflow Audit Fixes]] - Fixed auto-resume and self-audit issues

### 2026-04-16
- [[memory/2026-04-16|TSLA Hold Strategy]] - Hold until $8+ for stock reward

---

## Categories

- [[category:infrastructure|Infrastructure]] - System, config, tooling
- [[category:trading|Trading]] - Stock decisions, strategy
- [[category:workflow|Workflow]] - Process improvements
- [[category:memory|Memory]] - Note-taking, documentation