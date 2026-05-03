# Available Models

## Current Models (Apr 27, 2026)

| Model | Provider | Context | Best For |
|-------|----------|---------|----------|
| **minimax/m2.5** | OpenRouter | 128k | Default - fast, reliable |
| **gemini-2.5-flash-lite** | Google | 128k | Heavy tasks - won't timeout |
| **gemini-2.5-flash** | Google | 1M | Large context tasks |
| **gemma-4-26b-a4b-it** | Google | 200k | Lightweight tasks |

⚠️ **EXCLUDED:** `openai/gpt-oss-120b` - multiple issues, avoid using

## Model Selection Protocol

### 1. Default: minimax/m2.5
Use for: Quick tasks, chat, simple queries

### 2. Heavy Tasks: gemini-2.5-flash-lite
Use for: 
- Ship audits (multiple agent checks)
- Large session analysis
- Long-running operations
- When minimax times out

### 3. Test for Timeout Issues
If minimax times out:
1. Note the task type
2. Try gemini-2.5-flash-lite
3. If it works, document the pattern
4. **Switch back to minimax after**

### 4. Large Context: gemini-2.5-flash
Use for:
- Processing large files
- Deep analysis with history

## Testing New Models

To test a model for a specific task:

```javascript
sessions_spawn({
  task: "Your task here",
  model: "google/gemini-2.5-flash-lite",  // Test this model
  timeoutSeconds: 120
})
```

**After testing:**
- If successful: Keep using for that task type
- Always switch back to minimax for normal tasks

## Model Performance Notes

| Model | Speed | Reliability | Notes |
|-------|-------|-------------|-------|
| minimax-m2.5 | Fast | ⚠️ Times out on heavy | Default |
| gemini-flash-lite | Medium | ✅ Reliable | Use for heavy |
| gpt-oss-120b | ❌ | ❌ Excluded | Multiple issues |
| gemini-flash | Fast | ✅ | 1M context |
| gemma-4 | Fast | ? | Lightweight |

---

*Last updated: 2026-04-27*
*Excluded: gpt-oss-120b (Apr 27, 2026)*