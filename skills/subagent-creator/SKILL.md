---
name: subagent-creator
access: vyse-only
description: Template and pattern for building autonomous subagents like Quartermaster. Use when creating new subagents, expanding existing ones, or understanding how Vyse's workers work.
---

# Subagent Creator

*How to build real OpenClaw subagents (not just cron scripts)*

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in subagent creation

### Current Status: Level 5 - Advanced 🟡🟡🟡🟡🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| OpenClaw Config | 5/7 | Proper agent config in openclaw.json |
| sessions_spawn | 5/7 | Native spawn with announce |
| **Cron Subagents** | 5/7 | Quartermaster, Shipwright, Scribe via cron |
| Thread Binding | 4/7 | Persistent session threads |
| Nested Agents | 3/7 | Orchestrator pattern |

**Path to RON:** Expert-level subagent patterns

---

### ⚠️ CRITICAL: My Mistake

**I previously created "subagents" the WRONG way:**
- ❌ config.md files in kb/ folders
- ❌ Scripts run by cron
- ❌ Manual message sends to report

**The CORRECT way:**
- ✅ Agent defined in openclaw.json (agents.list)
- ✅ Use `sessions_spawn` tool
- ✅ Runs in own session (`agent:vyse:subagent:<uuid>`)
- ✅ Auto-announces results back to requester

---

### HEYRON Level Insight

> **Q:** "How do I create a real subagent?"
>
> **A:** "Add to agents.list in openclaw.json, then use sessions_spawn to run it. That's it."

---

## Real Subagent Architecture

### 1. Define in openclaw.json

```json
{
  "agents": {
    "list": [
      {
        "id": "quartermaster",
        "name": "Quartermaster",
        "description": "Stock trading subagent",
        "model": "openrouter/minimax/minimax-m2.5",
        "subagents": {
          "model": "openrouter/minimax/minimax-m2.5",
          "allowAgents": ["vyse"],
          "maxSpawnDepth": 1
        }
      }
    ],
    "defaults": {
      "subagents": {
        "runTimeoutSeconds": 300,
        "archiveAfterMinutes": 60
      }
    }
  }
}
```

### 2. Spawn with sessions_spawn

```json
{
  "task": "Check stock prices for GGB, AMC",
  "agentId": "quartermaster",
  "runtime": "subagent",
  "mode": "run"
}
```

### 3. How It Works

1. **Spawn** - sessions_spawn creates `agent:vyse:subagent:<uuid>` session
2. **Run** - Subagent executes in isolation with its own context
3. **Announce** - On completion, auto-posts result to requester chat
4. **Archive** - After 60min, transcript auto-archived

---

## Current Crew Subagents

| Subagent | Purpose | Cron Schedule | Config |
|----------|---------|---------------|--------|
| **quartermaster** | Stock trading, price monitoring | */30 min (market hours) | openclaw.json |
| **shipwright** | System health, maintenance | Weekly (Sunday 22:00) | openclaw.json |
| **scribe** | Knowledge management, audits | Weekly (Thursday 18:00) | openclaw.json |

### How They Work
1. Defined in `openclaw.json` agents.list
2. Cron job runs with `agentId` set to subagent name
3. Job executes in isolated session as that agent
4. Results announce back to main session

### Example: Quartermaster Cron
```json
{
  "agentId": "quartermaster",
  "payload": {
    "kind": "agentTurn",
    "message": "You are Quartermaster. Check stock prices..."
  }
}
```

---

## sessions_spawn Parameters

| Param | Type | Description |
|-------|------|-------------|
| `task` | string | What the subagent should do (required) |
| `agentId` | string | Which agent to spawn (from agents.list) |
| `runtime` | string | "subagent" or "acp" |
| `mode` | string | "run" (one-shot) or "session" (persistent) |
| `thread` | boolean | Bind to channel thread |
| `model` | string | Override model for this run |
| `thinking` | string | Override thinking level |
| `runTimeoutSeconds` | number | Max runtime (0 = no limit) |
| `cleanup` | string | "delete" or "keep" (default) |
| `sandbox` | string | "inherit" or "require" |

---

## Thread-Bound Sessions

For persistent subagents that stay bound to a channel thread:

```json
{
  "task": "Ongoing stock monitoring",
  "agentId": "quartermaster",
  "thread": true,
  "mode": "session"
}
```

**Then:**
- Follow-up messages in that thread route to same subagent
- Use `/focus` to bind manually
- Use `/unfocus` to detach

---

## Spawn Checklist (CORRECT)

| ✅ | Step | Where |
|---|------|-------|
| 1 | Add to agents.list | openclaw.json |
| 2 | Set subagent config | model, timeout, allowAgents |
| 3 | Apply config | gateway config.apply |
| 4 | Test spawn | sessions_spawn tool |
| 5 | Schedule if needed | cron with sessions_spawn |
| 6 | Add to AGENTS.md | Documentation (minimal) |

---

## Crew Template (For Our Subagents)

*This is the template for our crew members: Quartermaster, Shipwright, Scribe*

### Crew Hierarchy

