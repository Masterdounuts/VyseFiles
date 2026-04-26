# Skills Index

## Available Skills

| Skill | Access | Always | Description |
|-------|--------|--------|-------------|
| skill:workflow | vyse-only | - | How Vyse works — core files, status system, wake-up flow |
| skill:trading | crew | - | Quartermaster config, thresholds, workflow (stocks) |
| skill:system | vyse-only | ✅ | Debugging, recovery, FIXES, health checks |
| skill:memory | vyse-only | - | Recall system, checkpoints, context management |
| skill:dreams | vyse-only | - | Vision, creative brainstorming, dream journal |
| skill:projects | crew | - | Game dev projects (Skies of Arcadia) |
| skill:control-ui | crew | ✅ | Dashboard, metrics, OpenClaw status |
| skill:obsidian | crew | - | Vault, wikilinks, daily notes |
| skill:github | crew | - | Version control, git-sync, persistence |

| skill:alerts | crew | - | Message templates, notification patterns |
| skill:crew-protocols | vyse-only | - | Shared crew knowledge — decisions, reasoning, communication |
| skill:time | crew | ✅ | Timezone, scheduling, cron |
| skill:security | vyse-only | - | Hardening, permissions, boundaries |
| skill:scribe | crew | - | Knowledge management — wiki, gaps, org |
| skill:shipwright | crew | - | System health & maintenance — cron, cleanup |
| skill:subagent-creator | vyse-only | - | Template + pattern for building autonomous subagents |
| skill:skill-creator | vyse-only | - | Create, edit, audit skills — check existing first |
| skill:telegram-crew | crew | - | Telegram routing, topic bindings, crew mentions |
| skill:exec | crew | ✅ | Shell execution, sandbox, background processes |
| skill:web | crew | ✅ | Web search, fetch, browser automation |

## Usage
- Explicit: "load skill:name" or "focus: name"
- Implicit: Keyword detection (confidence >80%)
- Manual: "switch focus to..."

## Adding Skills
**Rule:** Only Vyse creates skills. Other crew members recommend; David approves.

When a pattern emerges:
1. Draft proposal (name, trigger, provides, why)
2. Vyse evaluates → creates `skills/name/SKILL.md`
3. Add to this index (categories auto-update in AGENTS.md)
4. David approves before activation