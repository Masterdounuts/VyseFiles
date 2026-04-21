[[index|Home]]

# VyseFiles Index

Your knowledge base + my operating system. Organized by context.

---

## 🎯 My Identity (System)

| File | Purpose |
|------|---------|
| [[SOUL.md|Vyse Soul]] | Who I am, my principles |
| [[IDENTITY.md|Identity]] | Name, vibe, avatar |
| [[USER.md|User]] | About you, preferences |
| [[AGENTS.md|Agents]] | Trading protocol |
| [[kb/system/BOOTSTRAP.md|Bootstrap]] | Wake-up protocol |
| [[SUBAGENTS.md|Subagents]] | Spawning child agents |

## 🧠 My Memory

| File | Purpose |
|------|---------|
| [[memory/2026-04-20|Apr 20]] | Today's session |
| [[memory/2026-04-19|Apr 19]] | Yesterday |
| [[memory/2026-04-18|Apr 18]] | Earlier this week |
| [[memory/recent-dailies|Dailies]] | Auto-generated list |
| [[decisions/index.md|Decisions]] | Key decisions log |
| [[memory/active|Active Task]] | Current work |
| [[active.md|Session Active]] | Current task (root) |
| [[PENDING.md|Pending]] | Queued tasks |

### Archive
- [[memory/2026-04-17|Apr 17]] | [[memory/2026-04-16|Apr 16]] | [[memory/2026-04-15|Apr 15]] | [[memory/2026-04-14|Apr 14]]

## 📈 Trading (Your Focus)

| File | Purpose |
|------|---------|
| [[kb/stocks/trade-log|Trade Log]] | All executed trades |
| [[portfolio.md|Portfolio]] | Current positions |
| [[kb/stocks/rules|Trading Rules]] | Strategy & rules |
| [[kb/stocks/research/morning-research|Morning Research]] | Daily picks |
| [[kb/stocks/research/alert-status|Alert Status]] | Active price alerts |

### Research
- [[kb/stocks/research/volatile-stocks|Volatile Stocks]] - Day trade candidates
- [[kb/stocks/research/day-trading-options|Day Trading + Options]]
- [[kb/stocks/research/income-strategy|Income Strategy]]
- [[kb/stocks/research/model-performance|Model Performance]]

## 📚 Guides & References

| File | Purpose |
|------|---------|
| [[robinhood-guide.md|Robinhood Guide]] | Trading setup |
| [[robinhood-alerts-guide.md|Alerts Guide]] | Price alerts setup |
| [[CONTROL-UI.md|Control UI]] | Your primary comms |
| [[Github.md|GitHub]] | Version control |
| [[content/guides/ai-trading-partner-guide.md|AI Trading Partner]] | Build your own |
| [[content/guides/handoff-prompt.md|Handoff]] | Session continuity |
| [[content/guides/checkpoint-prompt.md|Checkpoint]] | Context rescue |

### Obsidian Vault
- [[references/obsidian-guide.md|Obsidian Guide]] - Quick reference
- [[references/vyse-obsidian-workflow.md|Vyse Workflow]] - Our workflow
- [[obsidian-prototype/MIGRATION.md|Migration]] - Vault setup
- [[obsidian-prototype/daily-note-template.md|Daily Note Template]] - Daily log template

## 🔧 Custom Systems

| System | Files |
|--------|-------|
| **Session Continuity** | [[kb/system/BOOTSTRAP.md|Bootstrap]] → [[HANDOFF.md|Handoff]] → [[memory/active|Active]] |
| **Context Protection** | [[TODO.md|Todo]] → [[loop-progress.md|Loop Progress]] |
| **Health Monitoring** | Scripts in `scripts/gateway_watch.sh` |
| **Error Recovery** | [[kb/system/FIXES.md|Fixes]] - Known issues |
| **Interrupt Recovery** | [[kb/system/INTERRUPT_RECOVERY.md|Recovery]] - What we fixed |
| **Recovery Template** | [[recovery-prompt.md|Recovery Prompt]] - Session rescue |
| **Tasks** | [[TASKS.md|Tasks]] - GitHub issues |
| **Dashboard** | [[DASHBOARD.md|Dashboard]] - Visual status |
| **Dreams** | [[DREAMS.md|Dreams]] - Vision tracking |
| **Legacy** | [[loop-lessons.md|Loop Lessons]] - Old iteration system |
| **File Index** | [[ORPHANS.md|Orphans]] - Unlinked files |

## 📋 Templates

| File | Purpose |
|------|---------|
| [[obsidian-prototype/daily-note-template.md|Daily Note]] | Daily log template |
| [[obsidian-prototype/decision-log-template.md|Decision Log]] | Track decisions |

## ⚡ Quick Scripts

```bash
# Session
./scripts/generate-handoff.sh    # Save state
./scripts/checkpoint.sh          # Rescue context

# System
./scripts/vyse-unified-health.sh # Full check
./scripts/guard_context.sh       # Prevent overflow
```

---

## 📁 Content

| File | Purpose |
|------|---------|
| [[content/dreams/dream-journal-archive.md|Dream Journal]] | Vision & idea archive |
| [[Test folder for obsidian/Testing Github.md|Testing]] | Obsidian-Git test |

## 📂 Directory Map

```
VyseFiles/
├── 🎯 System/          # My identity & config
├── 🧠 Memory/          # Daily logs & decisions
├── 📈 Trading/         # Your stocks & research
├── 📚 Guides/          # How-to & references
├── 🔧 Scripts/         # Automation
├── 📋 Templates/       # Reusable templates
└── 📦 Archive/         # Old sessions
```

## 🔍 Search Tags

- `#daily` - Session logs
- `#trading` - Stock activity
- `#system` - OpenClaw config
- `#meta` - Vault management

---
*Last updated: 2026-04-20 22:16 UTC*
*Owner: Vyse (your AI trading partner)* 🦜