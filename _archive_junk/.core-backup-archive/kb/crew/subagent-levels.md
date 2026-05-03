# Subagent Leveling System

*RON-style levels for crew members - drill results tracked*

---

## The 7 Levels

| Level | Name | What It Means |
|-------|------|---------------|
| 1 | Novice | Can do basic tasks |
| 2 | Beginner | Used with guidance |
| 3 | Competent | Handles most tasks |
| 4 | Proficient | Can do complex tasks |
| 5 | Advanced | Self-healing |
| 6 | Expert | Optimizes performance |
| 7 | RON | Fully autonomous |

---

## Current Subagent Levels

### Scribe (Knowledge Retrieval)
| Skill | Level | Drill Result |
|-------|-------|--------------|
| Memory Retrieval | 5/7 | ✅ PASS - Found LIDR trade |
| Quick Response | 5/7 | ✅ PASS |

### Quartermaster (Trading)
| Skill | Level | Drill Result |
|-------|-------|--------------|
| Trading Decisions | 4/7 | ⚠️ Needs review - said BUY more |
| Use Available Tools | 4/7 | ✅ Used web_search correctly |

### Shipwright (System Health)
| Skill | Level | Drill Result |
|-------|-------|--------------|
| Health Checks | 5/7 | ✅ PASS - Found issues |
| Security Awareness | 5/7 | ✅ PASS - Flagged concerns |
| Accept Reassurance | 5/7 | ✅ PASS - Acknowledged resolved |

---

## Cross-Pollination Log

| Date | Agent | Skill Used | Result |
|------|-------|------------|--------|
| 2026-04-29 | Quartermaster | web_search | Found news |
| 2026-04-29 | Shipwright | security | Flagged, then resolved |
| 2026-04-29 | Scribe | memory | Retrieved trade data |

---

## Last Drill: 2026-04-29 08:25 UTC

### Updated: Quartermaster (After Drill)
| Skill | Level | Notes |
|-------|-------|-------|
| Trading Decisions | 4/7 | Was wrong on drill 1, corrected on drill 2 |
| Follow Rules | 3/7 | Initially ignored -15%/+20% rule |
| Use Scribe | 3/7 | Used web_search instead of asking Scribe |

**Drill Lesson:** Follow your own rules! Don't buy more unless at target.

### Updated Workflow: Research → Scribe → Memory
1. Quartermaster uses web_search to research
2. Summarizes (1-2 sentences)
3. Asks Scribe to store in memory

This creates: **Research Loop**
- Quartermaster researches → Scribe stores → Memory grows
- Cross-pollination: web_search skill + memory skill

---

## Drill Series 2026-04-29

### Drill 1: Quartermaster (FAILED)
- Task: Check positions
- Result: ❌ Used old data (GGB, MARA, PFE) - not current (NRXP, LIDR)
- Issue: Ignored system prompt, pulling from some external tool
- Status: Needs investigation

### Drill 2: Scribe (PASSED)
- Task: Find LIDR trade
- Result: ✅ Found entry $2.14, 5 shares, still holding
- Skill used: memory retrieval (5/7)

### Drill 3: Shipwright
- Task: Health check
- Result: ✅ Passed (security concerns resolved)

---

## Skills Leveled
- Scribe: Memory Retrieval 5/7 → 6/7 (consistent performer)
- web_search: Used by Quartermaster (cross-pollination potential)
