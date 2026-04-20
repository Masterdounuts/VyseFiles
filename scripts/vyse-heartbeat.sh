#!/bin/bash
# Writes timestamp to prove Vyse is alive
date +%s > /root/.openclaw/workspace/.vyse-alive
echo "🟢 $(date -u +%H:%M) UTC Alive"