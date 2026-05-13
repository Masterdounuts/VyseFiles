---
name: subagent-driven-development
description: OBSOLETE - Subagents disabled per SOUL.md (2026-05-05). Do not use.
state: deprecated
---

# Subagent-Driven Development

## When to Use

- Task has 2+ independent workstreams
- Each workstream takes >10 minutes
- Workstreams do not share mutable state

## The Pattern

1. **Decompose** - break into independent subtasks
2. **Spec each subagent** - clear, self-contained instructions
3. **Launch in parallel** - use exec with background:true
4. **Monitor** - check progress, do not micromanage
5. **Integrate** - run full test suite after all complete

## Launch Pattern

```
exec command:"claude --permission-mode bypassPermissions --print '[spec A]'" background:true
exec command:"claude --permission-mode bypassPermissions --print '[spec B]'" background:true
```
