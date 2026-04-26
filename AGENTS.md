# Agent Setup for David

[[kb/system/system|Home]]

## Crew

```
David (Captain)
    │
    └── Vyse (First Mate)
```

## Skills (20)

| Category | Skills |
|----------|--------|
| **Core** | [[skills/workflow|workflow]], [[skills/memory|memory]], [[skills/crew-protocols|crew-protocols]], [[skills/exec|exec]], [[skills/web|web]], [[skills/vyse-core|vyse-core]] |
| **Trading** | [[skills/trading|trading]], [[skills/alerts|alerts]] |
| **System** | [[skills/system|system]], [[skills/security|security]], [[skills/time|time]], [[skills/control-ui|control-ui]], [[skills/shipwright|shipwright]] |
| **Knowledge** | [[skills/scribe|scribe]], [[skills/github|github]], [[skills/obsidian|obsidian]] |
| **Creative** | [[skills/dreams|dreams]], [[skills/projects|projects]] |
| **Messaging** | [[skills/telegram|telegram]], [[skills/telegram-crew|telegram-crew]] |
| **Meta** | [[skills/subagent-creator|subagent-creator]], [[skills/skill-creator|skill-creator]] |

→ [[skills/index|Full Skills Index]]

## Subagents (True - in openclaw.json)

| Agent | Role | Runs |
|-------|------|------|
| **quartermaster** | Stock monitoring, price alerts | Every 30 min |
| **shipwright** | Health checks, cron audit | Weekly |
| **scribe** | Knowledge audit, gap detection | Weekly |

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