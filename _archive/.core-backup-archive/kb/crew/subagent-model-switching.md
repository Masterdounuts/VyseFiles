# Subagent Model Switching Protocol

*Updated 2026-04-27*

## Rule: If Slow, Switch Model

**If your current model is taking too long (>15s), try a different model.**

### Available Models (in order of preference for speed):
1. **gemma-4-26b** - Fastest ✅ (use first)
2. **gemini-2.5-flash-lite** - Medium (web search needs API key)
3. **minimax-m2.5** - Slower but thorough (may timeout)

### Model Personalities:
| Model | Speed | Best For |
|-------|-------|----------|
| gemma-4-26b | ⚡⚡⚡ | Quick yes/no, binary choices |
| gemini-2.5-flash-lite | ⚡⚡ | Research, analysis |
| minimax-m2.5 | ⚡ | Complex reasoning |

### Timeout Guidelines:
- Simple question: 15-20s
- Research task: 30-45s
- If timeout → retry with different model

---

*Protocol set by Captain David*