```
David (Captain)
    │
    └── Vyse (First Mate) ← Gatekeeper for all info
            │
            ├── Quartermaster (Stock Trading)
            ├── Scribe (Knowledge)
            └── Shipwright (Health)
```

### Information Flow

| Flow | Rule |
|------|------|
| Crew ↔ Vyse | Free flow of skills & info |
| Vyse → David | All info goes through First Mate |
| **Rule** | Anything for Captain goes through First Mate first |

### Subagent Template Fields

| Field | Description |
|-------|-------------|
| **Role** | What they do (e.g., stock trading) |
| **Ongoing Goals** | Continuous missions (not one-off tasks) |
| **Key Files** | Files they read on wake (prioritized) |
| **Skills** | Which skills they have access to |
| **Schedule** | How often they run |
| **Reporting** | Report to Vyse, not directly to David |

### Wake-Up Protocol (Every Subagent Should Do)

1. **Read Start Here** - `kb/crew/subagent-[name].md`
2. **Check Goals** - Review ongoing goals
3. **Check Key Files** - Read prioritized files
4. **Do Work** - Execute ongoing goals
5. **Report to Vyse** - Use status prefix, let Vyse escalate
6. **Checkpoint** - Save state to memory if long-running

### Error Handling

| Situation | Action |
|-----------|--------|
| Unknown error | Report to Vyse with details |
| Known fix exists | Apply from FIXES.md |
| 3+ fix attempts failed | Escalate to Vyse |
| Data loss risk | Immediate alert to Vyse |

### Status Prefixes (Communication)

| Prefix | Use When |
|--------|----------|
| 🔴 BREAKING | Urgent, needs immediate attention |
| 🟡 UPDATE | Status change, FYI |
| ✅ DONE | Task completed |
| 💡 IDEA | Suggestion for First Mate |

### Example: Quartermaster Template

```markdown
# Quartermaster - Stock Trading

*Your ongoing mission: Monitor and manage stock positions*

## Your Role
| Position | Who |
|----------|-----|
| Captain | David |
| First Mate | Vyse |
| You | Crew - Quartermaster |

## Information Flow
Quartermaster ←→ Vyse (First Mate) ←→ David (Captain)
                      ↑
            All info goes through me

**Rule:** Anything for David must go through Vyse first.

## Ongoing Goals
| Goal | Status | Priority |
|------|--------|----------|
| Monitor [stocks] | Active | 🔴 High |
| Alert on >3% moves | Active | 🔴 High |
| Track positions | Active | 🟡 Medium |
| Log trades | Active | 🟡 Medium |

## Key Files (Read on Wake)
1. kb/crew/subagent-quartermaster.md ← Start Here
2. kb/stocks/protocol.md ← Rules
3. kb/stocks/positions.md ← Current positions

## Skills
- trading, alerts

## Schedule
- Every 30 min during market hours

## Communication
- Report to Vyse (First Mate)
- Use status prefixes: 🔴 BREAKING, 🟡 UPDATE, ✅ DONE
```

---

## Common Mistakes I Made

| Wrong | Correct |
|-------|---------|
| Create config.md | Add to openclaw.json agents.list |
| Cron runs script | Cron calls sessions_spawn |
| Manual message.send | sessions_spawn auto-announces |
| No session isolation | Each subagent gets own session |

---

## Cron + Subagents

**When you want scheduled subagent runs:**

```json
{
  "schedule": { "kind": "cron", "expr": "*/30 * * * *" },
  "payload": {
    "kind": "agentTurn",
    "message": "Run Quartermaster stock check"
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "announce" }
}
```

This spawns an isolated subagent every 30 min.

---

## Key Concepts

| Concept | What It Means |
|---------|---------------|
| **Session** | Each subagent gets `agent:<parent>:<subagent>:<uuid>` |
| **Announce** | Auto-posts result to requester when done |
| **Isolation** | Own context, can't access parent session |
| **Archive** | Auto-cleanup after 60min (configurable) |
| **Timeout** | Kill after N seconds (prevents runaway) |

---

## Managing Subagents

### Slash Commands
```
/subagents list              # Show running subagents
/subagents info <id>         # Details
/subagents kill <id>         # Stop
/subagents log <id>          # View output
/subagents spawn <agentId> <task>  # Manual spawn
```

### Via Tools
- `subagents action=list`
- `subagents action=kill target=<id>`
- `sessions_list kinds=["subagent"]`

---

## Our Current Subagents (WRONG APPROACH)

**Quartermaster, Shipwright, Scribe** - Currently implemented as:
- Scripts triggered by cron
- Manual message sends
- No real session isolation

**They should be:**
- Defined in openclaw.json agents.list
- Spawned via sessions_spawn
- Auto-announcing

---

## When to Use Real Subagents

| Signal | Use Subagent? |
|--------|---------------|
| Needs own context | ✅ Yes |
| Runs on schedule | ✅ Yes |
| Reports back | ✅ Yes |
| One-off task | ❌ Just do it |
| Simple script | ❌ Cron script |

---

## Trigger Phrases
- "create a subagent"
- "spawn agent"
- "new worker"
- "sessions_spawn"
- "thread binding"