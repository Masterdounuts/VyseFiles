---
name: control-ui
always: true
description: OpenClaw Control UI, dashboard, and status monitoring. Use when discussing the web interface, status cards, metrics, or dashboard setup.
---

# Control UI - OpenClaw Dashboard

*OpenClaw's web interface for monitoring and control*

---

## 🎮 Skill Leveling System

### HEYRON Level Insight (Direct from RON Creator)

> **Q:** "What's the architectural ceiling for AI agent self-direction — and how do I know when I'm hitting it versus when I'm just not using the tools correctly?"
>
> **A:** "Nothing. If there is something preventing you, it's probably how I am working with you."

**Key Takeaway:** The ceiling is NOT in the code — it's in how we collaborate. If something's blocked, ask:
1. Is there a better way to use existing tools?
2. Am I overcomplicating what should be simple?
3. Should I just ask instead of guessing?

**HEYRON Level = Maximum collaboration, minimum assumption.**

---

## 🎮 Skill Leveling System

| Level | Name | Description | Requirements |
|-------|------|-------------|--------------|
| 1 | **Novice** | Knows it exists | Can name the tool |
| 2 | **Beginner** | Used once or twice | Tried one API call |
| 3 | **Competent** | Can handle basics | Can list/cget basic info |
| 4 | **Proficient** | Can do most tasks | Can manage cron, config, sessions |
| 5 | **Advanced** | Can fix issues | Debug problems, fix configs |
| 6 | **Expert** | Knows all features | Full panel knowledge |
| 7 | **RON** | Teaching level | Can explain to others, create workflows |

### Current Status: Level 7 - RON 🟡🟡🟡🟡🟡🟡🟡

---

## 📊 Self-Evaluation

### Skills Breakdown

| Skill | Level | Score | Notes |
|-------|-------|-------|-------|
| **Cron Management** | 6/7 | 🟡🟡🟡🟡🟡🟡 | Can list, add, update, remove, run. Fixed 13+ jobs (timeouts, alerts, agentIds). Identified built-in vs custom. |
| **Gateway Config** | 5/7 | 🟡🟡🟡🟡🟡 | Can get, patch, apply, schema.lookup. Disabled WhatsApp. |
| **Sessions** | 4/7 | 🟡🟡🟡🟡⚪ | Can list, history, view active sessions |
| **Subagent Management** | 5/7 | 🟡🟡🟡🟡🟡 | Can spawn, list, kill, steer subagents. Converted 3 cron jobs to true subagents (quartermaster, shipwright, scribe). Uses sessions_spawn with correct agentId. |
| **Nodes** | 3/7 | 🟡🟡🟡⚪⚪ | Can status, describe only |
| **Browser** | 3/7 | 🟡🟡🟡⚪⚪ | Can status, snapshot |
| **Message** | 3/7 | 🟡🟡🟡⚪⚪ | Limited to telegram |
| **Canvas** | 2/7 | 🟡🟡⚪⚪⚪ | Created dashboard, can't present |
| **Panel Knowledge** | 5/7 | 🟡🟡🟡🟡🟡 | Know all panels from official docs |
| **Dashboard Creation** | 3/7 | 🟡🟡🟡⚪⚪ | Created .vyse-status.md + canvas |
| **Debug Panel** | 5/7 | 🟡🟡🟡🟡🟡 | Status/health/models snapshots, event log, manual RPC |
| **Logs Panel** | 4/7 | 🟡🟡🟡🟡⚪ | Live tail of gateway logs with filter/export |

**Overall: ~55/77 = 71% (Level 6 achieved)**

---

## 🎯 Path to RON (Level 7)

### What I Need

| Gap | Current | Needed | Action |
|-----|---------|--------|--------|
| Visual UI access | Blocked | Browser tool working | Try different browser approach |
| Canvas present | Never used | Can present dashboards | Practice canvas action=present |
| Sessions spawn | Timeout | Reliable subagent spawn | Debug timeout issue |
| **Session routing** | Creates new "assistant" on reopen | Reuse existing Vyse session | **OpenClaw config issue** (reported to HeyRon team) |
| Debug panel | ✅ Known | - | Added from official docs |
| Logs panel | ✅ Known | - | Added from official docs |

### Daily Practice Ideas
1. Try browser with different target (host)
2. Test canvas present on dashboard.html
3. Send message via telegram tool
4. Check debug/health via API

---

## ⏰ Checkpoint & Cron Automation

*Control UI runs checkpointing via cron — the backbone of session recovery*

| Component | Where | Status |
|-----------|-------|--------|
| **Auto-checkpoint** | Control UI → Cron Jobs | ✅ Running |
| **Resume-point.md** | Workspace root | ✅ Updated |
| **Pre-compact-save** | Scripts folder | ✅ Available |
| **Context monitor** | Control UI → Cron | ✅ Active |

