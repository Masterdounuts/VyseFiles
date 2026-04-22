# Obsidian AI Workflow Research

[[knowledge|← Knowledge]]

**Researched:** Tue 2026-04-21 06:19-06:24 UTC

## Relevant AI+Obsidian Tools

| Tool | What It Does | Relevance |
|------|--------------|-----------|
| **Khoj** | Self-hosted AI second brain, custom agents, automations | High - could embed AI |
| **Obsidian-Skills** | Teach agents to use Markdown, JSON, Canvas | Medium - agent training |
| **Claudian** | Embed Claude Code directly in Obsidian | High - unified AI |
| **Smart Connections** | Chat with notes using AI embeddings | High - semantic search |

## Current Setup vs. Best Practices

| Aspect | Our Setup | Obsidian Best Practice | Gap |
|--------|-----------|------------------------|-----|
| **Sync** | Manual cron scripts (git push) | Obsidian Git plugin (auto) | Manual |
| **AI Chat** | Separate OpenClaw session | Embedded in Obsidian (Claudian) | Disconnected |
| **Linking** | File paths | `[[wikilinks]]` | Not implemented |
| **Search** | grep + memory_search | AI embeddings (Smart Connections) | Basic |
| **Templates** | ad-hoc | Dataview + frontmatter | Partial |
| **Daily Notes** | memory/*.md | Consistent format with tags | Inconsistent |

## Recommended Improvements

### 🔴 High Priority
1. **Add frontmatter to daily notes** — enables Dataview queries, better search
2. **Switch to `[[wikilinks]]`** — faster linking, graph view support

### 🟡 Medium Priority
3. **Enable Obsidian Git plugin** — auto-sync, reduce manual cron reliance
4. **Add decision index** — cleaner decision tracking with backlinks

### 🟢 Low Priority
5. **Explore Khoj** — self-hosted AI agent embedded in vault
6. **Smart Connections** — semantic search across notes

## Existing Assets
- `/obsidian-prototype/` — templates already created (2026-04-20)
- `MIGRATION.md` — integration guide in prototype folder

## Next Steps (when ready)
1. Add YAML frontmatter to memory/2026-04-21.md format
2. Test Obsidian Git plugin on local vault
3. Convert existing [[links]] in prototype
4. Decide on Khoj/Claudian integration

---
*Research by Vyse — 2026-04-21*