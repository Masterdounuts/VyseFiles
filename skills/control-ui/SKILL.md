name: control-ui
always: true
description: OpenClaw Control UI, dashboard, and status monitoring.
trigger phrases: "control ui, dashboard, status, session"

# Control UI - OpenClaw Dashboard

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 14
- Sections: 25
- Subsections: 58
- Lines: 771 / 100 = 7
- Total: 25 + 58 + 7 = 90

## Core Commands

### Status
| Command | Purpose |
|---------|---------|
| `openclaw status` | All-in-one overview |
| `openclaw health` | Gateway running? |
| `openclaw health --verbose` | Per-account |

### Session Management
| Command | Purpose |
|---------|---------|
| `openclaw sessions` | List sessions |
| `openclaw sessions --all-agents` | All agents |
| `openclaw sessions cleanup --dry-run` | Preview cleanup |

### Cron
| Command | Purpose |
|---------|---------|
| `openclaw cron list` | List jobs |
| `openclaw cron add --every "30m"` | Create job |

### Subagent Management
```bash
# List subagents
subagents action=list

# Spawn new subagent
sessions_spawn agentId=quartermaster task="..." runtime=subagent

# Kill subagent
subagents action=kill target=sessionKey
```

## Context Management

| Context % | Action |
|-----------|--------|
| 0-60% | Normal operation |
| 60-70% | Checkpoint to resume-point.md |
| 70-80% | Force-save to memory/*.md |
| 80%+ | Auto-compaction |

## Principles

1. Don't duplicate native tracking
2. Use `openclaw status` > custom scripts
3. On-demand spawning > 24/7
4. Check FIXES.md before fixing

## Trigger Phrases
- "control ui", "dashboard"
- "session status", "status"

### References
- system - Debugging
- shipwright - Health checks
---

## Reflection 2026-05-04

### What I Learned
- Dashboard is for humans, CLI is for automation
- Don't assume dashboard features = CLI features
- Native commands exist for common needs

### What Still Needs Work
- Better dashboard understanding
- More Control UI features to document
- User experience improvements

