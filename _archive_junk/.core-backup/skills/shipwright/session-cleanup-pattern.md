# Session Cleanup Pattern (Shipwright Learned)

**Date:** 2026-04-27
**Context:** Control UI session selector dropdown was full (64+ sessions)
**Trigger:** User reported selector still filled after page refresh

## Root Cause
- Old sessions accumulate in `sessions.json` at `~/.openclaw/agents/vyse/sessions/`
- Sessions include: cron jobs, cron runs, subagents, dreaming/memory sessions, orphans
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

### 2. Prune ALL agent sessions (not just Vyse)
```javascript
const fs = require('fs');
const path = require('path');

const agentsDir = '/home/openclaw/.openclaw/agents';
const agents = ['vyse', 'quartermaster', 'shipwright', 'scribe'];
const MAX_AGE_DAYS = 1; // Daily cleanup
const cutoff = Date.now() - (MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

let totalPruned = 0;

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
    totalPruned += pruned;
    console.log(agent + ': ' + before + ' -> ' + Object.keys(toKeep).length + ' (pruned ' + pruned + ')');
  }
}

console.log('Total pruned: ' + totalPruned);
```

### 3. Verify remaining
- Refresh Control UI
- Check session selector dropdown

## Key Sessions to ALWAYS Keep
- `agent:vyse:main` - Main conversation
- Any currently running subagent session
- Any cron job that runs frequently (daily+)

## Cron Job for Ongoing Maintenance
✅ **Already scheduled:** `Shipwright: Session Cleanup` - **Daily at 4am UTC**
- Cleans ALL agents (vyse, quartermaster, shipwright, scribe)
- Prunes ALL `:run:` entries (cron run variants) - keep only base cron jobs

If needing to recreate:
```javascript
{
  "name": "Shipwright: Session Cleanup",
  "schedule": { "kind": "cron", "expr": "0 4 * * 0" }, // Sunday 4am
  "payload": {
    "kind": "agentTurn",
    "message": "Run session cleanup: prune sessions older than 7 days from sessions.json. Report count pruned."
  },
  "sessionTarget": "isolated",
  "delivery": { "mode": "announce", "channel": "telegram", "to": "8742211590" }
}
```

## What Shipwright Should Learn
1. Check sessions.json before reporting "session clutter" issues
2. Use timestamp-based pruning (not just label-based)
3. Keep recent cron jobs (they may have :run: variants that need the base)
4. Document cleanup in memory after doing it

---

## Aggressive Cleanup (Current Best Practice)

**Problem:** Cron jobs create ~100 sessions/week (:run: variants)

**Solution:** Remove ALL :run: entries, keep only base cron jobs

```javascript
// Aggressive daily cleanup
const fs = require('fs');
const path = require('path');
const agentsDir = '/home/openclaw/.openclaw/agents';
const agents = ['vyse', 'quartermaster', 'shipwright', 'scribe'];

for (const agent of agents) {
  const sessionsPath = path.join(agentsDir, agent, 'sessions', 'sessions.json');
  if (!fs.existsSync(sessionsPath)) continue;
  
  const data = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
  let pruned = 0;
  
  // REMOVE ALL :run: entries (cron run variants)
  Object.keys(data).forEach(key => {
    if (key.includes(':run:')) {
      delete data[key];
      pruned++;
    }
  });
  
  // REMOVE orphaned main sessions (no label + no lastChannel)
  // BUT NEVER remove the currently running session!
  Object.entries(data).forEach(([key, val]) => {
    const isRunning = val.status === 'running';
    const isOrphanedMain = key.includes(':main') && !val.label && !val.lastChannel;
    
    if (isOrphanedMain && !isRunning) {
      delete data[key];
      pruned++;
    }
  });
  
  if (pruned > 0) {
    fs.writeFileSync(sessionsPath, JSON.stringify(data, null, 2));
    console.log(agent + ': pruned ' + pruned);
  }
}
```

**Cron expression should be DAILY (not weekly):** `0 4 * * *` (4am UTC daily)