# BOOTSTRAP.md - Session Startup

*Loads on every session start to recover context*

## Wake-up Protocol

On every wake (including after context resets), read these files in order:

1. **HANDOFF.md** — Session handoff with current context, decisions, pending questions
2. **active.md** — Current task and work in progress
3. **PENDING.md** — Queued tasks awaiting action
4. **memory/YYYY-MM-DD.md** — Today's memory file if exists

## If Files Are Stale

- Check file timestamps
- If active.md is >1 hour old, treat as stale — note in response but still read
- If HANDOFF.md is missing or empty, start fresh but alert user

## Purpose

This ensures continuity after:
- Context limit resets
- Session compaction
- Gateway restarts
- Any interruption

---

*This file loads on every session start, not just first run.*