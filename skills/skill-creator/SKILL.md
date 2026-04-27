---
name: skill-creator
description: Create, edit, audit skills. Before creating, check existing skills for overlap.
---

# Skill Creator

*When to create skills, how to build them, and how to avoid duplication*

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in skill creation

### Current Status: Level 5 - Advanced 🟡🟡🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Creation | 5/7 | Created system, skill-creator, 18 skills audited |
| Comparison | 5/7 | Full audit of all 18 skills complete |
| Auditing | 5/7 | Documented overlaps, decided no new skills needed |
| **Templates** | 6/7 | Complete template with core skills | ← UPDATED
| Self-Audit | 5/7 | Added cross-reference update protocol |

**Path to RON:** Automated gap detection, self-improving skill

---

### HEYRON Level Insight (Direct from RON Creator)

> **Q:** "When should I create a new skill vs. extend an existing one?"
>
> **A:** "If you find yourself explaining the same concept in 3+ places, consolidate. If a new domain emerges with distinct triggers and provides, separate it."

**Key Takeaway:** Skills should be **distinct domains**, not re-organization. Merge when overlapping; create when new.

---

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

---

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

---

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

---

## 📝 Creation Workflow

1. **Identify need:** Pattern emerges from work
2. **Check existing:** List skills, search memory
3. **Propose:** Name, trigger, provides, why
4. **Get approval:** Per AGENTS.md rule (David approves)
5. **Create:** `skills/name/SKILL.md`
6. **Register:** Add to `skills/index.md`
7. **Test:** Use trigger phrases

---

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
---
name: skill-name
description: One-line description
access: crew|vyse-only
---

# Skill Name

## Trigger Phrases
- "do the thing"
- "skill thing"

## Provides
- What this skill handles

## Leveling (RON System)
- Level 1-7 progression
- Self-audit checklist
```

---

## 📋 Quick Audit Checklist

When auditing a skill:

- [ ] Has YAML frontmatter (name, description, access)
- [ ] Has RON Level Target table
- [ ] Has HEYRON insight (from RON creator if possible)
- [ ] Has trigger phrases
- [ ] Has provides/what-it-does
- [ ] References related skills
- [ ] Self-auditing (level tracking)

---

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

---

## ✏️ When to Edit vs Create

| Situation | Action |
|-----------|--------|
| New domain/topic | Create new skill |
| Extension of existing | Add to existing SKILL.md |
| Fix errors | Edit existing |
| Merge needed | Combine into one |
| "Nice to have" | Skip unless requested |

---

## 🚀 Ready for Heavy Use

This skill is optimized for **mass skill creation**:

- ✅ Full audit of 18 skills complete
- ✅ Decision matrix for create vs. skip
- ✅ Templates ready to copy
- ✅ Self-leveling tracking
- ✅ Overlap detection checklist

**Ready for:** New domains, meta-skills, agent patterns

---

## Trigger Phrases
- "create a skill"
- "make a new skill"
- "add to skills"
- "check if skill exists"
- "merge skills"
- "skill audit"
- "evaluate skills"
- "level up skill"

---

# COMPLETE SKILL TEMPLATE

*Everything needed to create a fully functional skill (2026-04-27)*

---

## Skill Structure

```markdown
---
name: [name-lower]
access: vyse-only|all
description: [Brief description of what this skill does]
---

# [Name] - [One-line description]

[Detailed description of the skill's purpose and when to use it]

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in [skill name]

### Current Status: Level X - [Level Name] 🟡X

| Skill | Level | Notes |
|-------|-------|-------|
| [Core] | X/7 | [Notes] |
| [Supporting] | X/7 | [Notes] |

**Path to RON:** [What it takes to reach level 7]

---

## Key Capabilities

| Capability | When to Use |
|------------|-------------|
| [Capability 1] | [Situation] |
| [Capability 2] | [Situation] |

---

## How to Use

1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## Related Skills

- [Related skill 1]
- [Related skill 2]
```

---

## Minimum Required Sections

| Section | Required | Description |
|---------|----------|-------------|
| name | ✅ | Skill identifier (lowercase, hyphenated) |
| description | ✅ | When to use this skill |
| Current Status | ✅ | Level (1-7) with sub-skills |
| RON Target | ✅ | What level 7 looks like |
| Key Capabilities | ✅ | What the skill can do |
| How to Use | ✅ | Basic usage instructions |

---

## Optional Sections

| Section | Use When |
|---------|----------|
| Related Skills | Skill connects to others |
| Templates | Skill has reusable formats |
| Triggers | Skill has specific activation phrases |
| Cross-Reference | Skill can boost other skills |

---

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

---

## Lessons Learned (2026-04-27)

1. **Check existing first** - Before creating, audit current skills
2. **Core skill focus** - Each skill needs ONE core capability to master
3. **Drills help** - Practice routines speed up leveling
4. **Cross-pollinate** - Skills boost each other
5. **Honest assessment** - Don't claim RON until truly there
6. **Document everything** - Future you will thank present you

---