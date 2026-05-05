---
name: knowledge
description: Unified knowledge management - wiki, docs, obsidian vault, retrieval.
access: public
trigger phrases: "wiki, docs, knowledge, document, kb, obsidian, vault, notes, memory"

# Knowledge Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 14
- Sections: 6
- Subsections: 8
- Lines: 81 / 100 = 0
- Total: 6 + 8 + 0 = 14

## Knowledge Structure

```
kb/
├── system/      # System docs
├── stocks/      # Trading docs
├── skills/      # Skill docs
└── ...

memory/
├── 2026-04/    # Daily memory
├── audits/     # Drill results
└── ...
```

## Retrieval Protocol

### On-Demand
"What are our trading rules?"
→ Search kb/, find protocol
→ Deliver summary + source

### Proactive
- Learning something new → add to kb/
- Pattern emerges → create hub page

## Wiki Hub System

| Hub | Purpose |
|-----|---------|
| system | OpenClaw, gateway, config |
| stocks | Trading, positions |
| skills | Skill documentation |
| crew | Subagent configs (legacy) |

## Wikilinks
```
[[hubName]]           # Link
[[hubName|Display]]   # With display
[[hubName#Section]]   # To section
```

## Trigger Phrases
- "wiki", "docs", "knowledge"
- "obsidian", "vault"

### References
- learning - Improvement
- memory - Recall

