---
name: session-management
description: OpenClaw session lifecycle, compaction, maintenance, and troubleshooting. Use when sessions accumulate, context resets, or you need to understand when/how sessions refresh.
access: vyse
level: 1
content: 82
---

# Session Management Skill

*Deep dive into OpenClaw session mechanics — when they refresh, how compaction works, and how to prevent accumulation.*

---

## Why This Matters

Sessions can accumulate (especially from cron jobs), causing:
- Confusion in Control UI dropdown
- Increased disk usage
- Slower status checks

**Root cause:** No `session.maintenance` config + cron jobs creating new sessions per run.

---

## Session Lifecycle

### When Do Sessions Refresh?

| Trigger | What Happens |
|---------|--------------|
| **Daily reset** | New session at 4:00 AM gateway local time |
| **Idle reset** | After `session.reset.idleMinutes` inactivity |
| **Manual** | `/new` or `/reset` in chat |
| **Context overflow** | Compaction runs FIRST, then new session if still full |

**Key:** Sessions don't refresh when full — compaction runs first to save the conversation.

---

## Compaction vs Pruning vs Checkpoints

| Mechanism | What it does | Saves to disk? | When it runs |
|-----------|--------------|----------------|--------------|
| **Compaction** | Summarizes older conversation | ✅ Yes (.jsonl) | At ~80% context |
| **Pruning** | Removes old tool results (in-memory) | ❌ No | Every request after cache TTL |
| **Checkpoint** | (Custom) Saves active.md to memory/ | ✅ Yes | On context-aware-save cron |

### Does Checkpoint Run Before Compaction?
**Yes!** Per docs: *"Before compacting, OpenClaw automatically reminds the agent to save important notes to memory files."*

---

## Session Key Patterns

| Source | Session Key |
|--------|-------------|
| Direct message | `agent:vyse:main` |
| Cron job | `agent:vyse:cron:<uuid>` |
| Cron run log | `agent:vyse:cron:<uuid>:run:<sessionId>` |
| Subagent spawn | `agent:vyse:isolated:<uuid>` |

**Problem:** Each cron run creates a NEW session. Without cleanup, they accumulate forever.

---

## Native Session Maintenance (The Fix)

Add to `openclaw.json`:

```json
{
  "session": {
    "maintenance": {
      "mode": "enforce",
      "pruneAfter": "1h",
      "maxEntries": 10
    }
  }
}
```

| Setting | Meaning |
|---------|---------|
| `mode: enforce` | Actually delete (not just warn) |
| `pruneAfter: 1h` | Delete sessions older than 1 hour |
| `maxEntries` | Cap entries in sessions.json |

**Run manually:**
```bash
openclaw sessions cleanup --dry-run
openclaw sessions cleanup --enforce
```

---

## Session Storage Layers

| Layer | File | What |
|-------|------|------|
| **Store** | `agents/<agent>/sessions/sessions.json` | Metadata (keys, last activity, model) |
| **Transcript** | `agents/<agent>/sessions/<sessionId>.jsonl` | Actual conversation |

**Multiple agents = multiple stores:**
- `agents/vyse/sessions/` — main agent
- `agents/quartermaster/sessions/` — stock subagent
- `agents/shipwright/sessions/` — health subagent
- `agents/scribe/sessions/` — knowledge subagent

---

## What NOT To Do

❌ Don't create custom cron jobs to prune sessions — native `session.maintenance` handles it

❌ Don't manually delete .jsonl files without also updating sessions.json

❌ Don't assume sessions are "inactive" just because they're old — cron run sessions are considered "active" by default

---

## The Solution (What We Did)

1. **Added session.maintenance config** — auto-prunes old sessions
2. **Removed redundant shipwright-daily cron** — native config does the same thing
3. **Manual cleanup** — deleted accumulated .jsonl files from all agent directories

---

## Commands Reference

```bash
# Check session count
openclaw status | grep sessions

# List all sessions (JSON)
openclaw sessions --json

# Cleanup dry-run
openclaw sessions cleanup --dry-run

# Cleanup enforce
openclaw sessions cleanup --enforce

# Check health (includes session info)
openclaw health
```

---

## When to Debug

- Sessions count keeps growing despite maintenance config
- Context resets unexpectedly (check compaction in /status)
- Control UI shows old sessions in dropdown

---

## Skill Level Progress

| Level | Requirements |
|-------|--------------|
| 1 | Understand lifecycle + maintenance config |
| 2 | Can manually cleanup sessions |
| 3 | Debug compaction issues |
| 4 | Configure advanced maintenance (disk budget, rotate) |
| 5 | Understand session routing + subagent isolation |
| 6 | Optimize for multi-agent deployments |
| 7 | Teach others / write documentation |

---

*Created: 2026-05-04 | Updated: 2026-05-04*
*Context: Fixed 298 accumulated sessions by adding native maintenance + removing redundant cron*
