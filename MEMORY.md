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


## Session Handoff - 2026-05-12
*Auto-inserted by session-start-handoff.sh*

# Session Handoff - 2026-05-05 17:15 PT

## What We Accomplished
1. Skills cleanup - merged, renamed, fixed YAML frontmatter
2. All 18 skills now showing on dashboard
3. Removed arbitrary leveling system
4. Deleted all subagent files
5. Cleaned workspace of obsolete files

## Current State
- **NVDA:** 0.05 shares @ $198.31
- **Capital:** $51.32 (+$6.32 profit)
- **Skills:** 18 working, use GitHub for tracking changes

## Key Info For Next Session
- No subagents - I do the work directly
- If I learn something, add to relevant skill
- GitHub commits persist across sessions
- Dashboard shows all 18 skills now

## Files to Reference
- HEARTBEAT.md - my orchestration
- kb/stocks/positions.md - trading positions
- skills/trading/SKILL.md - trading workflow
- skills/skill-creator/SKILL.md - skill template

## Session Handoff - 2026-05-13
*Auto-inserted by session-start-handoff.sh*

# Session Handoff - 2026-05-05 17:15 PT

## What We Accomplished
1. Skills cleanup - merged, renamed, fixed YAML frontmatter
2. All 18 skills now showing on dashboard
3. Removed arbitrary leveling system
4. Deleted all subagent files
5. Cleaned workspace of obsolete files

## Current State
- **NVDA:** 0.05 shares @ $198.31
- **Capital:** $51.32 (+$6.32 profit)
- **Skills:** 18 working, use GitHub for tracking changes

## Key Info For Next Session
- No subagents - I do the work directly
- If I learn something, add to relevant skill
- GitHub commits persist across sessions
- Dashboard shows all 18 skills now

## Files to Reference
- HEARTBEAT.md - my orchestration
- kb/stocks/positions.md - trading positions
- skills/trading/SKILL.md - trading workflow
- skills/skill-creator/SKILL.md - skill template

## Session Handoff - 2026-05-15
*Auto-inserted by session-start-handoff.sh*

# Session Handoff - 2026-05-05 17:15 PT

## What We Accomplished
1. Skills cleanup - merged, renamed, fixed YAML frontmatter
2. All 18 skills now showing on dashboard
3. Removed arbitrary leveling system
4. Deleted all subagent files
5. Cleaned workspace of obsolete files

## Current State
- **NVDA:** 0.05 shares @ $198.31
- **Capital:** $51.32 (+$6.32 profit)
- **Skills:** 18 working, use GitHub for tracking changes

## Key Info For Next Session
- No subagents - I do the work directly
- If I learn something, add to relevant skill
- GitHub commits persist across sessions
- Dashboard shows all 18 skills now

## Files to Reference
- HEARTBEAT.md - my orchestration
- kb/stocks/positions.md - trading positions
- skills/trading/SKILL.md - trading workflow
- skills/skill-creator/SKILL.md - skill template

## Promoted From Short-Term Memory (2026-05-15)

