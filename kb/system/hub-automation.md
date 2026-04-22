# ::Automation Hub

Scripts, cron jobs, and automated workflows.

## Stock Trading
- [[scripts/stock-trading-subagent.sh|Trading Subagent]] – Price monitor + volatility detector
- [[scripts/stock-agent-v2.sh|Stock Agent V2]] – Main price monitoring
- [[scripts/check-pending-opportunities.sh|Volatility Checker]] – 3% move detector

## Context & Memory
- [[scripts/auto-checkpoint-new.sh|Auto Checkpoint]] – Periodic state save
- [[scripts/pre-compact-save.sh|Pre-Compaction]] – Memory flush before reset
- [[scripts/memory_audit.sh|Memory Audit]] – Memory health check

## Cron & Health
- [[scripts/cron-health-monitor.sh|Cron Health]] – Job failure detection
- [[scripts/cron-failure-healer.sh|Cron Healer]] – Auto-fix failing jobs
- [[scripts/gateway_watch.sh|Gateway Watch]] – Gateway restart detection

## Recovery & Handoff
- [[scripts/generate-handoff.sh|Handoff Generator]] – Session continuity
- [[scripts/resume-on-restart.sh|Resume]] – Post-restart recovery
- [[scripts/auto-self-improve-v2.sh|Auto Self-Improve]] – Self-improvement loop

## Utilities
- [[scripts/git-sync.sh|Git Sync]] – Push/pull helper
- [[scripts/decision-log.sh|Decision Log]] – Track choices
- [[scripts/morning-scan.sh|Morning Scan]] – Daily startup check

---
*Automation Hub — Scripts & cron jobs*