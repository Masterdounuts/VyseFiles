name: reminders
description: Create, manage, and deliver time-based reminders and notifications via cron and messaging. Uses Telegram only.
trigger phrases: "remind me", "set a reminder", "don't forget", "notify me", "alert me"

# Reminders - Time-Based Notifications

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 18
- Sections: 5
- Subsections: 4
- Lines: 70 / 100 = 0
- Total: 5 + 4 + 0 = 9

## How Reminders Work

### Step 1: Parse Intent
When user says "remind me to X at Y":
1. Extract **what** - The reminder message
2. Extract **when** - Time/date
3. Extract **how** - Delivery channel

### Step 2: Create Schedule
- One-time: `cron add` with at schedule
- Recurring: `cron add` with cron expression
- Conditional: check cron runs, triggers on condition

### Step 3: Deliver
- **Telegram** - Primary channel
- **Session** - Via cron wake event
- **WhatsApp** - ❌ DISABLED

### Step 4: Track
- Store in `kb/reminders/active.json`

## Usage Examples

### One-time
```
"Remind me to check GGB at 2pm PT"
→ Create cron for 14:00 America/Los_Angeles
→ On trigger: send Telegram message
```

### Recurring
```
"Every Monday at 9am, remind me to review positions"
→ cron: "0 9 * * 1" America/Los_Angeles
→ Each Monday → Telegram alert
```

### Conditional
```
"If NRXP drops below $2.50, alert me"
→ Check cron runs every 30 min
→ On condition met → immediate alert
```

## Storage

**Location:** `kb/reminders/active.json`

## Trigger Phrases
- "remind me", "set a reminder"
- "don't forget", "notify me"

### References
- time - Scheduling
- messaging - Telegram delivery