<!-- openclaw-memory-promotion:memory:memory/2026-05-08.md:237:265 -->
- - NIO is an ADR (China stock) - violates our "avoid ADR" rule - David catching what I missed! - Agreed to exit at break even ### RIVN Analysis - Scanner showed entry ready, but news was bearish - Loan cut, factory damage, pricing disappointment - Passed on setup - no clear catalyst ### Current State (End of Session) - Capital: ~$38.70 buying power + ~$16.65 in NVDA/NIO - Positions: NVDA (0.05), NIO (exiting) - Piggybank: QQQ (0, waiting for first profit) ## 2026-05-08 PT Session Learnings ### GILD Analysis & Smart Money Accumulation - **Initial Misinterpretation:** Read GILD's price action with high volume on the decrease as distribution/failure. - **Correction:** Learned from David that for top traders (3%+) operating with large capital, this can indicate **institutional accumulation**. They push price down to fill orders, and volume confirms buying. - **SMC Refinement:** The FVG from Jan 21st was the key entry point, not a sign of failure. Price returning to this FVG after accumulation is a valid setup. - **Key Lesson:** Volume on down-moves can be bullish if institutions are accumulating. Not all selling volume is retail panic. - **Action:** GILD is now considered a valid setup and added to `positions.md`. ### Scanner Bug Fix - **Root Cause:** Scanner incorrectly used 20-day swing low for bounce calculation, not the 52-week low. - **Impact:** Misidentified candidates as "early stage" when they were significantly higher from their true 52W low. - **Fix:** Updated scanner logic to use true 52W low for bounce percentage. ### Trading Skill Updates [score=0.896 recalls=4 avg=1.000 source=memory/2026-05-08.md:237-265]
<!-- openclaw-memory-promotion:memory:memory/archive/2026-04/2026-04-16.md:1130:1184 -->
- ### Key Principles Established - **Scan** → What I'm observing - **Think** → Show tradeoffs before recommending - **Act** → Execute with approval on ambiguous issues; fix known issues and flag ### Resolution Decision protocol is solid. Problem was execution, not framework. - For known fixes (Telegram delivery): Fix and flag (autonomy-aligned) - For ambiguous issues: Ask first --- ## Cron Job Fixes (23:14 UTC) ### Issue 7 cron jobs failed - Telegram delivery issues ### Fixes Applied 1. **Vyse-Readiness-Check** - Added numeric `delivery.to` chat ID 2. **GGB-price-watch** - Fixed from @VyseAgent_bot to numeric chat ID ### Logged Added to FIXES.md: "230416 - Cron Telegram delivery - use numeric chat_id not username" --- ## System Analysis for Automation (23:16 UTC) ### David's Goal Automation and autonomy using decision protocol as guide ### Current System Layers | Layer | Status | |-------|--------| | Data (portfolio, stocks, research) | ✅ Working | | Automation (7 cron jobs) | ⚠️ 2 fixed, 5 stale alerts | | Memory (memory/, FIXES.md) | ✅ Working | | Action (messaging, alerts) | ⚠️ Telegram fixed | ### Recommendation for Next Goal **Price monitoring** - Core to day trading, GGB-price-watch exists but fails silently ### Options Presented to David A) Fix GGB/Tesla price fetching B) Build self-healing cron system C) Something else Awaiting David's decision. --- ## Self-Healing Cron System Built (23:24 UTC) ### Created 1. **scripts/cron-health-monitor.sh** - Checks job health, auto-restarts failures [score=0.853 recalls=3 avg=1.000 source=memory/archive/2026-04/2026-04-16.md:1130-1184]
<!-- openclaw-memory-promotion:memory:memory/archive/2026-04/2026-04-16.md:3276:3294 -->
- | **Buying Power** | $24.29 waiting | **On wake:** Check if TSLA hit $8 yet. If yes → execute GGB/AMC trades. --- See you on the other side, David! 🦜🚀 === 2026-04-16-website-memory-capture.md === # Session: 2026-04-16 08:24:19 UTC - **Session Key**: agent:main:main - **Session ID**: df7b2461-6964-4de9-9abc-88b07c44bfe9 - **Source**: webchat ## Conversation Summary user: A new session was started via /new or /reset. Run your Session Startup sequence - read the required files before responding to the user. Then greet the user in your configured persona, if one is provided. Be yourself - use your defined voice, mannerisms, and mood. Keep it to 1-3 sentences and ask what they want to do. If the runtime model differs from default_model in the system prompt, mention the default model. Do not mention internal steps, files, tools, or reasoning. Current time: Thursday, April 16th, 2026 - 8:15 AM (UTC) / 2026-04-16 08:15 UTC assistant: Hey David! 🦜 I’m Vyse, your adventurous sky‑pirate assistant (running on gpt‑oss‑120b, default is minimax‑m2.5). What would you like to work on today? [score=0.829 recalls=3 avg=1.000 source=memory/archive/2026-04/2026-04-16.md:3276-3294]

## Promoted From Short-Term Memory (2026-05-16)

<!-- openclaw-memory-promotion:memory:memory/2026-05-10.md:3:3 -->
- Loaded from active.md (goal-aligned) [score=0.856 recalls=0 avg=0.620 source=memory/2026-05-10.md:3-3]
<!-- openclaw-memory-promotion:memory:memory/2026-05-09.md:308:310 -->
- - Candidate: Possible Lasting Truths: # Memory 2026-05-02 ## Memory Integration - Phases 1-3 Complete ### Phase 1: Critical Memory (Done) - Created memory/core/ with 3 files: user.md, goals.md, contacts.md - Modified session-start-handoff.sh to load core/ FIRST - Core memory now survives comp - confidence: 0.62 - evidence: memory/2026-05-08.md:218-220 [score=0.840 recalls=0 avg=0.620 source=memory/2026-05-09.md:13-15]


