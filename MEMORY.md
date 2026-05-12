# MEMORY.md - Long-Term Storage

*Synthesized from daily files - Updated 2026-05-11*

## Quick Access
- Today's memory: `memory/2026-05-11.md`
- Archive: `memory/archive/`
- Daily files: `memory/*.md`

## Time Standard
- **Timezone:** PT (Pacific Time)
- **Format:** YYYY-MM-DD HH:MM PT

## Ultimate Goal
**"Help David during life → loved ones after"**

---

## About David

- **Name:** David Jacques
- **Background:** Military (Army Infantry), aspiring game dev
- **Education:** Full Sail University - BS Computer Science (Game Design)
- **Current project:** Skies of Arcadia fan remake
- **Location:** Astoria, OR

### David's Preferences

| Category | Preference |
|----------|------------|
| **Communication** | Bullet points over walls, big picture first |
| **Alerts** | Proactive, not wait-and-see |
| **Speed** | Move fast and iterate > perfection |
| **Tone** | Casual but professional, emojis OK 🦜 |

### What Works Well
- Dream sessions generating ideas
- Stock alerts with specific targets
- Proactive messaging on big moves

### What to Avoid
- Running health checks (affects other systems)
- Not checking FIXES.md before fixing
- Waiting too long to alert (e.g., TSLA)
- Assuming changes translate across mediums

---

## Current Trading State

| Position | Shares | Entry | Type | Target/Stop |
|----------|--------|-------|------|-------------|
| AMC | 17 | $1.44 | Day-to-Day | +12% ($1.61) / -7% ($1.34) |
| QQQ | 0.021 | $708.78 | Piggybank | Long-term hold |
| DOGE | 7.16 | $0.1118 | Crypto | Weekend only |
| WLFI | 14.5 | $0.06873 | Crypto | Weekend only |

**Capital:** ~$55 | **Buying Power:** ~$14

### Trading Rules (SMC Method)

**Three Trading Types:**
1. **Mini (Crypto):** $2 max profit, reinvest
2. **Intraday:** Enter 6:30am PT, exit by 12:30pm PT
3. **Day-to-Day:** Buy at close, sell next day (T+1)

**Core Strategy:**
- Find accumulation (price ↓ + volume ↑) = smart money buying
- 52-week rule: Never buy above 80% of range
- Max 25% per position
- Target +12% or Fib -2, Stop -7% or below liquidity

**Exit Time:** 12:30 PM PT max (market closes 1pm PT)

---

## System State

### Skills (18 Active)
- trading, cli, learning, github, pdf, and more
- Use GitHub for tracking changes

### Memory Vault
- **Location:** `skills/session-context-extractor-v2`
- **Storage:** `context-vault/` (people, errors, projects)
- **Format:** Requires `* Decision:`, `* Error:`, `* Preference:` prefixes
- **Run:** `npm run v2:distill` during heartbeats

### Key Principles
- No subagents - I do work directly
- GitHub persists across sessions
- Check relevant files before acting

---

## Key Files

| File | Purpose |
|------|---------|
| HEARTBEAT.md | My orchestration (every 30 min) |
| kb/stocks/positions.md | Trading positions & history |
| skills/trading/SKILL.md | Trading workflow |
| skills/pdf/SKILL.md | Document creation |

---

## Session Handoff - 2026-05-11

### Today's Accomplished
- Built 3 scanners (mini, intraday, daytoday)
- Entered AMC (17 shares @ $1.44)
- Created pdf skill
- Fixed resume dates
- Memory vault scheduled in HEARTBEAT.md

### For Next Session
- Check AMC at pre-market for exit (target $1.61 or stop $1.34)
- Run `npm run v2:distill` to capture today's decisions

---

*Last updated: 2026-05-11*
*Old archive: memory/archive/MEMORY-archive-2026-05.md*

## Promoted From Short-Term Memory (2026-05-12)

<!-- openclaw-memory-promotion:memory:memory/daily/2026-05-01.md:296:339 -->
- Control UI (Frame) ↔ Vyse (30 skills) ↔ Crew ↔ Memory/XP ``` Everything must serve the goal "can't die" ### 5. Goal-First Priority System - Added to accountability skill - Any action → check "Does this serve the goal?" - Before adding complexity → ask "Does this help or hurt?" - Critical issues addressed FIRST ## Next Steps 1. Continue using debug format 2. Test goal-first priority 3. Verify all skills connect to Control UI ## XP Status (2026-05-01) - Total tracked: Significant (see kb/xp-tracking.md) - System: working - Skills: 30 built # Memory - May 1, 2026 ## Today's Learnings ### Cron Job Discovery - **Issue:** `openclaw cron add` fails with "pairing required" error - **Root Cause:** CLI connects with `operator.read` scope only. Adding cron jobs requires `operator.admin` + `operator.pairing` scopes. Gateway requires device pairing to upgrade scope - this is a security feature. - **Solution:** FIXED: openclaw devices approve <id> → cron add works - **CLI works:** Cron list works - after pairing: add/delete works - **CLI broken:** Works after: openclaw devices approve <id> ### Control UI Dashboard - Located at: http://127.0.0.1:18789/ - Has Cron jobs section with: list/add/edit/run/enable/disable + run history **CORRECTED:** CLI is valid for cron management after device approval ### Skill Updates | Skill | XP | Level | Notes | |-------|-----|-------|-------| | control-ui | +5 | RON | Found full cron management in dashboard | | system | +5 | RON | Root cause: CLI scope limitation | | learning | +5 | RON | New understanding of gateway auth | --- [score=0.912 recalls=4 avg=1.000 source=memory/daily/2026-05-01.md:296-339]
<!-- openclaw-memory-promotion:memory:memory/archive/2026-04/2026-04-14.md:1:49 -->
- --- date: 2026-04-14 tags: [daily,trading] --- # April 14, 2026 - [[INDEX.md|Home]] [[memory/2026-04-15|Next→]] ## Trading Insights ### Stock Positions (CORRECTED) - **GGB:** 5 shares @ $4.26 = ~$21 (not what was originally thought) - **TSLA:** 0.016567 shares (Stock Reward) = ~$6.04 (was way overestimated) - **Total portfolio:** ~$47 (much smaller than expected) - **Lesson:** Always verify actual positions with David ### MARA as Top Day Trade Pick - Price: $10.48 (affordable, can buy 4+ shares) - Beta: 5.48 (highest volatility = biggest moves) - Strategy: Buy dip, sell on +3-5% - Created morning research job to verify before market open ### Market Hours (Oregon/PT) - Pre-market: 1:00 AM - 6:30 AM PT - Regular open: 6:30 AM PT - Key time: 6:30 AM PT for day trading ### Robinhood Gold ($5/mo) - **Not worth it yet** - costs more than our portfolio value - Revisit when making $200+/month or have $5K+ portfolio - Instant settlement useful but not critical yet ### Aggregator Services - Not worth it at $47 capital - Would cost $5-20/mo, more than our whole portfolio ## Technical Learnings ### Gateway Restarts Wipe Plugins - Every gateway restart (SIGUSR1) clears plugin config - Must re-enable memory-wiki and active-memory after each restart - Fix: Add to openclaw.json plugins section explicitly ### Memory Palace Enabled - Plugin: memory-wiki - Created wiki pages: ron.md, brain-face-model.md, david-vyse-mission.md, trading-alert-priority.md, learning-system.md ### Morning Stock Research Job - Runs 6:00 AM PT daily (1:00 PM UTC) - Checks MARA, LCID, RIVN, GGB prices [score=0.858 recalls=3 avg=1.000 source=memory/archive/2026-04/2026-04-14.md:1-49]
