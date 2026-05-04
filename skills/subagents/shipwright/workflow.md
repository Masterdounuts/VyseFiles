# Shipwright Workflow

## How to Spawn

```python
sessions_spawn(
  agentId="shipwright",
  task="Diagnose and fix: [issue description]",
  runtime="subagent"
)
```

## Use Cases

### System Alert
```
Me: "Shipwright, Gateway showing errors, please check"
→ Shipwright runs diagnostics
→ Shipwright finds issue in cron
→ Shipwright applies fix
→ Shipwright tells Scribe to log
```

### Health Check (Proactive)
```
Me: "Shipwright, please run health check"
→ Shipwright checks openclaw status
→ Shipwright checks cron list
→ Shipwright checks sessions
→ Returns summary
```

## Diagnosis First

Always diagnose before fixing:
1. `openclaw status` - Gateway health
2. `cron list` - Job status
3. `sessions_list` - Active sessions
4. `openclaw health` - Verbose check

## Fix Process

1. Identify issue
2. Check FIXES.md for known solution
3. Apply fix
4. Verify worked
5. Tell Scribe to log

## When Called

- System errors
- Health check failures
- Cron job failures
- Session issues