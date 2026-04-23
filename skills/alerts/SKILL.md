---
name: alerts
description: Alert templates, message formats, and notification patterns. Use when composing alerts, reports, or status messages.
---

# Alerts - Message Templates

*Pre-built templates for common notification scenarios*

## Stock Alerts

### Big Move
```
📈 {STOCK} Alert: {DIRECTION} {PERCENT}% today
Current: ${PRICE}
Consider: {ACTION}
```

### Target Hit
```
🎯 {STOCK} Target Hit!
Current: ${PRICE}
Target: ${TARGET}
Action needed: Buy more / Sell / Hold?
```

### Stop Loss
```
🛑 {STOCK} Stop Loss Triggered!
Entry: ${ENTRY}
Current: ${PRICE}
Loss: {PERCENT}%
```

## System Alerts

### Cron Failure
```
⚠️ Cron Job Failed: {JOB_NAME}
Error: {ERROR}
Status: {status}
```

### Health Warning
```
🩺 System Health Warning
Check: {CHECK_NAME}
Details: {DETAILS}
Run: {COMMAND}
```

## Status Prefixes
| Prefix | Meaning |
|--------|---------|
| 🔍 Scouting | Researching |
| 🧠 Pondering | Processing |
| 🔧 Tinkering | Fixing |
| 📝 Crafting | Creating |
| 💾 Stashing | Saving |
| ⏳ Holding | Waiting |
| ⚔️ Acting | Executing |
| 🎉 Done | Complete |

## Priority Prefixes
| Prefix | Meaning |
|--------|---------|
| 🔴 BREAKING | Urgent |
| 🟡 UPDATE | Status change |
| ✅ DONE | Complete |
| 💡 IDEA | Suggestion |

## Trigger Phrases
- "alert", "template", "message format"
- "notification", "status"