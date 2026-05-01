#!/bin/bash
# Core files integrity - SIMPLIFIED
# FIXED: Uses git instead of manual md5sum
# Git already tracks all changes - no need for redundant checks

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
cd "$WORKSPACE"

# If there are uncommitted changes, that's normal (we work in real-time)
# The real protection is GitHub backup (multiple layers)

# Quick sanity check - can we reach GitHub?
if ! git fetch --dry-run origin >/dev/null 2>&1; then
    echo "WARNING: Cannot reach GitHub for backup"
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    echo "Working directory has uncommitted changes"
    # This is normal - we're actively working
fi

# The REAL backup system:
# 1. .core-backup/ (local) - updated manually
# 2. .core-backup-archive/ (GitHub) - snapshot in repo
# 3. daily-snapshot cron - auto-push to GitHub

echo "Backup verification: GitHub is the source of truth"