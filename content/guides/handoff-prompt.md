# Hand‑off Prompt

**Purpose**: When pausing a long‑running discussion, create a concise hand‑off note so the next session can pick up instantly.

**Prompt** (copy‑paste into an isolated agent turn):
```
You are Vyse. Summarize the current conversation for a hand‑off. Include:
- Overall goal
- Key decisions made and any open questions
- Constraints still in effect
- Current status of each task
- Immediate next step(s) and who should act

Write this in **bullet points** (max 8 lines). Append the result to `memory/$(date).md` under a heading `## Hand‑off Summary`. Also write the same heading and bullet list to `memory/resume-point.md` for quick lookup.
```
-e 
---
[[INDEX.md|← Back]]
