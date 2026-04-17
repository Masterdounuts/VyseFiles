#!/bin/bash
# Auto-Self-Improvement Script
# Runs periodically to identify and fix issues automatically
# No jq/python3 needed - uses node

set -euo pipefail

LOG_FILE="/home/openclaw/.openclaw/workspace/logs/auto-improve.log"
mkdir -p "$(dirname "$LOG_FILE")"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"; }

# Get session status as JSON
get_status() {
    /usr/local/bin/openclaw status --json 2>/dev/null || echo '{"context":0,"errors":0}'
}

# Get cron jobs as JSON
get_crons() {
    /usr/local/bin/openclaw cron list --json 2>/dev/null || echo '{"jobs":[]}'
}

# Main improvement loop
main() {
    log "=== Auto-Self-Improvement Run ==="
    
    local status_json
    status_json=$(get_status)
    
    # Check context level
    local context_pct
    context_pct=$(echo "$status_json" | node -e '
const d = JSON.parse(require("fs").readFileSync(0, "utf8"));
console.log(d.context?.percent || 0);
' 2>/dev/null || echo "0")
    
    log "Context: ${context_pct}%"
    
    # Check for failed cron jobs
    local crons_json
    crons_json=$(get_crons)
    
    local failed_count
    failed_count=$(echo "$crons_json" | node -e '
const d = JSON.parse(require("fs").readFileSync(0, "utf8"));
const failed = d.jobs?.filter(j => j.state?.lastRunStatus === "error") || [];
console.log(failed.length);
' 2>/dev/null || echo "0")
    
    if [ "$failed_count" -gt 0 ]; then
        log "Found $failed_count failed cron job(s)"
        
        # Get failed job IDs
        local failed_jobs
        failed_jobs=$(echo "$crons_json" | node -e '
const d = JSON.parse(require("fs").readFileSync(0, "utf8"));
const failed = d.jobs?.filter(j => j.state?.lastRunStatus === "error") || [];
console.log(failed.map(j => j.id).join("\n"));
' 2>/dev/null || echo "")
        
        # Check for path issues (common problem)
        while IFS= read -r job_id; do
            [ -z "$job_id" ] && continue
            
            local job_msg
            job_msg=$(echo "$crons_json" | node -e "
const d = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const j = d.jobs?.find(x => x.id === '$job_id');
console.log(j?.payload?.message || '');
" 2>/dev/null || echo "")
            
            # Fix /root/ path references
            if echo "$job_msg" | grep -q "/root/.openclaw"; then
                local fixed_msg
                fixed_msg=$(echo "$job_msg" | sed 's|/root/.openclaw|/home/openclaw/.openclaw|g')
                log "Would fix path in job $job_id (auto-fix disabled for safety)"
            fi
        done <<< "$failed_jobs"
    fi
    
    # Check memory file health
    if [ -f "/home/openclaw/.openclaw/workspace/memory/agent-ready.md" ]; then
        local last_check
        last_check=$(grep "Last Check:" /home/openclaw/.openclaw/workspace/memory/agent-ready.md | head -1 | sed 's/.*: //' || echo "unknown")
        
        # If last check > 1 hour ago, update it
        log "Agent ready check: $last_check"
    fi
    
    log "=== Auto-Self-Improvement Complete ==="
}

main "$@"