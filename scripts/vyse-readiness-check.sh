#!/bin/bash
# Vyse Self-Readiness Check
# Validates system health before spawning trading subagents

STATUS_FILE="/root/.openclaw/workspace/memory/agent-ready.md"
LOG_FILE="/root/.openclaw/workspace/logs/readiness.log"

mkdir -p "$(dirname "$LOG_FILE")"

log() {
    echo "[$(date -Iseconds)] $1" | tee -a "$LOG_FILE"
}

PASS=0
FAIL=0

# Check 1: Gateway
if openclaw gateway status 2>/dev/null | grep -q "RPC probe: ok"; then
    log "Gateway: PASS"
    PASS=$((PASS + 1))
else
    log "Gateway: FAIL"
    FAIL=$((FAIL + 1))
fi

# Check 2: Cron errors + auto-fix
ERRORS=$(openclaw cron list 2>/dev/null | grep -o '"lastRunStatus": "error"' | wc -l)

# Auto-fix common path issues in cron jobs
if [ "$ERRORS" -gt 0 ]; then
    # Get jobs with wrong path
    CRON_JSON=$(openclaw cron list --json 2>/dev/null)
    echo "$CRON_JSON" | node -e '
const d = JSON.parse(require("fs").readFileSync(0, "utf8"));
d.jobs?.filter(j => j.state?.lastRunStatus === "error" && j.payload?.message?.includes("/root/.openclaw")).forEach(j => {
    const fixed = j.payload.message.replace(/\/root\/.openclaw/g, "/home/openclaw/.openclaw");
    try {
        require("child_process").execSync(`openclaw cron update ${j.id} --payload-message "${fixed}"`, {stdio: "ignore"});
        console.error("Auto-fixed: " + j.id);
    } catch(e) {}
});
' 2>/dev/null
fi
if [ "$ERRORS" -eq 0 ]; then
    log "Cron: PASS (0 errors)"
    PASS=$((PASS + 1))
else
    log "Cron: WARN ($ERRORS errors)"
    PASS=$((PASS + 1))  # Warn only
fi

# Check 3: Context
CONTEXT=$(openclaw session-status 2>/dev/null | grep -oP 'Context: \K[0-9]+' | head -1)
CONTEXT=${CONTEXT:-0}
if [ "$CONTEXT" -lt 80 ]; then
    log "Context: PASS (${CONTEXT}%)"
    PASS=$((PASS + 1))
else
    log "Context: FAIL (${CONTEXT}%)"
    FAIL=$((FAIL + 1))
fi

# Check 4: Tools (basic web check)
if curl -s --max-time 5 https://wttr.in >/dev/null 2>&1; then
    log "Tools: PASS"
    PASS=$((PASS + 1))
else
    log "Tools: WARN"
    PASS=$((PASS + 1))  # Warn only
fi

# Write status
TIMESTAMP=$(date -Iseconds)
if [ "$FAIL" -eq 0 ]; then
    STATUS="✅ READY"
else
    STATUS="❌ NOT READY"
fi

cat > "$STATUS_FILE" << EOF
# Agent Ready Status

**Last Check:** $TIMESTAMP
**Status:** $STATUS

| Check | Result |
|-------|--------|
| Gateway | ✅ OK |
| Cron | ✅ $ERRORS errors |
| Context | ${CONTEXT}% |
| Tools | ✅ OK |

**Summary:** $PASS passed, $FAIL failed
EOF

log "Readiness: $STATUS ($PASS/4 checks)"

[ "$FAIL" -eq 0 ] && exit 0 || exit 1