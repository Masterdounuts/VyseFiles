#!/usr/bin/env bash
# Decision‑Log – appends extracted decisions from the latest checkpoint to a cumulative log

WORKSPACE="/home/openclaw/.openclaw/workspace"
CHECKPOINT="$WORKSPACE/memory/2026-04-16.md"
DECISION_LOG="$WORKSPACE/memory/decisions.md"

if [ ! -f "$CHECKPOINT" ]; then
  echo "No checkpoint file found at $CHECKPOINT" >> "$DECISION_LOG"
  exit 0
fi

# Extract lines that look like decisions (starting with "- " and containing key verbs)
# This is a simple heuristic; adjust as needed.
grep -E '^\s*-\s+.*(decide|decision|action|plan|next step):' "$CHECKPOINT" >> "$DECISION_LOG"

echo "Decision log updated from $CHECKPOINT"