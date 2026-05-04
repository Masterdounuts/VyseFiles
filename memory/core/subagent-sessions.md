# Subagent Session Bindings

*Auto-generated 2026-05-04 - Per David's session management setup*

## Active Sessions

| Subagent | Session Key Pattern | Notes |
|----------|---------------------|-------|
| **quartermaster** | `agent:quartermaster:subagent:*` | Stock trading |
| **shipwright** | `agent:shipwright:subagent:*` | Health checks |
| **scribe** | `agent:scribe:subagent:*` | Knowledge management |

## How to Use

**When user asks subagent to do work:**
1. Check if subagent already has active session in `agents/<name>/sessions/`
2. If exists → that session is the current one, use it
3. If not → spawn new (will create in their session directory)

**Key insight:** Each subagent stores sessions in their own directory:
- `agents/quartermaster/sessions/` — quartermaster's sessions
- `agents/shipwright/sessions/` — shipwright's sessions  
- `agents/scribe/sessions/` — scribe's sessions

**Session limits:**
- Auto-prune after 1h idle
- Max 10 entries per agent

## Why This Matters

We no longer need to manually track session keys. Each subagent manages their own session directory, and the native maintenance config handles cleanup.