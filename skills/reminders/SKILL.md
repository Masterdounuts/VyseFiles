---
name: reminders
description: Create, manage, and deliver time-based reminders and notifications via cron and messaging. Uses Telegram only (not WhatsApp).
trigger phrases: "remind me", "set a reminder", "don't forget", "notify me", "alert me", "wake me up", "reminder"
---

# Reminders - Time-Based Notifications

*Create and manage reminders with cron + messaging*

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in reminder management

### Current Status: Level 6 - Expert 🟡🟡🟡

**XP:** 40/40 (RON)

| Skill | Level | Notes |
|-------|-------|-------|
| **Schedule Creation** | 4/7 | cron job from natural language |
| **Channel Selection** | 4/7 | Telegram only (WhatsApp disabled) |
| **Follow-up Logic** | 3/7 | What if missed? |
| **Reminder Tracking** | 3/7 | List active reminders |

**Path to RON:** Smart reminders, conditional alerts, perfect delivery

---

## How Reminders Work

### Step 1: Parse Intent
When user says "remind me to X at Y":
1. Extract **what** - The reminder message
2. Extract **when** - Time/date (uses time skill)
3. Extract **how** - Delivery channel (default: Telegram)

### Step 2: Create Schedule
Using cron job:
- One-time: `cron add` with at schedule
- Recurring: `cron add` with cron expression
- Conditional: `cron add` with condition check

### Step 3: Deliver
- **Telegram** - Via message tool (primary)
- **Session** - Via cron wake event
- **WhatsApp** - ❌ DISABLED (never used)

### Step 4: Track
- Store in `kb/reminders/active.json`
- Update on delivery or cancellation

---

## Usage Examples

### One-time Reminder
```
User: "Remind me to check GGB price at 2pm PT"
Action:
  1. Parse: what="check GGB price", when="2pm PT today"
  2. Create cron job for 14:00 America/Los_Angeles
  3. Store in reminders/active.json
  4. On trigger: send Telegram message
```

### Recurring Reminder
```
User: "Every Monday at 9am, remind me to review positions"
Action:
  1. Parse: what="review positions", when="9am Monday"
  2. Create cron: "0 9 * * 1" America/Los_Angeles
  3. Store as recurring
  4. Each Monday at 9am → Telegram alert
```

### Conditional Reminder
```
User: "If NRXP drops below $2.50, alert me immediately"
Action:
  1. Parse: condition="NRXP < $2.50", alert="NRXP alert!"
  2. Create check cron (every 30 min during market hours)
  3. On condition met → immediate Telegram alert
  4. Disable cron after triggering (one-shot)
```

---

## Integration

| Skill | Integration |
|-------|-------------|
| **time** | Parse dates/times, create schedules |
| **messaging** | Telegram delivery (primary) |
| **memory** | Store reminder history |
| **pattern-recognition** | Learn reminder patterns |

---

## Storage

**Location:** `kb/reminders/active.json`

```json
{
  "reminders": [
    {
      "id": "uuid",
      "what": "Check GGB price",
      "when": "2026-04-30 14:00 PT",
      "channel": "telegram",
      "status": "active",
      "type": "one-time"
    }
  ]
}
```

---

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **memory_search** - Finding patterns in memory
- **read** - Analyzing files
- **write** - Documenting patterns
- Decision tree: memory_search for recall → read for analysis → write for documentation

**Max Level:**  18

| Discovery | Adds To |
|------------|--------|
| Conditional reminders | +1 to reminders |
| Smart follow-up | +1 to reminders |
| Reminder patterns | +1 to pattern-recognition |

**Path to RON:** Perfect reminder delivery, conditional intelligence, self-managed schedules
### References
- learning - Improvement
- system - Health
- accountability - Goal alignment
