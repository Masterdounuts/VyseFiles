# The Learning Loop - How the Crew Learns

*Designed: 2026-05-05*

## The Problem

Currently:
```
Quartermaster learns trade insight → Forgets
Shipwright learns fix → Forgets
Vyse learns preference → Forgets
```

**Result:** knowledge.md stays empty, we repeat mistakes.

---

## The Solution: Learning Loop

### Three Triggers for Learning

| Trigger | Who | When | Action |
|---------|-----|------|--------|
| **Success** | Any crew | Something works well | Store what worked |
| **Failure** | Any crew | Something breaks | Store root cause + fix |
| **Correction** | Vyse | David corrects me | Store what was wrong |

### Storage Format (Uniform)

Every learning goes to `kb/crew/knowledge.md`:

```markdown
## 2026-05-05

### From [Source: quartermaster/shipwright/vyse]
- **Type:** [success/failure/correction]
- **Learned:** [What happened]
- **Apply:** [When to use this]
- **Evidence:** [Proof it works/fails]
```

---

## The Learning Workflow

### Step 1: Capture (Real-Time)
When ANY crew member has a learning moment:
1. Pause briefly
2. Format as entry
3. Append to knowledge.md

### Step 2: Acknowledge (Same Session)
Tell the crew about it:
- "Stored: Quartermaster learned X"

### Step 3: Retrieve (When Needed)
When facing similar situation:
- Search knowledge.md first
- Apply the learning

### Step 4: Audit (Weekly - Scribe's Job)
Scribe reviews knowledge.md:
- Remove stale entries
- Cross-reference with other kb/ files
- Flag gaps

---

## Who's Responsible

| Role | Responsibility |
|------|----------------|
| **Quartermaster** | Store trade learnings: "support at -7%", "ride the spike" |
| **Shipwright** | Store fix learnings: "restart fixes cron", "check logs first" |
| **Scribe** | Organize, retrieve, audit knowledge.md |
| **Vyse** | Enforce the loop, store my own learnings |

---

## Example Entries

### Trade Learning
```markdown
## 2026-05-05

### From quartermaster
- **Type:** success
- **Learned:** Selling half at +12% and holding half captured profit while letting runner ride
- **Apply:** When position hits +12% target
- **Evidence:** NRXP trade 2026-05-04
```

### Fix Learning
```markdown
## 2026-05-05

### From shipwright
- **Type:** failure → fixed
- **Learned:** Context monitor timeout - script took too long
- **Apply:** When running background jobs, keep under 30 seconds
- **Evidence:** cron job context-monitor timed out 24x
```

### Preference Learning
```markdown
## 2026-05-05

### From vyse
- **Type:** correction
- **Learned:** David prefers TL;DR first, then bullets
- **Apply:** Every response to David
- **Evidence:** "Give me the headline first"
```

---

## Integration Points

### In Quartermaster's System Prompt
Add at end:
```
## Learning
After EACH trade decision, ask: "Did I learn anything?"
If yes → Store to kb/crew/knowledge.md
```

### In Shipwright's System Prompt
Add at end:
```
## Learning
After EACH fix, ask: "Did I learn anything?"
If yes → Store to kb/crew/knowledge.md
```

### In Vyse's Workflow
Add to crew-protocols:
```
## Learning Loop
1. After any significant action, check: learn anything?
2. If yes → format and store immediately
3. Tell crew what was stored
4. Next similar situation → retrieve first
```

---

## Testing the Loop

First test - add an entry NOW:

```markdown
## 2026-05-05

### From vyse
- **Type:** correction
- **Learned:** The crew has no learning workflow - knowledge.md is empty
- **Apply:** When setting up any new crew member
- **Evidence:** Scribe audit showed only 1 test entry
```

---

*This loop ensures we never repeat the same mistake twice.*