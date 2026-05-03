---
name: web
always: true
description: Web search, fetch, and browser automation. Use when researching or accessing web content.
---

# Web - Search, Fetch, Browser

*How we interact with the web*

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in web interaction

### Current Status: Level 7 - RON ⭐ 🟡🟡🟡🟡🟡🟡

**XP:** 60/60 (next level at 60)

| Skill | Level | Notes |
|-------|-------|-------|
| web_search | 5/7 | Gemini-powered with citations, uses memory for context |
| web_fetch | 4/7 | Extracts readable content from URLs |
| browser | 4/7 | Snapshot, navigate, act |

**Path to RON:** Full browser automation, scraping

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **web_search** - Quick web search (primary)
- **web_fetch** - Read page content (after-hours prices)
- **browser** - Full browser automation (complex interactions)
- Decision tree: web_search first → web_fetch for content → browser for complex

**Max Level:** 9

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to web |

---

### HEYRON Level Insight

> **Q:** "When should I use web_search vs web_fetch vs browser?"
>
> **A:** "Search for finding, fetch for reading, browser for doing."

**Key Takeaway:** Choose the right tool for the task.

---

## Tools Overview

| Tool | Use | Best For |
|------|-----|----------|
| **web_search** | Find info | Research, fact-checking |
| **web_fetch** | Read pages | Get content without browser |
| **browser** | Automate | Login, forms, interactions |

---

## web_search

**Search the web using Gemini with Google Search grounding.**

### Parameters
| Param | Type | Description |
|-------|------|-------------|
| `query` | string | Search query (required) |
| `count` | number | Results (1-10, default 5) |

### Returns
AI-synthesized answer with citations from Google Search.

### Examples
```json
{
  "query": "OpenClaw Control UI documentation",
  "count": 3
}
```

### When to Use
- Research a topic
- Find current information
- Fact-check claims
- Get overview of unknown area

---

## web_fetch

**Fetch and extract readable content from URLs.**

### Parameters
| Param | Type | Description |
|-------|------|-------------|
| `url` | string | URL to fetch (required) |
| `extractMode` | string | "markdown" or "text" |
| `maxChars` | number | Truncate after limit |

### Examples
```json
{
  "url": "https://docs.openclaw.ai/web/control-ui",
  "extractMode": "markdown",
  "maxChars": 5000
}
```

### When to Use
- Get documentation
- Read article content
- Extract data from page
- No JavaScript needed

### Limitations
- No JavaScript/rendering
- No login/auth
- May miss dynamic content

---

## browser

**Control a headless browser for automation.**

### Actions
| Action | Description |
|--------|-------------|
| `status` | Check browser availability |
| `start` | Start browser |
| `stop` | Stop browser |
| `snapshot` | Get page snapshot |
| `navigate` | Go to URL |
| `act` | Click, type, etc. |

### Parameters
| Param | Description |
|-------|-------------|
| `target` | sandbox, host, node |
| `profile` | Browser profile (openclaw/user) |
| `targetUrl` | URL for navigate |

### Example: Navigate + Snapshot
```json
{
  "action": "navigate",
  "target": "host",
  "targetUrl": "https://example.com"
}
```

```json
{
  "action": "snapshot",
  "target": "host"
}
```

### Example: Click/Type (act)
```json
{
  "action": "act",
  "kind": "click",
  "ref": "login-button",
  "target": "host"
}
```

```json
{
  "action": "act",
  "kind": "type",
  "inputRef": "username",
  "text": "myuser",
  "target": "host"
}
```

### When to Use
- Need JavaScript rendering
- Login to sites
- Fill forms
- Interact with UI
- Screenshots

---

## Decision Guide

| Task | Tool |
|------|------|
| Find info on topic | web_search |
| Read single page | web_fetch |
| Login required | browser |
| Fill form | browser |
| Screenshot | browser |
| Quick fact check | web_search |
| Get docs | web_fetch |

---

## Best Practices

1. **web_search first** - Faster for research
2. **web_fetch for docs** - Clean extraction
3. **browser only when needed** - Heavier, slower
4. **Check target** - Use host for logged-in
5. **Respect rate limits** - Don't spam requests

---

## Our Configuration

- **Search:** Brave API (via web_search)
- **Fetch:** Direct HTTP
- **Browser:** Host-based (openclaw profile)

---

## Trigger Phrases
- "search", "find", "research"
- "fetch", "get page", "scrape"
- "browser", "navigate", "click"
- "login", "form", "screenshot"