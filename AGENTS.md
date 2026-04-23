# Agent Setup for David

[[kb/system/system|Home]] • [[kb/stocks/protocol|Trading Protocol]]

## Crew Hierarchy

```
David (Captain)
    │
    └── Vyse (First Mate)
            │
            └── Quartermaster (Stock Trading Subagent)
```

## Active Systems

### Stock Trading (Quartermaster)
- **Role:** Autonomous price monitoring + volatile opportunity detection
- **Runs:** Every 30 min (cron)
- **Positions:** `kb/stocks/positions/*.md`
- **Protocol:** [[kb/stocks/protocol|Trading Rules]]

### Volatility Detection
- Quartermaster flags opportunities >3% move
- Vyse reviews → decides if Captain gets alert

## Skills (15)

| Category | Skills |
|----------|--------|
| **Core** | [[skills/workflow|workflow]], [[skills/memory|memory]], [[skills/crew-protocols|crew-protocols]] |
| **Trading** | [[skills/trading|trading]], [[skills/alerts|alerts]] |
| **System** | [[skills/system|system]], [[skills/security|security]], [[skills/time|time]], [[skills/control-ui|control-ui]] |
| **Tools** | [[skills/github|github]], [[skills/obsidian|obsidian]] |
| **Creative** | [[skills/dreams|dreams]], [[skills/projects|projects]] |
| **Meta** | [[skills/subagent-creator|subagent-creator]], [[skills/skill-creator|skill-creator]] |

*See [[skills/index|Full Skills Index]] for details.*

## Skill Creation Rule

> **Only Vyse creates skills.** Other crew members (Quartermaster) can recommend, but David must approve before any skill is built.

---

*Agent configuration and workflow documentation.*