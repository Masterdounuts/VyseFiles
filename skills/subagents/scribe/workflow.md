# Scribe Workflow

## How to Spawn

```python
sessions_spawn(
  agentId="scribe",
  task="Document: [trade/pattern/fix] OR Retrieve: [info]",
  runtime="subagent"
)
```

## Use Cases

### Document Trade
```
Quartermaster: "Scribe, log: Bought TQQQ 1 @ $62.00, target $69.50"
→ Scribe updates kb/stocks/trade-log.md
```

### Retrieve Info
```
Me: "Scribe, find research on TQQQ"
→ Scribe searches memory + kb/
→ Returns relevant file paths
```

### Log Fix
```
Shipwright: "Scribe, log: Fixed gateway restart issue"
→ Scribe updates FIXES.md
```

## GitHub Sync

After any significant update:
```
1. git add -A
2. git commit -m "docs: [what]"
3. git push
```

## When Called

- After trades (log)
- After fixes (log)
- When I need to find something (retrieve)
- Periodic sync (weekly)