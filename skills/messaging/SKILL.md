name: messaging
description: Message formatting, alerts, and Telegram bot management. Combines alerts + telegram for unified messaging.
trigger phrases: "alert, notify, telegram, dm, message, bot, channel, notification"
access: public

# Messaging Skill (alerts + telegram merged)

*Combines alert templates with Telegram bot configuration*

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in unified messaging

### Current Status: Level 20
**Content Progress:** 19/20 to L21 - RON ⭐ 🟡🟡🟡🟡🟡🟡


| Skill | Level | Notes |
|-------|-------|-------|
| **Alert Templates** | 6/7 | Stock alerts, system alerts, priority |
| **Formatting** | 6/7 | Markdown, emojis, tables, status prefixes |
| **Telegram Bot** | 6/7 | Bot config, DM policies, group management |
| **Delivery** | 6/7 | Multi-channel (Telegram, Control UI, webhooks) |
| **Multi-channel** | 5/7 | Can extend to other channels |

**Path to RON:** Auto-format, smart triggers, multi-channel delivery

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **message** - Send messages via channels (primary)
- **tts** - Text-to-speech voice output
- Decision tree: message for text → tts for voice

**Max Level:** 100 (tier: primary)

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to messaging |

### Merged from:
- alerts (message templates)
- telegram (bot configuration)
## Alert Templates

### Stock Alerts

```
📈 {STOCK} Alert: {DIRECTION} {PERCENT}% today
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

### Quick Setup

```json
{
  "botToken": "YOUR_TOKEN",
  "allowedUsers": ["USER_IDS"],
  "groupSettings": {
    "requireMention": true,
    "allowInline": false
  }
}
```

### DM Policies

| Policy | Description |
|--------|-------------|
| pairing | User must pair first |
| open | Anyone can DM |
| allowlist | Only specific users |
| disabled | No DMs |

### Group Management

- Add via @BotFather
- Set requireMention for group relevance
- Configure inline buttons
## Message Formatting

### Status Prefixes

| Prefix | Use When |
|--------|----------|
| 🔴 BREAKING | Urgent, immediate attention |
| 🟡 UPDATE | Status change, FYI |
| ✅ DONE | Task completed |
| 💡 IDEA | Suggestion |

### Structure

**TL;DR** - One-line summary first
**Details** - Bullets (not walls)
**Footer** - Decision trigger or commitment
## Trigger Phrases
- "alert", "notify", "telegram", "dm", "message", "bot", "channel"
*Merged 2026-04-29 from alerts + telegram*
*Previously: alerts (6/7), telegram (3/7)*
### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
