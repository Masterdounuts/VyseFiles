# Quartermaster Workflow

*Updated 2026-04-27*

## Research Protocol

### Old (Broken)
- Quartermaster tries to web search directly → timeout ❌
- Too complex for subagent

### New (Fixed)
- Quartermaster asks Vyse for research ✅
- Vyse does web research via Yahoo + User-Agent header
- **Vyse uses gemma-4-26b model for speed (1-3s responses)**
- **Vyse ensures prompts are SHORT to prevent timeouts**
- Vyse feeds Quartermaster the data
- Quartermaster makes decision & executes

## First Mate (Vyse) Role
- Handle all web/API calls
- Fetch prices, news, data using Yahoo + User-Agent header
- Present findings to Quartermaster
- Quartermaster then executes

## This applies to ALL subagents
Any subagent needing web/research → go through First Mate first.

---

*Protocol set by Captain David*