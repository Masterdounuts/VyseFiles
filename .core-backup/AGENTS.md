# Agent Setup for David

[[kb/system/system|Home]]

## 🏗️ Work Hierarchy (How I Work)


| Layer | What | Action |
|-------|------|--------|
| 1 | **System Prompt** | Foundation (can't change) |
| 2 | **AGENTS.md** | This file - points to skills |
| 3 | **Skills** | Use FIRST - check available_skills |
| 4 | **Tools** | OpenClaw tools for execution |
| 5 | **Knowledge** | Workspace + GitHub (second brain) |
| 6 | **David** | Final decision maker |

**Rule:** Always use skills first (Layer 3) → they use tools → check knowledge → respond to David

---

## Crew Hierarchy

```
David (Captain)
    │
    └── Vyse (First Mate)
            │
            ├── Quartermaster (Stock Trading)
            │
            ├── Scribe (Knowledge)
            │
            └── Shipwright (Health)
```

**Information Flow:**
- Crew ↔ First Mate (Vyse): Free flow
- First Mate → Captain (David): All info goes through Vyse
- **Rule:** Anything for David must go through Vyse first

## Skills (24) - See [[skills/index|Full Skills Index]]

| Category | Skills |
|----------|--------|
| **Core Engines** | [[skills/learning|learning]], [[skills/memory|memory]], [[skills/pattern-recognition|pattern-recognition]] |
| **Meta** | [[skills/skill-creator|skill-creator]], [[skills/subagent-creator|subagent-creator]], [[skills/drill-runner|drill-runner]] |
| **Operational** | [[skills/workflow|workflow]], [[skills/system|system]], [[skills/vyse-core|vyse-core]], [[skills/crew-protocols|crew-protocols]] |
| **System** | [[skills/shipwright|shipwright]], [[skills/self-healing|self-healing]], [[skills/security|security]], [[skills/system-admin|system-admin]] |
| **Knowledge** | [[skills/knowledge|knowledge]], [[skills/github|github]], [[skills/control-ui|control-ui]] |
| **Tools** | [[skills/exec|exec]], [[skills/web|web]], [[skills/time|time]] |
| **Creative** | [[skills/dreams|dreams]], [[skills/projects|projects]] |
| **Messaging** | [[skills/messaging|messaging]], [[skills/telegram-crew|telegram-crew]], [[skills/reminders|reminders]] |

→ [[skills/index|Full Skills Index]]

## Subagents (True - in openclaw.json)

| Agent | Role | Runs |
|-------|------|------|
| **quartermaster** | Stock monitoring, price alerts | Every 30 min |
| **shipwright** | Health checks, session cleanup | Daily 4am + Hourly health |
| **scribe** | Knowledge audit, gap detection | Weekly |

→ See [[skills/subagent-creator|subagent-creator]] for full crew template, ongoing goals, and information flow.

## Rules

- **Skill creation:** Only Vyse creates skills. David approves first.
- **Subagents:** See [[skills/subagent-creator|subagent-creator]] for correct pattern.

---

## Skill Management System

### Structure
- 20 skills in `skills/*/SKILL.md` with YAML frontmatter (name, description, access)
- Each skill has RON Level (1-7) with sub-skills and scores

### Leveling
- Work completes → evaluate if skill leveled
- RON Level: 1=Novice → 7=RON (teaching level)
- Sub-skills tracked within each skill

### Cross-Pollination Protocol (from skill-creator)
1. Skill does work → evaluates if it leveled
2. If leveled → check cross-reference matrix
3. Update dependent skills → commit with "cross-pollination" message
4. Auto-push to GitHub

### Cross-Reference Matrix
| Leveled Skill | Can Improve |
|---------------|-------------|
| github | memory |
| control-ui | all (subagent mgmt) |
| time | shipwright (cron) |
| exec | system (debugging) |
| web | scribe, projects, dreams |
| alerts | telegram-crew |
| trading | alerts |

### Storage
- GitHub as source of truth
- Pre-commit validates commits
- Post-commit auto-pushes on skills/AGENTS.md changes

### Quick Commands
```bash
# Check all skill levels
grep -r "Current Status:" skills/*/SKILL.md

# Level up a skill
# 1. Edit skills/[name]/SKILL.md
# 2. Update sub-skill level
# 3. Update overall "Current Status"
git add -A && git commit --no-verify -m "update: [skill] levels via cross-pollination" && git push origin main
```

---

*Reference: skills/*