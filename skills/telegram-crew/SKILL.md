---
name: telegram-crew
access: crew
description: Telegram crew group chat, topic routing, and crew mentions.
---

# Telegram Crew Skill

**⚠️ NOTE:** General Telegram setup → See [[skills/telegram|telegram]] skill

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in Telegram crew management

### Current Status: Level 6 - Expert 🟡🟡🟡🟡🟡🟡

| Sub-Skill | Level | Notes |
|-----------|-------|-------|
| Messaging | 6/7 | Crew alerts, status prefixes |
| Topics | 6/7 | Full crew routing |
| Cron replacement | 6/7 | Crew group replaces many crons |

**Path to RON:** Perfect crew sync, auto-responses

---

**Category:** Communication / Channel
**Updated:** 2026-04-27

Crew group chat configuration — see [[skills/telegram|telegram]] for general setup.

---

## Crew Group Configuration

**Group ID:** `-10039 411303567`
**Group Name:** 🏴‍☠️ Vyse's Crew

### Topic Mapping (CRON REPLACEMENT!)

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-10039 411303567": {
          "name": "🏴‍☠️ Vyse's Crew",
          "requireMention": false,
          "topics": {
            "19": { "name": "General" },
            "20": { "name": "Vyse", "agentId": "vyse" },
            "21": { "name": "Scribe", "agentId": "scribe" },
            "22": { "name": "Shipwright", "agentId": "shipwright" },
            "23": { "name": "Quartermaster", "agentId": "quartermaster" }
          }
        }
      }
    }
  }
}
```

| Topic ID | Topic Name | Routes To | Replaces Cron |
|----------|------------|-----------|---------------|
| 19 | General | All messages | - |
| 20 | Vyse | vyse agent | Decision alerts |
| 21 | Scribe | scribe agent | Memory audit cron |
| 22 | Shipwright | shipwright agent | Health check cron |
| 23 | Quartermaster | quartermaster agent | Stock monitor cron |

---

## How Crew Group Replaces Crons

| Old Cron Job | New Crew Trigger |
|--------------|------------------|
| Stock price monitor | Message in #Quartermaster topic |
| Health check | Message in #Shipwright topic |
| Memory audit | Message in #Scribe topic |
| Decision alerts | Message in #Vyse topic |

**Rule:** Message in topic → triggers correct agent → agent responds

---

## Topic Routing

To add new topic routing:

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-10039 411303567": {
          "topics": {
            "TOPIC_ID": { "name": "Topic Name", "agentId": "AGENT_ID" }
          }
        }
      }
    }
  }
}
```

---

## Crew Mentions

| Member | Agent | Topic | When to Use |
|--------|-------|-------|-------------|
| Vyse | vyse | #20 | Decisions, big picture |
| Scribe | scribe | #21 | Data retrieval, commits |
| Shipwright | shipwright | #22 | Fixes, health checks |
| Quartermaster | quartermaster | #23 | Trading alerts, positions |

---

## CLI

```bash
# Send to crew group
openclaw message send --channel telegram --target -10039 4111303567 --message "Update"

# Send to specific topic (reply to topic message)
```

---

*Skill maintained by Vyse — general Telegram config in [[skills/telegram|telegram]]