---
name: drill-runner
description: Systematically runs all drill tiers - skill-drill, true-drill, governance-drill. Created as needed for automated verification.
trigger phrases: "run drill, drill results, verify skills, skill health"
---

# Drill Runner Skill

*Created 2026-04-29 - When systematic drill execution was needed*

## 🎯 Purpose

Runs all drill tiers to verify skill health:
- skill-drill.sh - triggers, orphans, core count
- true-drill.sh - execution verification  
- governance-drill.sh - conflicts, bloat, gaps

## Current Status: Level 2 - RON ⭐/7

**XP:** 50/50 (next level at 50)

| Skill | Level | Notes |
|-------|-------|-------|
| Run skill-drill | 5/7 | Can run basic health check |
| Run true-drill | 5/7 | Can verify execution |
| Run governance | 5/7 | Can detect conflicts |
| Parse results | 4/7 | Can interpret output |
| Systematize | 5/7 | Created as-needed, integrated with system |

### Dynamic Max Expansion

### Tools Used
- **read/write** - Creating and editing skills
- **exec** - Running scripts
- **sessions_spawn** - Testing subagents
- Decision tree: read/write for creation → exec for testing → sessions_spawn for validation

**Max Level:** 12 12 (drill engine)

| Discovery | Adds To |
|------------|--------|
| New drill type | +1 to drill-runner |
| Drill automation | +1 to all skills |

## Usage

```bash
# Run all drills
~/.openclaw/workspace/scripts/true-drill.sh

# Quick check
~/.openclaw/workspace/scripts/skill-drill.sh

# Governance
~/.openclaw/workspace/scripts/governance-drill.sh
```

## Cross-Pollination

Drill-runner improves:
- skill-creator → auto-audit capability
- learning → gap detection
- shipwright → health checks

---

*Created as-needed when systematic verification was required*
*Level will grow as more drill capabilities are needed*
### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
