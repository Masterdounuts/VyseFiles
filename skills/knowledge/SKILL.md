name: knowledge
description: Unified knowledge management - wiki, docs, obsidian vault, retrieval. Combines scribe + obsidian.
trigger phrases: "wiki, docs, knowledge, document, kb, obsidian, vault, notes, scribe, memory"
access: crew

# Knowledge Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Primary (100 max)

### Current: Level 18
- Sections: 6
- Subsections: 8
- Lines: 128 / 100 = 1
- Total: 6 + 8 + 1 = 15

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
| crew | Subagent configs |

## Wikilinks
```
[[hubName]]           # Link
[[hubName|Display]]   # With display
[[hubName#Section]]   # To section
```

## Trigger Phrases
- "wiki", "docs", "knowledge"
- "obsidian", "vault", "scribe"

### References
- learning - Improvement
- memory - Recall