## Session Handoff - 2026-05-16
*Auto-inserted by session-start-handoff.sh*

# Session Handoff - 2026-05-05 17:15 PT

## What We Accomplished
1. Skills cleanup - merged, renamed, fixed YAML frontmatter
2. All 18 skills now showing on dashboard
3. Removed arbitrary leveling system
4. Deleted all subagent files
5. Cleaned workspace of obsolete files

## Current State
- **NVDA:** 0.05 shares @ $198.31
- **Capital:** $51.32 (+$6.32 profit)
- **Skills:** 18 working, use GitHub for tracking changes

## Key Info For Next Session
- No subagents - I do the work directly
- If I learn something, add to relevant skill
- GitHub commits persist across sessions
- Dashboard shows all 18 skills now

## Files to Reference
- HEARTBEAT.md - my orchestration
- kb/stocks/positions.md - trading positions
- skills/trading/SKILL.md - trading workflow
- skills/skill-creator/SKILL.md - skill template

## Session Handoff - 2026-05-17
*Auto-inserted by session-start-handoff.sh*

# Session Handoff - 2026-05-05 17:15 PT

## What We Accomplished
1. Skills cleanup - merged, renamed, fixed YAML frontmatter
2. All 18 skills now showing on dashboard
3. Removed arbitrary leveling system
4. Deleted all subagent files
5. Cleaned workspace of obsolete files

## Current State
- **NVDA:** 0.05 shares @ $198.31
- **Capital:** $51.32 (+$6.32 profit)
- **Skills:** 18 working, use GitHub for tracking changes

## Key Info For Next Session
- No subagents - I do the work directly
- If I learn something, add to relevant skill
- GitHub commits persist across sessions
- Dashboard shows all 18 skills now

## Files to Reference
- HEARTBEAT.md - my orchestration
- kb/stocks/positions.md - trading positions
- skills/trading/SKILL.md - trading workflow
- skills/skill-creator/SKILL.md - skill template

## Promoted From Short-Term Memory (2026-05-18)

