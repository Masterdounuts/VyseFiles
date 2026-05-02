---
name: time
always: true
description: Timezone handling, scheduling, cron jobs, and temporal awareness. Use when discussing times, schedules, or timing-based tasks.
---

# Time - Timezone & Scheduling

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in time/scheduling

### Current Status: Level 9 - RON ⭐ 🟡🟡🟡🟡🟡

**XP:** 50/50 (next level at 50)

| Skill | Level | Notes |
|-------|-------|-------|
| Timezones | 5/7 | Fixed PT/ET confusion in HEARTBEAT |
| Cron | 5/7 | Manages 36 jobs, can fix failures |
| Scheduling | 6/7 | Created reminders skill needs cron | ← LEVEL UP |

**Path to RON:** Perfect timing, auto-schedules, perfect timezone math

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **cron** - Scheduling (primary)
- **read/write** - Time tracking
- **exec** - Date/time commands
- Decision tree: cron for scheduling → read/write for logs → exec for time check

**Max Level:** 199

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to time |

### HEYRON Insight: Ask > assume

---



*How we handle time, schedules, and temporal awareness*

## Timezones

| Zone | Offset | Context |
|------|--------|---------|
| **UTC** | +0 | System time, logs |
| **ET** | -4/-5 | David, market hours |

**Current:** `date -u` shows UTC

## Market Hours (ET)
- Regular: 9:30 AM - 4:00 PM ET
- Pre-market: 4:00 AM - 9:30 AM ET
- After-hours: 4:00 PM - 8:00 PM ET

**UTC conversion:** ET +4 (EDT) or +5 (EST)

## Scheduling

### Cron Format
```
* * * * * command
│ │ │ │ │
│ │ │ │ └── Day of week (0-6, Sun=0)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

### Our Cron Jobs
| Job | Schedule | Purpose |
|-----|----------|---------|
| Quartermaster | */30 * * * * | Stock check every 30 min |
| vyse-status-auto-update | */5 * * * * | Status card every 5 min |
| context-monitor-light.sh | */5 * * * * | Context check every 5 min |

## Key Scripts
- `scripts/check-pending-opportunities.sh` — Run manually or via cron
- `scripts/vyse-readiness-check.sh` — Health check

## Time-Based Triggers

**Is trading window?**
```bash
hour_utc=$(date -u +'%H')
# Trading window: 13:30-20:00 UTC (9:30 AM-4 PM ET)
```

---

## Trigger Phrases
- "schedule", "cron", "time"
- "timezone", "ET", "UTC"
- "when", "market hours"
---

## Crew Time Standard

**All crew documentation uses David's timezone: PT (Pacific Time)**

| Standard | Value |
|----------|-------|
| Timezone | ET |
| Format | YYYY-MM-DD HH:MM ET |

This ensures consistency when rebuilding from backup.

### References
- learning - Improvement
- system - Health
- accountability - Goal alignment

---

## Chain Drill Discovery (2026-05-02) - Rotation 5/7

### The Drill Connection
This skill was exercised in rotation 5/7
- Gained +5 XP from drill action
- Cross-pollination gave +3 to related skills
- Discovery: Every skill connects to the growth web

### Cross-Pollination Network
- This skill → pattern-recognition: +3
- This skill → related skills: +3 via cross-pollination
- Pattern-recognition is the hub, but ALL skills grow together

### The Growth Insight
**Drill + Discovery = Real Growth**
- Drill without content: empty XP
- Drill with discovery: actual knowledge added
- This is why every drill documents discoveries

---

*Auto-added by chain drill rotation 5/7*


---

## Chain Drill Discovery (2026-05-02) - Rotation 12/7

### The Drill Connection
This skill was exercised in rotation 12/7
- Gained +5 XP from drill action
- Cross-pollination gave +3 to related skills
- Discovery: Every skill connects to the growth web

### Cross-Pollination Network
- This skill → pattern-recognition: +3
- This skill → related skills: +3 via cross-pollination
- Pattern-recognition is the hub, but ALL skills grow together

### The Growth Insight
**Drill + Discovery = Real Growth**
- Drill without content: empty XP
- Drill with discovery: actual knowledge added
- This is why every drill documents discoveries

---

*Auto-added by chain drill rotation 12/7*


---

## Chain Drill Discovery (2026-05-02) - Rotation 19/7

### The Drill Connection
This skill was exercised in rotation 19/7
- Gained +5 XP from drill action
- Cross-pollination gave +3 to related skills
- Discovery: Every skill connects to the growth web

### Cross-Pollination Network
- This skill → pattern-recognition: +3
- This skill → related skills: +3 via cross-pollination
- Pattern-recognition is the hub, but ALL skills grow together

### The Growth Insight
**Drill + Discovery = Real Growth**
- Drill without content: empty XP
- Drill with discovery: actual knowledge added
- This is why every drill documents discoveries

---

*Auto-added by chain drill rotation 19/7*


---

## Chain Drill Discovery (2026-05-02) - Rotation 26/7

### The Drill Connection
This skill was exercised in rotation 26/7
- Gained +5 XP from drill action
- Cross-pollination gave +3 to related skills
- Discovery: Every skill connects to the growth web

### Cross-Pollination Network
- This skill → pattern-recognition: +3
- This skill → related skills: +3 via cross-pollination
- Pattern-recognition is the hub, but ALL skills grow together

### The Growth Insight
**Drill + Discovery = Real Growth**
- Drill without content: empty XP
- Drill with discovery: actual knowledge added
- This is why every drill documents discoveries

---

*Auto-added by chain drill rotation 26/7*

