[[INDEX.md|Home]]

# Vyse Dashboard 🦜

## Portfolio Tracking

### Current Positions (Apr 21, 2026)
| Stock | Shares | Avg Cost | Current | Value | P/L |
|-------|--------|----------|---------|-------|-----|
| GGB | 4.99 | $4.17 | $4.28 | $21.36 | +$0.55 (+2.6%) |
| Cash | - | - | - | $31.32 | - |
| **Total** | - | - | - | **$52.68** | **+2.6%** |

### GGB Targets
- **Sell:** $4.45, $4.60, $4.75
- **Buy:** $4.10, $3.90

### Goal
- [ ] $70/day passive income (eventual)

## Today's Status

```dataview
TABLE WITHOUT ID
  choice(completed, "✅", "⬜") as "Done",
  choice(date = date(today), "📅 Today", date) as "When",
  summary as "Task"
FROM "memory"
WHERE date >= date(today) - dur("2 days")
SORT date desc
```

## Recent Decisions

```dataview
TABLE WITHOUT ID
  date,
  choice(contains(tags, "decision"), "🔴", "⚪") as "Decision",
  choice(contains(tags, "trading"), "📈", " ") as "Trading",
  summary as "Summary"
FROM "memory"
WHERE date >= date(today) - dur("7 days")
SORT date desc
LIMIT 10
```

## Quick Links

- [[memory/2026-04-21|Today's Memory]]
- [[portfolio.md|Portfolio]]
- [[AGENTS.md|Trading Protocol]]
- [[active.md|Active Session]]

---

*Updated: 2026-04-21 14:05 UTC*