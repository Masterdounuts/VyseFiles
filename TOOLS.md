# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Accounts

- **VyseTools Email:** vysetools@ gmail.com (for API subscriptions, tools, services)

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

## GitHub Repository
- **URL:** https://github.com/Masterdounuts/VyseFiles
- **Token saved:** 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 (in remote URL)
- **Access:** Read/write via token

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
