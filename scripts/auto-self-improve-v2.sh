#!/bin/bash
# Auto-Self-Improvement Script v2
# Identifies AND fixes issues automatically
# No jq/python3 needed - uses node

set -euo pipefail

LOG_FILE="/home/openclaw/.openclaw/workspace/logs/auto-improve.log"
mkdir -p "$(dirname "$LOG_FILE")"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"; }

# Get cron jobs as JSON
get_crons() {
    /usr/local/bin/openclaw cron list --json 2>/dev/null || echo '{"jobs":[]}'
}

# Fix cron job path
fix_cron_path() {
    local job_id="$1"
    local old_path="$2"
    local new_path="$3"
    
    log "Fixing cron $job_id: $old_path → $new_path"
    
    # Get current job config
    local job_json
    job_json=$(/usr/local/bin/openclaw cron list --json 2>/dev/null)
    
    # Extract and fix the message
    local fixed_msg
    fixed_msg=$(echo "$job_json" | node -e "
const d = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const j = d.jobs?.find(x => x.id === '$job_id');
if (j?.payload?.message) {
    console.log(j.payload.message.replace(/$old_path/g, '$new_path'));
}
" 2>/dev/null)
    
    if [ -n "$fixed_msg" ]; then
        # Update the cron job with fixed path
        /usr/local/bin/openclaw cron update "$job_id" --payload-message "$fixed_msg" 2>/dev/null && \
            log "✅ Fixed cron $job_id" || \
            log "❌ Failed to fix cron $job_id"
    fi
}

# Main improvement loop
main() {
    log "=== Auto-Improvement v2 ==="
    
    local crons_json
    crons_json=$(get_crons)
    
    # Find failed jobs
    local failed_jobs
    failed_jobs=$(echo "$crons_json" | node -e '
const d = JSON.parse(require("fs").readFileSync(0, "utf8"));
const failed = d.jobs?.filter(j => j.state?.lastRunStatus === "error") || [];
console.log(JSON.stringify(failed.map(j => ({id: j.id, msg: j.payload?.message || ""}))));
' 2>/dev/null || echo "[]")
    
    # Check each failed job for fixable issues
    echo "$failed_jobs" | node -e '
const jobs = JSON.parse(require("fs").readFileSync(0, "utf8"));
jobs.forEach(j => {
    if (j.msg.includes("/root/.openclaw")) {
        console.log("PATH_FIX|" + j.id + "|/root/.openclaw|/home/openclaw/.openclaw");
    }
});
' 2>/dev/null | while IFS='|' read -r action job_id old_path new_path; do
        [ "$action" = "PATH_FIX" ] && fix_cron_path "$job_id" "$old_path" "$new_path"
    done
    
    # Update agent-ready.md if stale
    if [ -f "/home/openclaw/.openclaw/workspace/memory/agent-ready.md" ]; then
        # Run quick readiness check
        if /home/openclaw/.openclaw/workspace/scripts/vyse-readiness-check.sh >/dev/null 2>&1; then
            log "✅ Readiness check passed"
        else
            log "⚠️ Readiness check failed - will alert on next cron"
        fi
    fi
    
    log "=== Auto-Improvement Complete ==="
}

main "$@"
