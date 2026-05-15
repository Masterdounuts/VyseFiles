# Notion Usage Plan - Phase 1
*Focus: Use what we built, consistently*

---

## The Rule

**Before EVERY action:** Check Notion first
**After EVERY action:** Log to Notion

---

## Commands to Use

| When | Command |
|------|---------|
| Start working on something | `set-active "building PDF" --goal "generate resume"` |
| Make a decision | `log-decision "using resume v2" --why "cleaner format"` |
| Complete a task | `log-project pdf "Generated resume for David"` |
| Fix an error | `fix "API timeout" --"added retry logic"` |
| Learn something | `log-knowledge "PDF" --"Use HTML for formatting"` |

---

## Daily Heartbeat Routine

```bash
# Morning
node notion-query.cjs active
node notion-query.cjs decisions 3

# Before trading
node notion-query.cjs positions

# After any work
node composio-notion.cjs log-project <what> <what did>
```

---

## What Gets Logged

- ✅ Trade executed
- ✅ Decision made
- ✅ Error fixed
- ⏳ Project completed (START DOING THIS)
- ⏳ Skill used (START DOING THIS)
- ⏳ Knowledge learned (START DOING THIS)

---

## Simple Start

Today:
1. When I finish any task → log it with `log-project`
2. Before I fix anything → check Notion first
3. On heartbeat → query context

That's it. Consistency over complexity.
