# Post-Migration Verification Checklist
## Post-Container Transfer Protocol

---

### ✅ Immediate Verification (Run Within 5 Min)

| # | Check | Command | Pass Criteria |
|---|-------|---------|---------------|
| 1 | Core files exist | `ls -la ~/*.md` | IDENTITY, USER, MEMORY, HEARTBEAT, SOUL present |
| 2 | Skills intact | `ls skills/ \| wc -l` | ≥25 skills |
| 3 | Memory files | `ls memory/*.md` | Archive + active files exist |
| 4 | KB crew docs | `ls kb/crew/ \| wc -l` | ≥15 crew docs |
| 5 | Session health | `openclaw status` | Sessions > 0, channel OK |
| 6 | Telegram test | Send message | Response received |

---

### ⚠️ Issues Found & Fixes

| Issue | Fix |
|-------|-----|
| HEARTBEAT.md stale | Refresh with current trading positions |
| No today's memory | Create `memory/2026-04-28.md` |
| Gateway pairing | Run `openclaw devices approve --latest` |

---

### 🔄 Scribe's Memory Safety Protocol (Existing)

1. **Before aggressive ops:** Checkpoint to memory
2. **After restart:** Verify memory/active.md exists
3. **On wake-up:** Read memory/active.md → memory/YYYY-MM-DD.md

*Reference: skills/scribe/SKILL.md*

---

### 📋 Pre-Migration Checklist (For Next Time)

- [ ] Run checkpoint: write to `memory/active.md`
- [ ] GitHub push: `git add -A && git commit -m "pre-migration" && git push`
- [ ] Export critical state to file
- [ ] Note gateway pairing status

---

### 📋 Post-Migration Checklist (This Time - COMPLETED)

- [x] Core files verified (IDENTITY, USER, MEMORY, HEARTBEAT, SOUL)
- [x] Skills count: 27 ✅
- [x] Memory archive verified
- [x] KB crew docs: 20 ✅
- [x] Session check via openclaw status
- [x] Telegram functional
- [ ] Fix HEARTBEAT.md (stale)
- [ ] Create today's memory file
- [ ] Approve gateway pairing

---

**Created:** 2026-04-27 18:25 PDT (David's time)
**Status:** Post-migration scan complete ✅
**Next Review:** Next container migration
