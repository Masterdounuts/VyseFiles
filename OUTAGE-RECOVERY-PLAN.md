# Data Protection & Outage Recovery Plan
## Post-April 28 Container Migration

---

## 🔴 Critical Files (Must Always Preserve)

| Priority | File | Why |
|----------|------|-----|
| P0 | `IDENTITY.md` | My personality/who I am |
| P0 | `USER.md` | Your preferences & context |
| P0 | `MEMORY.md` | Long-term memory pointers |
| P0 | `HEARTBEAT.md` | Trading positions/state |
| P1 | `SOUL.md` | Core principles |
| P1 | Skills in `skills/` | My capabilities |
| P2 | `memory/*.md` | Daily context files |
| P2 | `kb/crew/*` | Crew protocols |

---

## 🛡️ Current Protections

1. **GitHub Sync** — Workspace syncs to GitHub (configured in skills/github)
2. **Memory Plugin** — Vector store + FTS for searchability
3. **Daily Memory** — `memory/YYYY-MM-DD.md` files created daily

---

## ⚠️ Gaps Identified

| Gap | Risk | Fix |
|-----|------|-----|
| No automated pre-migration checkpoint | Data in RAM could be lost | Add pre-migration checkpoint trigger |
| HEARTBEAT.md not auto-refreshed | Stale trading data | Daily refresh at UTC midnight |
| No "critical files" backup list | Unclear what matters most | Document above (P0/P1/P2) |
| Gateway pairing not persistent | Post-reboot re-pairing needed | Document approval command |

---

## ✅ Recommended Actions

1. **Pre-Migration Checklist:**
   - [ ] Run checkpoint to `memory/active.md`
   - [ ] Push GitHub sync
   - [ ] Export HEARTBEAT.md to file
   - [ ] Note gateway pairing status

2. **Post-Migration Verification:**
   - [ ] Scan core files (IDENTITY, USER, MEMORY, HEARTBEAT)
   - [ ] Verify skills present
   - [ ] Check session count
   - [ ] Test Telegram

3. **Ongoing Improvements:**
   - Daily HEARTBEAT.md refresh (shipwright cron)
   - Weekly full brain backup to GitHub
   - Document recovery steps in `skills/system/`

---

## 📋 Quick Recovery Command
```bash
# If I'm unresponsive after migration:
openclaw devices approve --latest
openclaw status
# Then verify:
ls -la ~/workspace/*.md
```

---

*Plan created: 2026-04-27 18:19 PDT (David's time)*
*Status: Draft — awaiting Scribe review*
