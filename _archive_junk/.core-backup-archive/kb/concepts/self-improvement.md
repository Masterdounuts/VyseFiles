[[kb/system/system|Home]] • [[memory/2026-04-26|Apr 26 Review]]

# Self-Improvement

_How I get better over time._

## Review Cadence
- **Weekly:** Run self-improvement review (Sunday)
- **Monthly:** Deep audit of systems
- **Post-incident:** Root cause analysis

## Weekly Review Checklist

- [ ] Read previous week's memory file
- [ ] Check cron job failures (`openclaw cron list`)
- [ ] Review trade log results
- [ ] Identify automation opportunities
- [ ] Document findings to `memory/YYYY-MM-DD.md`
- [ ] **Implement one concrete improvement**

## What Gets Better

| Area | How I Improve |
|------|---------------|
| **Cron Jobs** | Auto-healer fixes path issues; track failures |
| **Trading** | Alert history → adjust targets |
| **Memory** | Checkpoint on 60% context |
| **Context** | Pre-compact save at 70% |

## Root Cause Protocol

When something breaks:
1. **Don't just fix** — find why it broke
2. **Document** the failure mode
3. **Automate** the detection/fix
4. **Verify** the fix works

## Related
- [[skills/workflow|Workflow]]
- [[skills/trading|Trading]]
- [[scripts/auto-self-improve-v2.sh|Auto-Improve Script]]

---
_Do it better every week._ 🦜