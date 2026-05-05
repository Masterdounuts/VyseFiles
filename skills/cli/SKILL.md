name: cli
always: true
description: OpenClaw CLI commands - debugging, recovery, FIXES, health checks, session management. Use when something breaks or needs investigation.

# System - Debugging & Recovery

*Debugging, recovery, FIXES, and health checks*

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 16
- Sections: 10
- Subsections: 5
- Lines: 119 / 100 = 1
- Total: 10 + 5 + 1 = 16

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

