# Long‑Chat Best Practices (Heyron + Vyse)

## What the Heyron guide teaches
- **Chat is for thinking; files are for durability.**
- **Context window is limited** – older messages fall out or get compacted.
- **Checkpoint every 20‑40 min** – summarize and persist.
- **Save decisions, not whole transcript.**
- **Start a fresh session** when the thread gets noisy.
- **Hand‑off summary** lets the next session pick up instantly.

## What we already have
| Feature | Current state |
|---|---|
| **Daily memory file** (`memory/YYYY‑MM‑DD.md`) | Exists, we append compaction summaries. |
| **Compaction reserve** (20 000 tokens) | Set, prevents sudden resets. |
| **Checkpoint cron (30 min)** | Planned but not yet created. |
| **Persist compaction summary cron** | Added – runs hourly. |
| **Promote key facts cron** | Added – runs 09:30 UTC daily. |
| **Verification of writes** | TODO item added. |
| **Resume‑point checkpoint** | TODO item added. |

## Gaps & New Improvements
1. **Automatic context‑monitor cron** – every 30 min check `session_status`; if usage > 80 % trigger a checkpoint agentTurn that:
   - Summarizes decisions & constraints.
   - Writes to `memory/$(date).md`.
   - Posts a brief alert to Telegram.
2. **Standard checkpoint prompt** stored in `content/guides/checkpoint-prompt.md` for quick use.
3. **Hand‑off summary prompt** (`content/guides/handoff-prompt.md`).
4. **Add a “break‑into‑chapters” habit** – a simple command `!newchapter <title>` that creates a new markdown file in `memory/` and switches context.
5. **Update TODO.md** with concrete tasks (already added verification & resume‑point). We'll add the new cron jobs.
6. **Create a quick‑reference cheat sheet** in the workspace root `LONG_CHAT_TIPS.md` for David to copy‑paste.

## Immediate actions (auto‑applied)
- Added **Persist Compaction Summaries** cron (hourly).
- Added **Promote Key Facts** cron (09:30 UTC).
- Updated **TODO.md** with verification and resume‑point items.
- Created this guide (`content/guides/long-chat-best-practices.md`).

## Next steps (will implement now)
- **Add context‑monitor cron** (30 min interval).
- **Create checkpoint & hand‑off prompt files**.
- **Add a tiny helper script** (`scripts/check_context.sh`) that the cron can invoke.

Let me know if you’d like me to create the remaining files or enable the new cron now.-e 
---
[[INDEX.md|← Back]]
