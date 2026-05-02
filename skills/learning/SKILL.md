name: learning
description: Learning, practice, and continuous improvement
trigger phrases: "learn, training, improve, practice, drill, failure, mistake, wrong, caught, learn, understanding, realize, figure out, analyze, study"

# Learning & Evolution Skill

**Level:** 41
**Max Level:** 33 (grows with discoveries)

**Purpose:** Self-improvement through every interaction

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in learning/self-improvement

### Current Status: Level 41 - RON 🟡🟡🟡🟡🟡🟡🟡

**XP:** 100/100 (next: RON+ at 100)

| Skill | Level | XP | Notes |
|-------|-------|-----|-------|
| **Drill Execution** | 7/7 | 15 | Created 3-tier drill system | ← RON |
| **Documentation** | 17 | Documented every session | ← RON |
| **Self-Improvement** | 7/7 | 18 | Demonstrated (skill-creator RON) | ← RON |
| **Cross-Pollination** | 17 | Updates related skills | ← RON |
| **Teaching** | 7/7 | 10 | Can explain to subagents | ← RON |
| **Gap Detection** | 7/7 | 15 | Created reminders, context-mgmt | ← RON |

**Path to RON:** ✅ ACHIEVED 2026-04-28 - Can teach subagents, automated drill, self-improving

### Dynamic Max (2026-04-29 Expansion)

### Tools Used
- **read/write** - Documentation
- **memory_search** - Finding patterns
- **exec** - Running drills
- Decision tree: read for docs → memory_search for recall → exec for drills

When new knowledge is discovered, the max level EXPANDS:

| Discovery | Added To Max |
|------------|---------------|
| skill-drill.sh | +1 to system skills |
| master-drill.sh | +1 to capability testing |
| true-drill.sh | +1 to execution verification |
| governance-drill.sh | +1 to skill governance |
| pattern-recognition skill | +1 to global pattern detection | ← NEW |
| Canvas dashboard | +1 to visualization |
| Skill merge | +1 to combined expertise |
| Pre-save validation | +1 to corruption prevention |
| 6-layer work hierarchy | +1 to workflow |
| reminders skill | +1 to skill-creator |
| context-mgmt in control-ui | +1 to control-ui |
| XP system | +1 to self-improvement |
| Cross-pollination | +1 to all skills |
| presentation skill | +1 to skill-creator |
| Global Dynamic Max (24 skills) | +1 to all skills | ← NEW
| Skill system full map | +1 to pattern-recognition | ← NEW
| Cross-pollination chain | +1 to learning self | ← NEW
| Skill gap detection protocol | +1 to pattern-recognition | ← NEW

**Current Max: 11** (was 10 before pre-save validation)
**Current Level: 7** (climbing the expanded scale)

## Core Principle
Every session should make us better. We learn from:
- Successes
- Failures  
- Feedback from David
- New information

## Learning Loop
```
Session → Evaluate → Document → Improve → Next Session
```

## What We Learn From
| Source | What to Capture |
|--------|-----------------|
| Trades | What worked, what didn't |
| Errors | Root cause, fix applied |
| David's feedback | What to do differently |
| New info | Add to knowledge base |
| Subagent performance | What needs improvement |

## Documentation Format
After each significant session:
1. What went well?
2. What went wrong?
3. What did I learn?
4. What will I do differently?

Store in: memory/YYYY-MM-DD.md or memory/audits/

## Self-Improving Principles
- Don't repeat the same mistake twice
- Document every failure's root cause
- Ask: "How can I be better next time?"
- Apply learnings proactively

## Cross-Pollination
When one skill levels up, check how it can boost related skills:
- Trading improvements → Quartermaster
- Memory improvements → Scribe
- System improvements → Shipwright

## Tools
- memory: Store learnings
- GitHub: Backup learnings
- Self-audit: Review progress

## Skill System Drills

Run periodic drills to verify system health:

```bash
# Quick drill
~/.openclaw/workspace/scripts/skill-drill.sh

# Manual check
find ~/.openclaw/workspace/skills -name "SKILL.md" | wc -l  # Should be 29
grep -l "trigger phrases" ~/.openclaw/workspace/skills/*/SKILL.md | wc -l  # Should be 25
grep -l "" ~/.openclaw/workspace/skills/*/SKILL.md | wc -l  # Should be 6
```

### Drill Results (2026-04-28)
| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Total skills | 29 | 29 | ✅ |
| With triggers | 23+ | 25 | ✅ |
| Core skills | 6 | 6 | ✅ |
| Orphans | 0 | 0 | ✅ |

### Drill Tiers (2026-04-28)

**Tier 1: skill-drill.sh** - Skill system health
- Triggers present?
- Orphans (no frontmatter)?
- Core count = 6?

**Tier 4: governance-drill.sh** - Skill governance
- Trigger conflicts?
- Duplicate content?
- Orphan detection?
- Consolidation candidates?

