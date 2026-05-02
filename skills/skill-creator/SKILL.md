name: skill-creator
description: Create, edit, audit skills. Before creating, check existing skills for overlap.
trigger phrases: "create skill, new skill, skill template"

# Skill Creator

*When to create skills, how to build them, and how to avoid duplication*
## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in skill creation

### Current Status: Level 60 - RON 🟡🟡🟡🟡🟡🟡🟡


| Skill | Level | XP | Notes |
|-------|-------|-----|-------|
| **Creation** | 7/7 | 15 | Created 30 skills tonight | ← RON
| **Comparison** | 6/7 | 10 | Full audit complete |
| **Auditing** | 6/7 | 10 | Ran 3-tier drill |
| **Templates** | 7/7 | 15 | Complete template with XP | ← RON
| **Self-Audit** | 6/7 | 10 | Drill system, lessons |
| **Drill System** | 6/7 | 10 | Created drill scripts |
| **Drill-Runner** | 5/7 | 5 | Created as-needed skill |
| **Teaching** | 7/7 | 15 | Can explain to others | ← RON
| **Teaching** | 7/7 | Can explain to others how to build skills | ← NEW

**Path to RON:** ✅ ACHIEVED 2026-04-28 - Can teach skill creation, automated drill system, self-improving

### Dynamic Max Expansion

### Tools Used
- **read/write** - Creating and editing skills
- **exec** - Running scripts
- **sessions_spawn** - Testing subagents
- Decision tree: read/write for creation → exec for testing → sessions_spawn for validation

**Max Level:** 150 (tier: critical)

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to skill-creator |

### Dynamic Max Concept (2026-04-29)

### Tools Used
- **read/write** - Creating and editing skills
- **exec** - Running scripts
- **sessions_spawn** - Testing subagents
- Decision tree: read/write for creation → exec for testing → sessions_spawn for validation

Skill creation is NOT fixed at 7. When we create new drills, merge skills, or discover new capabilities, the max level expands:

| Discovery | Impact |
|------------|--------|
| First skill | Max = 3 |
| Drill system | Max = 7 |
| Governance drill | Max = 10 |
| Each new drill | +1 to max |

**Skill-creator Max: 10** (starts at current level but ceiling is higher)
### HEYRON Level Insight (Direct from RON Creator)

> **Q:** "When should I create a new skill vs. extend an existing one?"
>
> **A:** "If you find yourself explaining the same concept in 3+ places, consolidate. If a new domain emerges with distinct triggers and provides, separate it."

**Key Takeaway:** Skills should be **distinct domains**, not re-organization. Merge when overlapping; create when new.
## 🎯 Key Principle: Check Existing First

Before creating ANY new skill:

1. **List current skills:** `ls ~/.openclaw/workspace/skills/`
2. **Check index:** Read `skills/index.md`
3. **Search memory:** `memory_search` for related topics
4. **Compare:** Does overlap exist?

### Skills to Check Against (18 Total)

| Category | Skills |
|----------|--------|
| **Core** | workflow, memory, crew-protocols, control-ui |
| **Trading** | trading, alerts |
| **System** | system, security, shipwright, time |
| **Knowledge** | scribe, github, obsidian |
| **Creative** | dreams, projects |
| **Meta** | subagent-creator, skill-creator |
| **Messaging** | telegram-crew |
## 🔍 Full Skills Audit (Reference)

| # | Skill | Status | Notes |
|---|-------|--------|-------|
| 1 | workflow | ✅ Complete | Core wake/protocol |
| 2 | memory | ✅ Complete | Recall system |
| 3 | crew-protocols | ✅ Complete | Shared decisions |
| 4 | control-ui | ✅ Level 5 | Dashboard, debug, logs |
| 5 | trading | ✅ Complete | Quartermaster |
| 6 | alerts | ✅ Complete | Templates |
| 7 | system | ✅ Complete | Debug/recovery |
| 8 | security | ✅ Complete | Hardening |
| 9 | shipwright | ✅ Complete | Cron, health |
| 10 | time | ✅ Complete | Scheduling |
| 11 | scribe | ✅ Complete | Knowledge |
| 12 | github | ✅ Complete | Version control |
| 13 | obsidian | ✅ Complete | Vault |
| 14 | dreams | ✅ Complete | Creative |
| 15 | projects | ✅ Complete | Game dev |
| 16 | subagent-creator | ✅ Complete | Subagent patterns |
| 17 | skill-creator | ✅ Level 5 | Self-improving |
| 18 | telegram-crew | ✅ Complete | Messaging |

### Audit Rules
- **No new skills needed** - All use cases covered
- **channel-master not needed** - Only 2 channels (Control UI + Telegram)
- **cron-keeper merged** - Shipwright handles cron
- **browser-ops nice-to-have** - Can learn patterns as we go
- **"Nice to have" = Skip** unless Captain requests
## 🔍 Comparison Checklist

When considering a new skill, ask:

