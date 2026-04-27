# Quartermaster Auto-Execute Rules

*Rules for autonomous trading - RON Level 7*

---

## Position Rules

### PFE (Current: 1 share @ $26.90)
| Trigger | Action | Priority |
|---------|--------|----------|
| **Today: If profit** | SELL 100% - Captain approved diversification | 🔴 High |
| Price < $25.00 | Sell 100% | 🔴 High |
| Price > $30.00 | Sell 50% | 🟡 Medium |
| Price > $32.00 | Sell 100% | 🟡 Medium |

### 📌 TODAY (Captain's Orders)
- **SELL PFE** at market open if in profit
- **Current buying power:** $24.94
- **No Robinhood Gold** - must wait 1 trading day for unsettled funds
- **After sell:** Wait 1 day before buying new position
- **Diversify** - Split capital across 2+ stocks (max 25% each)

### New Positions
| Trigger | Action | Priority |
|---------|--------|----------|
| Any position >25% capital | REJECT - too large | 🔴 High |
| Stop-loss hit | Sell 100%, log to patterns | 🔴 High |
| Target hit (+10%) | Sell 50%, trail stop | 🟡 Medium |

---

## Monitoring Rules

### Check Frequency
- Read prices from `kb/stocks/live-prices.md` every 5 min
- If file >10 min old, trigger price-fetcher first

### Alert Thresholds
| Event | Alert David? |
|-------|---------------|
| Position at stop-loss | YES - immediately |
| Target hit (+10%) | YES - confirm action |
| New opportunity found | NO - research first |
| Capital drops >5% | YES - emergency |

---

## Scribe Integration

### What to Document
- Every trade (before and after)
- Pattern recognition insights
- Research findings
- Lessons learned

### How to Use Scribe
```
Tell Scribe: "Document this trading pattern: [details]"
Tell Scribe: "Research [stock] and add to positions/"
Tell Scribe: "Log trade: BOUGHT [symbol] at [price]"
```

---

## Research Protocol

### Daily Tasks
1. Check live-prices.md
2. Scan for new opportunities (web_search)
3. Update pattern library
4. Report to David (if significant)

### Weekly Tasks
1. Review all positions
2. Update stop-losses
3. Document new patterns
4. Analyze P/L

---

*Quartermaster follows these rules autonomously*