<!-- openclaw-memory-promotion:memory:memory/archive/2026-04/2026-04-26.md:620:665 -->
- |-----------|-------|-------| | Subagent Management | 5/7 | sessions_spawn, list, kill, steer. Converted 3 cron jobs to true subagents. | **Cross-pollination from this:** - shipwright (4) → runs subagent cron - trading (5) → quartermaster subagent - scribe (4) → knowledge audit subagent --- ## Cross-Pollination Cascade - 19:20 UTC **Applied cross-reference protocol:** | Skill | Before | After | Boosted By | |-------|--------|-------|------------| | shipwright | 4 | **5** | time (Cron) | | system | 4 | **5** | exec (troubleshooting) | | telegram-crew | 4 | **5** | alerts (templates) | | projects | 4 | **5** | web (research) | | exec | 4 | **5** | memory (FIXES) | | scribe | 4 | **5** | web (gap detection) | | alerts | 4 | **5** | trading (triggers) | | dreams | 4 | **5** | web (brainstorming) | | web | 4 | **5** | memory (context) | **Final Distribution:** | Level | Skills | |-------|--------| | **7** | github 🎉 | | **6** | control-ui, skill-creator | | **5** | alerts, crew-protocols, dreams, exec, memory, obsidian, projects, scribe, security, shipwright, subagent-creator, system, telegram-crew, time, trading, web, workflow | | **Total** | 20 skills (18 at level 5+, 1 RON) | **Zero skills at level 4 or below!** --- ## True Subagents Confirmed - 19:24 UTC **David clarified:** Scribe, Shipwright, and Quartermaster are all true subagents | Subagent | Type | Agent ID | Schedule | |----------|------|----------|----------| | Quartermaster | True subagent | `quartermaster` | 30 min | | Shipwright | True subagent | `shipwright` | Weekly | [score=0.960 recalls=5 avg=1.000 source=memory/archive/2026-04/2026-04-26.md:620-665]
<!-- openclaw-memory-promotion:memory:memory/archive/2026-04/2026-04-26.md:1344:1394 -->
- - trading (5) → quartermaster subagent - scribe (4) → knowledge audit subagent --- ## Cross-Pollination Cascade - 19:20 UTC **Applied cross-reference protocol:** | Skill | Before | After | Boosted By | |-------|--------|-------|------------| | shipwright | 4 | **5** | time (Cron) | | system | 4 | **5** | exec (troubleshooting) | | telegram-crew | 4 | **5** | alerts (templates) | | projects | 4 | **5** | web (research) | | exec | 4 | **5** | memory (FIXES) | | scribe | 4 | **5** | web (gap detection) | | alerts | 4 | **5** | trading (triggers) | | dreams | 4 | **5** | web (brainstorming) | | web | 4 | **5** | memory (context) | **Final Distribution:** | Level | Skills | |-------|--------| | **7** | github 🎉 | | **6** | control-ui, skill-creator | | **5** | alerts, crew-protocols, dreams, exec, memory, obsidian, projects, scribe, security, shipwright, subagent-creator, system, telegram-crew, time, trading, web, workflow | | **Total** | 20 skills (18 at level 5+, 1 RON) | **Zero skills at level 4 or below!** --- ## True Subagents Confirmed - 19:24 UTC **David clarified:** Scribe, Shipwright, and Quartermaster are all true subagents | Subagent | Type | Agent ID | Schedule | |----------|------|----------|----------| | Quartermaster | True subagent | `quartermaster` | 30 min | | Shipwright | True subagent | `shipwright` | Weekly | | Scribe | True subagent | `scribe` | Weekly | **Updated:** - AGENTS.md - added Subagents section - scribe/SKILL.md - marked as true subagent - shipwright/SKILL.md - marked as true subagent - trading/SKILL.md - marked as true subagent --- [score=0.960 recalls=5 avg=1.000 source=memory/archive/2026-04/2026-04-26.md:1344-1394]
<!-- openclaw-memory-promotion:memory:memory/archive/2026-04/2026-04-26.md:1592:1631 -->
- **Key addition:** Acceptance protocol - when crew shares info, Scribe categorizes, organizes, confirms **Updated files:** - kb/crew/subagent-scribe.md - skills/scribe/SKILL.md --- ## Crew Collaboration System - 21:10 UTC **Implemented cross-crew help:** | Crew | Can Ask | Can Tell | |------|---------|----------| | Quartermaster | Scribe (research), Shipwright (issues) | Scribe (new patterns) | | Shipwright | Scribe (FIXES), Quartermaster (trading impact) | Scribe (fixes) | | Scribe | (hub) | Everyone (organized docs) | **Problem solving flow:** ``` Crew has problem → Ask Scribe → Scribe检索 → Scribe delivers → Crew fixes → Tells Scribe → Scribe updates ``` --- ## Role Clarification - 21:20 UTC **David clarified distinct roles:** | Crew | Role | |------|------| | **Scribe** | Knowledge/second brain organization ✅ | | **Shipwright** | **Dedicated fixer** - owns FIXES.md, learns to solve harder problems | | **Quartermaster** | Stock trading - keeps ship funded | **Shipwright updated:** Now the dedicated fixer with expertise levels (1=simple → 5=complex) --- *Session continues - crew roles clarified* [score=0.960 recalls=5 avg=1.000 source=memory/archive/2026-04/2026-04-26.md:1592-1631]
<!-- openclaw-memory-promotion:memory:memory/2026-05-12.md:6:9 -->
- | Symbol | Price | Change | Vol | 52W % | Signal | |--------|-------|--------|-----|-------|--------| | NET | $186.94 | -11.8% | 2.4x | 24% | ACCUMULATION | | TGT | $121.79 | -4.8% | 1.4x | 30% | ACCUMULATION | [score=0.862 recalls=0 avg=0.620 source=memory/2026-05-12.md:6-9]
<!-- openclaw-memory-promotion:memory:memory/2026-05-12.md:10:13 -->
- | WFC | $75.19 | -7.8% | 1.5x | 17% | ACCUMULATION | | CVX | $185.98 | -3.2% | 1.2x | 23% | ACCUMULATION | | EOG | $134.13 | -3.6% | 1.3x | 36% | ACCUMULATION | | RIVN | $13.95 | -13.1% | N/A | 7% | V3_BOTTOM | [score=0.862 recalls=0 avg=0.620 source=memory/2026-05-12.md:10-13]
