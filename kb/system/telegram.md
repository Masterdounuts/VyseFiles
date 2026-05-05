# Telegram Setup

*Rebuilt from ground up: May 5, 2026*

---

## Current Status

| Item | Value |
|------|-------|
| Enabled | Yes |
| DM Policy | open (security: needs fix) |
| Bot Token | (to be updated) |

---

## How to Create a New Bot

1. **Open @BotFather** in Telegram
2. **Run `/newbot`**
3. **Follow prompts:**
   - Bot name (e.g., "Vyse Trading")
   - Username (must end in `bot`, e.g., `VyseTradingBot`)
4. **Save the token** — you'll give this to Vyse

---

## Security Best Practice

| Setting | Recommended | Why |
|---------|-------------|-----|
| DM Policy | `pairing` | Only approved users can DM |
| Allow From | Specific user IDs | Not `"*"` |

---

## Configuration

After getting token, update `.env`:
```bash
TELEGRAM_BOT_TOKEN=YOUR_NEW_TOKEN
```

Or update `openclaw.json`:
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_NEW_TOKEN",
      "dmPolicy": "pairing"
    }
  }
}
```

Then restart gateway:
```bash
openclaw gateway restart
```

---

## First-Time Setup

1. Create bot → get token
2. Configure → restart gateway
3. Pair your DM:
   ```bash
   openclaw pairing list telegram
   openclaw pairing approve telegram <CODE>
   ```

---

## Troubleshooting

- **Bot not responding?** Check `openclaw status`
- **Pairing issues?** See docs/channels/pairing.md
- **Token expired?** Create new via @BotFather

---

*Last updated: 2026-05-05*
*Token: (waiting for David to create)*
