name: system
always: true
description: Debugging, recovery, FIXES, and health checks. Use when something breaks or needs investigation.

# System - Debugging & Recovery

*Debugging, recovery, FIXES, and health checks*

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Critical (150 max)

### Current: Level 27
- Sections: 10
- Subsections: 5  
- Lines: 1220 / 100 = 12
- Total: 10 + 5 + 12 = 27

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
## Trigger Phrases
- "fix", "debug", "broken"
- "error", "failed", "not working"
- "health check", "recover"

**CORE SKILL** - Always used to achieve the ultimate goal
Full: Help David during his life, then help loved ones after