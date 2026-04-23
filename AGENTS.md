# Agent Setup for David

[[kb/system/hub-system|Home]] • [[kb/stocks/protocol|Trading Protocol]]

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

---

*Agent configuration and workflow documentation.*