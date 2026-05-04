name: web
always: true
description: Web search, fetch, and browser automation. Use when researching or accessing web content.

# Web - Search, Fetch, Browser

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 12
- Sections: 9
- Subsections: 19
- Lines: 206 / 100 = 2
- Total: 9 + 19 + 2 = 30

## Tools Overview

| Tool | Use | Best For |
|------|-----|----------|
| **web_search** | Find info | Research, fact-checking |
| **web_fetch** | Read pages | Get content without browser |
| **browser** | Automate | Login, forms, interactions |

## web_search

**Search the web using Gemini with Google Search grounding.**

### When to Use
- Research a topic
- Find current information
- Fact-check claims
- Get overview of unknown area

## web_fetch

**Fetch and extract readable content from URLs.**

### When to Use
- Get documentation
- Read article content
- Extract data from page
- No JavaScript needed

### Limitations
- No JavaScript/rendering
- No login/auth

## browser

**Control a headless browser for automation.**

### Actions
- `status` - Check browser availability
- `snapshot` - Get page screenshot
- `navigate` - Go to URL
- `act` - Click, type, etc.

## When to Use Which

| Task | Tool |
|------|------|
| Find info | web_search |
| Read page | web_fetch |
| Login/interact | browser |

### References
- learning - Research
- pattern-recognition - Finding patterns