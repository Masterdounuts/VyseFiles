# Session Handoff
*Auto-generated. Loaded automatically on session start.*

---

## Current Context (Updated: 2026-04-20 23:52 UTC)

**Portfolio:**
| Stock | Shares | Avg Cost | Current | Value |
|-------|--------|----------|---------|-------|
| GGB | 4.99 | $4.17 | $4.28 | $21.36 |
| Cash | - | - | - | $31.32 |
| **Total** | | | | **$52.68** |

**Goal:** Compound to $70/day eventual (reinvest 100%)

**GGB Targets:**
- **Buy:** $4.10, $3.90
- **Sell:** $4.45, $4.60, $4.75
- **Strategy:** Scale out 50% at $4.45, 50% at $4.60

**Status:**
- Monitoring: GGB only (AMC dropped)
- Subagent: Active, runs every 30 min
- Volatile system: Active, conferral enabled

**Volatile Opportunity System:**
- Threshold: >3% price move since last check
- Flow: Detected → Pending queue → I review → Telegram alert if I agree

**Key Files:**
- `AGENTS.md` - Trading rules & system info
- `kb/stocks/agent/state.json` - Live portfolio & targets
- `scripts/stock-trading-subagent.sh` - Price monitor

---
*Auto-updated by Vyse on 2026-04-20 23:52 UTC*