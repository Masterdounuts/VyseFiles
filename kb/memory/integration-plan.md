# Memory Integration Plan: Our System + Ron-Memory Ideas

**Goal:** Solve compaction memory loss while staying simple and not hindering workflow.

---

## Problems We're Solving

| Problem | Impact | Priority |
|---------|--------|----------|
| Compaction loses details | Session refresh loses context | 🔴 High |
| Hard to find specific memories | Wasted time searching | 🟡 Medium |
| No auto-detection | Important info not saved | 🟡 Medium |
| Too much in primary brain | Context overflow | 🟡 Medium |

---

## Design Principles

1. **Optional/gradual** - Add without breaking existing
2. **Use GitHub** - Our eternal backup, no new service
3. **Keep simple** - Don't over-engineer
4. **Actually helpful** - Must solve real problems
5. **Test first** - Verify before adding more

---

## Proposed Architecture

```
memory/
├── core/                    ← CRITICAL: survives everything
│   ├── user.md             → David's info (birthday, prefs)
│   ├── goals.md            → Ultimate goal, milestones
│   └── contacts.md         → Family, important people
│
├── active/                  ← Current session work
│   ├── handoff.md          → What I'm working on
│   └── checkpoint.md       → Progress snapshot
│
├── daily/                   ← Day-by-day logs (existing)
│   ├── 2026-05-02.md
│   └── ...
│
└── archive/                 ← Old memories, searchable
    ├── projects/
    ├── skills/
    └── discoveries/
```

---

## Implementation Phases

### Phase 1: Critical Memory (Week 1)

**Goal:** Save what matters most from compaction.

**What:**
- Create memory/core/ folder
- Add David's key info (user.md)
- Add ultimate goal (goals.md)
- These load FIRST on every session

**Files:**
- memory/core/user.md - David's birthday, timezone, prefs
- memory/core/goals.md - "Help David during life → loved ones after"

**Why:**
- If everything else fails, this survives
- Compacted sessions can recover from here

---

### Phase 2: Trigger Detection (Week 2)

**Goal:** Auto-save important info user mentions.

**What:**
- Add simplified trigger detection
- Check for phrases like "remember that", "important"

**Triggers to detect:**
- "remember that"
- "don't forget"
- "important"
- "my birthday"
- "my goal"

---

### Phase 3: Organized Retrieval (Week 3)

**Goal:** Find memories quickly.

**What:**
- Organize memory/ by category
- Add simple search index

---

### Phase 4: Integration Test (Week 4)

**Goal:** Verify the system works.

---

## What We KEEP

- ✅ HANDOFF scripts
- ✅ Context-aware-save.sh
- ✅ GitHub push on commits
- ✅ Existing memory files

---

## What We ADD

- 📁 memory/core/ folder
- 🔍 Trigger detection
- 📂 Organized folders

---

## Next Steps

1. **Approve this plan?** (David)
2. **Start Phase 1** - Create memory/core/
3. **Test** - Verify recovery works
4. **Iterate** - Adjust

---

*Drafted: 2026-05-02*
