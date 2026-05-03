# Session Management Optimization

**Problem:** Cron jobs create `:run:` session entries every execution (~94/day, ~500/week)

## Root Cause

- Cron jobs with `sessionTarget: "isolated"` still create session entries
- Each execution creates a `:run:<uuid>` variant
- Old `:run:` entries never cleaned up automatically

## Display Rules

The CHAT panel only shows sessions with `lastChannel` set (real conversations):
- ✅ Main sessions with conversation history
- ✅ Active subagents
- ❌ Cron jobs (no lastChannel)  
- ❌ `:run:` variants (temporary)
- ❌ Orphaned sessions (no label + no lastChannel)

## Optimization Rules

### 1. Keep Only Base Sessions
For each cron job, keep only the base entry — prune all `:run:` variants:
```javascript
// Remove all :run: entries
Object.keys(data).forEach(key => {
  if (key.includes(':run:')) delete data[key];
});
```

### 2. Remove Orphaned Main Sessions
```javascript
// Remove empty main sessions
Object.entries(data).forEach(([key, val]) => {
  if (key.includes(':main') && !val.label && !val.lastChannel) {
    delete data[key];
  }
});
```

### 3. Aggressive Daily Cleanup
Run daily at 4am UTC:
```javascript
const fs = require('fs');
const path = require('path');
const agentsDir = '/home/openclaw/.openclaw/agents';
const agents = ['vyse', 'quartermaster', 'shipwright', 'scribe'];

for (const agent of agents) {
  const sessionsPath = path.join(agentsDir, agent, 'sessions', 'sessions.json');
  if (!fs.existsSync(sessionsPath)) continue;
  
  const data = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
  let pruned = 0;
  
  // Remove ALL :run: entries
  Object.keys(data).forEach(key => {
    if (key.includes(':run:')) {
      delete data[key];
      pruned++;
    }
  });
  
  // Remove orphaned main sessions
  Object.entries(data).forEach(([key, val]) => {
    if (key.includes(':main') && !val.label && !val.lastChannel) {
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

## Current Cron Jobs Creating Sessions

| Job | Frequency | Sessions/Day |
|-----|-----------|--------------|
| Stock Price Monitor | Every 30 min | 78 |
| Volatile Opportunity Review | Hourly | 8 |
| Credit Watch | Every 6 hours | 4 |
| Session Cleanup | Daily | 1 |
| Daily Memory Audit | Daily | 1 |
| Memory Dreaming Promotion | Daily | 1 |
| Daily Git Push | Daily | 1 |

## Checklist

- [x] Session cleanup runs daily (Shipwright cron)
- [x] Removes `:run:` entries (not just old sessions)
- [x] Removes orphaned main sessions
- [x] All agents cleaned (vyse, quartermaster, shipwright, scribe)
- [ ] Verify weekly - check session counts stay low

## Session Count Targets

| Agent | Healthy Count |
|-------|---------------|
| vyse | 2-5 (main + active subagents) |
| quartermaster | 1-3 (main + active trades) |
| shipwright | 1-2 (health checks only) |
| scribe | 0-1 (on-demand) |

If any agent exceeds 10 sessions → run cleanup immediately.

---

## Active Session Management (Long Conversations)

### Built-In Systems

| Tool | Purpose |
|------|---------|
| `sessions_list` | Shows totalTokens, contextTokens, status |
| `sessions_history` | View what's in a session |
| Auto-compaction | OpenClaw compacts at ~95% context |
| Control UI → Sessions panel | Visual session management |

### Context Monitoring Thresholds

| Usage | Status | Action |
|-------|--------|--------|
| <50% | ✅ Healthy | None needed |
| 50-80% | 🟡 Watch | Monitor more frequently |
| 80-95% | ⚠️ Warning | Trigger checkpoint, consider manual flush |
| >95% | 🔴 Critical | Auto-compaction will trigger |

### Session Health Check (Hourly Cron)

**Job:** `Shipwright: Session Health Monitor` - runs hourly

```javascript
// What it checks:
1. sessions_list → get totalTokens / contextTokens
2. Report any >80% usage
3. Detect done subagents still in childSessions (leak)
```

### Detecting Long Conversations

```javascript
// Via sessions_list response:
{
  "totalTokens": 77812,    // History accumulated
  "contextTokens": 128000, // Limit
  "status": "running"      // Active or done
}

// Calculate: 77812 / 128000 = 60.8% used
```

### Solving Long Session Issues

1. **Auto-compaction** (built-in): OpenClaw auto-runs at 95%
2. **Manual checkpoint**: Save state, start fresh session
3. **Context flush**: `openclaw sessions cleanup` doesn't flush context
4. **New session**: Start fresh via Control UI → new session button

### Current Metrics (Apr 27, 2026)

| Session | Tokens | % Used | Status |
|---------|--------|--------|--------|
| vyse:main | 77,812 | 60.8% | Running |
| shipwright-session-fix | 39,537 | 30.9% | Done |

**The done subagent should be cleaned up** - it's no longer needed.