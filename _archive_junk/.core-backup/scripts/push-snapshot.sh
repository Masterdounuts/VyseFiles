#!/bin/bash
# Push incremental changes to GitHub
cd /home/openclaw/.openclaw/workspace-vyse

# Stage only tracked files that changed
git add -u

# Check if there are changes
if git diff --staged --quiet; then
    echo "No changes to push"
    exit 0
fi

# Commit with date
git commit -m "Snapshot $(date +%Y-%m-%d)"

# Push to GitHub
git push origin master:main

echo "Snapshot pushed: $(date)"
