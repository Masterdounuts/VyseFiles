# Quartermaster Workflow

## How to Spawn

```python
sessions_spawn(
  agentId="quartermaster",
  task="Review positions in kb/stocks/positions.md, check for opportunities, recommend action",
  runtime="subagent"
)
```

## Research Flow

When quartermaster asks for research:
1. Run web_search or web_fetch for the symbol
2. Summarize key info: Current price, % change, volume
3. Return summary to quartermaster
4. Quartermaster makes decision

## Example

**David: "Check the market"**
```
Me: Spawns quartermaster → "Review positions"

Quartermaster: "Need TQQQ current price"
Me: web_search "TQQQ stock price" → $62.50
Me: Returns summary

Quartermaster: "Recommendation: BUY TQQQ
  Entry: $62.00 (limit)
  Target: $69.50 (+12%)
  Stop: $57.85 (-7%)
  Risk: 1%"

Me: Reviews → "Looks solid"
Me: Presents to David
```

## After David Approves

```
David: "Do it"
Me: Executes trade
Me: "Scribe, log: Bought TQQQ 1 share @ $62.00"
Scribe: Updates trade-log.md
```