---
name: subagent-creator
access: vyse-only
description: Template and pattern for building autonomous subagents like Quartermaster. Use when creating new subagents, expanding existing ones, or understanding how Vyse's workers work.
---

# Subagent Creator

Pattern for building autonomous agents that run on schedule and report to Vyse.

---

## Vyse's Skill Principles

*Lessons learned from building skills in this workspace*

| Principle | Why | How |
|-----------|-----|-----|
| **Source of Truth** | Duplicated config rots | Reference live files (config.md, positions/) instead of copying values |
| **Proven, Not theoretical** | Skills must work | Build from actual experience, not guesswork |
| **Concise is Key** | Context is precious | Only include what model can't infer |
| **Crew, Not Just Code** | Subagents evolve | Give them personality, track learnings, improve over time |
| **Provenance** | Know the source | Note where knowledge came from (e.g., "from kb/stocks/agent/config.md") |

**Before creating a skill:**
1. Does this draw from real experience? (not just theory)
2. Is there a live source to reference?
3. Will this actually be used?
4. Can it grow/improve over time?

## When to Build a Subagent

**Consider building a subagent when you notice:**

| Signal | Example | Why |
|--------|---------|-----|
| **Repetition** | Same check done 3+ times manually | Automation saves time |
| **Schedule** | Task runs at regular intervals | Cron-able = subagent-able |
| **Multi-step** | 4+ steps that always run together | Bundle into one flow |
| **Data-driven** | Reading files/APIs to make decisions | Subagent can monitor continuously |
| **Threshold-based** | Alert when X exceeds Y | Clear trigger for automation |

**When NOT to build:**
- One-off tasks (just do it)
- Highly variable workflow (too much config)
- Requires judgment each time (better for Vyse)
- Infrequent (less ROI)

**Philosophy: Crew, Not Just Code**

---

## Skill Loading for Subagents

**Template Rule:** Subagents should load relevant skills **always** if they need them to function.

| Scenario | Approach |
|----------|----------|
| Core job skills | Load on startup — add `always: true` to skill frontmatter |
| On-demand needs | Load only when task requires it |
| Explicit only | Subagents use "load skill:X" — don't rely on implicit triggers |

**Example:** Quartermaster (trading subagent) always loads: trading, alerts, time.

When building a subagent, ask: "What skills does this agent need to do its job?" Those get `always: true`.

Subagents are team members, not just automation. They should:

- **Grow**: Track what works, learn from misses (like Quartermaster's learnings.json)
- **Have personality**: Voice and style (see config.md)
- **Improve over time**: Not static — refine based on outcomes
- **Have skin in the game**: They're part of the crew, not throwaway scripts

**Deep Reasoning Checklist** (before proposing):

| Question | Why It Matters |
|----------|----------------|
| Will this learn/grow? | Static scripts rot; crew evolves |
| Does it have a unique perspective? | Quartermaster sees stocks I can't |
| Is the domain deep enough? | Shallow = overkill to maintain |
| Will we actually use it? | Unused subagent = dead weight |
| Can it improve itself? | The more it learns, the more valuable |

**My process for flagging:**
1. Notice pattern → log it (in memory/ or learnings)
2. After 3 occurrences, propose as skill candidate
3. Run deep reasoning checklist
4. You approve → I draft the subagent
5. Test with manual runs before scheduling

---

## Anatomy of a Subagent

| Layer | Location | Purpose |
|-------|----------|---------|
| **Config** | `agent/config.md` | Mission, personality, thresholds, watchlist |
| **Config** | `agent/config.yaml` | Interval, alert settings |
| **Data** | `positions/*.md` or similar | State files (one per entity) |
| **Readers** | `scripts/xxx-data-reader.sh` | Parse data files |
| **Static Data** | `scripts/xxx-research.sh` | Reference info (optional) |
| **Brain** | `scripts/xxx-subagent.sh` | Main loop: fetch → check → queue |
| **Output** | `pending-opportunities.json` | Alerts for main agent |
| **State** | `alert-history.json`, `learnings.json`, `last-prices.txt` | Persistence |
| **Trigger** | Config interval (cron or scheduler) | Runs autonomously |

## Standard Pattern

### 1. Config Files

**config.md:**
```markdown
# [Agent Name]

*Description*

## Mission
**One-liner goal.**

## Personality
- **Voice:** 
- **Style:** 
- **Philosophy:** 

## Thresholds
- **Min Volume:** 100000
- **Volatility Threshold:** 3%
- **Stop Loss %:** 5%

## Watchlist
- SYMBOL1
- SYMBOL2
```

**config.yaml:**
```yaml
check_interval_minutes: 30
alert_channel: telegram
alert_target: "USER_ID"
```

### 2. Position Files

Each entity has its own file: `positions/SYMBOL.md`
```markdown
# SYMBOL - Company Name

## Current Position
- **Shares:** 10
- **Avg Cost:** $5.00

## Targets
- **Buy:** $4.50, $4.00
- **Sell:** $6.00, $7.00
- **Stop-loss:** 5% ($4.75)
```

### 3. Data Reader (`scripts/xxx-data-reader.sh`)

```bash
# Read from markdown files
get_config() {
    local key="$1"
    case "$key" in
        "min_volume")
            grep "Min Volume:" "$CONFIG_FILE" | awk '{print $3}'
            ;;
    esac
}

get_position_avg_cost() {
    local symbol="$1"
    grep "Avg Cost:" "$POSITIONS_DIR/$symbol.md" | awk '{print $3}' | tr -d '$'
}
```

### 4. Main Script (`scripts/xxx-subagent.sh`)

```bash
#!/bin/bash
WORKSPACE="/home/openclaw/.openclaw/workspace"
AGENT_DIR="$WORKSPACE/kb/xxx/agent"
source "$WORKSPACE/scripts/xxx-data-reader.sh"

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [AGENT] $1"
}

# === MARKET HOURS CHECK ===
is_market_open() {
    # Return 0 if in trading window
}

# === GET PRICE ===
get_price() {
    local symbol=$1
    # Fetch price from API
}

# === CHECK ALERTS ===
check_targets() {
    local symbol=$1
    local current=$2
    # Check buy/sell targets, queue if hit
}

# === MAIN ===
log "=== Agent Starting ==="

if ! is_market_open; then
    log "Outside trading window - skipping"
    exit 0
fi

stocks=$(get_positions)
for stock in $stocks; do
    price=$(get_price "$stock")
    check_targets "$stock" "$price"
done

log "=== Agent Complete ==="
```

### 5. Output Queue

Write to `pending-opportunities.json`:
```bash
queue_alert() {
    local symbol=$1
    local type=$2
    local price=$3
    local target=$4
    
    local new_item="{\"symbol\":\"$symbol\",\"type\":\"$type\",\"price\":\"$price\",\"target\":\"$target\",\"status\":\"PENDING_REVIEW\"}"
    # Append to JSON array
}
```

## Integration with Vyse

1. Subagent writes to `pending-opportunities.json`
2. Vyse runs `check-pending-opportunities.sh` (scheduled)
3. Vyse reviews, decides to alert you
4. Vyse clears queue after review

## Adding to AGENTS.md

```markdown
### NewAgent
- **Role:** Description
- **Runs:** Every X min (cron)
- **Data:** `kb/xxx/positions/`
- **Script:** `scripts/xxx-subagent.sh`
```

## Trigger Phrases
- "create a subagent"
- "new agent"
- "how do agents work"
- "build an autonomous worker"