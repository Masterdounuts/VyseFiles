name: skill-creator
description: Create, edit, audit skills. Before creating, check existing skills for overlap.
trigger phrases: "create skill, new skill, skill template"

# Skill Creator

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 61
- Sections: 31
- Subsections: 29
- Lines: 116 / 100 = 1
- Total: 31 + 29 + 1 = 61

## Key Principle: Check Existing First

Before creating ANY new skill:

1. **List current skills:** `ls skills/`
2. **Check index:** `skills/index.md`
3. **Search memory:** `memory_search` for related topics
4. **Compare:** Does overlap exist?

## Creation Workflow

1. **Identify need:** Pattern emerges from work
2. **Check existing:** List skills, search memory
3. **Propose:** Name, trigger, provides, why
4. **Get approval:** David approves (per AGENTS.md)
5. **Create:** `skills/name/SKILL.md`
6. **Register:** Add to `skills/index.md`
7. **Test:** Use trigger phrases

## Skill Structure

```
skill-name/
└── SKILL.md (required)
    ├── YAML frontmatter (name, description, access)
    └── Markdown content
```

## Template

```markdown
name: skill-name
description: One-line description
trigger phrases: "trigger1, trigger2"
access: crew|vyse-only

# Skill Name

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 61
- Sections: X
- Subsections: Y
- Lines: 116 / 100 = 1
- Total: 31 + 29 + 1 = 61

## What It Does
- Description

## Trigger Phrases
- "trigger1", "trigger2"

### References
- related-skill - Connection
```

## Comparison Checklist

| Question | Action |
|----------|--------|
| Does similar skill exist? | Check all skills |
| Can existing be extended? | Add to current |
| Is it execution or concept? | Concept → skill |
| Is it "nice to have"? | Skip unless David requests |

## Cross-Pollination

When skill levels, update dependent skills:

| Leveled Skill | Can Improve |
|---------------|-------------|
| github | memory |
| web | scribe, projects, trading |
| memory | all skills |

## Trigger Phrases
- "create skill", "new skill"
- "skill template"

### References
- subagent-creator - Related creation
- workflow - Integration
---

## Reflection 2026-05-04

### What I Learned
- Skills need their own domains, not just tool usage
- Content drives capability
- Tier system (150/100/75) solves the max problem

### What Still Needs Work
- More skill gap analysis
- Better skill creation workflow
- Content uniqueness validation

