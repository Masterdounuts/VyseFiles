name: telegram-crew
access: crew
description: Telegram crew group chat, topic routing, and crew mentions.
trigger phrases: "crew chat, group chat, team"

# Telegram Crew Skill

**⚠️ NOTE:** General Telegram setup → See [[skills/telegram|telegram]] skill

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in Telegram crew management

### Current Status: Level 14 - RON ⭐ 🟡🟡🟡🟡🟡

**XP:** 50/50 (next level at 50)

| Skill | Level | Notes |
|-------|-------|-------|
| Messaging | 5/7 | Uses alerts templates, status prefixes, priority formatting |
| Topics | 5/7 | Full topic→agent routing, crew mapping |
| Routing | 5/7 | Group-specific config, crew members |

**Path to RON:** Perfect crew sync, auto-responses

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **exec** - Running system commands
- **cron** - Managing scheduled tasks
- **read/write** - Configuration management
- Decision tree: exec for diagnostics → cron for scheduling → read/write for config

**Max Level:** 75 (tier: supporting)

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to telegram-crew |

### HEYRON Insight: Ask > assume
**Category:** Communication / Channel
**Updated:** 2026-04-26

Crew group chat configuration — see [[skills/telegram|telegram]] for general setup.
## Crew Group Configuration

**Group ID:** `-1003941303567`

### Current Topic Mapping

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-1003941303567": {
          "requireMention": false,
          "topics": {
            "19": { },              // General
            "20": { "agentId": "vyse" },
            "21": { "agentId": "scribe" },
            "22": { "agentId": "shipwright" }
          }
        }
      }
    }
  }
}
```

| Topic ID | Topic Name | Routes To |
|----------|------------|-----------|
| 19 | General | All messages |
| 20 | Vyse | vyse agent |
| 21 | Scribe | scribe agent |
| 22 | Shipwright | shipwright agent |
## Topic Routing

To add new topic routing:

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-1003941303567": {
          "topics": {
            "TOPIC_ID": { "agentId": "AGENT_ID" }
          }
        }
      }
    }
  }
}
```

Topic inherits group settings unless overridden.
## Crew Mentions

| Member | Agent | Topic |
|--------|-------|-------|
| Vyse | vyse | #20 |
| Scribe | scribe | #21 |
| Shipwright | shipwright | #22 |

Mention in crew chat → routes to correct agent topic.
## CLI

```bash
# Send to crew group
openclaw message send --channel telegram --target -1003941303567 --message "Update"

# Send to specific topic
# (via reply to topic message)
```
*Skill maintained by Vyse — general Telegram config in [[skills/telegram|telegram]]*
### References
- learning - Improvement
- system - Health
- accountability - Goal alignment

---

## Discovery (2026-05-02)
**telegram-crew insight**

- This skill has unique knowledge not in other skills
- Drill actions should add skill-specific insights
- Cross-pollination connects to pattern-recognition

---

*Chain drill: unique insight*
