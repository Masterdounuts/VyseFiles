name: telegram-crew
access: crew
description: Telegram crew group chat, topic routing, and crew mentions.
trigger phrases: "crew chat, group chat, team"

# Telegram Crew Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 14
- Sections: 6
- Subsections: 7
- Lines: 138 / 100 = 1
- Total: 6 + 7 + 1 = 14

## Group Configuration

**Group ID:** `-1003941303567`

## Topic Mapping

| Topic ID | Topic Name | Routes To |
|----------|------------|-----------|
| 19 | General | All messages |
| 20 | Vyse | vyse agent |
| 21 | Scribe | scribe agent |
| 22 | Shipwright | shipwright agent |

## Add Topic Routing

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

## Crew Mentions

| Member | Agent | Topic |
|--------|-------|-------|
| Vyse | vyse | #20 |
| Scribe | scribe | #21 |
| Shipwright | shipwright | #22 |

## CLI

```bash
# Send to crew group
openclaw message send --channel telegram --target -1003941303567 --message "Update"
```

## Trigger Phrases
- "crew chat", "group chat", "team"

### References
- messaging - Templates
- crew-protocols - Communication