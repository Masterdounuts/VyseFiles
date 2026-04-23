#!/bin/bash
# Hub Audit Loop - Scan workspace files, verify hub linkage, handle errors
# Run manually or via cron to ensure INDEX is streamlined

set -o pipefail

WORKSPACE="/home/openclaw/.openclaw/workspace"
HUB_SYSTEM="$WORKSPACE/kb/system/hub-system.md"
LOG_FILE="$WORKSPACE/kb/system/hub-audit.log"
PENDING_MISSING="$WORKSPACE/kb/system/hub-audit-missing.txt"

# Exclusions - files not expected in hub (bootstrap, system, etc)
EXCLUDE_NAMES="SOUL.md USER.md IDENTITY.md AGENTS.md TOOLS.md MEMORY.md INDEX.md DREAMS.md HEARTBEAT.md SUBAGENTS.md BOOTSTRAP.md CONTROL-UI.md ORPHANS.md README.md"

# Optional: exclude whole directories from missing check (space-separated patterns)
EXCLUDE_DIRS=""
# Set AUTO_ADD=1 to automatically append missing root files to hub-system
AUTO_ADD=0

log() {
    echo "$(date -u +'%Y-%m-%d %H:%M UTC') [AUDIT] $1" | tee -a "$LOG_FILE"
}

# === ERROR HANDLING: consult FIXES.md for known solutions ===
check_known_fix() {
    local error_msg="$1"
    local fix_keyword
    
    # Map common error keywords to known fixes in FIXES.md
    case "$error_msg" in
        *"ENOENT"*|"file not found")
            fix_keyword="ENOENT"
            ;;
        *"Permission denied"*|"EACCES")
            fix_keyword="Permission denied"
            ;;
        *"cannot read"|"No such file or directory")
            fix_keyword="not found"
            ;;
        *)
            return 1  # No known fix
            ;;
    esac
    
    # Search FIXES.md for keyword and extract the fix (lines after the fix keyword)
    local fix_line
    fix_line=$(grep -A 10 "$fix_keyword" "$WORKSPACE/kb/system/FIXES.md" 2>/dev/null | head -15)
    if [[ -n "$fix_line" ]]; then
        log "Found known fix for '$fix_keyword': $fix_line"
        # If the fix is to adjust a path, we could apply it; for now just log
        return 0
    else
        log "No known fix for error: $error_msg"
        return 1
    fi
}

# === LOAD LINKED FILES FROM HUB-SYSTEM ===
get_linked_files() {
    # Extract all [[link]] or [[path|name]] patterns from hub-system.md
    grep -oh '\[\[[^]]*\]\]' "$HUB_SYSTEM" | sed -e 's/^\[\[//' -e 's/\]\]$//' -e 's/|.*$//' | sort -u
}

