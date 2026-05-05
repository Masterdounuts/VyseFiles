---
name: skill-creator
access: public
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
| web | projects, trading |
| memory | all skills |

## Trigger Phrases
- "create skill", "new skill"
- "skill template"

### References
- workflow - Integration

---

## CRITICAL: YAML Frontmatter Format

*If this format is wrong, skills WON'T show on dashboard*

### Correct Template
```yaml
---
name: skill-name
access: public
description: One-line description of what this skill does.
trigger phrases: "trigger1, trigger2, trigger3"
---

# Skill Name

## Content-Based Leveling
```

### Common Mistakes That Break Skills
| Mistake | Symptom | Fix |
|---------|---------|-----|
| Missing closing `---` | Skill shows "not found" | Add `---` after description line |
| Blank line after opening `---` | YAML fails to parse | No blank lines in frontmatter |
| Fields out of order | May work or may not | name → access → description → trigger phrases |
| Wrong `name:` in YAML | Skill not found | Must match folder name exactly |

### Debugging Skills Not Showing
1. Run `openclaw skills list | grep workspace` - check if "✓ ready"
2. Check first 6 lines of SKILL.md - ensure proper format
3. Verify closing `---` exists after description

### Quick Validation
```bash
# Should show name on line 2
head -6 skills/*/SKILL.md | grep "^name:"
```
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

---

## Reflection 2026-05-05

### What I Learned
- YAML frontmatter MUST have closing `---` or skills won't load
- Blank lines after opening `---` break parsing
- Dashboard shows different count than `openclaw skills list` (cache issue)
- All 18 skills now working after fixing frontmatter

### Lesson for Future
- ALWAYS use the frontmatter template when creating skills
- Test with `openclaw skills list | grep skill-name` before pushing
- If skills don't show: check closing `---` first

