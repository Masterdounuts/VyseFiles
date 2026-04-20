#!/bin/bash
# Auto-create today's daily note with frontmatter (Obsidian-compatible)
WORKSPACE="/home/openclaw/.openclaw/workspace"
TODAY=$(date -u +"%Y-%m-%d")
MEMORY_FILE="$WORKSPACE/memory/$TODAY.md"

if [ -f "$MEMORY_FILE" ]; then
    echo "Daily note already exists: $MEMORY_FILE"
    exit 0
fi

# Determine tags based on day of week
DAY_OF_WEEK=$(date -u +%u)
case $DAY_OF_WEEK in
    1) TAGS="daily,workflow" ;;  # Monday
    2) TAGS="daily,trading" ;;    # Tuesday
    3) TAGS="daily,infrastructure" ;;  # Wednesday
    4) TAGS="daily,trading" ;;    # Thursday
    5) TAGS="daily,trading" ;;    # Friday
    6) TAGS="daily,projects" ;;   # Saturday
    7) TAGS="daily,review" ;;     # Sunday
esac

cat > "$MEMORY_FILE" << MD
---
date: $TODAY
tags: [$TAGS]
---

# $TODAY - Daily Log

## 📋 Status
- **Context:** %
- **Session:**
- **Mood:**

## 🎯 Open TODOs
- [ ] 

## ✅ Completed
- 

## 💡 Decisions Made
- 

## 🔗 Connected Notes
- [[memory/$(date -u -d "yesterday" +"%Y-%m-%d")|Yesterday]] → Today

## 📝 Notes


## ⚠️ Issues to Fix


---
*Generated: $(date -u +"%Y-%m-%d %H:%M UTC")*
*Auto-created via create-daily-note.sh*
MD

echo "Created: $MEMORY_FILE"