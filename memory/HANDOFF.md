# HANDOFF.md - Trading State

*Generated: 2026-05-12 06:10 PT*

---

## Current Positions

| Position | Shares | Entry | Current | Stop | Target | Type |
|----------|--------|-------|---------|------|--------|------|
| AMC | 17 | $1.44 | $1.41 | $1.34 | $1.61 | Day-to-Day |
| QQQ | 0.021 | $708.78 | ~$710 | - | TBD | Piggybank |
| DOGE | 7.16 | $0.1118 | ~$0.11 | - | $0.12 | Crypto |
| WLFI | 14.5 | $0.06873 | ~$0.07 | - | TBD | Crypto |

**Capital:** ~$55 | **Buying Power:** ~$14

---

## Today's Trading Plan

### Completed
- ✅ 6:00 AM PT - Ran premarket-scanner.js
- ✅ 6:08 AM PT - Ran intraday-scanner.js

### Results
**Pre-market accumulation signals:**
1. UPST $28.69 -12.7% vol 1.6x (40% 52W)
2. NET $193.52 -7.2% vol 3.2x (31% 52W)
3. TGT $118.44 -6.8% vol 1.4x (10% 52W)
4. WFC $73.58 -9.7% vol 1.3x (3% 52W)
5. RIVN $14.08 -12.8% (6% 52W) - V3_BOTTOM

**Intraday:** No accumulation (premarket moved)

### Remaining
- ⏳ 12:30 PM PT - Exit AMC (target or stop)
- ⏳ Watch for entry opportunities

---

## Scanner Scripts Location
```
~/.openclaw/workspace-vyse/scripts/
├── premarket-scanner.js  (runs 6am PT)
├── intraday-scanner.js   (runs 6:30am PT)
├── daytoday-scanner.js   (runs after 12:30pm)
└── mini-scanner.js       (anytime crypto)
```

---

## Cron Jobs
- premarket-scan: 6am PT weekdays (just added)
- Check: `openclaw cron list`

---

## Key Reminders
1. **Run scanner on wake** - check scripts/ folder
2. **Check AMC** - at pre-market and before exit
3. **Write to HANDOFF.md** - before ending session
4. **Read HANDOFF.md** - on every wake-up

---