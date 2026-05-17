# composio-cli

*Composio integration - Built-in tool access*

## Integration Methods

### 1. CLI (basic)
```bash
composio execute <slug> -d '{...}'
```

### 2. Native (RECOMMENDED - true integration)
```bash
composio run '
  const result = await execute("GITHUB_LIST_COMMITS", { owner: "...", repo: "...", per_page: 5 });
  console.log(JSON.stringify(result));
'
```
This injects `execute()`, `search()`, `proxy()` directly into JS!


### 3. Helper module (convenience)
```javascript
const { run } = require('./composio-native.cjs');
const result = run(`const r = await execute("TOOL_SLUG", {...}); r;`);
```

## Quick Reference

| Command | What |
|---------|------|
| `composio execute <slug> -d '{...}'` | Run a tool (CLI) |
| `composio run 'code'` | Run with native helpers |
| `composio search "<query>"` | Find tools |
| `composio tools info <slug>` | Check schema |
| `composio link <toolkit>` | Connect account |
| `composio connections list` | Show connections |

## Path
- CLI: `/home/openclaw/.composio/composio`
- Tool definitions: `~/.composio/tool_definitions/`

## Usage Patterns

### Search for a tool
```bash
composio search "stock price"
composio search "send email" --limit 5
```

### Execute a tool
```bash
composio execute COMPOSIO_SEARCH_FINANCE -d '{"query": "AAPL"}'
composio execute NOTION_ADD_PAGE_CONTENT -d @file.json
```

### Check tool schema
```bash
composio execute <slug> --get-schema
```

## Known Limitations


1. **MCP not in CLI** - MCP requires SDK (`@composio/core`), not CLI
2. **COMPOSIO_SEARCH_FINANCE broken** - Returns "No financial data" for all symbols
3. **Use `composio run`** for true native integration - no shell parsing issues

## Native Integration Pattern

```javascript
// Use composio run to get true native integration
composio run `
  // execute() and search() are available directly!
  const gh = await execute("GITHUB_LIST_COMMITS", { owner, repo, per_page: 5 });
  const notion = await execute("NOTION_SEARCH_NOTION_PAGE", { query: "" });
  
  ({ github: gh.successful, notion: notion.successful });
`
```

This is 100% integration - Composio functions are native to the JS context.

## Connected Toolkits

- `github` - ACTIVE
- `notion` - ACTIVE (notion_lut-pisk)
- `composio_search` - ACTIVE

## Available Toolkits

Full list: `composio dev toolkits list --limit 50`

Notable:
- Gmail, GitHub, Notion, Slack
- Google Calendar, Google Sheets, Google Drive
- Discord, Twitter, LinkedIn
- HubSpot, Jira, Linear, Asana
- Snowflake, Supabase

## Notes

- Uses Composio's own auth - no API key needed when logged in
- CLI handles auth better than direct API calls
- Always use JSON params, not natural language