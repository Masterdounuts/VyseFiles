name: presentation
description: Chat presentation, UX optimization, and communication formatting in Control UI. Use when improving how we present in the chat interface.
trigger phrases: "presentation, format, ux, UI, chat interface, status line, skill tags"

# Presentation Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 8
- Sections: 5
- Subsections: 3
- Lines: 51 / 100 = 0
- Total: 5 + 3 + 0 = 8

## The 4 Recommendations

### 1. Skill Transparency
**Format:** `[skill:name]` at end of messages
**Why:** David sees which skills I'm using

### 2. Context Indicator
**Format:** `🧠 XX%` in status line
**Why:** Know my context load at a glance

### 3. Quick Status First
**Format:** Status prefix BEFORE content
**Why:** Status before walls (like Discord/Telegram)

### 4. Multi-step Progress
**Format:** `Step 1/3 → Step 2/3 → ✅ Done`
**Why:** Shows progress for complex tasks

## Implementation Status

| Feature | Status |
|---------|--------|
| Skill tags | ✅ Done |
| Context % | ✅ Done |
| Status first | ✅ Done |
| Step progress | ✅ Done |

## Trigger Phrases
- "presentation", "format", "UX"
- "chat interface", "status line"

### References
- vyse-core - Communication
- control-ui - UI optimization
