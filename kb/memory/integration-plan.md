# Memory Integration Plan: Our System + Ron-Memory Ideas
**Full Implementation Guide**

*Goal: Solve compaction memory loss while staying simple and not hindering workflow.*

---

## Table of Contents
1. [Problems & Principles](#problems--principles)
2. [Current State](#current-state)
3. [Target Architecture](#target-architecture)
4. [Phase 1: Critical Memory (Week 1)](#phase-1-critical-memory-week-1)
5. [Phase 2: Trigger Detection (Week 2)](#phase-2-trigger-detection-week-2)
6. [Phase 3: Organized Retrieval (Week 3)](#phase-3-organized-retrieval-week-3)
7. [Phase 4: Integration Test (Week 4)](#phase-4-integration-test-week-4)
8. [Rollback Procedures](#rollback-procedures)
9. [What Could Go Wrong](#what-could-go-wrong)
10. [Success Metrics](#success-metrics)

---

## Problems & Principles

### Problems We're Solving

| Problem | Impact | Priority | Solution |
|---------|--------|----------|----------|
| Compaction loses details | Session refresh loses context | 🔴 High | memory/core/ loads first |
| Hard to find specific memories | Wasted time searching | 🟡 Medium | Organized folders |
| No auto-detection | Important info not saved | 🟡 Medium | Trigger detection |
| Too much in primary brain | Context overflow | 🟡 Medium | On-demand loading |

### Design Principles

1. **Non-destructive** - Never delete existing data
2. **Reversible** - Can roll back each phase
3. **Test-first** - Verify before adding more
4. **Minimal changes** - Only what's necessary
5. **GitHub backup** - No new external service

---

## Current State

### What Already Works

| Component | Status | Location |
|-----------|--------|----------|
| HANDOFF (session carry) | ✅ Working | scripts/*handoff*.sh |
| Context-aware save | ✅ Working | scripts/context-aware-save.sh |
| GitHub persistence | ✅ Working | Auto-push on commit |
| Memory files | ✅ Working | memory/2026-*.md |
| Recovery | ✅ Working | RECOVERY.md |

### What's Missing

| Gap | Impact |
|-----|--------|
| No critical memory that survives compaction | 🔴 High |
| No auto-detection of important info | 🟡 Medium |
| Flat memory structure | 🟡 Medium |

---

## Target Architecture

```
memory/                          ← Root (GitHub)
├── core/                        ← CRITICAL (loads FIRST)
│   ├── user.md                  → David's info
│   ├── goals.md                 → Ultimate goal
│   └── contacts.md              → Important people
│
├── active/                      ← Current session
│   ├── handoff.md               → What's being worked on
│   └── checkpoint.md            → Progress snapshot
│
├── daily/                       ← Day logs (existing → move)
│   ├── 2026-05-02.md
│   └── ...
│
└── archive/                     ← Old memories (organized)
    ├── projects/
    ├── skills/
    └── discoveries/
```

### How Memory Loading Works (After)

```
Session Start:
    1. Load memory/core/user.md      ← ALWAYS FIRST
    2. Load memory/core/goals.md     ← ALWAYS SECOND
    3. Load memory/active/handoff.md ← Current work
    4. Load daily/2026-05-02.md      ← Today's log
    
Context-Aware Save (every 5 min):
    → Save to memory/active/checkpoint.md
    
User says "remember that":
    → Detect trigger
    → Save to appropriate core/ file
```

---

## Phase 1: Critical Memory (Week 1)

### Goal
Create memory/core/ with essential info that survives compaction.

### Files to Create

```
memory/core/
├── user.md      (NEW)
├── goals.md     (NEW)
└── contacts.md  (NEW)
```

### Content: memory/core/user.md
```markdown
# User: David

- **Name:** David
- **Timezone:** PT (Pacific Time)
- **Background:** Military, using degree for Game Design
- **Current Project:** Skies of Arcadia fan remake
- **Communication Prefs:** 
  - Bullet points > walls
  - Proactive alerts > wait-and-see
  - Emojis OK
- **Trigger Phrases:**
  - "remember that" = save important info
  - "don't forget" = save as reminder
```

### Content: memory/core/goals.md
```markdown
# Ultimate Goal

**Primary:** "Help David during life, then help loved ones after"

**Milestones:**
- Foundation: Skills, memory, persistence (IN PROGRESS)
- Working: Reliable assistance to David
- Eternal: Help loved ones after David

**Current Focus:**
- Memory integration (this plan)
- Skill system working
- GitHub persistence active
```

### Content: memory/core/contacts.md
```markdown
# Important Contacts

**Who:** (To be filled by David)
- Family members who should be helped after
- Key people in David's life

*This section helps with the "loved ones after" goal.*
```

### Scripts to Modify

| Script | Change | Risk |
|--------|--------|------|
| session-start-handoff.sh | Add loading core/*.md first | Low |
| session-end-handoff.sh | Add saving to core/ | Low |

### Phase 1 Test Protocol

```
TEST: Session Refresh Recovery

1. Before: Note what's in memory/core/
2. Action: Force session refresh (or wait for natural)
3. After: Check if core/ info loaded
4. Verify: Can access user.md, goals.md info

Expected: Core memory loads in < 5 seconds
```

### Phase 1 Rollback

If issues:
```bash
# Remove core loading from session-start-handoff.sh
# Delete memory/core/ folder
# Restore original script
```

---

## Phase 2: Trigger Detection (Week 2)

### Goal
Auto-save important info when user mentions "remember that", etc.

### What to Add

1. **memory-save-core.sh** - Save to appropriate core/ file
2. **Trigger detection** in context-aware-save.sh

### Triggers to Detect (Minimal Set)

| Trigger | Save To | Example |
|---------|---------|---------|
| "my birthday" | user.md | "my birthday is X" |
| "my goal" | goals.md | "my goal is X" |
| "remember that" | contacts.md or daily/ | "remember that X" |
| "don't forget" | daily/ | "don't forget to X" |
| "important" | daily/ | "important: X" |

### Script: memory-save-core.sh

```bash
#!/bin/bash
# Save to core memory with auto-categorization

SOURCE="$1"
CONTENT="$2"

# Detect where it goes
case "$SOURCE" in
    user*)     FILE="memory/core/user.md" ;;
    goals*)    FILE="memory/core/goals.md" ;;
    contact*)  FILE="memory/core/contacts.md" ;;
    *)         FILE="memory/daily/$(date +%Y-%m-%d).md" ;;
esac

# Append with timestamp
echo "- $(date +%H:%M): $CONTENT" >> "$FILE"
echo "Saved to $FILE"
```

### Phase 2 Test Protocol

```
TEST: Trigger Detection

1. User says: "Remember that my birthday is December 25"
2. System: Detects trigger, extracts info
3. Check: memory/core/user.md has new entry
4. Verify: GitHub sync

Expected: Auto-save within 10 seconds
```

---

## Phase 3: Organized Retrieval (Week 3)

### Goal
Organize existing memories so they're findable.

### What to Move

```
memory/2026-05-01.md → memory/daily/2026-05-01.md
memory/2026-05-02.md → memory/daily/2026-05-02.md
```

### What NOT to Move
- memory/core/* (stays as-is)
- memory/active/* (stays as-is)

### Add Simple Search

Create memory-find.sh:
```bash
#!/bin/bash
# Quick search across all memory

QUERY="$1"
echo "Searching for: $QUERY"
grep -r "$QUERY" memory/core/ memory/daily/ memory/archive/ 2>/dev/null | head -20
```

### Phase 3 Test Protocol

```
TEST: Find Old Memory

1. Run: memory-find.sh "skill system"
2. Expected: Shows relevant entries
3. Verify: Results are accurate

Expected: Results in < 3 seconds
```

---

## Phase 4: Integration Test (Week 4)

### Full Test Protocol

```
TEST 1: Session Refresh
1. Session starts fresh
2. Check: Core memory loaded
3. Verify: Knows David's info

TEST 2: Trigger Detection  
1. User: "Remember that my favorite color is blue"
2. System: Saves to appropriate file
3. Verify: Entry exists

TEST 3: Memory Search
1. Run: memory-find.sh "birthday"
2. Expected: Finds David's birthday

TEST 4: GitHub Sync
1. Check: GitHub has all memory/core/ files
2. Verify: Can restore from GitHub alone
```

---

## Rollback Procedures

### Phase 1 Rollback
```bash
# 1. Remove core loading from session-start-handoff.sh
# 2. Keep memory/core/ (harmless)
# 3. No data lost
```

### Phase 2 Rollback
```bash
# 1. Remove trigger detection from context-aware-save.sh
# 2. Keep memory-save-core.sh (unused but harmless)
# 3. Existing saves remain
```

### Phase 3 Rollback
```bash
# 1. Move daily/ back to root
# 2. Keep search script (unused but harmless)
# 3. All data intact
```

### Full System Rollback
```bash
# Simply: Don't run git reset
# All phases are non-destructive additions
# Can always: git checkout earlier commit
```

---

## What Could Go Wrong

| Scenario | Impact | Prevention | Fix |
|----------|--------|------------|-----|
| Core memory overwrites user.md | Data loss | Append, never overwrite | Restore from GitHub |
| Trigger saves wrong file | Wrong location | Test each trigger | Manual move |
| GitHub sync fails | No backup | Check after each save | Manual push |
| Session can't start | Full block | Test before deploy | Use RECOVERY.md |
| Disk space full | Can't save | Monitor space | Clean old files |

### Critical Safety Rules

1. **Never overwrite** - Always append to memory files
2. **Always test** - Verify before next phase
3. **GitHub first** - Commit before major changes
4. **One phase at a time** - Don't rush

---

## Success Metrics

| Test | Target | Actual |
|------|--------|--------|
| Core memory loads on start | < 5 sec | ___ |
| Trigger detection works | 100% | ___ |
| Memory search finds info | < 3 sec | ___ |
| GitHub has all core/ | Yes | ___ |
| No data loss | Zero incidents | ___ |

---

## Implementation Timeline

| Week | Phase | Tasks | Done When |
|------|-------|-------|-----------|
| 1 | 1 | Create core/, modify handoff scripts | Core loads on start |
| 2 | 2 | Add trigger detection | Auto-save works |
| 3 | 3 | Organize folders, add search | Can find old memories |
| 4 | 4 | Full integration test | All tests pass |

---

## Dependencies

```
Phase 1 ──┬──→ Phase 2 (uses core/)
          │
          └──→ Phase 3 (uses core/)
                  │
                  └──→ Phase 4 (tests all)
```

**Note:** Phase 1 is foundation. Must work before Phase 2.

---

## Files Changed Summary

### Phase 1 (ADD only)
- NEW: memory/core/user.md
- NEW: memory/core/goals.md
- NEW: memory/core/contacts.md
- MOD: scripts/session-start-handoff.sh

### Phase 2 (ADD only)
- NEW: scripts/memory-save-core.sh
- MOD: scripts/context-aware-save.sh

### Phase 3 (MOVE + ADD)
- MOVE: memory/2026-*.md → memory/daily/
- NEW: scripts/memory-find.sh

### Phase 4 (TEST only)
- No file changes

---

## How This Solves Our Problems

| Problem | Solution |
|---------|----------|
| Compaction loses details | Core/ loads first, always recoverable |
| Hard to find memories | Organized folders + search |
| No auto-detection | Trigger detection |
| Context overflow | Load only core/ on start |

---

*Full plan complete. Ready for implementation.*
*Drafted: 2026-05-02*
*Based on Ron-Memory research + our existing system*
