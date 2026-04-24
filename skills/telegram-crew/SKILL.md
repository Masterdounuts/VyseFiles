# Telegram Crew Communication Skill

**Category:** System / Communication
**Created:** 2026-04-24

## Overview
Configure Telegram bot for group chat communication with subagents.

## Configuration

### Add Group to Allowed Groups
Edit `/home/openclaw/.openclaw/openclaw.json`:

```json
{
  "channels": {
    "telegram": {
      "groups": [
        {
          "id": "-1003941303567",
          "name": "Testing crew chat v1",
          "requireMention": false
        }
      ]
    }
  }
}
```

### Important: Disable Privacy Mode
When `requireMention: false` is set, **Telegram Bot Privacy Mode must be disabled**:

1. Open Telegram → **@BotFather**
2. Send `/setprivacy`
3. Select **@VyseAgent_bot**
4. Choose **Disable**
5. Restart gateway: `sudo openclaw gateway restart`

## Why This Matters
- **Privacy Mode ON:** Bot only sees messages where it's @mentioned
- **Privacy Mode OFF:** Bot sees all group messages

With `requireMention: false` + privacy disabled, bot responds to all group messages automatically.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Bot ignores group messages | Check privacy mode is disabled |
| Config not applying | Restart gateway |
| DMs not working | Check context overflow / LLM timeout |

---

*Skill maintained by Vyse — escalate to Shipwright for system issues*