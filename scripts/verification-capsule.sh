#!/bin/bash
# Verification Capsule Generator - Lightweight status checks
# Generates tiny JSON capsules instead of bloated context

capsule='{'

# Heartbeat - check last run time
if [ -f ~/.openclaw/workspace-vyse/HEARTBEAT.md ]; then
  last_mod=$(stat -c %Y ~/.openclaw/workspace-vyse/HEARTBEAT.md 2>/dev/null || stat -f %m ~/.openclaw/workspace-vyse/HEARTBEAT.md 2>/dev/null)
  now=$(date +%s)
  minutes_ago=$(( (now - last_mod) / 60 ))
  capsule+='"heartbeat_last_mod":'"$minutes_ago"','
else
  capsule+='"heartbeat_last_mod":null,'
fi

# Cron jobs - count and status
cron_count=$(openclaw cron list 2>/dev/null | grep -c "job-" || echo 0)
capsule+='"cron_jobs":'"$cron_count"','

# Session persistence - check DB
if [ -f ~/.openclaw/workspace-vyse/session-persistence-db/messages.db ]; then
  db_size=$(du -k ~/.openclaw/workspace-vyse/session-persistence-db/messages.db | cut -f1)
  capsule+='"persistence_db_kb":'"$db_size"','
else
  capsule+='"persistence_db_kb":0,'
fi

# Gateway status
if pgrep -x "openclaw-gateway" > /dev/null; then
  capsule+='"gateway":"running",'
else
  capsule+='"gateway":"stopped",'
fi

# Memory files count
mem_count=$(find ~/.openclaw/workspace-vyse/memory -name "*.md" 2>/dev/null | wc -l)
capsule+='"memory_files":'"$mem_count"'}'

echo "$capsule"
