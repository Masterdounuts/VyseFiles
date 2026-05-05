# Session Cleanup Pattern

**Date:** 2026-04-27
**Context:** Control UI session selector dropdown was full (64+ sessions)
**Updated:** 2026-05-05 - Subagents disabled

## Root Cause
- Old sessions accumulate in `sessions.json` at `~/.openclaw/agents/vyse/sessions/`
- Sessions include: cron jobs, cron runs, dreaming/memory sessions, orphans
- Old sessions don't auto-expire → dropdown grows unbounded

## Cleanup Procedure

### 1. Check current session count
```bash
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/home/openclaw/.openclaw/agents/vyse/sessions/sessions.json', 'utf8'));
console.log('Total sessions:', Object.keys(data).length);
"
```

### 2. Prune sessions
```javascript
const fs = require('fs');
const path = require('path');

const agentsDir = '/home/openclaw/.openclaw/agents';
const agents = ['vyse'];  // Only vyse now
const MAX_AGE_DAYS = 7;

const cutoff = Date.now() - (MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

for (const agent of agents) {
  const sessionsPath = path.join(agentsDir, agent, 'sessions', 'sessions.json');
  if (!fs.existsSync(sessionsPath)) continue;
  
  const data = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
  const before = Object.keys(data).length;
  
  const toKeep = {};
  for (const [key, val] of Object.entries(data)) {
    if (val.updatedAt > cutoff) toKeep[key] = val;
  }
  
  const pruned = before - Object.keys(toKeep).length;
  if (pruned > 0) {
    fs.writeFileSync(sessionsPath, JSON.stringify(toKeep, null, 2));
    console.log(agent + ': pruned ' + pruned);
  }
}
```

### 3. Verify remaining
- Refresh Control UI
- Check session selector dropdown

## Key Sessions to ALWAYS Keep
- `agent:vyse:main` - Main conversation
- Any cron job that runs frequently (daily+)

## Current Best Practice

Remove ALL :run: entries, keep only base cron jobs:

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/home/openclaw/.openclaw/agents/vyse/sessions/sessions.json', 'utf8'));

// REMOVE ALL :run: entries
Object.keys(data).forEach(key => {
  if (key.includes(':run:')) delete data[key];
});

// REMOVE orphaned main sessions (no label + no lastChannel)
// BUT NEVER remove the currently running session!
Object.entries(data).forEach(([key, val]) => {
  const isRunning = val.status === 'running';
  const isOrphanedMain = key.includes(':main') && !val.label && !val.lastChannel;
  if (isOrphanedMain && !isRunning) delete data[key];
});

fs.writeFileSync(sessionsPath, JSON.stringify(data, null, 2));
```