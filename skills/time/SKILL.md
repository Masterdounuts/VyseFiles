---
name: time
always: true
description: Timezone handling, scheduling, cron jobs, and temporal awareness. Use when discussing times, schedules, or timing-based tasks.

# Time - Timezone & Scheduling

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 16
- Sections: 8
- Subsections: 8
- Lines: 65 / 100 = 0
- Total: 8 + 8 + 0 = 16

## Timezones

| Zone | Offset | Context |
|------|--------|---------|
| **UTC** | +0 | System time, logs |
| **ET** | -4/-5 | David, market hours |

## Market Hours (ET)
- Regular: 9:30 AM - 4:00 PM ET
- Pre-market: 4:00 AM - 9:30 AM ET
- After-hours: 4:00 PM - 8:00 PM ET

## Cron Format
```
* * * * * command
│ │ │ │ └── Day (0-6)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

### Our Cron Jobs
| Job | Schedule | Purpose |
|-----|----------|---------|
| Quartermaster | */30 * * * * | Stock check |
| Context monitor | */5 * * * * | Context check |

## Time-Based Triggers

**Is trading window?**
```bash
hour_utc=$(date -u +'%H')
# Trading: 13:30-20:00 UTC (9:30 AM-4 PM ET)
```

## Trigger Phrases
- "schedule", "cron", "time"
- "timezone", "ET", "UTC"

## Time Standard

All docs use **PT (Pacific Time)**:
- Format: `YYYY-MM-DD HH:MM PT`

### References
- cli - Health
- cron - Scheduling

---

## Reminders

### How Reminders Work

**Step 1: Parse Intent**
When user says "remind me to X at Y":
1. Extract **what** - The reminder message
2. Extract **when** - Time/date
3. Extract **how** - Delivery channel

**Step 2: Create Schedule**
- One-time: `cron add` with at schedule
- Recurring: `cron add` with cron expression
- Conditional: check cron runs, triggers on condition

### Reminder Commands
```bash
# Create reminder (one-time)
cron add --name "Reminder" --at "2026-05-05T15:00:00Z" --message "Do X"

# Create recurring
cron add --name "Weekly Check" --schedule "0 9 * * 1" --message "Weekly check-in"
```

### Reminder Best Practices
- Always confirm time with user before creating
- Include actionable message
- Set reasonable delivery (Telegram)
