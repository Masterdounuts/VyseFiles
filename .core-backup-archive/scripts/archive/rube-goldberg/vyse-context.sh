#!/bin/bash
# vyse-context.sh - Generate live context JSON for Control UI
# Writes to state/context.json

WORKSPACE="/root/.openclaw/workspace"
STATE_DIR="$WORKSPACE/state"
CONTEXT_FILE="$STATE_DIR/context.json"

mkdir -p "$STATE_DIR"

# Get context info from openclaw status (timeout 5s)
STATUS_OUTPUT=$(timeout 5 openclaw status 2>&1)

# Extract context line: "21k/40k (52%)"
CONTEXT_LINE=$(echo "$STATUS_OUTPUT" | grep -oE '[0-9]+k/[0-9]+k \([0-9]+%\)' | head -1)

# Parse used, limit, percent
if [ -n "$CONTEXT_LINE" ]; then
    USED_K=$(echo "$CONTEXT_LINE" | cut -d'/' -f1 | tr -d 'k')
    LIMIT_K=$(echo "$CONTEXT_LINE" | cut -d'/' -f2 | cut -d' ' -f1 | tr -d 'k')
    PCT=$(echo "$CONTEXT_LINE" | grep -oE '\([0-9]+%\)' | tr -d '()%')

    USED=$((USED_K * 1000))
    LIMIT=$((LIMIT_K * 1000))
else
    # Fallback: try "Context: XX%" line
    CONTEXT_PCT=$(echo "$STATUS_OUTPUT" | grep -i '^[[:space:]]*Context' | grep -oE '[0-9]+%' | head -1 | tr -d '%')
    if [ -n "$CONTEXT_PCT" ]; then
        PCT=$CONTEXT_PCT
        # Approximate used based on limit 40k
        USED=$((PCT * 400))
        LIMIT=40000
    else
        PCT=0
        USED=0
        LIMIT=40000
    fi
fi

# Extract cached % (look for "🗄️ X%" or "cached X%")
CACHED_PCT=$(echo "$STATUS_OUTPUT" | grep -oE '🗄️[[:space:]]*[0-9]+%' | grep -oE '[0-9]+%' | head -1)
[ -z "$CACHED_PCT" ] && CACHED_PCT=0

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%MZ")

cat > "$CONTEXT_FILE" <<EOF
{
  "timestamp": "$TIMESTAMP",
  "context": {
    "pct": $PCT,
    "used": $USED,
    "limit": $LIMIT
  },
  "cached": $CACHED_PCT
}
EOF

echo "Context written to $CONTEXT_FILE"