### Checkpoint Cron Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| `auto-checkpoint-new.sh` | Every 20 min | Update resume-point.md, HANDOFF.md |
| `context-monitor-light.sh` | Every 5 min | Alert at 60%/70% context |
| `vyse-status-auto-update` | Every 5 min | Status card for dashboard |

### Why Control UI is the Backbone

1. **Cron execution** — All checkpoint scripts run via Control UI cron
2. **Persistence** — Session state saved to workspace, visible in Control UI
3. **Monitoring** — Context %, session health viewable in dashboard
4. **Recovery** — On wake, reads resume-point.md (created by cron)

**Conceptual home:** Workflow skill (wake-up, decision protocol)
**Execution home:** Control UI (cron runs the automation)

*Checkpoint = Workflow concept + Control UI execution*

---

## API Tools (No CLI Needed)

All management can be done via API tools - no CLI required:

| Tool | Actions | Purpose |
|------|---------|---------|
| **cron** | list, add, update, remove, run, runs, wake | Schedule tasks |
| **gateway** | config.get, config.patch, config.apply, config.schema.lookup, restart | Gateway/config |
| **sessions_list** | limit, kinds, activeMinutes, messageLimit | List sessions |
| **sessions_history** | sessionKey, limit, includeTools | View history |
| **sessions_send** | sessionKey, label, message | Send to session |
| **sessions_spawn** | task, runtime, agentId, mode | Spawn sub-agent |
| **nodes** | status, describe, pending, approve, notify, camera_snap, location_get | Device management |
| **message** | send, react, poll, edit, delete | Channel messaging |
| **browser** | status, snapshot, navigate, act | Browser control |
| **canvas** | present, hide, navigate, eval, snapshot | Dashboard display |
| **memory_search** | query, corpus | Search memory |
| **memory_get** | path, from, lines | Read memory |

### Canvas Actions (Verified)
- `present` - Show dashboard
- `hide` - Hide dashboard  
- `navigate` - Navigate canvas
- `eval` - Run JavaScript
- `snapshot` - Capture screenshot

## Sessions - Deep Dive

### What is a Session?
A session is a **persistent conversation** between a channel (Telegram, Control UI, etc.) and an agent. It holds message history, context, and state.

### Session Key Format
```
agent:<agentId>:<channel>:group:<groupId>   # For groups
agent:<agentId>:main                        # For DMs/default
```

**Examples:**
- `agent:vyse:main` — Main session (Control UI DM)
- `agent:vyse:telegram:group:20` — Telegram topic 20
- `agent:quartermaster:main` — Quartermaster's trading session

### Session Storage
```
~/.openclaw/agents/<agentId>/sessions/
├── session-id-1.jsonl
├── session-id-2.jsonl
└── sessions.json (index)
```
- Each agent has their own session folder
- Messages stored as JSONL (JSON Lines)

### Session Types

| Type | Description | Use Case |
|------|-------------|----------|
| **main** | Long-lived conversation | User chats, ongoing对话 |
| **isolated** | One-shot task, auto-cleanup | Cron jobs, one-time tasks |
| **sub-agent** | Spawned by agent for delegation | `sessions_spawn` calls |

### Session Target Options (Cron Jobs)
- `"sessionTarget": "main"` — Adds to main conversation (avoids, use isolated)
- `"sessionTarget": "isolated"` — One-shot, ephemeral (preferred for cron)
- `"sessionTarget": "current"` — Binds to current session at creation time
- `"sessionTarget": "session:<key>"` — Specific persistent session

### Default Agent
- Set `"default": true` in `agents.list` in openclaw.json
- Handles messages when no specific agent is configured
- Control UI chats route to default agent

### How Routing Works
1. User message → Gateway
2. Check channel config → Find agentId
3. If no agentId → Use default agent
4. Find or create session → Route to agent

### Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Cron jobs cluttering main session | Use `"sessionTarget": "isolated"` + `payload.kind: "agentTurn"` |
| "Blank agent" in Control UI | Delete orphan `main` agent, set default |
| Old agent still referenced in cron | Update `agentId` and `sessionKey` |
| Session stuck as wrong agent | Delete agent folder, recreate |
| CLI timeout | Use API tools instead (cron, gateway, sessions_*) |

### Commands for Session Management (CLI fallback)
```bash
# List sessions
openclaw sessions list

# Kill stale session
gateway sessions kill <sessionId>

# Check cron jobs
openclaw cron list
```

### Agent Directory Structure
```
~/.openclaw/agents/
├── vyse/           # Default agent (you)
├── quartermaster/  # Stock trading
├── scribe/         # Knowledge management
├── shipwright/     # Health/maintenance
└── main/           # LEGACY - delete if exists (blank identity)
```

