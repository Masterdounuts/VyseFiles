# Research Protocol - Real-Time Data

*Updated 2026-04-27*

## The Problem
- Yahoo Finance API rate-limits requests without User-Agent
- Finviz is delayed ~3 days (not for day trades)
- Subagents timeout trying to research

## The Solution (RON Level)
**Always add User-Agent header to Yahoo requests:**
```bash
curl -s -H "User-Agent: Mozilla/5.0" "https://query1.finance.yahoo.com/v8/finance/chart/SYMBOL?interval=1d"
```

## Fallback Stack (in order)
1. **Yahoo + User-Agent** - real-time, reliable ✅
2. **Finviz** - delayed but works for fundamentals (NOT for day trades)
3. **Direct web fetch** - varies by site
4. **Browser automation** - last resort

## Protocol for ALL Subagents
1. Subagent asks Vyse for research
2. Vyse fetches using Yahoo + User-Agent
3. If fails → try Finviz
4. If fails → try web fetch
5. Present data to subagent
6. Subagent makes decision

## This is First Mate's Job
- Handle all API/research calls
- Find working solutions when things break
- Document what works for crew

---

*Protocol set by Captain David - RON Level research*