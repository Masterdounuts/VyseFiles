# Stock Subagent - Autonomous Research System

[[../../Index|← Back to Stocks]]

## Architecture

```
stock-agent/
├── config.yaml        # Settings
├── state.json         # Portfolio & targets
├── research.log       # AI research history
├── performance.log    # Trade outcomes
└── learnings.json     # Pattern database
```

## Core Capabilities

### 1. Auto-Research (Daily)
- Fetch news for watched stocks
- Check earnings dates
- Pull technicals (RSI, SMA, volatility)
- Scan for breakout candidates

### 2. Pattern Learning
- Track buy/sell outcomes
- Identify what price levels work
- Learn sector correlations
- Adjust targets based on performance

### 3. Dynamic Target Adjustment
- If buy zone repeatedly hits but no bounce → widen zone
- If sell target keeps getting hit → raise target
- Volume spike = higher volatility = wider stops

### 4. Trade Logging
- Entry/exit prices
- Reasoning for trade
- Outcome (win/loss)
- Lessons learned

## Research Sources
- Finviz (technicals)
- News APIs (earnings, catalysts)
- SEC filings (insider activity)

## Learning Loop
1. Research → suggest trade
2. Execute → log outcome
3. Review → update patterns
4. Adjust targets → improve

## Success Metrics
- Win rate > 60%
- Avg gain > avg loss
- Target accuracy improving over time