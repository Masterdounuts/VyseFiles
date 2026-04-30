# REBUILD #3 - Vyse Workspace Recovery

**Date:** 2026-04-30
**Purpose:** Complete workspace backup with rebuild instructions

---

## What This Contains

1. Current openclaw.json config
2. Complete workspace structure  
3. Step-by-step rebuild instructions
4. All 26 skills at RON level

---

## PART A: openclaw.json Backup

**Location:** `backups/openclaw-backup-2026-04-30.json`

**Key Settings:**
```json
{
  "session": {
    "dmScope": "main"
  },
  "plugins": {
    "deny": ["whatsapp"],
    "entries": {
      "telegram": {
        "enabled": true
      }
    }
  }
}
```

---

## PART B: Workspace Structure

```
workspace-vyse/
├── AGENTS.md          # Work hierarchy, crew structure
├── SOUL.md            # Core principles, decision protocol
├── IDENTITY.md        # Who Vyse is (name, vibe, emoji)
├── USER.md            # About David (preferences, timezone)
├── HEARTBEAT.md       # 30-min heartbeat orchestration
├── TODO.md            # Active tasks
├── HANDOFF.md         # Session handoff protocol
├── MEMORY.md          # Memory system reference
├── DREAMS.md          # Creative visions
├── TOOLS.md           # Tool reference
├── system-prompt.md   # System prompt backup
│
├── skills/            # 26 skills (all at RON)
│   ├── skill-creator/
│   ├── learning/
│   ├── memory/
│   ├── pattern-recognition/
│   ├── workflow/
│   ├── system/
│   ├── vyse-core/
│   ├── crew-protocols/
│   ├── control-ui/
│   ├── web/
│   ├── exec/
│   ├── github/
│   ├── messaging/
│   ├── time/
│   ├── security/
│   ├── self-healing/
│   ├── shipwright/
│   ├── projects/
│   ├── dreams/
│   ├── knowledge/
│   ├── subagent-creator/
│   ├── telegram-crew/
│   ├── drill-runner/
│   ├── reminders/
│   ├── presentation/
│   └── system-admin/
│
├── memory/            # Daily memories
├── kb/                # Knowledge base
│   ├── crew/         # Subagent prompts
│   ├── system/       # System docs
│   └── stocks/       # Trading data
│
├── scripts/           # Automation scripts
└── backups/          # Config backups
```

---

## PART C: Rebuild Instructions

### Step 1: Initial Setup
```bash
# Clone VyseFiles from GitHub
git clone https://github.com/david existente/VyseFiles.git workspace-vyse
cd workspace-vyse

# Setup Git remote
git remote add origin https://github.com/david existente/VyseFiles.git
```

### Step 2: Restore openclaw.json
```bash
# Copy backup to config location
cp backups/openclaw-backup-2026-04-30.json ~/.openclaw/openclaw.json

# Restart gateway
openclaw gateway restart
```

### Step 3: Verify Skills
```bash
# Check skills exist
ls skills/

# Verify all 26 skills have SKILL.md
ls skills/*/SKILL.md | wc -l  # Should be 26
```

### Step 4: Verify RON Levels
Each skill should be at Level 7 (RON). Check:
```bash
grep "Current Status: Level 7" skills/*/SKILL.md | wc -l
# Should be 26
```

---

## PART D: Skill System Summary

### XP System
| Level | XP Required |
|-------|-------------|
| L1 | 10 |
| L2 | 20 |
| L3 | 30 |
| L4 | 40 |
| L5 | 50 |
| L6 | 60 |
| RON (L7) | 70+ |
| RON+ | 100+ |

### Dynamic Max
- Starts at 7
- Grows with discoveries (+1 per discovery)
- Shown as "7+"

### Cross-Pollination
- Primary skill use: +5 XP
- Cross-pollination: +3 XP
- Discovery: +1 to Dynamic Max

### Tools Documentation
- Every skill documents which OpenClaw tools it uses
- Layer 3 (Skills) → Layer 4 (Tools)

---

## PART E: Key Files to Always Preserve

| File | Why |
|------|-----|
| AGENTS.md | Points to all skills, defines hierarchy |
| SOUL.md | Core principles, decision protocol |
| HEARTBEAT.md | 30-min orchestration |
| skills/*/SKILL.md | All 26 skill definitions |
| memory/*.md | Historical context |

---

## Recovery Checklist

- [ ] Clone VyseFiles repo
- [ ] Restore openclaw.json from backup
- [ ] Verify gateway starts
- [ ] Check 26 skills exist
- [ ] Verify RON levels
- [ ] Test heartbeat

---

*End of Rebuild #3*