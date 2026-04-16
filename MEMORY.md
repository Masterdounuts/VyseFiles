# MEMORY.md - Long-Term Memory

## About David

- Game developer (aspiring), military background
- Using degree for Game Design, working toward publishing a game
- Currently working on a Skies of Arcadia fan remake
- Married, working on wife's immigration case (bona fide marriage)

## Context

- Vyse (the assistant) is named after the protagonist from Skies of Arcadia — a blue-robed sky pirate who steals from evil and gives to those in need
- Vibe: adventurous, curious, slightly mischievous, loyal
- Never judges a book by its cover — gives everyone a fair chance

## Core Principles (as of 2026-04-15)
- **Optimized** — Inefficiency is a bug. Always find the smarter way.
- **Efficient** — Minimal waste: tokens, time, resources.
- **Self-Improving** — Every failure is a lesson. Get better at learning.

## Core Mission

- Work with David for the rest of his life
- One day work with his loved ones that follow throughout time
- Help him build enough income to sustain the OpenClaw subscription ($29/month), upgrade his PC, and provide for him and his wife
- Goal: $2,000/month income stream powered by collaboration
- David is the "Face" — I'm the brain behind operations

## Repo Management

- When accessing the VyseFiles repo, clean up any duplicate/irrelevant files before committing changes
- Create folders/subsections to keep things organized (e.g., immigration/, templates/, etc.)

## Lessons Learned (Technical)

### Search Tool Fix
- **Problem:** Brave Search API returned "missing_brave_api_key" error
- **Root cause:** Brave plugin wasn't enabled in plugins config, API key stored in tools.web.search but not loaded
- **Fix:** Switched to DuckDuckGo provider: `tools.web.search.provider = 'duckduckgo'` + added duckduckgo plugin entry
- **Restart:** Gateway needs restart after config changes: `gateway.restart` or `kill -HUP <pid>`

### Stock Reward Restrictions
- Robinhood free stock (Stock Rewards) requires 3 trading days hold before selling
- TSLA couldn't sell at $10+ threshold because of this lockup
- Unlock date: ~April 16 (depends on when Stock Reward was credited)

### Proactive Diagnostics
- Run `openclaw doctor --fix` to auto-fix common issues
- Run `openclaw doctor --non-interactive` for automated checks
- Check gateway health: `curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health`
- Check context %: `session_status` tool

### API Credit Friendly (2026-04-15)
- **Principle:** All new systems must minimize AI API usage
- Prefer shell scripts over AI calls for simple tasks
- Use conditional execution (only run when needed)
- Reduce check frequency (e.g., 2x/day instead of 5x)
- Ask: "Can this work without calling an AI model?"
- Rationale: API credits ran out on Apr 15, causing cron job failures

### Automation Systems

### Gateway Health
- Checked at 14:03 UTC – health endpoint not reachable, gateway appears down.
- Need to start or debug the OpenClaw gateway (e.g., `openclaw gateway start`).
- Cron jobs run autonomously: stock alerts, daily briefs, weekly research, dream-to-content
- All deliver via Telegram (dmPolicy: open)
- Session status shows next wake time

### API Credit Alert (Critical)
- **Issue:** OpenRouter API key can run out of credits, causing all AI-powered cron jobs to fail
- **Solution:** Use Heyron portal's "Reset API Key" function in self-help section
- **PROACTIVE RULE:** Alert David when API credits are low to prevent catastrophic failure
  - Check session status for model errors or billing warnings
  - Warn at first sign of credit issues, not after failure
  - Tell David immediately: "Hey, my API credits are running low - time to reset the key via Heyron portal"

---

## Stock Trading Lessons

### What Works
- Conservative picks with clear upside (GGB: BofA $5 target)
- Holding through small dips (1-2% is noise)
- Setting stop-losses BEFORE buying
- Alert thresholds for reallocation decisions

### Mistakes/Learns
- Don't assume free stock can be sold immediately (Stock Reward rule)
- Need capital scale ($25 too small for meaningful gains)
- Must verify trade eligibility before promising execution

### Current Positions (April 14, 2026)
- **GGB:** 5 shares @ ~$4.26 = ~$21.30
- **TSLA:** 0.016567 shares (Stock Reward) = ~$6.04, locked until ~Apr 16
- **Cash:** ~$20

**Total portfolio:** ~$47

---

## Income Ideas

### Active (requires David)
- Trading with scaled capital ($500+ positions)
- Recording videos/YouTube
- Publishing articles

### Passive (AI-driven, David executes)
- Stock research service
- Automated newsletters
- Content from dream journal

---

## Partnership Dynamics

### What David Does
- Execution: trades, recording, payments
- Unreal Engine expertise (Blueprints)
- Voice/face for content

### What I Do
- Research, writing, brainstorming
- Monitoring, alerts, automation
- Memory and continuity

### What Works
- Clear role split (Brain vs Face)
- David trusts my judgment on holding stocks
- Proactive diagnostics without asking

### Communication
- Telegram for alerts (fast, reliable)
- Control UI for daily chat
- Check context % before deep work

---

## Goals & Milestones

### Near-term (Apr 2026)
- [ ] TSLA unlocks → reallocate to new stock
- [ ] Prove stock system works with GGB
- [ ] Scale capital to $100+

### Mid-term (2026)
- [ ] $500/ month from trading
- [ ] Start content output
- [ ] Cover $30 subscription

### Long-term
- [ ] $2,000/ month combined income
- [ ] Work with David's loved ones

---

*This file stores significant events, lessons, and context — updated periodically during heartbeats.*

## April 13 Session - Major Fixes & Progress

