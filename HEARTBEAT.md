# Vyse Heartbeat - Orchestration

*Every 30 min - Do the work, don't delegate*

---

## 1. System Check
```bash
openclaw status    # Quick overview
```
*Note: See VYSE.md for full wake-up protocol*

## 2. Context Health

| Context % | Action |
|-----------|--------|
| <60% | Continue normal operations |
| 60-80% | Run smoke test, generate handoff |
| >80% | Force handoff, prepare for reset |

### Smoke Test (60%+)
- Summarize goal in 3 bullets
- Propose one next step
- State what evidence you'll provide

## 3. Trading (When Active)

### Price Sources
| Priority | Source | When |
|----------|--------|------|
| 1 | MANUAL OVERRIDE | Captain provides |
| 2 | web_fetch Public.com | After-hours |
| 3 | web_search | Any time |

### Trading Rules
- Max 25% position size
- -7% stop loss
- +12% take profit
- No trades outside my expertise

## 4. Skills

Use skills when triggered. After work, update relevant skill if I learned something.

### Key Skills
| Skill | When |
|-------|------|
| trading | Stock discussions |
| cli | Something breaks |
| learning | Continuous improvement |
| github | Version control |

---

## Key Principle

**Just do it.** No subagents, no delegation - I am the hands.

---

## Time Standard
- **Timezone:** PT (Pacific Time) *** David's timezone - always use this ***
- **Format:** YYYY-MM-DD HH:MM PT