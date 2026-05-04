name: drill-runner
description: Systematically runs all drill tiers - skill-drill, true-drill, governance-drill. Created as needed for automated verification.
trigger phrases: "run drill, drill results, verify skills, skill health"

# Drill Runner Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 13
- Sections: 7
- Subsections: 6
- Lines: 71 / 100 = 0
- Total: 7 + 6 + 0 = 13

## Purpose

Runs drill tiers to verify skill health:
- skill-drill.sh - triggers, orphans, core count
- true-drill.sh - execution verification
- governance-drill.sh - conflicts, bloat, gaps

## Drill Types

### Tier 1: Skill Drill
- Trigger validation
- Orphan detection
- Core skill count
- Run: `bash scripts/skill-drill.sh`

### Tier 2: True Drill
- Execution verification
- Script functionality
- Output validation

### Tier 3: Governance Drill
- Conflict detection
- Bloat check
- Gap analysis

## Usage

```bash
# Run all drills
bash scripts/true-drill.sh

# Quick check
bash scripts/skill-drill.sh

# Governance
bash scripts/governance-drill.sh
```

## Result Parsing

| Output | Meaning |
|--------|---------|
| All triggers valid | Skills healthy ✅ |
| Orphan found | Fix or remove |
| Missing core | Add to AGENTS.md |
| Conflict | Priority fix |

## Trigger Phrases
- "run drill", "verify skills"
- "drill results", "skill health"

### References
- learning - Gap detection
- system - Health checks
