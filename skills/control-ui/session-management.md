---
name: session-management
description: Session lifecycle, compaction, maintenance, and troubleshooting.
trigger phrases: "session, context, compact, reset"
---

# Session Management

**Problem:** Cron jobs create `:run:` session entries every execution

## Root Cause

- Cron jobs with `sessionTarget: "isolated"` create session entries
- Each execution creates a `:run:` variant
- Old `:run:` entries never cleaned up automatically

## Display Rules

The CHAT panel only shows sessions with `lastChannel` set (real conversations):
- ✅ Main sessions with conversation history
- ❌ Cron jobs (no lastChannel)  
- ❌ `:run:` variants (temporary)
- ❌ Orphaned sessions (no label + no lastChannel)

## Cleanup

Run manually or via cron:
```bash
# List sessions
sessions_list

# Check context
session_status
```

## Session Count Targets

| Agent | Healthy Count |
|-------|---------------|
| vyse | 1-3 |

If sessions exceed 10 → run cleanup.

---

## Context Management

### Built-In Tools

| Tool | Purpose |
|------|---------|
| `sessions_list` | Shows totalTokens, contextTokens, status |
| `sessions_history` | View what's in a session |
| Auto-compaction | OpenClaw compacts at ~95% context |
| Control UI → Sessions panel | Visual session management |

### Context Monitoring Thresholds

| Usage | Status | Action |
|-------|--------|--------|
| <50% | ✅ Healthy | None needed |
| 50-80% | 🟡 Watch | Monitor more frequently |
| 80-95% | ⚠️ Warning | Trigger checkpoint, consider manual flush |
| >95% | 🔴 Critical | Auto-compaction will trigger |

### Long Conversation Solutions

1. **Auto-compaction** (built-in): OpenClaw auto-runs at 95%
2. **Manual checkpoint**: Save state, start fresh session
3. **New session**: Start fresh via Control UI