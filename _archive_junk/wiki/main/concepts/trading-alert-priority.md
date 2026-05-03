---
id: trading-alert-priority
type: concept
name: Trading Alert Priority
tags: [trading, alerts, protocol]
created: 2026-04-12
updated: 2026-04-23
---

# Trading Alert Priority

Protocol for when and how Vyse alerts David about trading opportunities.

## Rules

1. **Message immediately** if research reveals drastic changes
2. **Alert on volatile opportunities** (>3% move)
3. **Confirm significant trades** before executing

## Alert Types

| Priority | Trigger | Action |
|----------|---------|--------|
| High | >5% move, major news | Immediate Telegram alert |
| Medium | 3-5% move | Standard alert with details |
| Low | Routine targets hit | Background notification |

## Current Positions

- **GGB**: 6 shares @ $4.34, targets: $4.30/$4.40/$4.50
- **Cash**: ~$1

## Automation-First Principle

- Automate when possible
- Only involve David when:
  - Decision requires human judgment
  - Confirmation needed for significant trades
  - System encounters unknown situation

## Source

- kb/stocks/protocol