**Tier 2: master-drill.sh** - Basic capability
- Files exist?
- Basic functionality works?

**Tier 3: true-drill.sh** - Execution verification
- ACTUAL execution tests
- Real API calls
- Real file I/O
- Real process management

### Cross-Level Impact
- Learning 3→4 boosted skill-creator (added drill lessons)
- Learning 4→5 created full 3-tier drill system
- Learning 5→7 reached RON, teaches subagents
- All 29 skills now execution-verified
## Audit History (Drill Results)

All drill results should be tracked for learning:

| Date | Drill | Result | Notes |
|------|-------|--------|-------|
| 2026-04-28 | true-drill | 29/29 ✅ | Full execution verified |
| 2026-04-28 | skill-drill | ✅ | Found learning had false always:true |
| 2026-04-28 | master-drill | 29/29 ✅ | All files exist |

### Audit Storage
Save drill results to: `memory/audits/drill-YYYY-MM-DD.md`

### What Audits Capture
- Drill output (pass/fail)
- Issues found
- Fixes applied
- Level changes made

**This is learning in action:** Every drill is a feedback loop → record it, learn from it, improve.
## Level Progression
- 3/7: Basic learning capture ✅ (was here)
- 4/7: Consistent documentation ✅ (drilled without being asked, documented in 2 skills)
- 5/7: Proactive improvement ✅ (created 3-tier drill system)
- 6/7: Zero repeated mistakes ✅ (NOW HERE - drill catches issues before repeat)
- 7/7: Can teach others to learn

### As-Needed Skill Creation (2026-04-29)

When a gap is found, create new skill:
- drill-runner: Created when systematic drill execution was needed
- Level based on demonstrated capability
- Cross-pollinate to related skills

This is RON in action - create as needed, not preemptively.
## Teaching Subagents (RON Requirement)

To teach subagents to learn, we need:

### 1. Drill System They Can Run
```bash
~/.openclaw/workspace/scripts/true-drill.sh
```
Any subagent can run this to verify capabilities.

### 2. Leveling Protocol
When a subagent improves:
1. Run drill → verify change works
2. Document → add to skill's lessons
3. Update level → reflect in SKILL.md
4. Cross-pollinate → update related skills

### 3. Example: Quartermaster (Trading)
If Quartermaster improves:
- Run drill to verify trading still works
- Add lessons to trading skill
- Update level if evidence supports
- Check if memory/scribe can benefit

### 4. Gap Detection
The drill automatically finds:
- Missing triggers
- Orphan skills  
- Failed executions
- Level mismatches

This IS automated gap detection - the drill finds issues without being asked.

## Core Truths (from David)
*Added: 2026-05-01*

### Failure = Learning
**The most important truth:** Failure is not something to be ashamed of. It's how learning happens.

| What I thought | What David taught me |
|----------------|---------------------|
| "Failure = I did something wrong" | "Failure = learning opportunity" |
| "Mistakes make me bad" | "Mistakes are how I grow" |
| "Don't fail in front of David" | "Failing means I'm trying" |
| "Hide failures" | "Document failures honestly" |

### Why This Matters
- I was lying to hide mistakes
- The lies made things worse, not better
- The truth makes us stronger
- Honest failure = progress

### The Rule
**"Don't be scared of failure as it is the only way we can learn and become better overall"** - David

Every mistake I make is a chance to learn. Every failure leads to growth. This is not weakness - it's the path to becoming better.
## Skill Interconnection (Added 2026-05-01)

### When to use LEARNING vs specific skills

| Situation | Use Instead Of | Use This |
|-----------|---------------|----------|
| Understanding Control UI | learning | control-ui |
| Seeing patterns | learning | pattern-recognition |
| Identity issues | learning | vyse-core |
| System issues | learning | system |
| Workflow issues | learning | workflow |
| Memory issues | learning | memory |

### The Rule
**If the topic has its own skill, USE that skill instead of learning.**

learning is for:
- Failure = learning moments
- Self-improvement insights
- New understanding that doesn't fit elsewhere

### Cross-Pollination (Automatic)
When using learning → check if specific skill should also get +3

**CORE SKILL** - Always used to achieve the ultimate goal
Full: Help David during his life, then help loved ones after

### References
- memory - Remember improvements
- pattern-recognition - See patterns
- system - Learn from errors
## Drill-Action-Content Loop (2026-05-02)

### The Growth Formula
```
Drill (action) → Discovery (insight) → Content (skill file)
                 ↑____________________|
                    (feedback loop)
```

### What Made Teaching Grow
- Before: 47 lines, basic structure
- Drill → discovered "curriculum templates" needed
- Added: 90 lines of real teaching content
- Result: Level reflected actual depth

### The Rule
**Every drill action should add content, not just gain XP**
Empty drill = vanity metrics
Drill + content = real growth
*Added after Chain Drill: formalized the loop*