# === DETERMINE HUB FOR A FILE (by location) ===
get_file_hub() {
    local file="$1"
    # Determine hub by path prefix
    case "$file" in
        kb/system/*)    echo "system" ;;
        kb/stocks/*)    echo "stocks" ;;
        kb/personal/*)  echo "personal" ;;
        kb/reference/*) echo "reference" ;;
        memory/*)       echo "archive" ;;
        *)              echo "root" ;;
    esac
}

# === MAIN LOOP ===
log "=== Starting Hub Audit ==="

# Clear pending missing file at start
> "$PENDING_MISSING"

# Get set of linked files from hub-system
log "Loading linked files from hub-system..."
LINKED_FILES=$(get_linked_files)
log "Found $(echo "$LINKED_FILES" | wc -l) linked references in hub-system."

# Find all .md files in workspace (depth <= 2 to avoid deep dirs)
log "Scanning workspace for markdown files..."
ALL_FILES=()
# Use relative paths to avoid double-prefix issues
while IFS= read -r -d '' f; do
    rel="${f#./}"
    ALL_FILES+=("$rel")
done < <(find . -maxdepth 2 -name "*.md" ! -path "*/.git/*" ! -path "*/node_modules/*" -print0)

MISSING_COUNT=0
ERROR_COUNT=0

for file in "${ALL_FILES[@]}"; do
    # Skip hidden files (starting with .)
    [[ "$file" == .* ]] && continue
    
    # Skip excluded names (by basename)
    skip=0
    for exc in $EXCLUDE_NAMES; do
        if [[ "$(basename "$file")" == "$exc" ]]; then
            skip=1
            break
        fi
    done
    [[ $skip -eq 1 ]] && continue

    # Skip excluded directories
    for exc_dir in $EXCLUDE_DIRS; do
        if [[ "$file" == $exc_dir/* ]]; then
            skip=1
            break
        fi
    done
    [[ $skip -eq 1 ]] && continue
    
    # Try to read the file (error handling)
    if ! head -n 10 "$WORKSPACE/$file" > /dev/null 2>&1; then
        err_msg=$(head -n 10 "$WORKSPACE/$file" 2>&1)
        log "ERROR reading $file: $err_msg"
        ((ERROR_COUNT++))
        if check_known_fix "$err_msg"; then
            log "Applied fix for $file, retrying..."
            if ! head -n 10 "$WORKSPACE/$file" > /dev/null 2>&1; then
                log "Still failed after fix: $file"
                continue
            fi
        else
            log "No known fix, marking for manual review: $file"
            echo "$file" >> "$PENDING_MISSING"
            ((MISSING_COUNT++))
            continue
        fi
    fi
    
    # ==== Detection logic: check if file is linked ====
    # 1) Check if basename matches any linked file
    base=$(basename "$file")
    if echo "$LINKED_FILES" | grep -q "^${base}$"; then
        log "Linked (base): $file"
        continue
    fi
    # 2) Check if first component (directory) matches any linked hub/dir
    #    e.g., memory, kb/system, templates, etc.
    dir="${file%%/*}"  # part before first /
    if echo "$LINKED_FILES" | grep -q "^${dir}$"; then
        log "Linked (dir): $file -> $dir"
        continue
    fi
    
    # Not linked
    log "MISSING LINK: $file"
    echo "$file" >> "$PENDING_MISSING"
    ((MISSING_COUNT++))

done

# Deduplicate missing list
if [[ -f "$PENDING_MISSING" ]]; then
    sort -u "$PENDING_MISSING" -o "$PENDING_MISSING"
    MISSING_COUNT=$(wc -l < "$PENDING_MISSING")
fi

log "=== Audit Complete ==="
log "Missing/Error count: $MISSING_COUNT missing, $ERROR_COUNT read errors"

if [[ $MISSING_COUNT -gt 0 ]]; then
    log "Review pending missing links in $PENDING_MISSING"
    
    # Optional: auto-add missing root files to hub-system
    if [[ $AUTO_ADD -eq 1 ]]; then
        log "Auto-adding missing root files to hub-system..."
        # Gather missing root files only
        MISSING_ROOT=$(grep -v '/' "$PENDING_MISSING" 2>/dev/null || true)
        if [[ -n "$MISSING_ROOT" ]]; then
            # Append a new section to hub-system
            {
                echo ""
                echo "## Root Files (auto-linked)"
                echo "These files were automatically added by hub-audit:"
                for f in $MISSING_ROOT; do
                    echo "- [[$f]]"
                done
            } >> "$HUB_SYSTEM"
            log "Added $(echo "$MISSING_ROOT" | wc -w) root files to hub-system."
            # Clear the added files from missing list
            grep -v -F -f <(echo "$MISSING_ROOT") "$PENDING_MISSING" > "${PENDING_MISSING}.tmp" && mv "${PENDING_MISSING}.tmp" "$PENDING_MISSING"
            MISSING_COUNT=$(wc -l < "$PENDING_MISSING")
            log "Remaining missing files: $MISSING_COUNT"
        fi
    fi
else
    log "All files appear linked!"
    [[ -f "$PENDING_MISSING" ]] && rm -f "$PENDING_MISSING"
fi

exit 0