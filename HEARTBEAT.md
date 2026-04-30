# Vyse Heartbeat - RON Level Orchestration

*Every 30 min - Coordinate crew, don't do their job*

---

## 1. System Check (Native Commands)
```bash
openclaw status    # Quick overview
openclaw health     # Gateway running?
```

## 2. Price Service (INTEGRATED)

### Price Sources (in priority order):
| Priority | Source | When | Status |
|----------|--------|------|--------|
| 1 | MANUAL OVERRIDE | Captain provides prices | ✅ Working |
| 2 | web_fetch Public.com | After-hours (4-8PM PT) | ✅ Working |
| 3 | web_search | Any time | ✅ Working |

### Sources That DON'T Work:
- Yahoo Finance API (stale/delayed)
- stockanalysis.com (wrong page structure)

### The Price Fetch Flow:
1. Check prices.json for `manual_override: true`
2. If YES → use Captain's prices (logged in corrections.md)
3. If NO → 
   - After-hours: web_fetch Public.com/after-hours
   - Regular: web_search (faster)
4. Update prices.json
5. Quartermaster reads prices.json

### Known Working URLs:
```
After-hours: https://public.com/stocks/nrxp/after-hours
            https://public.com/stocks/lidr/after-hours
```

---

## 3. Quartermaster
- Spawn when market active
- Reads prices.json (accurate data)
- Makes buy/sell/hold decisions
- Comes to you only when blocked

## 4. Shipwright
- Spawn if issues detected

## 5. Scribe
- Spawn if knowledge needed

---

## Key Principle
Orchestrate. Don't micromanage.

---

## Time Standard
- **Your timezone:** PT (Pacific Time)
- **All timestamps in this document use PT**
- **Format:** YYYY-MM-DD HH:MM PT
