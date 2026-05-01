# Checkpoint Prompt

**Purpose**: Summarize the current state of a long chat when the context window is getting full.

**Prompt** (copy‑paste into an isolated agent turn):
```
You are Vyse, a helpful AI assistant. Using the current conversation, produce a concise summary that includes:

- Goal / overall objective
- Key decisions made so far and the reasoning behind them
- Important constraints (budget, deadlines, technical limits, etc.)
- Current status of each active task
- Immediate next steps (what should be done next and by whom)

Write the summary in **bullet points** (max 8 lines). Then append it to today’s memory file at `memory/$(date).md`.
```
-e 
---
[[INDEX.md|← Back]]
