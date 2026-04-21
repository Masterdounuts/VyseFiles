[[INDEX.md|Home]]


# Control UI Integration Guide

## Quick Commands

| Command | Description |
|---------|-------------|
| `openclaw status` | Full session metrics (context %, cost, compactions) |
| `openclaw gateway status` | Gateway health |
| `./scripts/vyse-metrics.sh` | Detailed metrics (may timeout) |
| `./scripts/vyse-glance.sh` | One-line quick status |

## Auto-Update Cron
- **vyse-status-auto-update**: Runs every 5 min, updates `.vyse-status.md`

## Viewing in Control UI
1. Open Control UI at `http://localhost:18790` (or configured port)
2. Session status card shows real-time metrics
3. `.vyse-status.md` can be embedded in canvas for custom dashboards

## Tips
- Use `openclaw status` for fast metrics (no script needed)
- Check `.vyse-status.md` for visual status card
- Memory files in `memory/2026-04-*.md` for history