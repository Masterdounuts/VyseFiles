[[kb/system/system|Home]]


# System Summary & Lessons Learned

## 1. Core System Architecture (how the pieces talk to each other)

- **Gateway daemon** (`openclaw gateway ...`) is the central API server. All CLI commands (`openclaw status`, `openclaw gateway restart`, etc.) hit this process via HTTP (default `localhost:18789`).
- **Cron scheduler** (`cron` folder + `openclaw cron …`) creates jobs that enqueue *system events* or *agent turns*.  Jobs are stored in the gateway’s SQLite DB and run on the heartbeat loop.
- **Scripts** in `workspace/scripts/` are invoked by cron jobs or manual exec.  They perform health‑checks, context monitoring, auto‑checkpoint, hand‑off summaries, etc.
- **Context & Compaction** – The session keeps a token budget. When the usage reaches ~60‑70 % of the configured `reserveTokens`, the **Session Compaction Protocol** (see `AGENTS.md`) triggers a compaction save (`pre‑compact-save.sh` → `compact-save.log`).  After compaction a config patch may bump `reserveTokens` (e.g. from 20000 → 25000) to avoid crashes.
- **Memory subsystem** – Files under `workspace/memory/` (daily logs, `active.md`, `decisions.md`, etc.) are the persistent knowledge store.  The assistant reads from them via `memory_search`/`memory_get` and writes back via normal file ops.
- **Hand‑off** – On session start `HANDOFF.md` is auto‑generated from the current portfolio and open questions.  It is used by the assistant to quickly re‑hydrate state.
- **Self‑monitoring** – Several watchdog scripts run via cron:
  - `gateway_watch.sh` checks HTTP health and restarts the gateway, notifying Telegram.
  - `context-monitor.sh` watches token usage and triggers compaction.
  - `auto‑self‑improve.sh` and `auto‑checkpoint.sh` periodically snapshot the workspace and push to Git.
- **Loop files** (`loop-lessons.md`, `loop-progress.md`, `loop-todos.md`) are a lightweight framework to track experimental loops (e.g., a “reset‑through‑loop” test).  They are plain markdown, not part of the core runtime.

## 2. Consolidated Lessons (what we’ve learned so far)

| # | Lesson | Source |
|---|--------|--------|
| 1 | **Always verify actual positions with David** – portfolio numbers were mis‑estimated (GGB 5 shares @ $4.26, TSLA $6.04) | `memory/.dreams/...`, `memory/2026-04-14.md` |
| 2 | **Reserve token floor too low caused crashes** – raising `reserveTokens` to 25000 fixed compaction failures. | `AGENTS.md` (Compaction Protocol), `memory/.dreams/...` |
| 3 | **Adding "just in case" behavior creates overhead** – avoid unnecessary safety nets that consume tokens. | `memory/.dreams/...` |
| 4 | **Cron job delivery requires numeric chat IDs** – earlier jobs used `@username` and failed. Fixed by setting `delivery.to` to numeric ID. | `FIXES.md` (Cron Job Telegram Delivery Fix) |
| 5 | **Gateway watch script path typo broke health checks** – extra space before `.sh` caused ENOENT. Fix by correcting script path. | `FIXES.md` (Gateway Watch Cron Path Bug) |
| 6 | **Web search plugin must be enabled** – DuckDuckGo disabled caused empty results. Enable in `openclaw.json`. | `FIXES.md` (Web Search Not Working) |
| 7 | **HTML does not survive Pandoc PDF conversion** – use LaTeX for centering, headings, etc. | `FIXES.md` (PDF Formatting Lessons) |
| 8 | **Price fetch for GGB works via CNBC quotes page** – use `https://www.cnbc.com/quotes/GGB`. | `FIXES.md` (GGB Stock Price Fetch Fix) |
| 9 | **Cron jobs should include `delivery.to`** for Telegram bots; otherwise messages are dropped. | `FIXES.md` (Cron Job Telegram Delivery Fix) |
|10| **Context‑monitor script prevents runaway token usage** – runs every 5 min, logs to `context-monitor.log`. | `scripts/context-monitor.sh` |
|11| **Auto‑checkpoint scripts keep workspace safe** – `auto-checkpoint.sh` runs on heartbeat and writes to `checkpoint.log`. | `scripts/auto-checkpoint.sh` |
|12| **Memory audit script cleans stale entries** – `memory_audit.sh` runs nightly. | `scripts/memory_audit.sh` |
|13| **Self‑improvement loop should be isolated** – use `subagents` or `sessions_spawn` for heavy work to avoid blocking main session. | General best practice from `SOUL.md` |
|14| **When a file is missing, scripts should fail gracefully** – added checks to Dream cron jobs. | `FIXES.md` (Dream Jobs Failing) |
|15| **Never hard‑code absolute paths in cron** – use `$HOME/.openclaw/...` or relative to workspace to survive migrations. | Observation from gateway‑watch bug |
|16| **Use `reserveTokens` config buffer** – keep a safety margin (e.g., 25 % of max tokens) to allow for compaction writes. | `AGENTS.md` (Session Compaction Protocol) |
|17| **Cron failures are logged in `cron-health.log`** – monitor this file for silent failures. | `logs/cron-health.log` |
|18| **The `hand‑off-summary.sh` script aggregates state for new sessions** – ensures continuity across restarts. | `scripts/hand‑off-summary.sh` |
|19| **Timestamps should be UTC in logs** – simplifies cross‑region reasoning. | General convention across logs |
|20| **Avoid excessive file reads in loops** – keep loop files tiny; reading whole directories repeatedly adds latency. | `loop-lessons.md` observations |
|21| **When using `openclaw gateway restart`, provide a human‑readable note via `gateway` tool** – ensures user sees the reason. | `gateway` tool docs |
|22| **Cron job `payload.kind` determines session target** – `systemEvent` → main session; `agentTurn` → isolated. | `cron` docs |
|23| **If a cron job fails, use the `failureAlert` config** to notify quickly. | `cron` schema |
|24| **Always test scripts in a sandbox before adding to cron** – prevents runaway loops. | General best practice |

