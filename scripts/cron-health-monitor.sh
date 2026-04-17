#!/bin/bash
# Cron Health Monitor - Self-healing system for OpenClaw cron jobs
# Checks job status, auto-restarts failed jobs, alerts on repeated failures
# Run frequency: Every 15 minutes
# NOTE: Uses node for JSON parsing (jq/python3 not available)

set -euo pipefail

LOG_FILE="/home/openclaw/.openclaw/workspace/logs/cron-health.log"
ALERT_THRESHOLD=3  # Alert after this many consecutive failures
RESTART_THRESHOLD=2  # Auto-restart after this many failures

mkdir -p "$(dirname "$LOG_FILE")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Node-based JSON parser helper
parse_json() {
    local json="$1"
    local query="$2"
    echo "$json" | node -e "
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
$query
"
}

main() {
    log "=== Cron Health Monitor Running ==="

    # Get cron jobs list
    local jobs_output
    jobs_output=$(/usr/local/bin/openclaw cron list --includeDisabled 2>/dev/null || echo '{"jobs":[]}')

    # Check each job for recent failures
    local job_ids
    job_ids=$(echo "$jobs_output" | node -e '
const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
console.log(data.jobs?.map(j => j.id).join("\n") || "");
' 2>/dev/null || echo "")

    while IFS= read -r job_id; do
        [ -z "$job_id" ] && continue
        
        local job_name
        job_name=$(echo "$jobs_output" | node -e "
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const job = data.jobs?.find(j => j.id === '$job_id');
console.log(job?.name || 'unknown');
" 2>/dev/null || echo "unknown")

        # Get recent runs
        local runs_output
        runs_output=$(/usr/local/bin/openclaw cron runs --jobId "$job_id" --limit 5 2>/dev/null || echo '{"runs":[]}')
        
        local failed_count
        failed_count=$(echo "$runs_output" | node -e '
const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
const failed = data.runs?.filter(r => r.status === "failed") || [];
console.log(failed.length);
' 2>/dev/null || echo "0")

        if [ "$failed_count" -ge "$ALERT_THRESHOLD" ]; then
            log "⚠️ Job $job_name ($job_id) has $failed_count recent failures"
        fi
        
        if [ "$failed_count" -ge "$RESTART_THRESHOLD" ]; then
            log "Attempting restart of $job_name..."
            if /usr/local/bin/openclaw cron run --jobId "$job_id" 2>/dev/null; then
                log "✅ Restarted: $job_name"
            else
                log "❌ Restart failed: $job_name"
            fi
        fi
    done <<< "$job_ids"

    log "=== Cron Health Monitor Complete ==="
}

main "$@"