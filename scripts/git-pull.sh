#!/bin/bash
# Git pull script - get latest from GitHub on wake
cd /home/openclaw/.openclaw/workspace

git fetch origin main
git pull origin main

echo "✅ Pulled latest from GitHub"