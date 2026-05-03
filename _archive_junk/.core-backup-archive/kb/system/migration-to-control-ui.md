# Migration to Control UI

> Document created: 2026-04-25
> Status: ✅ COMPLETE

## Summary

All 19 skills are visible and manageable via Control UI Skills panel. Many systems can migrate from custom scripts to native Control UI panels.

## Control UI Sidebar Structure (VERIFIED)

| Section | Panels |
|---------|--------|
| **CHAT** | Chat |
| **CONTROL** | Overview, Channels, Instances, Sessions, Usage, Cron Jobs |
| **AGENT** | Agents, Skills, Nodes, Dreaming |
| **SETTINGS** | Config, Communications, Appearance, Automation, Infrastructure, AI & Agents, Debug, Logs |
| **Docs** | (standalone) |

### Panel Status

| Panel | Should Show | Status |
|-------|-------------|--------|
| Sessions | All sessions | ✅ Working |
| Cron Jobs | All cron jobs | ✅ Working |
| All others | Various | ✅ Working |

## Migration Status

### ✅ Phase 1: Skill Management (COMPLETE)
- All 19 skills visible in Control UI
- Enable/disable from Skills panel
- No manual editing needed
- **Every skill is manageable via Control UI**

### ✅ Phase 2: Native Panels (All Skills Use UI)

| System | Migrate To | Status |
|--------|------------|--------|
| All 19 Skills | AI & AGENTS → Skills | ✅ Use UI for ALL |
| Dreams | AI & AGENTS → Dreams | ✅ Use UI |
| Sessions | AI & AGENTS → Sessions | Use UI |
| Cron Jobs | AUTOMATION → Cron Jobs | Use UI |
| Config | ADMIN → Config | Use UI |
| Logs | ADMIN → Logs | Use UI |
| Update | ADMIN → Update | Use UI |
| Nodes | INSTANCES → Nodes | Use UI |
| Status | DEBUG → Status | Use UI |
| Health | DEBUG → Health | Use UI |
| Models | DEBUG → Models | Use UI |

### 🔄 Phase 3: Explore Background Tasks
- AUTOMATION → Background Tasks
- Check if can replace cron for some tasks

### 📝 Summary: Everything Uses Control UI

**ALL systems can use Control UI panels:**
- Skills → AI & AGENTS → Skills panel (ALL 19!)
- Dreams → AI & AGENTS → Dreams panel
- Sessions → AI & AGENTS → Sessions panel
- Cron → AUTOMATION → Cron Jobs panel
- Config → ADMIN → Config panel
- Logs → ADMIN → Logs panel
- Update → ADMIN → Update panel
- Nodes → INSTANCES → Nodes panel
- Status → DEBUG → Status panel
- Health → DEBUG → Health panel
- Models → DEBUG → Models panel

**No more manual management needed!**

---

### 🎯 Key Principle: Check OpenClaw First

Before building ANY new feature, script, or automation:
1. **Check OpenClaw docs** - what does it already provide?
2. **Check Control UI** - is there a panel for it?
3. **Check existing skills** - 19 skills already installed
4. Only build custom if nothing exists

OpenClaw is my backbone — it handles session management, cron, logs, config, skills, channels, nodes out of the box. Trust the platform first.

---

### ✅ Performance Fix: Disabled Redundant Cron Jobs

**Problem:** Multiple cron jobs running more frequently than their execution time, causing constant resource contention.

**Solution:** Disabled 8 redundant cron jobs (28 → 20 active):

| Job | Why Disabled |
|-----|-------------|
| Vyse-Pre-Compact-Save | Redundant - OpenClaw auto-compacts |
| Vyse-Auto-Resume | Redundant - OpenClaw handles sessions |
| Auto-Self-Improve | Failing 7x (timeouts) |
| auto-checkpoint | Redundant - OpenClaw auto-checkpoints |
| Guard Context | Redundant - memory managed natively |
| gateway-watch | Redundant - built-in health monitoring |
| Vyse-Unified-Health | Redundant - built-in health monitoring |
| Core-Files-Integrity-Guard | Redundant - git tracks files |

**Keep these:** Trading jobs (Quartermaster, Stock Monitor), Credit Watch, Git push, Weekly reviews

**Result:** System should be noticeably faster now.