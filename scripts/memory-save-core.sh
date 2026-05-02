#!/bin/bash
# Memory Save Core - Auto-save important info to core memory
# Triggered by key phrases from user

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
CORE_DIR="$WORKSPACE/memory/core"

# Get the content to save
CONTENT="$*"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")

if [ -z "$CONTENT" ]; then
    echo "Usage: memory-save-core.sh <content>"
    echo "Detects trigger and saves to appropriate memory"
    exit 1
fi

# Detect trigger type from content
detect_type() {
    local text="$1"
    text_lower=$(echo "$text" | tr '[:upper:]' '[:lower:]')
    
    if echo "$text_lower" | grep -q "birthday\|birth date\|born"; then
        echo "user"
    elif echo "$text_lower" | grep -q "goal\|mission\|purpose"; then
        echo "goals"
    elif echo "$text_lower" | grep -q "contact\|family\|loved one"; then
        echo "contacts"
    else
        echo "daily"  # Default
    fi
}

# Save to appropriate file
TYPE=$(detect_type "$CONTENT")
ENTRY="- $TIMESTAMP: $CONTENT"

case "$TYPE" in
    user)
        echo "$ENTRY" >> "$CORE_DIR/user.md"
        echo "✅ Saved to user.md"
        ;;
    goals)
        echo "$ENTRY" >> "$CORE_DIR/goals.md"
        echo "✅ Saved to goals.md"
        ;;
    contacts)
        echo "$ENTRY" >> "$CORE_DIR/contacts.md"
        echo "✅ Saved to contacts.md"
        ;;
    daily)
        DAILY="$WORKSPACE/memory/daily/$(date +%Y-%m-%d).md"
        mkdir -p "$(dirname "$DAILY")"
        echo "$ENTRY" >> "$DAILY"
        echo "✅ Saved to daily log"
        ;;
esac

echo "Done!"