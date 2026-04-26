---
name: telegram
access: public
description: Telegram bot setup, configuration, DM policies, group management, and features.
---

# Telegram Skill

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in Telegram management

### Current Status: Level 3 - Competent 🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Bot Setup | 3/7 | Can configure botToken, restart gateway |
| DM Policies | 3/7 | Knows pairing, open, allowlist, disabled |
| Group Config | 3/7 | Can add groups, set requireMention |
| Features | 2/7 | Has docs, needs more hands-on |

**Path to RON:** Full feature coverage, troubleshooting, multi-account setups

### HEYRON Insight: Ask > assume

---

**Category:** Communication / Channel
**Updated:** 2026-04-26

General Telegram bot configuration for DMs, groups, and features.

---

## Quick Setup

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123:abc",
      "dmPolicy": "pairing",
      "groups": { "*": { "requireMention": true } }
    }
  }
}
```

Token: set in config or env `TELEGRAM_BOT_TOKEN`. Restart gateway after config changes.

---

## Access Control

### DM Policy (`dmPolicy`)

| Value | Description |
|-------|-------------|
| `pairing` | Default — user must approve DM |
| `allowlist` | Only `allowFrom` IDs can DM |
| `open` | Anyone can DM (requires `allowFrom: ["*"]`) |
| `disabled` | No DMs allowed |

### Group Policy (`groupPolicy`)

| Value | Description |
|-------|-------------|
| `allowlist` | Default — only `groups` + `groupAllowFrom` |
| `open` | Any group member can interact |
| `disabled` | Groups disabled |

**Important:** `groupAllowFrom` is for **user IDs**, not group IDs. Put group IDs under `channels.telegram.groups`.

---

## Group Configuration

### Add a Group

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-1003941303567": {
          "requireMention": false,
          "groupPolicy": "open"
        }
      }
    }
  }
}
```

- Get group ID: forward a message to `@userinfobot` or check `openclaw logs`
- `"*"` wildcard: applies default to all groups

### Mention Behavior

- `requireMention: true` (default): need @mention to trigger
- `requireMention: false`: responds to all messages (requires privacy mode disabled)

### Privacy Mode (Critical)

When `requireMention: false`, disable privacy mode:

1. Telegram → **@BotFather**
2. `/setprivacy` → Select your bot → **Disable**
3. Remove + re-add bot to group

---

## Features

### Live Preview (Streaming)

```json
{
  "channels": {
    "telegram": {
      "streaming": "partial"
    }
  }
}
```

- `partial` (default): editMessageText preview
- `off`: disable
- `block`: legacy compatibility

### Inline Buttons

```json
{
  "channels": {
    "telegram": {
      "capabilities": {
        "inlineButtons": "all"
      }
    }
  }
}
```

Scopes: `off`, `dm`, `group`, `all`, `allowlist` (default)

### Custom Commands

```json
{
  "channels": {
    "telegram": {
      "customCommands": [
        { "command": "backup", "description": "Git backup" },
        { "command": "generate", "description": "Create an image" }
      ]
    }
  }
}
```

### Reactions

```json
{
  "channels": {
    "telegram": {
      "reactionNotifications": "own",
      "reactionLevel": "minimal"
    }
  }
}
```

- `reactionNotifications`: `off | own | all`
- `reactionLevel`: `off | ack | minimal | extensive`

### Ack Reaction (Processing Indicator)

```json
{
  "channels": {
    "telegram": {
      "ackReaction": "👀"
    }
  }
}
```

Emoji sent while processing. Set to `""` to disable.

### Error Handling

```json
{
  "channels": {
    "telegram": {
      "errorPolicy": "reply",
      "errorCooldownMs": 60000
    }
  }
}
```

- `errorPolicy`: `reply` (default) or `silent`
- `errorCooldownMs`: min time between error messages

---

## Multi-Account

```json
{
  "channels": {
    "telegram": {
      "accounts": {
        "main": {
          "botToken": "token1",
          "allowFrom": ["123456"]
        },
        "work": {
          "botToken": "token2"
        }
      },
      "defaultAccount": "main"
    }
  }
}
```

---

## Webhook Mode (Optional)

Default is long polling. For webhooks:

```json
{
  "channels": {
    "telegram": {
      "webhookUrl": "https://yourdomain.com/telegram",
      "webhookSecret": "secret-token",
      "webhookHost": "0.0.0.0",
      "webhookPort": 8787
    }
  }
}
```

---

## Network / Proxy

```json
{
  "channels": {
    "telegram": {
      "proxy": "socks5://user:pass@host:1080",
      "network": {
        "autoSelectFamily": false,
        "dnsResultOrder": "ipv4first"
      }
    }
  }
}
```

---

## Actions / Gating

Control what the agent can do in Telegram:

```json
{
  "channels": {
    "telegram": {
      "actions": {
        "sendMessage": true,
        "deleteMessage": true,
        "reactions": true,
        "sticker": false
      }
    }
  }
}
```

---

## Exec Approvals via Telegram

```json
{
  "channels": {
    "telegram": {
      "execApprovals": {
        "enabled": true,
        "approvers": ["123456789"],
        "target": "dm"
      }
    }
  }
}
```

- `target`: `dm` (default), `channel`, or `both`
- Approvers must be numeric Telegram user IDs

---

## Finding Your User ID

1. DM the bot
2. Run `openclaw logs --follow`
3. Find `from.id` in the logs

Or: `curl "https://api.telegram.org/bot<TOKEN>/getUpdates"`

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Bot ignores group messages | Disable privacy mode via BotFather, re-add bot |
| Bot not seeing group at all | Add group ID to `channels.telegram.groups` |
| Commands not working | Add your ID to `allowFrom` or `groupAllowFrom` |
| `setMyCommands failed` (TOO_MUCH) | Reduce plugin/skill/custom commands |
| Network errors | Check DNS to `api.telegram.org`, try proxy or `network` config |
| Reactions not working | Check `reactionNotifications` and `reactionLevel` |

---

## CLI Examples

```bash
# Send message
openclaw message send --channel telegram --target 123456789 --message "hi"

# Send to username
openclaw message send --channel telegram --target @username --message "hi"

# Create poll
openclaw message poll --channel telegram --target 123456789 \
  --poll-question "Ship it?" --poll-option "Yes" --poll-option "No"

# Check status
openclaw channels status telegram
```

---

*Skill maintained by Vyse — based on official OpenClaw Telegram docs*