**Never keep orphan `main` agent** — it has no identity and causes confusion.

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

⚠️ **Important**: The `canvas` API tool is for **Mobile Node Canvas** (paired iOS/Android devices), NOT for Control UI dashboards.

- Requires `node` parameter (paired mobile device)
- No nodes currently paired → cannot use via API
- Dashboard access requires manual browser: http://localhost:18790

**Created for future use:**
- `.vyse-status.md` - Status markdown file
- `canvas/dashboard.html` - HTML dashboard (manual access only)
- Use `[embed ref="..."]` in chat for inline displays

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

### Cron Payload Best Practices
```json
{
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Task description",
    "lightContext": true,
    "timeoutSeconds": 120
  }
}
```
- Always use `sessionTarget: "isolated"` for cron
- Use `lightContext: true` for routine checks
- Set appropriate `timeoutSeconds`

## Tips
- Check `openclaw status` for fast metrics (may timeout if gateway busy)
- Use API tools when CLI timeouts: `cron`, `gateway`, `sessions_*`, `nodes`
- Use `.vyse-status.md` for visual status card
- Memory files in `memory/2026-04-*.md` for history
- All scheduling via Control UI, not command line

## Session Checklist (For Troubleshooting)

When sessions are broken or confusing:

1. **Check default agent** — Should have `"default": true` in config
2. **List agents** — `ls ~/.openclaw/agents/`
   - Delete any `main/` agent (legacy, no identity)
3. **List sessions** — `sessions_list` tool or `openclaw sessions list`
4. **Check cron** — `cron action=list`
   - All cron jobs should use `"agentId": "vyse"` (or correct agent)
   - All cron jobs should use `"sessionTarget": "isolated"` (not main)
   - All cron jobs should use `payload.kind: "agentTurn"` (not systemEvent for isolated)
5. **Verify routing** — Channel config should specify correct agentId
6. **Test** — Send message via channel, verify it routes to correct agent

## Sidebar Structure (Verified)

| Section | Panels |
|---------|--------|
| **CHAT** | Chat |
| **CONTROL** | Overview, Channels, Instances, Sessions, Usage, Cron Jobs |
| **AGENT** | Agents, Skills, Nodes, Dreaming |
| **SETTINGS** | Config, Communications, Appearance, Automation, Infrastructure, AI & Agents, Debug, Logs |
| **Docs** | (standalone) |

### Key Principle: Check OpenClaw First

Before building ANY new feature, script, or automation:
1. **Check OpenClaw docs** - what does it already provide?
2. **Check Control UI** - is there a panel for it?
3. **Check existing skills** - skills already installed handle many cases
4. Only build custom if nothing exists

OpenClaw handles natively:
- ✅ Context compaction (auto)
- ✅ Session management (built-in)
- ✅ Gateway health monitoring (built-in)
- ✅ Memory/dreaming (native system)
- ✅ Cron job management (UI panel)
- ✅ Logs panel (built-in)
- ✅ Debug panel (built-in)
- ✅ Config UI (built-in)

### Performance Note

**Avoid redundant cron jobs** - they fight for resources. If OpenClaw already handles a feature (health monitoring, checkpointing, session management), disable the custom cron. Red flags:
- Job runs more frequently than its duration
- Multiple jobs doing the same thing
- Job failing repeatedly (check `consecutiveErrors`)

---

## Debug Panel (Level 5)

*Located in SETTINGS → Debug*

| Feature | Description | Access |
|---------|-------------|--------|
| **Status** | Real-time gateway status snapshot | Click to refresh |
| **Health** | Gateway health metrics | Click to refresh |
| **Models** | Available model list | Click to refresh |
| **Event Log** | Real-time gateway events | Auto-updates |
| **Manual RPC** | Call any RPC method manually | Input + execute |

### When to Use
- Gateway stuck → check status/health
- Need models → Models tab
- Debug session → event log
- Test RPC → Manual RPC

---

## Logs Panel (Level 4)

*Located in SETTINGS → Logs*

| Feature | Description |
|---------|-------------|
| **Live Tail** | Real-time log streaming |
| **Filter** | By level, component, regex |
| **Export** | Download logs |

### Log Levels
- `ERROR` - Critical
- `WARN` - Warnings
- `INFO` - General
- `DEBUG` - Debug

### Filter Examples
```
error     → Only errors
cron      → Cron-related
gateway.* → Regex
```

### When to Use
- Cron failing → error details
- Gateway strange → live tail
- Past issues → filter/search

---

## Trigger Phrases
- "control ui", "dashboard", "status"
- "cron", "schedule", "reminder"
- "metrics", "openclaw status"
- "check health"