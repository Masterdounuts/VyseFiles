# Composio Skill - Notion Integration

**Purpose:** Use Composio to interact with Notion for memory sync and task management

**API Key:** `ak_rqw4yFTcvTeLfd9TWpmn`  
**Entity ID:** `Vyse notion`  
**Notion Root Page:** `8042f582-6c70-4384-b176-4d5750e04429` (Vyse Agent Sandbox)

---

## The Working Method

**Use direct fetch to the v3.1 API:**

```javascript
const response = await fetch('https://backend.composio.dev/api/v3.1/tools/execute/<TOOL_SLUG>', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <API_KEY>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    entity_id: 'Vyse notion',
    arguments: { /* tool-specific arguments */ }
  })
});
```

---

## Available Tools (Working)

### Writing to Notion
| Tool | Description |
|------|-------------|
| `NOTION_ADD_MULTIPLE_PAGE_CONTENT` | Bulk add content blocks |
| `NOTION_CREATE_NOTION_PAGE` | Create a new page |
| `NOTION_INSERT_ROW_DATABASE` | Add row to database |
| `NOTION_CREATE_DATABASE` | Create a database |

### Reading from Notion
| Tool | Description |
|------|-------------|
| `NOTION_FETCH_BLOCK_CONTENTS` | Fetch block children (READ content!) |
| `NOTION_FETCH_ALL_BLOCK_CONTENTS` | Fetch all block contents |
| `NOTION_GET_PAGE_MARKDOWN` | Get page as markdown |
| `NOTION_QUERY_DATABASE` | Query a database |
| `NOTION_FETCH_DATABASE` | Fetch database metadata |
| `NOTION_FETCH_ROW` | Fetch database row |
| `NOTION_SEARCH_NOTION_PAGE` | Search/list pages |

---

## Usage Examples

### Read Page Content (THE KEY TOOL)
```javascript
// Get blocks from a page
arguments: { block_id: '8042f582-6c70-4384-b176-4d5750e04429' }

// Parse the text from blocks:
results.forEach(block => {
  const type = block.type;
  if (type === 'paragraph') {
    const text = block.paragraph?.rich_text?.map(t => t.plain_text).join('');
    console.log(text);
  }
});
```

### Add Content to Page
```javascript
// Use NOTION_ADD_MULTIPLE_PAGE_CONTENT
arguments: { 
  parent_block_id: '8042f582-6c70-4384-b176-4d5750e04429',
  blocks: [
    { block_property: 'paragraph', content: 'Your text here' }
  ]
}
```

### Search Pages
```javascript
text: 'search for pages matching "memory"'
// or
text: 'list all pages'
```

---

## Quick Reference

```bash
# API Endpoint
https://backend.composio.dev/api/v3.1/tools/execute/<TOOL_SLUG>

# Headers
Authorization: Bearer ak_rqw4yFTcvTeLfd9TWpmn
Content-Type: application/json
```

---

## Important Notes

1. **Always use "Vyse notion" as entity_id** - this is the working connection
2. **Block content is in d.data.results** - iterate and parse rich_text for actual text
3. **2000 char limit per block** - use NOTION_ADD_MULTIPLE_PAGE_CONTENT for bulk
4. **All pages should be under Vyse Agent Sandbox** (ID: 8042f582-6c70-4384-b176-4d5750e04429)

---

*Last updated: 2026-05-15*