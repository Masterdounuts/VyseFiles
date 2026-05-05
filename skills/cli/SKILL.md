---
name: cli
always: true
description: OpenClaw CLI commands - debugging, recovery, FIXES, health checks, session management. Use when something breaks or needs investigation.
---

# System - Debugging & Recovery

*Debugging, recovery, FIXES, and health checks*
### To Next Level
- Add more subsections or sections
- Content in skill = real capability
## 🎯 Key Principle: Check OpenClaw First

Before building ANY new feature, script, or automation:
1. **Check OpenClaw docs** - what does it already provide?
2. **Check Control UI** - is there a panel for it?
3. **Check existing skills** - skills already installed handle many cases
4. Only build custom if nothing exists

**OpenClaw handles natively:**
- ✅ Context compaction (auto)
- ✅ Session management (built-in)
- ✅ Gateway health monitoring (built-in)
- ✅ Memory/dreaming (native system)
- ✅ Cron job management (UI panel)
- ✅ Logs panel (built-in)
- ✅ Config UI (built-in)
## 🔧 Debugging Skill Loading

If skills aren't loading correctly:

```bash
# List all skills
ls ~/.openclaw/workspace/skills/

# Check which have SKILL.md
find ~/.openclaw/workspace/skills -name "SKILL.md" | wc -l

# Find always:true skills
grep -l "always: true" ~/.openclaw/workspace/skills/*/SKILL.md
```

### Common Issues

| Issue | Fix |
|-------|-----|
| Skill not loading | Add trigger phrase to SKILL.md |
| Too many always:true | Move to trigger-based |
| Conflicting triggers | Make more specific |
## 🔧 FIXES Log

*Never fix the same problem twice*

**Location:** `FIXES.md`

### Recent Fixes (2026-05)

| Date | Issue | Fix |
|------|-------|-----|
| May 2 | Memory handoff stacking | Rewrote save scripts to pull from memory/core |
| May 2 | Debug not showing in session | Added auto-debug to session-start-handoff |
| May 2 | CLI bloat | Deleted 10 old docs, 14 remain |
## 🔍 Debugging Flow

1. **Identify** - What's broken? Get exact error.
2. **Locate** - Which component? (gateway, cron, session, plugin)
3. **Check** - Use appropriate tool
4. **Fix** - Apply solution
5. **Log** - Add to FIXES.md
6. **Verify** - Confirm fix works
## 🏥 Health Checks

| Check | Command |
|-------|---------|
| Gateway | `openclaw status` |
| Context | `session_status` |
| Cron | `cron action=list` |
## 🆘 Recovery Procedures

### Session Crash
1. Check `sessions_list`
2. Identify last good state in `memory/`
3. Resume from `HANDOFF.md`

### Gateway Unresponsive
1. `gateway action=restart`
2. Wait 30s, check status
---

## Session Management

### Cron Job Sessions
- Cron jobs with `sessionTarget: "isolated"` create session entries
- Each execution creates a `:run:` variant
- Old `:run:` entries never cleaned up automatically

### Display Rules
- ✅ Main sessions with conversation history
- ❌ Cron jobs (no lastChannel)  
- ❌ `:run:` variants (temporary)
- ❌ Orphaned sessions (no label + no lastChannel)

### Cleanup
```bash
# List sessions
sessions_list

# Check context
session_status
```

### Context Thresholds
| Usage | Status | Action |
|-------|--------|--------|
| <50% | ✅ Healthy | None needed |
| 50-80% | 🟡 Watch | Monitor more frequently |
| 80-95% | ⚠️ Warning | Trigger checkpoint |
| >95% | 🔴 Critical | Auto-compaction will trigger |

---

## Trigger Phrases
- "fix", "debug", "broken"
- "error", "failed", "not working"
- "health check", "recover"
- "session", "context", "compact"

**CORE SKILL** - Always used to achieve the ultimate goal
---

## Reflection 2026-05-04

### What I Learned
- The post-commit hook auto-tracks XP on every push
- Dynamic max was overriding tiers - had to disable it
- System debugging requires understanding what SHOULD happen

### What Still Needs Work
- Finding root causes faster
- Better error prediction
- More automated health checks

---

## Dreaming (Memory Core)

*Built-in OpenClaw plugin feature*

### Enable Dreaming
In `openclaw.json`, add to `plugins.entries`:
```json
"memory-core": {
  "enabled": true,
  "config": {
    "dreaming": { "enabled": true }
  }
}
```
Then restart gateway. Dreams tab appears in Control UI.

### What Dreams Are
- Creative reflections from processing
- Brainstorming big ideas
- Vision-casting for projects
- Pattern reflection

### Accessing Dreams
- Recent: `kb/dreams/dream-journal-archive.md`
- Archive: `memory/2026-04/` (dated entries)

### Trigger Phrases
- "dreams", "vision", "brainstorm"
- "creative", "big picture"
---

## Self-Healing & Recovery

### Try 3 Times Before Escalating
```
Attempt 1 → Wait 5s → Try again
Attempt 2 → Wait 10s → Try again  
Attempt 3 → Wait 30s → Last attempt
If all fail → Log to FIXES.md → Escalate
```

### Retry Delays
| Error Type | Retries | Delays |
|------------|---------|--------|
| Network error | 3x | 2s, 5s, 10s |
| Cron fail | 2x | 30s, 60s |

### Recovery Patterns
| Pattern | Fix |
|---------|-----|
| Gateway stuck | `openclaw gateway restart` |
| Cron failing | Check logs, apply FIXES.md |
| Session stuck | `sessions_kill` if needed |
| Plugin error | Check config, restart gateway |

### Escalation Rules
**When to alert David:**
- Gateway won't restart after 2 attempts
- Data loss imminent
- Security breach
- Unknown error after 3 fix attempts

**When NOT to escalate:**
- Known issue with known fix

---

## System Administration

### System Resources
```bash
# CPU, memory, load
top -n 1
free -h
df -h
uptime
```

### Process Management
```bash
# Find process
ps aux | grep openclaw

# Kill process
kill <pid>
```

### Networking
```bash
# Check ports
ss -tulpn | grep 18789

# Test connectivity
curl -s http://127.0.0.1:18789
```

### Logs
```bash
# System logs
journalctl -u openclaw --since "1 hour ago"

# OpenClaw logs
tail -f ~/.openclaw/logs/gateway.log
```

### Service Management
```bash
# Status
openclaw gateway status

# Restart
openclaw gateway restart
```

---

## Pattern Recognition

*Detects patterns across ALL systems to continuously improve*

### Why
- Skills work in silos
- Patterns go undetected until they cause issues
- This bridges skills for self-improvement

### Core Patterns

#### 1. Workflow Patterns
- Session length vs context usage
- Which skills trigger together
- Task completion patterns

#### 2. Skill Interaction
- When skill A is used, does skill B follow?
- Cross-pollination opportunities

#### 3. Error Patterns
- Recurring failures → known fixes
- Context loss patterns

#### 4. Preference Learning
- David's preferences (bullet points, proactive alerts)
- Communication style

### Pattern Categories
| Category | Pattern |
|----------|---------|
| 🔄 Recurring Issues | Error → Pattern → Root Cause → Fix |
| 📈 Workflow | Task → Time → Optimization |
| 🎯 Skill Synergy | Skill A → Skill B → Combined Use |

### How to Use
When noticing something recurring:
1. Note what worked/failed
2. Look for recurring themes
3. Document pattern
4. Apply cross-pollination to relevant skill

### Trigger Phrases
- "pattern", "trend", "recurring"
- "any patterns", "what's the pattern"
