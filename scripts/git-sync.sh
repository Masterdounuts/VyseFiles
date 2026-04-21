#!/bin/bash
# Git sync script - commit and push changes to GitHub
cd /home/openclaw/.openclaw/workspace

# Check for changes
if [[ -n $(git status --porcelain) ]]; then
    git add -A
    git commit -m "Auto-sync: $(date -u +%Y-%m-%d)"
    git push origin main
    echo "✅ Synced to GitHub"
else
    echo "ℹ️ No changes to sync"
fi