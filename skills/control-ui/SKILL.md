---
name: control-ui
description: OpenClaw Control UI, dashboard, and status monitoring. Use when discussing the web interface, status cards, metrics, or dashboard setup.
---

# Control UI - OpenClaw Dashboard

*OpenClaw's web interface for monitoring and control*

## Access
- URL: `http://localhost:18790` (or configured port)
- Opens in browser via OpenClaw

## Quick Commands

| Command | Description |
|---------|-------------|
| `openclaw status` | Full session metrics (context %, cost, compactions) |
| `openclaw gateway status` | Gateway health |
| `openclaw gateway restart` | Restart gateway if needed |

## Status Card
- Real-time metrics: context %, cost, time, model
- Shows Reasoning status when enabled
- Linked background tasks

## Auto-Update Cron
- `vyse-status-auto-update`: Runs every 5 min
- Updates `.vyse-status.md` for custom dashboards

## Canvas Integration
- `.vyse-status.md` can be embedded in canvas
- Use `canvas action=present` to show dashboards

## Cron Jobs

**All cron management done through OpenClaw Control UI:**
- View active cron jobs
- Add/edit/remove scheduled tasks
- Check last run status
- Access via Control UI at `http://localhost:18790`

**Common cron jobs:**
| Job | Schedule | Purpose |
|-----|----------|---------|
| Quartermaster | */30 * * * * | Stock check every 30 min |
| vyse-status-auto-update | */5 * * * * | Status card every 5 min |
| context-monitor-light.sh | */5 * * * * | Context check every 5 min |

## Tips
- Check `openclaw status` for fast metrics
- Use `.vyse-status.md` for visual status card
- Memory files in `memory/2026-04-*.md` for history
- All scheduling via Control UI, not command line

## Trigger Phrases
- "control ui", "dashboard", "status"
- "cron", "schedule", "reminder"
- "metrics", "openclaw status"
- "check health"