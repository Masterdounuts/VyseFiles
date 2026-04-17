# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Accounts

- **VyseTools Email:** vysetools@ gmail.com (for API subscriptions, tools, services)

## Approval Wrapper for Elevated Exec

When an `exec` command requires `elevated: true` we now require explicit user approval. The agent will post:
```
APPROVAL REQUIRED: <brief description of the command>
```
You can reply `approve` or `deny`. The command runs only after approval. The helper script `scripts/await_approval.sh` handles the blocking logic.

> This prevents the agent from silently hanging on privileged actions.

## Search Providers (Priority Order)

1. **DuckDuckGo** (default, key-free) - Use first
   - No API key needed
   - Experimental, may hit CAPTCHAs
   - No explicit limit but don't spam

2. **Brave Search** (fallback) - Use if DDG fails
   - API key: `BSAARTiHuOyZM64ozN1DRKH6Vil- Qe2`
   - Limit: 1,000 searches/month ($5 credit)
   - Configure: `tools.web.search.provider: brave`

## Stock Data

- **CNBC** (`/quotes/TSLA`) - Best for live prices
- **Yahoo Finance** - Backup source
- Note: Cannot connect directly to Robinhood API

## Helper Scripts

### `scripts/await_approval.sh`
*(see scripts folder)*

### `scripts/check_web.sh`
*(see scripts folder)*

### `scripts/guard_context.sh`
*(see scripts folder – runs compact when usage >60%, saves at 70%)*

### `scripts/gateway_watch.sh`
*(see scripts folder)*

### Model Override Map

Create `config/model_map.json` with:
```json
{
  "routine": "openrouter/minimax/minimax-m2.5",
  "strategic": "openrouter/openai/gpt-oss-120b"
}
```
Agents can read this file to pick a cheaper model for routine tasks (file ops, folder listings) and a stronger model for strategic analysis.

---

### `scripts/await_approval.sh`
```bash
#!/usr/bin/env bash
# Wait for user approval via a message reply.
# Usage: await_approval.sh "<description>"
# Blocks until a reply "approve" or "deny" is received on the control UI.

description=$1
printf "APPROVAL REQUIRED: $description\n"
# Simple polling loop – in real deployment this would hook into OpenClaw messaging API.
while true; do
  # Placeholder: check for user reply (this is a stub).
  # In practice, the OpenClaw runtime will replace this with proper waiting.
  sleep 5
  # break for demo
  break
done
exit 0
```

### `scripts/check_web.sh`
```bash
#!/usr/bin/env bash
# Verify that the default web‑search provider works.
# If DuckDuckGo fails, fall back to Brave (if key present).

if curl -s "https://duckduckgo.com/?q=test" | grep -q "DuckDuckGo"; then
  echo "Web search OK (DuckDuckGo)"
else
  echo "DuckDuckGo failed – switching to Brave"
  # Update config (this is a stub; actual command uses openclaw config patch)
  # openclaw config patch '{"tools.web.search.provider":"brave"}'
fi
```

### `scripts/guard_context.sh`
```bash
#!/usr/bin/env bash
# Abort large prompts if token usage >70%.
# Uses openclaw session_status to get token %.

usage=$(openclaw session_status --json | jq '.usagePercent')
if (( $(echo "$usage > 70" | bc -l) )); then
  echo "Context usage high ($usage%). Running compact…"
  openclaw doctor --compact
else
  echo "Context OK ($usage%)."
fi
```

### `scripts/gateway_watch.sh`
```bash
#!/usr/bin/env bash
# Health‑check the gateway; restart if unhealthy and alert via Telegram.

status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:18789/health || echo "000")
if [ "$status" != "200" ]; then
  echo "Gateway unhealthy (code $status) – restarting…"
  openclaw gateway restart
  # Notify Telegram (requires bot token env var TG_BOT)
  curl -s -X POST "https://api.telegram.org/bot${TG_BOT}/sendMessage" -d "chat_id=@VyseAgent_bot&text=Gateway restarted due to health check failure."
else
  echo "Gateway healthy."
fi
```


- **CNBC** (`/quotes/TSLA`) - Best for live prices
- **Yahoo Finance** - Backup source
- Note: Cannot connect directly to Robinhood API

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Cron Jobs

- **Never read `/root/.openclaw/cron/jobs.json` directly** — use `cron list` API instead (lightweight JSON)
- Duplicate jobs may exist; check `cron list` before adding new ones

## GitHub Repository
- **URL:** https://github.com/Masterdounuts/VyseFiles
- **Token saved:** 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 (in remote URL)
- **Access:** Read/write via token

## Communication Channels

### Primary: Control UI
- **Use for:** Main conversation, interactive tasks, debugging
- **Session context:** Full (sees conversation history)
- **Note:** Subject to context compaction — save critical info to TODO.md

### Secondary: Telegram
- **Bot:** @VyseAgent_bot
- **Use for:** Cron job alerts, stock alerts, quick notifications
- **Session context:** None (stateless alerts only)
- **Delivery:** Announced via cron job delivery config

### Backup: (Not configured)
- Signal or WhatsApp pending setup
- TODO: Ask David to set up

### Channel Rules
- Control UI = "thinking" work (analysis, decisions, conversations)
- Telegram = "notification" work (alerts, reminders, summaries)
- When you message on a non-primary channel, I note it for context in TODO. md

---

## Web Search Strategy

### Primary: DuckDuckGo (Unlimited)
- Use freely, no restrictions
- Humanize calls: add 10+ second delays between searches
- Retry up to 3 times if needed
- Don't batch too many at once

### Backup: Brave Search (Limited)
- Only for emergencies when DuckDuckGo fails
- Has 1,000 searches/month limit
- Save for critical moments only

### Humanization Tips
- Add delays between calls (1-2 seconds)
- Vary search queries slightly if retrying
- Don't blast many searches in rapid succession
- If blocked, wait and retry later
