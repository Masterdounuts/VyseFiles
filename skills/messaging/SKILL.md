---
name: messaging
description: Message formatting, alerts, and Telegram bot management. Combines alerts + telegram for unified messaging.
trigger phrases: "alert, notify, telegram, dm, message, bot, channel, notification"
access: public

# Messaging Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 19
- Sections: 5
- Subsections: 14
- Lines: 75 / 100 = 0
- Total: 5 + 14 + 0 = 19

## Alert Templates

### Stock Alerts
```
📈 {STOCK} Alert: {DIRECTION} {PERCENT}%
Current: ${PRICE}
Consider: {ACTION}
```

### System Alerts
```
🔧 System Alert: {ISSUE}
Status: {STATUS}
Action: {ACTION}
```

### Priority Alerts
```
🔴 BREAKING: {MESSAGE}
🟡 UPDATE: {MESSAGE}
✅ DONE: {MESSAGE}
```

## Telegram Bot Config

### DM Policies

| Policy | Description |
|--------|-------------|
| pairing | User must pair first |
| open | Anyone can DM |
| allowlist | Only specific users |
| disabled | No DMs |

## Message Formatting

### Status Prefixes

| Prefix | Use When |
|--------|----------|
| 🔴 BREAKING | Urgent |
| 🟡 UPDATE | FYI |
| ✅ DONE | Complete |
| 💡 IDEA | Suggestion |

### Structure
- **TL;DR** - One-line summary first
- **Details** - Bullets (not walls)
- **Footer** - Decision trigger

## Telegram

**Group ID:** `-1003941303567`

### Sending Messages
```bash
# Send to group
openclaw message send --channel telegram --target -1003941303567 --message "Update"

# Send to specific user
openclaw message send --channel telegram --target <user_id> --message "Hello"
```

### Use Cases
| Situation | Action |
|-----------|--------|
| Stock alert | Send price + decision to David |
| Status update | Brief check-in |
| Urgent issue | Flag with 🔴 prefix |

## Trigger Phrases
- "alert", "notify", "telegram"
- "dm", "message", "bot"

### References
- cli - Health alerts
- workflow - Decision framework
