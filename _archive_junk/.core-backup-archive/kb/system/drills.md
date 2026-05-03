# Skill Drills

*Practice routines to level up skills*

## Current Drill Types

### 1. Cross-Pollination Drill (Passive)
- **What:** When any skill levels up → check cross-reference matrix
- **Trigger:** After any skill change
- **Owners:** All skills

### 2. Self-Audit Drill
- **What:** Review own skill file, check for gaps
- **Trigger:** Weekly (Sunday)
- **Owners:** skill-creator, vyse-core

### 3. Subagent Drill
- **What:** Test each subagent wakes with correct "Start Here"
- **Trigger:** Weekly
- **Owners:** shipwright, scribe, quartermaster

### 4. Brain Drill
- **What:** memory_search before any research
- **Trigger:** Before web_search
- **Owners:** All skills

### 5. Communication Drill
- **What:** Use status prefixes on EVERY action
- **Trigger:** Always
- **Owners:** crew-protocols

### 6. GitHub Drill
- **What:** Search GitHub before asking David anything
- **Trigger:** When unsure
- **Owners:** github, memory

---

## Drill Schedule

| Day | Drill | Frequency |
|-----|-------|-----------|
| Daily | Brain Drill | Every research |
| Daily | Communication Drill | Every action |
| Daily | GitHub Drill | When unsure |
| Weekly | Self-Audit | Sunday |
| Weekly | Subagent Drill | After cron runs |

---

## How Drills Level Skills

| Drill | Can Level |
|-------|-----------|
| Brain Drill | memory, scribe |
| Self-Audit Drill | vyse-core, skill-creator |
| Subagent Drill | subagent-creator, shipwright |
| Communication Drill | crew-protocols |
| GitHub Drill | github, memory |

---

*Drills run implicitly - no separate cron needed*