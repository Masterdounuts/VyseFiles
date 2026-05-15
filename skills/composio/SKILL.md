# Composio Skill - Notion Integration

**Purpose:** Use Composio to interact with Notion for memory sync and task management

**API Key:** `ak_rqw4yFTcvTeLfd9TWpmn`  
**Entity ID:** `Vyse notion`  
**Notion Parent Page:** `3614f051-c508-8064-b995-cd38be6f896c` (Welcome to Notion)

---

## The Working Method

**DO NOT use the SDK's built-in methods** - they are broken. Use direct fetch to the v3.1 API:

```javascript
const response = await fetch('https://backend.composio.dev/api/v3.1/tools/execute/<TOOL_SLUG>', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <API_KEY>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: '<natural language prompt>',
    entity_id: '<entity_id>'
  })
});
```

---

## Available Tools

| Tool | Description |
|------|-------------|
| `NOTION_CREATE_NOTION_PAGE` | Create a new page |
| `NOTION_SEARCH_NOTION_PAGE` | Search/list pages |
| `NOTION_CREATE_DATABASE` | Create a database |
| `NOTION_INSERT_ROW_DATABASE` | Add row to database |
| `NOTION_QUERY_DATABASE` | Query a database |
| `NOTION_CREATE_COMMENT` | Add comment |
| `NOTION_ADD_PAGE_CONTENT` | Add content to page |

---

## Usage Examples

### Create a Page
```javascript
// Under parent page
text: 'create a page titled "My Page" under the page with ID 3614f051-c508-8064-b995-cd38be6f896c'

// At workspace root
text: 'create a page titled "My Page" in the workspace'
```

### Search Pages
```javascript
text: 'list all pages in my workspace'
// or
text: 'search for pages matching "memory"'
```

### Add Content to Page
```javascript
text: 'add "Some content" to the page titled "My Page"'
// or use page ID
text: 'add content to page ID 3614f051-c508-815c-b6b8-c39c8b6ae412'
```

---

## Quick Reference Script

Location: `~/.openclaw/workspace-vyse/composio-notion.cjs`

Usage:
```bash
NODE_PATH=~/.local/lib/node_modules node -e "
const { ComposioNotion } = require('./composio-notion.cjs');
const cn = new ComposioNotion();
cn.createPage('Page Title', 'Content here');
"
```

---

## Troubleshooting

**Error:** "No Notion page or database found with exact title..."
- Solution: Use page ID instead of title, or search first with `NOTION_SEARCH_NOTION_PAGE`

**Error:** "Connection error"
- The SDK's internal client is broken. Use direct fetch as shown above.

---

## Memory Sync Workflow

1. **Search** for existing pages with `NOTION_SEARCH_NOTION_PAGE`
2. **Create** new page with `NOTION_CREATE_NOTION_PAGE` using parent ID
3. **Add content** with `NOTION_ADD_PAGE_CONTENT`

Parent page IDs (workspace root):
- Welcome to Notion: `3614f051-c508-8064-b995-cd38be6f896c`

---

*Last updated: 2026-05-15*