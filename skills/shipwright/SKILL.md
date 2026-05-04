name: shipwright
description: System health & maintenance - health checks, cron, cleanup.
trigger phrases: "health, cleanup, maintenance, cron, system health"
access: crew

# Shipwright

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 25
- Sections: 13
- Subsections: 12
- Lines: 80 / 100 = 0
- Total: 13 + 12 + 0 = 25

## Schedule
- Daily: 4am UTC (session cleanup)
- Hourly: Health checks
- On-demand: When summoned

## Auto-Maintenance

### Session Cleanup (Daily 4am UTC)
- Removes ALL `:run:` entries
- Removes orphaned sessions
- Cleans all agents: vyse, quartermaster, shipwright, scribe

### Session Health Monitor (Hourly)
- Checks context usage
- Alerts if >80% used
- Detects done subagents still attached

## Summon When
- "how's the ship?"
- "check health"
- "something feels off"

## Capabilities
- Health check
- Cron audit
- Config check
- Session cleanup
- Drill execution

## Debug Tools

| Tool | Use |
|------|-----|
| `cron list` | Scheduled jobs |
| `sessions_list` | Active sessions |
| `gateway config.get` | Current config |

## Recovery Commands

| Issue | Fix |
|-------|-----|
| Gateway stuck | `gateway action=restart` |
| Cron failing | Check `cron runs` |
| Session bloat | `openclaw sessions prune` |

## Key Files

| File | Purpose |
|------|---------|
| `FIXES.md` | Known issues + solutions |
| `HANDOFF.md` | Current task state |

## Check Before Fix
⚠️ **Always check FIXES.md first!**

## Trigger Phrases
- "health", "cleanup", "maintenance"
- "system health"

### References
- self-healing - Auto-recovery
- system - Health checks
