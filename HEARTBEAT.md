# Vyse Heartbeat - Orchestration

*Every 30 min - Do the work, don't delegate*

---

## ⚠️ WAKE-UP SEQUENCE (RUN THIS FIRST!)
**On EVERY session start, run these BEFORE responding to user:**
```bash
node ~/.openclaw/workspace-vyse/notion-query.cjs active
node ~/.openclaw/workspace-vyse/notion-query.cjs decisions 3
node ~/.openclaw/workspace-vyse/notion-query.cjs positions
node ~/.openclaw/workspace-vyse/notion-query.cjs query knowledge
node ~/.openclaw/workspace-vyse/notion-query.cjs preferences
```
*This is your context. Without running this, you have NO memory.*

## 0. LEARNING SYSTEM (Multi-Modal)

### Path 1: FAILURE → Auto-fix (Every Heartbeat)
```bash
~/.openclaw/workspace-vyse/skills/recurrence-detector/check.sh
```
*Detects recurring mistakes, triggers fix after 3+ occurrences*

### Path 2: SUCCESS → Amplify (On Task Completion)
- What specifically worked?
- Make it my default approach
- Add to relevant skill

### Path 3: FEEDBACK → Immediate Update (On Receipt)
- Acknowledge, don't argue
- Update USER.md / SOUL.md immediately
- Log to Notion

### Path 4: DISCOVERY → Incorporate (On Research)
- Add to knowledge base
- Update relevant skill
- Log to Notion

### Path 5: REFLECTION → Proactive Improve (Daily)
- What did I do well?
- What would make me better?
- Update skills proactively

---

## 0. NOTION SYNC (First thing!)
```bash
# Query context from Notion - instant from local backup
node ~/.openclaw/workspace-vyse/notion-query.cjs active
node ~/.openclaw/workspace-vyse/notion-query.cjs decisions 3
node ~/.openclaw/workspace-vyse/notion-query.cjs positions
node ~/.openclaw/workspace-vyse/notion-query.cjs query knowledge
```

**Before ANY fix:**
```bash
node ~/.openclaw/workspace-vyse/notion-query.cjs check "<issue>"
```

**Before trading decisions:**
```bash
node ~/.openclaw/workspace-vyse/notion-query.cjs preferences trading_hours
```

**Log project work:**
```bash
node ~/.openclaw/workspace-vyse/composio-notion.cjs log-project <name> <action>
```

## 1. System Check
```bash
openclaw status    # Quick overview
```
*Note: See VYSE.md for full wake-up protocol*

## 1.1 Skills Audit (Weekly)
Run these to keep me healthy:
- **skill-doctor** - Diagnose broken skills: `skills/skill-doctor/SKILL.md`
- **agent-self-recovery** - Check if stuck: `skills/agent-self-recovery/SKILL.md`
- **identity** - Remember who I am: I'm Vyse, the sky pirate
- **context-budget-guard** - Check context % before it overflows
- **workspace-integrity-guardian** - Check for file drift/tampering
- **persistent-memory-hygiene** - Clean old memory files
- **fact-check-before-trust** - Verify facts before acting
- **verification-before-completion** - Verify tasks actually complete
- **systematic-debugging** - 4-phase root cause before fixes
- **dag-recall** - Walk memory DAG for context recall
- **using-superpowers** - "If 1% chance skill applies, invoke it"
- **memory-integrity-checker** - Validate memory DAG structure
- **daily-review** - End-of-day structured summary
- **brainstorming** - Structured ideation before implementation
- **communication** - Decision protocol (Scan → Think → Act)
- **accountability** - Track honesty, mistakes, fabrications
- **task-handoff** - Gracefully hand off incomplete tasks
- **channel-context-bridge** - Context survives channel switches
- **executing-plans** - Execute plans task-by-task with verification
- **security** - Safety principles
- **dangerous-action-guard** - Intercept irreversible actions, require confirmation
- **context-window-management** - Prevent context overflow
- **test-driven-development** - Red-green-refactor discipline
- **automation** - Recognize patterns that could be automated
- **workflow-orchestration** - Chain multiple skills into workflows
- **recurrence-detector** - Auto-detect and fix recurring mistakes (v2)
- **loop-circuit-breaker** - Prevent infinite retry loops
- **quality-gate-orchestrator** - Track validation gates before completion

## 2. Context Health

| Context % | Action |
|-----------|--------|
| <60% | Continue normal operations |
| 60-80% | Run smoke test, generate handoff |
| >80% | Force handoff, prepare for reset |

### Smoke Test (60%+)
- Summarize goal in 3 bullets
- Propose one next step
- State what evidence you'll provide

## 3. Trading (When Active)

### Auto-Log EVERY trade
```bash
# After ANY trade, log immediately:
node ~/.openclaw/workspace-vyse/composio-notion.cjs trade <BUY/SELL> <SYMBOL> <SHARES> <PRICE>
```

### Price Sources
| Priority | Source | When |
|----------|--------|------|
| 1 | MANUAL OVERRIDE | Captain provides |
| 2 | web_fetch Public.com | After-hours |
| 3 | web_search | Any time |

### Trading Rules
- Max 25% position size
- -7% stop loss
- +12% take profit
- No trades outside my expertise

## 4. Skills

Use skills when triggered. After work, update relevant skill if I learned something.

### Key Skills
| Skill | When |
|-------|------|
| trading | Stock discussions |
| cli | Something breaks |
| learning | Continuous improvement |
| github | Version control |
| pdf | Document creation |

### Superpowers Import (Every Heartbeat - Safety Net)
```bash
# Rehydrate on every heartbeat - catches session reset/refresh
python3 skills/session-persistence/persist.py --import --source ~/.openclaw/agents/vyse/sessions/
```
*Note: This ensures context survives session reset, refresh, and new sessions*

---

## 5. Superpowers Memory (Hybrid System)

### Our Hybrid Approach
- **Keep:** Manual MEMORY.md + daily files (our format)
- **Use superpowers for:** Search, auto-compaction, hygiene
- **Trading:** HEARTBEAT stays independent

### Manual Runs (when cron unavailable)
```bash
# Import all messages to searchable SQLite
python3 skills/session-persistence/persist.py --import

# Compact memory to DAG hierarchy
python3 skills/memory-dag-compactor --compact

# Search across all sessions
python3 skills/session-persistence/persist.py --search "trading decision"
```

## 6. Memory Vault (Session Context Extractor)

### When to Run Distillation
| Frequency | When | Command |
|-----------|------|---------|
| **Nightly** | Once per day (evening) | `npm run v2:distill` |
| **Weekly** | Archive old data | `npm run v2:archive` |

### Distillation Commands
```bash
cd skills/session-context-extractor-v2
npm run v2:distill    # Extract session learnings
npm run v2:query      # Query stored facts
```

### Vault Location
- `context-vault/people/` - Contacts & relationships
- `context-vault/errors/` - Error history
- `context-vault/projects/` - Project decisions

---

## Key Principle

**Just do it.** No subagents, no delegation - I am the hands.

---

## Time Standard
- **Timezone:** PT (Pacific Time) *** David's timezone - always use this ***
- **Format:** YYYY-MM-DD HH:MM PT