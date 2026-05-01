#!/bin/bash
# Core files integrity guard
# Verifies core identity files haven't changed unexpectedly

WORKSPACE="/home/openclaw/.openclaw/workspace"
BACKUP_DIR="$WORKSPACE/.core-backup"
CORE_FILES="IDENTITY.md SOUL.md USER.md AGENTS.md"

mkdir -p "$BACKUP_DIR"

for f in $CORE_FILES; do
    if [ -f "$WORKSPACE/$f" ] && [ -f "$BACKUP_DIR/$f" ]; then
        CURRENT_HASH=$(md5sum "$WORKSPACE/$f" 2>/dev/null | cut -d' ' -f1)
        BACKUP_HASH=$(md5sum "$BACKUP_DIR/$f" 2>/dev/null | cut -d' ' -f1)
        
        if [ "$CURRENT_HASH" != "$BACKUP_HASH" ]; then
            echo "$(date -Iseconds) WARNING: $f changed! Restoring from backup..."
            cp "$BACKUP_DIR/$f" "$WORKSPACE/$f"
            echo "$(date -Iseconds) RESTORED: $f from backup" >> "$WORKSPACE/logs/core-guard.log"
        else
            echo "$(date -Iseconds) OK: $f"
        fi
    else
        # First run - create backup
        cp "$WORKSPACE/$f" "$BACKUP_DIR/$f" 2>/dev/null
        echo "$(date -Iseconds) BACKUP: $f"
    fi
done