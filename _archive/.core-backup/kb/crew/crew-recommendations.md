# Crew Recommendations - Evaluation

*Evaluating each recommendation for implementation*

---

## ✅ Can Implement Now

| # | Recommendation | Status | How |
|---|----------------|--------|-----|
| 1 | **Check kb/ before web_search** | ✅ Already in drills | Use Brain drill consistently |
| 2 | **Check FIXES.md before fixing** | ✅ Easy win | Add to workflow |
| 3 | **Pull on wake, push on done** | ✅ Partial | Strengthen existing |
| 4 | **Check positions before trading calls** | ✅ Easy | Read HEARTBEAT.md first |
| 5 | **Ask crew before external requests** | ✅ Good practice | Add to decisions |
| 6 | **Alert me on threshold moves** | ✅ Already doing | Just be consistent |
| 7 | **Ask for opportunity assessment** | ✅ Easy | Check with Quartermaster first |
| 8 | **Proper commit tags** | ✅ Already doing | enhance/fix/add/docs |

---

## 🔄 Implemented Strengthened

### 1. Check kb/ before web_search

**Current:** Brain drill exists but not always used
**Strengthened:** Always use memory_search first
```bash
# Before ANY web_search, do:
memory_search("your topic")
# If nothing found, THEN web_search
```

### 2. Check FIXES.md before fixing

**Current:** Could be more consistent
**Strengthened:** Add to workflow check
```
When about to fix something:
1. Read kb/system/bootstrap/FIXES.md
2. memory_search("fix for X")
3. If found → use it
4. If not → figure out new fix → Document it
```

### 3. Pull on wake, push on done

**Current:** git-pull.sh exists, auto-push on skills/
**Strengthened:** Make this mandatory
- Wake: Always run git-pull.sh first
- Done: Always have Scribe commit & push

### 4. Check positions before trading calls

**Current:** HEARTBEAT.md exists but not always read
**Strengthened:** Read HEARTBEAT.md on every wake
- Check PFE position, cost basis
- Know cash available
- Check active stocks

### 5. Ask crew before external

**Current:** Could ask more
**Strengthened:** Before any external (web_search, web_fetch), ask:
- "Scribe, any knowledge on X?"
- "Shipwright, any issues with Y?"
- "Quartermaster, what's Z trading at?"

---

## Implementation Plan

### Add to Wake-Up Flow (workflow skill)

```markdown
## Wake-Up Checklist

- [ ] Pull from GitHub (Scribe: run git-pull.sh)
- [ ] Read HEARTBEAT.md (positions, cash)
- [ ] Check TODO.md, active.md, PENDING.md
- [ ] memory_search before web_search
- [ ] Check FIXES.md before fixing
- [ ] Ask crew before external requests
```

---

## Summary

| Category | Count | Action |
|----------|-------|--------|
| ✅ Implemented | 8 | All recommendations can be done |
| 🔄 Strengthen | 5 | Make existing habits more consistent |
| 🟡 Ongoing | 1 | Weekly health check (Shipwright) |

**Verdict:** All crew recommendations are implementable. Just need to be more consistent with existing practices.