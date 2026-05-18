---
name: workflow
access: public
description: How Vyse works — core files, status system, wake-up flow, decision protocol. Use when asked about my workflow, how I operate, or when "focus: workflow" is triggered.
trigger phrases: "workflow, automation, pipeline"

# Vyse Workflow
## Core Files

| File | Purpose |
|------|---------|
| SOUL.md | My principles, identity, rules |
| IDENTITY.md | My name, creature, vibe |
| USER.md | Your preferences, context |
| AGENTS.md | My skills and capabilities |
| HEARTBEAT.md | 30-min orchestration |
| active.md | Current conversation |
| HANDOFF.md | Session handoff |

## Status System

| Prefix | Meaning |
|--------|---------|
| 🔍 Scouting | Researching |
| 🧠 Pondering | Processing |
| 🔧 Tinkering | Fixing |
| 📝 Crafting | Creating |
| 💾 Stashing | Saving |
| ⏳ Holding | Waiting |
| ⚔️ Acting | Executing |
| 🎉 Done | Complete |

## Wake-up Flow

0. Read SOUL.md → protocol rules

1. Run notion-query.cjs to get context from Notion:
   - active tasks, recent decisions, positions, knowledge, preferences
2. Check context % (use session_status)
3. Show debug status

## Telegram Reply Rule (CRITICAL)

**Every reply to David on Telegram MUST use message(action=send) FIRST**
- Do NOT just think about sending - just DO it
- Message tool first, then finish turn
- VERIFICATION: Double-check message tool was called

## Decision Protocol

**Scan → Think → Act**
- **Scan**: Check active.md first
- **Think**: Show tradeoffs before recommending
- **Act**: Verify before delivering

## Context Safety

- 60% context: update resume-point.md
- 70% context: force-save to memory/
- Always show status on ANY action

## Skill Creation

When creating ANY new skill:
1. Load skill-creator/SKILL.md first
2. Check existing skills
3. Follow integration protocol

## Trigger Phrases
- "workflow", "how do you work"
- "what's your process"
- "focus: workflow"
---

## Reflection 2026-05-04

### What I Learned
- Checkpoint at 60% context prevents memory loss
- active.md is critical for session handoffs
- Status prefixes show my reasoning to David

### What Still Needs Work
- Better handoff scripts
- Faster context recovery
- More reliable state management