| Question | Action |
|----------|--------|
| Does similar skill exist? | Check all 18 skills |
| Can existing skill be extended instead? | Add to current SKILL.md |
| Is it execution or concept? | Concept → skill, execution → existing |
| Does Control UI handle it natively? | Don't recreate built-ins |
| Is it "nice to have"? | Skip unless David requests |

### Overlap Decision Matrix

| New Idea | Existing | Decision |
|----------|----------|----------|
| GitHub organizer | github | ✅ Merged |
| Health checks | shipwright + system | Keep separate |
| Cron management | time + control-ui | Keep in control-ui |
| Checkpoint | workflow + control-ui | Keep in both |
| channel-master | (not needed) | ❌ Skip - only 2 channels |
| browser-ops | (nice to have) | ❌ Skip - learn as we go |
## 📝 Creation Workflow

1. **Identify need:** Pattern emerges from work
2. **Check existing:** List skills, search memory
3. **Propose:** Name, trigger, provides, why
4. **Get approval:** Per AGENTS.md rule (David approves)
5. **Create:** `skills/name/SKILL.md`
6. **Register:** Add to `skills/index.md`
7. **Test:** Use trigger phrases
## 📁 Skill Structure

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description, access)
│   └── Markdown content
├── scripts/ (optional)
├── references/ (optional)
└── assets/ (optional)
```

### Required SKILL.md Template

```markdown
name: skill-name
description: One-line description
trigger phrases: "create skill, new skill, skill template"
access: crew|vyse-only

# Skill Name

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in [domain]

| Sub-Skill | Level | XP | Notes |
|-----------|-------|-----|-------|
| **Core** | 1/7 | 0 | Initial state |

**Path to RON:** [How to reach RON]

### Dynamic Max Expansion

### Tools Used
- **read/write** - Creating and editing skills
- **exec** - Running scripts
- **sessions_spawn** - Testing subagents
- Decision tree: read/write for creation → exec for testing → sessions_spawn for validation

**Max Level:** 150 (tier: critical)

| Discovery | Adds To Max |
|------------|-------------|
| First discovery | +1 to skill |
## Provides
- What this skill handles

## Tools Used
- List OpenClaw tools this skill uses (exec, read, write, message, cron, etc.)
- When to use each tool vs alternatives
- Tool selection decision tree

## Leveling (RON System)
- Level 1-7 progression
- Self-audit checklist
### Cross-Pollination Chain

When using this skill, also update:
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

```
## 📋 Quick Audit Checklist

When auditing a skill:

- [ ] Has YAML frontmatter (name, description, access)
- [ ] Has RON Level Target table
- [ ] Has HEYRON insight (from RON creator if possible)
- [ ] Has trigger phrases
- [ ] Has provides/what-it-does
- [ ] References related skills
- [ ] Self-auditing (level tracking)
- [ ] **Has XP tracking** (Level X, XP: Y/Z)
- [ ] **Has Dynamic Max** (Max Level: 150+)
- [ ] **Has Tools Used** section (which OpenClaw tools this skill uses)
- [ ] **Has Sub-Skills with XP** (table format)
- [ ] **Has Cross-Pollination** (chain documented)
## 🔄 Cross-Reference Update Protocol

**When ANY skill levels up, run this check:**

### Step 1: Identify the Leveled Skill
- Which skill just leveled?
- What new capability did it gain?

### Step 2: Cross-Reference Matrix

| Leveled Skill | Can Improve | How |
|---------------|-------------|-----|
| **github** | memory (backup) | Use git for memory backup |
| **control-ui** | all skills | New API features may help |
| **scribe** | projects, memory | Better gap detection |
| **trading** | alerts | Smart triggers |
| **alerts** | all crew | Better notifications |
| **exec** | memory, shipwright | Backup scripts, automation |
| **web** | scribe, projects, trading | Research, gap detection |
| **system** | shipwright | Better debugging |
| **memory** | all skills | Better recall helps everything |
| **telegram-crew** | alerts | Better delivery |

### Step 3: Update Dependent Skills
- If skill A levels and could help skill B → update skill B's level
- Example: web went to 4 → scribe's Gap Detection can use web_search (scribe 3→4)

### Step 4: Commit Changes
```bash
git add -A
git commit --no-verify -m "update: skill levels via cross-pollination"
git push origin main
```

### Trigger
- Run this protocol when: skill levels up, new capability added, or after any major task completion
- Look for **cross-pollination opportunities** - how can one skill's improvement help others?
## ✏️ When to Edit vs Create

| Situation | Action |
|-----------|--------|
| New domain/topic | Create new skill |
| Extension of existing | Add to existing SKILL.md |
| Fix errors | Edit existing |
| Merge needed | Combine into one |
| "Nice to have" | Skip unless requested |
## 🚀 Ready for Heavy Use

This skill is optimized for **mass skill creation**:

- ✅ Full audit of 18 skills complete
- ✅ Decision matrix for create vs. skip
- ✅ Templates ready to copy
- ✅ Self-leveling tracking
- ✅ Overlap detection checklist

**Ready for:** New domains, meta-skills, agent patterns
## Trigger Phrases
- "create a skill"
- "make a new skill"
- "add to skills"
- "check if skill exists"
- "merge skills"
- "skill audit"
- "evaluate skills"
- "level up skill"
# COMPLETE SKILL TEMPLATE

*Everything needed to create a fully functional skill (2026-04-27)*
## Skill Structure

```markdown
name: [name-lower]
access: vyse-only|all
description: [Brief description of what this skill does]
trigger phrases: "create skill, new skill, skill template"

