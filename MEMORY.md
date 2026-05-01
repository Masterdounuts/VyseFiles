# MEMORY.md - Long-Term Storage

*See `memory/archive/` for full content. Load via read when needed.*

## Quick Access
- Today's memory: `memory/2026-04/2026-04-27-daytime.md` (daytime)
- Archive: `memory/archive/`
- Trading protocols: `kb/crew/quartermaster-*.md`

## Memory System
- Primary brain: HEARTBEAT. md (active)
- Second brain: memory/*.md (Scribe manages)
- Old active. md: memory/2026-04-26-active. md

*Load from memory/ files when needing past context*
---

## Time Standard (IMPORTANT)

**All timestamps use David's timezone: PT (Pacific Time, PDT)**

| Setting | Value |
|---------|-------|
| Timezone | ET (Eastern Time, UTC-5/UTC-4) |
| Date Format | YYYY-MM-DD |
| Time Format | HH:MM ET |

**Why:** Ensures consistency when rebuilding from backup.


## Promoted From Short-Term Memory (2026-05-01)

<!-- openclaw-memory-promotion:memory:memory/2026-04/2026-04-16.md:1678:1683 -->
- | **Create/verify `auto‑checkpoint.sh`** – script that (1) runs `session_status`, (2) extracts the current context percent, (3) writes a short “checkpoint” summary (goal, decisions, next step) to `memory/$(date).md`. | `write` (create script) | Guarantees the existing “Frequent Checkpoint” cron actually does something useful. | | **Add a “Context‑Monitor” cron** (run every 5 min). Payload: `session_status` → if `Context % > 80` then (a) send Telegram alert, (b) invoke the hand‑off script. | `cron add` | Proactively warns before the context limit is hit. | | **Create a “hand‑off‑summary.sh” script** that reads the latest checkpoint file, appends a “Next steps” bullet list, and writes to `memory/hand‑off-$(date).md`. | `write` | Supplies the “fresh‑chat” summary the guide recommends. | | **Add a “Fresh‑Chat Trigger” cron** (or reuse the Context‑Monitor) that, when the threshold is crossed, calls `hand‑off‑summary.sh` and optionally pauses the “Frequent Checkpoint” job. | `cron add` | Automates the “start fresh” habit. | | **Consolidate gateway‑health‑check** – keep only one robust job, remove the duplicated broken ones (`gateway-health-check` with wrong `chat_id`). | `cron remove` (for the broken IDs) | Reduces noise and prevents repeated errors. | | **Fix Credit‑Watch job** – add the proper Telegram chat ID (`8742211590`) to its delivery config. | `cron update` | Stops the “Delivering to Telegram requires target <chatId>” error. | [score=0.802 recalls=4 avg=0.630 source=memory/2026-04/2026-04-16.md:1678-1683]
