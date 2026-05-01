#!/bin/bash
# Context-Aware Save - Save when context > 80%
echo "Context check: $(date +%H:%M)"
# This runs via cron - if context is high, save critical work
