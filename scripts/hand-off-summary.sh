#!/usr/bin/env bash
# Hand‑off summary – creates a concise hand‑off file for starting a fresh session
# Reads the most recent checkpoint (memory/2026-04-16.md) and adds a "Next steps" section.

WORKSPACE="/home/openclaw/.openclaw/workspace"
CHECKPOINT="$WORKSPACE/memory/2026-04-16.md"
OUTFILE="$WORKSPACE/memory/hand-off-$(date -u +%Y-%m-%d).md"

if [ ! -f "$CHECKPOINT" ]; then
  echo "No checkpoint found at $CHECKPOINT" > "$OUTFILE"
  exit 0
fi

# Extract the latest section (assumes sections are separated by blank lines)
# We'll take the last 20 lines as context
tail -n 20 "$CHECKPOINT" > "$OUTFILE"

echo "" >> "$OUTFILE"
cat <<'EOF' >> "$OUTFILE"
---
Next steps:
- Review decisions above
- Identify immediate actions
- Paste this file into a new chat to continue without losing context
EOF

echo "Hand‑off summary written to $OUTFILE"