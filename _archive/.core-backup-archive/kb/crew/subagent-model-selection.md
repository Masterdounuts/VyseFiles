# Subagent Model Selection Guide

*Created 2026-04-27 - RON-Level Standard*

## The Rule
**Every subagent must have a preferred fast model** to prevent timeouts.

## Current Subagents

| Subagent | Preferred Model | Why | Status |
|----------|-----------------|-----|--------|
| **Quartermaster** | google/gemma-4-26b-a4b-it | Fast (1-3s), short prompts | ✅ RON |
| **Scribe** | google/gemma-4-26b-a4b-it | Fast (2-4s), git capable | ✅ RON |
| **Shipwright** | TBD | Needs testing | 🔜 |

## Model Speed Rankings

### Fast (Use for subagents)
| Model | Speed | Best For |
|-------|-------|----------|
| **gemma-4-26b-a4b-it** | ~1-3s | Trading, simple fetch |
| gemini-2.5-flash-lite | ~3-5s | Fallback for rate limits |

### Medium (Use for heavy tasks)
| Model | Speed | Best For |
|-------|-------|----------|
| minimax/m2.5 | ~10-15s | Complex reasoning |
| gemini-2.5-flash | ~5-10s | Research, heavy |

### Slow (Avoid for subagents)
| Model | Speed | Why |
|-------|-------|-----|
| gpt-oss-120b | ~30s+ | Too slow for subagents |

## How to Assign

When spawning a subagent:
```json
{
  "model": "google/gemma-4-26b-a4b-it",
  "fallbacks": ["google/gemini-2.5-flash-lite"]
}
```

## For Future Subagents

1. **Start with gemma** - it's the fastest
2. **Test with 10-15s timeout**
3. **If rate limited (429)** - add gemini fallback
4. **Keep prompts SHORT** - prevents timeouts

---

*This is the RON-level standard for all subagents*