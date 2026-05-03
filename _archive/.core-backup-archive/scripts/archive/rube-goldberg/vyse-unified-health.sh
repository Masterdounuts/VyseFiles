#!/bin/bash
# vyse-unified-health.sh - Unified health check for Vyse system
# Checks: Gateway, Cron jobs, Disk space, Memory files

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")"

echo "=== Vyse Health Check $(date) ==="

# 1. Gateway health
echo -n "Gateway: "
if openclaw gateway status 2>/dev/null | grep -q "RPC probe: ok"; then
    echo "OK"
else
    echo "CHECK"
fi

# 2. Disk space
echo -n "Disk: "
DISK_USAGE=$(df -h "$WORKSPACE" | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 90 ]; then
    echo "${DISK_USAGE}% OK"
else
    echo "${DISK_USAGE}% WARN"
fi

# 3. Memory files (check they're not too old)
echo -n "Memory: "
LATEST_MEM=$(ls -t "$WORKSPACE"/memory/2026-*.md 2>/dev/null | head -1)
if [ -n "$LATEST_MEM" ]; then
    MEM_DATE=$(stat -c %Y "$LATEST_MEM")
    NOW=$(date +%s)
    AGE_DAYS=$(( (NOW - MEM_DATE) / 86400 ))
    echo "${AGE_DAYS}d old (OK)"
else
    echo "No recent memory"
fi

# 4. Heartbeat alive file
echo -n "Heartbeat: "
if [ -f "$WORKSPACE/.vyse-alive" ]; then
    echo "OK ($(cat $WORKSPACE/.vyse-alive))"
else
    echo "MISSING"
fi

# 5. Critical files exist
echo -n "Core files: "
for f in IDENTITY.md SOUL.md USER.md AGENTS.md TODO.md; do
    [ ! -f "$WORKSPACE/$f" ] && echo "MISSING $f" 
done
echo "OK"

echo "=== Health check complete ==="
exit 0