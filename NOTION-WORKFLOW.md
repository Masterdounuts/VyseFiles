# Notion Workflow - Quick Reference

## Write + Backup (Hybrid - goes to both)
```bash
# Active task
node composio-notion.cjs set-active "Task name" --goal

# Trade
node composio-notion.cjs trade BUY AMC 17 1.44

# Decision
node composio-notion.cjs log-decision "What we decided" --why

# Error + Fix
node composio-notion.cjs log-error "What broke" --how we fixed

# Knowledge
node composio-notion.cjs log-knowledge "Topic" --insight

# Preference
node composio-notion.cjs preference key value
```

## Query (Instant from local)
```bash
# Current task
node notion-query.cjs active

# Recent decisions
node notion-query.cjs decisions 5

# All positions
node notion-query.cjs positions

# Check for prior error BEFORE fixing
node notion-query.cjs check "issue keyword"

# Get preference
node notion-query.cjs preferences trading_hours
```

## Workflow Integration

### On Wake-up
1. Run `notion-query.cjs active` - get current task
2. Run `notion-query.cjs decisions 3` - recent decisions
3. Run `notion-query.cjs positions` - current holdings

### Before Fixing Anything
1. Run `notion-query.cjs check "<issue>"`
2. If found - use that fix
3. If new - fix + log-error

### Before Trading
1. Check `notion-query.cjs positions` - current holdings
2. Check `notion-query.cjs preferences trading_hours` - is market open?
3. After trade - `composio-notion.cjs trade BUY ...`

### After Any Important Action
1. Log to appropriate Notion page
2. Auto-backed up locally for instant query
