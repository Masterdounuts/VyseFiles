#!/bin/bash
# SQLite Archive Script - Prunes old entries from session persistence DB
# Run nightly via cron

DB_PATH="$HOME/.openclaw/workspace-vyse/session-persistence-db/messages.db"
ARCHIVE_DIR="$HOME/.openclaw/workspace-vyse/memory/archive"
DAYS_TO_KEEP=30

echo "=== SQLite Archive ==="
echo "Database: $DB_PATH"
echo "Keeping last $DAYS_TO_KEEP days"

if [ ! -f "$DB_PATH" ]; then
  echo "ERROR: Database not found"
  exit 1
fi

# Get current size
before_size=$(du -k "$DB_PATH" | cut -f1)
echo "Before: ${before_size}KB"

# Delete entries older than 30 days
# SQLite stores timestamps - adjust based on your schema
# This is a placeholder - adjust based on actual table structure
sqlite3 "$DB_PATH" "DELETE FROM messages WHERE created_at < datetime('now', '-$DAYS_TO_KEEP days');" 2>/dev/null || echo "Note: Adjust query for actual schema"

# Vacuum to reclaim space
sqlite3 "$DB_PATH" "VACUUM;" 2>/dev/null || echo "Vacuum completed"

# Get new size
after_size=$(du -k "$DB_PATH" | cut -f1)
echo "After: ${after_size}KB"
echo "Saved: $((before_size - after_size))KB"

# Create archive manifest
echo "Archive run: $(date)" >> "$ARCHIVE_DIR/archive_manifest.md"