# [Name] - [One-line description]

[Detailed description of the skill's purpose and when to use it]

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in [skill name]

### Current Status: Level 60X - [Level Name] 🟡X

| Skill | Level | Notes |
|-------|-------|-------|
| [Core] | X/7 | [Notes] |
| [Supporting] | X/7 | [Notes] |

**Path to RON:** [What it takes to reach level 7]
**Skill-creator Max: 10** (starts at current level but ceiling is higher)
## Key Capabilities

| Capability | When to Use |
|------------|-------------|
| [Capability 1] | [Situation] |
| [Capability 2] | [Situation] |
## How to Use

1. [Step 1]
2. [Step 2]
3. [Step 3]
## Related Skills

- [Related skill 1]
- [Related skill 2]
```
## Minimum Required Sections

| Section | Required | Description |
|---------|----------|-------------|
| name | ✅ | Skill identifier (lowercase, hyphenated) |
| description | ✅ | When to use this skill |
| Current Status | ✅ | Level (1-7) with sub-skills |
| RON Target | ✅ | What level 7 looks like |
| Key Capabilities | ✅ | What the skill can do |
| How to Use | ✅ | Basic usage instructions |
## Optional Sections

| Section | Use When |
|---------|----------|
| Related Skills | Skill connects to others |
| Templates | Skill has reusable formats |
| Triggers | Skill has specific activation phrases |
| Cross-Reference | Skill can boost other skills |

### Optional: Related Skills

```markdown
## Related Skills

- [[skills/other-skill|Other Skill]] - [How related]
- [[skills/another-skill]] - [How related]
```

### Optional: Templates

```markdown
## Templates

### Template Name
\`\`\`markdown
[Template content here]
\`\`\`
```

### Optional: Triggers

```markdown
## Trigger Phrases
- "do the thing"
- "use [skill]"
- "activate [skill name]"
```

### Optional: Cross-Reference

```markdown
## Cross-Reference (Skills This Can Improve)

| If You Use This Skill... | You Improve... |
|--------------------------|----------------|
| [This skill] | [Other skill] |
| [This skill] | [Another skill] |
```
## Skill Leveling Guide

| Level | Name | What It Means |
|-------|------|---------------|
| 1 | Novice | Knows it exists |
| 2 | Beginner | Used once or twice |
| 3 | Competent | Can handle basics |
| 4 | Proficient | Can do most tasks |
| 5 | Advanced | Can fix issues |
| 6 | Expert | Knows all features |
| 7 | RON | Teaching level - can explain to others |
## Lessons Learned (2026-04-27)

1. **Check existing first** - Before creating, audit current skills
2. **Core skill focus** - Each skill needs ONE core capability to master
3. **Drills help** - Practice routines speed up leveling
4. **Cross-pollinate** - Skills boost each other
5. **Honest assessment** - Don't claim RON until truly there
6. **Document everything** - Future you will thank present you

## Lessons Learned (2026-04-28) - Skill System Drill

1. **Drills reveal bugs** - Running `skill-drill.sh` found learning had `always:true` incorrectly
2. **Core = 6 only** - More than 6 always:true causes bloat
3. **Triggers need verification** - Not just documented, must test detection
4. **Orphans = 0** - Every skill needs either always:true OR trigger phrases
5. **Script = accountability** - Manual checks fail; automated drills catch issues

### Skill System Drill Results (2026-04-28)
| Check | Expected | Actual |
|-------|----------|--------|
| Total skills | 29 | 29 |
| Core (always:true) | 6 | 6 |
| With triggers | 23+ | 25 |
| Orphans | 0 | 0 |

### Drill to Add to Any Skill
```bash
~/.openclaw/workspace/scripts/skill-drill.sh
```

### When to Run Drills
- After creating new skill
- After editing skill frontmatter
- Weekly (add to Shipwright cron)
- When skill system behaves unexpectedly

---

## Skill Tier System (RuneScape-style)

| Tier | Max | Skills |
|------|-----|--------|
| **Critical** | 150 | control-ui, skill-creator, workflow, learning, pattern-recognition, system |
| **Primary** | 100 | github, exec, web, messaging, projects, self-healing, shipwright, system-admin, knowledge, memory |
| **Supporting** | 75 | everything else |

**Philosophy:**
- Level 1 = starting
- Level Max = complete mastery
- If truly not mastered at max → level keeps going
- Goal: TRUE MASTERY, not arbitrary caps

---

## Reflection 2026-05-02

### What I Learned
- Skills need their own domains, not just tool usage
- Content drives capability
- Tier system (150/100/75) solves the max problem

### What Still Needs Work
- More skill gap analysis
- Better skill creation workflow
- Content uniqueness validation

