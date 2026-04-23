# Skills Index

## Available Skills

| Skill | Description |
|-------|-------------|
| skill:workflow | How Vyse works — core files, status system, wake-up flow |
| skill:trading | Quartermaster config, thresholds, workflow (stocks) |
| skill:system | Debugging, recovery, FIXES, health checks |
| skill:memory | Recall system, checkpoints, context management |
| skill:dreams | Vision, creative brainstorming, dream journal |
| skill:projects | Game dev projects (Skies of Arcadia) |
| skill:control-ui | Dashboard, metrics, OpenClaw status |
| skill:obsidian | Vault, wikilinks, daily notes |
| skill:github | Version control, git-sync, persistence |
| skill:alerts | Message templates, notification patterns |
| skill:crew-protocols | Shared crew knowledge — decisions, reasoning, communication |
| skill:time | Timezone, scheduling, cron |
| skill:security | Hardening, permissions, boundaries |
| skill:subagent-creator | Template + pattern for building autonomous subagents |
| skill:skill-creator | Meta-skill for creating new skills (system-provided) |

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