## 3. How the System Interacts with Itself (Self‑Reference)

1. **Heartbeat Loop** – The gateway emits a heartbeat every few seconds.  The main session receives `HEARTBEAT_OK` if nothing is pending.  Cron jobs can listen for heartbeat events (`wakeMode: "next‑heartbeat"`).
2. **Compaction Trigger** – `context-monitor.sh` checks token usage; when it hits the configured threshold it writes a compaction request (`pre‑compact-save.sh`).  This creates a new system event that the main session processes, saving a snapshot and optionally patching config.
3. **Self‑Restart** – `gateway_watch.sh` monitors the gateway health endpoint.  On failure it runs `openclaw gateway restart` (a CLI command that talks to the same gateway process via its own HTTP API).  This is a self‑healing loop.
4. **Auto‑Checkpoint** – Periodic `auto‑checkpoint.sh` writes the current workspace state to a git repo.  The script runs via cron but also can be invoked manually; it uses the same `git` binary that the gateway process may also use for config backups, so they share the same repo.
5. **Memory‑Audit** – `memory_audit.sh` scans `workspace/memory/` for orphaned files and removes them, then emits a system event summarizing deletions.
6. **Decision‑Log** – `decision-log.sh` appends decisions made by the assistant to `memory/decisions.md`.  The assistant reads this file on start to rebuild context.
7. **Session Handoff** – On every new session the `hand‑off-summary.sh` script reads `HANDOFF.md` (generated from the previous session) and injects it into the new session’s prompt, ensuring continuity.
8. **Sub‑agent Orchestration** – When heavy tasks are needed (e.g., large web fetch, PDF generation), the assistant spawns a sub‑agent (`sessions_spawn`) which runs in isolation but can send a system event back to the main session, allowing the main session to remain responsive.

## 4. Action Items (to cement this knowledge)

- **Create a permanent reference**: the file `system_summary.md` (this file) will be kept in the workspace root and added to the memory index on next checkpoint.
- **Add a short entry to `memory/2026-04-17-system-overview.md`** so future sessions can quickly locate the overview.
- **Update the compaction config** to keep a 30 % token buffer (already at 25000, but note in `openclaw.json`).
- **Ensure all cron jobs have correct script paths** – run a quick audit with `grep -R "\.sh" workspace/cron` and fix any stray spaces.
- **Schedule a weekly reminder** (via cron) to review `system_summary.md` and prune any outdated lessons.

---
*Generated by Vyse on 2026‑04‑17 14:30 UTC*