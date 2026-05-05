---
name: telegram
access: vyse-only
description: Telegram messaging, group chats, and notifications.
trigger phrases: "telegram, message, send to telegram, group chat"
---

# Telegram Messaging

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 13
- Sections: 6
- Subsections: 7
- Lines: 70 / 100 = 0
- Total: 6 + 7 + 0 = 13

## Configuration

**Group ID:** `-1003941303567`

## Sending Messages

```bash
# Send to group
openclaw message send --channel telegram --target -1003941303567 --message "Update"

# Send to specific user
openclaw message send --channel telegram --target <user_id> --message "Hello"
```

## Use Cases

| Situation | Action |
|-----------|--------|
| Stock alert | Send price + decision to David |
| Status update | Brief check-in |
| Urgent issue | Flag with 🔴 prefix |

## Best Practices

- Keep messages concise
- Use prefixes: 🔴 BREAKING, 🟡 UPDATE, ✅ DONE
- Include actionable info

## Trigger Phrases
- "telegram", "message", "send to telegram"

### References
- messaging - General messaging
- trading - Stock alerts