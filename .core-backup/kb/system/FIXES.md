# FIXES.md - Known Issues & Resolutions

*Ship's known issues and how to fix them (2026-04-27)*

---

## Known Issues

| Issue | Status | Severity | Notes |
|-------|--------|----------|-------|
| RPC Probe Timeout | 🟡 Watching | Medium | Gateway runs but RPC times out |
| Cron/Sessions Hang | 🟡 Watching | Medium | Commands sometimes hang |

---

## Resolutions Applied

| Date | Issue | Fix |
|------|-------|-----|
| 2026-04-26 | Cron Telegram errors | Fixed recipient chat_id |
| 2026-04-26 | Cron timeouts | Increased to 180s |
| 2026-04-26 | Session Cleanup broken | Changed to native command |
| 2026-04-26 | Bad cron jobs | Removed 5 errored jobs |

---

## Watch List

| Issue | What to Watch |
|-------|---------------|
| Gateway RPC | If port open but RPC fails |
| Command hangs | Use timeout on exec |

---

*Last Updated: 2026-04-27*
*Shipwright tracks all fixes here*