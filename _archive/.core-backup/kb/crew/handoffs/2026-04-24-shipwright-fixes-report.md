# Shipwright Handoff — Fixes & Known Issues

**Date:** 2026-04-24
**From:** Vyse
**To:** Shipwright

---

## Already Fixed (DO NOT REWORK)

### Cron Jobs Fixed
| Job | Issue | Fix Applied |
|-----|-------|--------------|
| Auto-Self-Improve | Timeout (3 errors) | 120s → 180s |
| Stock Price Monitor | Timeout (1 error) | 120s → 180s |
| Daily Git Push | Bad channel (`none`) | Changed to `telegram` |
| Vyse-Auto-Resume | Broken payload | Fixed systemEvent text |

### Jobs Disabled (Redundant)
- Auto-Resume-On-Wake
- Auto-commit Memory Changes  
- Memory GitHub Backup
- Daily Git Sync Check
- SEO Topic Research

### Config Fixed
- **contextTokens:** 60k → 100k (was causing 7 compactions/day)
- **Reason:** David pays flat $30/mo — optimize for function, not imaginary costs

### Git Exclusions
- memory/.dreams/ cache kept in git (recall index important)

---

## Active Cron Jobs (19 total)
- Quartermaster (30 min, stocks)
- Vyse-Unified-Health (5 min)
- Vyse-Auto-Resume (daily)
- Daily Git Push (3 AM)
- Auto-Self-Improve (30 min)
- Gateway Watch, Guard Context, etc.

---

## Principles (DO NOT BREAK)
1. **Core systems hands-off:** Don't touch openclaw.json context/compaction unless broken
2. **Change small → verify → rollback:** No refactoring for fun
3. **Only cut if it costs David USD:** He's on flat-rate, don't starve core

---

*Shipwright should focus on NEW issues, not rework these fixes.*