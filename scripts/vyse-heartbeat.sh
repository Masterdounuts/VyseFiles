#!/bin/bash
# Writes timestamp to prove Vyse is alive
WORKSPACE="/home/openclaw/.openclaw/workspace"
date +%s > "$WORKSPACE/.vyse-alive"
echo "🟢 $(date -u +%H:%M) UTC Alive"