#!/bin/bash
# WAKE-UP PROTOCOL - Run on every session start
# This replaces "remembering" with "looking up"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$SCRIPT_DIR"

echo "=== VYSE WAKE-UP ==="
echo "Checking context..."

# 1. Import latest sessions FIRST (fixes path bug)
echo "--- Importing recent sessions ---"
python3 "$WORKSPACE/skills/session-persistence/persist.py" --import --source ~/.openclaw/agents/vyse/sessions/ 2>/dev/null

# 2. Get last session summary
echo ""
echo "--- Last Session ---"
python3 "$WORKSPACE/skills/session-persistence/persist.py" --search "last session\|yesterday\|May 11" 2>/dev/null | head -15

# 3. Check for handoff
echo ""
echo "--- HANDOFF ---"
if [ -f "$WORKSPACE/memory/HANDOFF.md" ]; then
    cat "$WORKSPACE/memory/HANDOFF.md"
else
    echo "(no HANDOFF.md found)"
fi

# 4. Quick check on trading positions
echo ""
echo "--- Positions ---"
python3 "$WORKSPACE/skills/session-persistence/persist.py" --search "shares|position|AMC" 2>/dev/null | head -10

echo ""
echo "=== END WAKE-UP ==="