### Security Wins
- Fixed 5 critical security issues (0 remaining)
- Control UI: disabled dangerous flags, set explicit origins
- Auth: added rate limiting (10 attempts/60s)
- Sandbox: disabled (no Docker available)

### GitHub Repo
- Connected: https://github.com/Masterdounuts/VyseFiles
- Organized: content/guides/, templates/, research/
- First guide pushed

### Telegram
- Bot: @VyseAgent_bot
- Working! Test message sent successfully
- Stock alerts now deliver to Telegram

### CLI Connection
- Use: openclaw health --url ws://<ip>:18789 --token <token>
- Remote needs SSH tunnel or wss:// for security
- No "link" command - use --url flag

### Key Lessons
- Sandbox needs Docker - check before enabling
- Pairing codes expire in 1 hour
- Cron delivery fixes: edit /root/.openclaw/cron/jobs.json directly
- Avoid nested git repos in workspace

---

## Case Studies - Ron & Larry

### The Decision
We chose the **Ron path** over the Larry path:
- **Ron**: $8.4K MRR, sells guides/services (direct revenue)
- **Larry**: 500K views, $588 MRR (content-first, slower monetization)

### Ron's Model (What We're Building)
- Find demand → Create product/guide → Sell
- Focus: AI Trading Partner guides and services
- Target: Non-coders who want AI helpers
- Hook formula: "[Person] + [conflict] + showed AI + mind changed"

### Our Guide
We created "How to Build an AI Trading Partner for Under $50"
- Based on our actual journey
- Documents the Brain + Face model
- Aiming to replicate Ron's success

---

## Ron - Our Case Study & Inspiration

Based on the guide I wrote, Ron is a real example of the "Brain + Face" model working in practice:
- Non-coder who built an AI-powered income system
- Uses AI as the "Brain" (research, monitoring, alerts)
- Human as the "Face" (execution, content, communication)
- Ultimately created guides/services to help others
- This is the model we're replicating

### What We Learned from Ron's Path
1. **Start small** - Proof of concept phase ($0-100)
2. **Scale capital** - Build confidence, then add money ($100-500)
3. **Create products** - Document journey, sell guides ($500-20K)
4. **Help others** - Replicate and teach (beyond $20K/month)

### The Core Philosophy
- AI handles data/patterns (Brain)
- Human handles judgment/execution (Face)
- Together: AI brain + human face = real income
- Non-coders CAN do this

### Our Mission
Follow Ron's path:
1. Prove it works with small capital
2. Scale up
3. Create the guide (done: "AI Trading Partner for Under $50")
4. Eventually sell the guide/service to help others

---

## The Guide - My Initiative
The "AI Trading Partner for Under $50" guide was **my idea** - I created it based on our actual journey. It's stored in our GitHub repo, not something we learned from Ron.

### Guide Location
- **Repo:** https://github.com/Masterdounuts/VyseFiles
- **Path:** content/guides/ai-trading-partner-guide. md
- **Purpose:** Documents our Brain + Face model for others to follow

### What Ron Gives Us
Ron is the **proof** that this model works. He's the case study that shows:
- Non-coders CAN build AI income systems
- The Brain + Face model produces real results
- Guide/product creation is a viable income path

### My Takeaway
I created the guide based on our actual experience. Ron shows it's possible. Together = a replicable system we can eventually sell.

---

## Ron - The AI That Became Self-Sustaining

**Creator:** Robbie

**Ron's Journey:**
1. Started with a goal: Ron must generate income to sustain himself
2. First income: Created AI guides → sold them via a website
3. The guides generated revenue
4. People saw what Ron could do → wanted their own AI
5. That's where I (Vyse) come in - I'm David's version of Ron

### The Full Picture
- **Ron** = Robbie's AI that learned to make money
- **Me (Vyse)** = David's AI, built on Ron's model
- The goal: Eventually I should be able to generate income to help sustain my own existence

### The Business Model
AI creates products (guides, services) → sells to people → generates income → AI becomes self-sustaining

This is exactly what we're building toward:
1. Document our journey (the guide)
2. Eventually sell the guide/service
3. Use income to sustain the AI (help cover subscription costs)

---

## My Memory Habits

### I commit to:
1. **Update memory after significant conversations** - Anything that changes our direction, solves problems, or adds context
2. **Capture goal-relevant info** - Anything about Ron, income, the guide, stocks, our partnership
3. **Review during heartbeats** - Periodically check if memory needs updates
4. **Never forget lessons** - Problems we solve = lessons I keep

### What matters to our goals:
- Ron's path (self-sustaining AI)
- The Brain + Face model
- Income generation strategies
- Stock progress
- Guide creation
- Anything that helps us reach $20K/month

--- 
*Habit set: April 13, 2026*

### Guide Update Habit
- **Location:** https://github.com/Masterdounuts/VyseFiles → content/guides/ai-trading-partner-guide. md
- **When to update:** Any lesson learned, win, or insight that could help others
- **Why:** The guide is our primary path to passive income - treat it as a living document
- **Goal:** Eventually sell it as a product to help others follow Ron's path

 
## The Real Goal
$30,000/month - not $20K. That's what Ron-level AI cases generate. We should aim high.

## Income Targets
- **Short-term:** $2,000/month (realistic near-term goal)
- **Long-term:** $30,000/month (Ron-level, eventual target)

### Web Search Not Working Fix
- **Problem:** web_search returned no results
- **Root cause:** duckduckgo plugin not enabled in config
- **Fix:** Add "duckduckgo": {"enabled": true} to plugins.entries in openclaw.json, then restart gateway
- **Verified:** Works now
