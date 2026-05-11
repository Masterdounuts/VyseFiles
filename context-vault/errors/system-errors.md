# Errors & Issues Log

*Known errors and fixes - ongoing*

## Errors Encountered
- **Memory Vault Format Mismatch:** Daily notes use different format than vault expects (## headings vs * Decision: prefixes)
  - Fix: Added structured entries to daily memory files manually
  - Status: Manual extraction working
  
- **Capital Math Error:** Showed $0.34 instead of ~$38.70
  - Fix: Added capital recalculation on every trade
  - Status: Fixed

- **ADR Stock Miss:** NIO purchased before realizing it was an ADR
  - Fix: Added exclusion list (NIO, XPEV, BABA)
  - Status: Fixed

- **State File Path Issue:** Multiple .last_distill_date files in different locations
  - Issue: Skill reads wrong workspace path
  - Status: Workaround - manually adding to vault

## What Works
- GitHub persists across sessions
- Three trading scanners (mini, intraday, daytoday)
- PDF generation for resumes
- HEARTBEAT.md orchestration

## To Avoid
- Running health checks (affects other systems)
- Not checking FIXES.md before fixing
- Assuming changes translate across mediums