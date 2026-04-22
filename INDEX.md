[[INDEX.md|Home]]

# VyseFiles Index

Your knowledge base + my operating system. Organized by context.

---

## 📂 Categories

| Hub | Description |
|-----|-------------|
| [[kb/system/hub-system|System]] | Bootstrap, memory, recovery |
| [[kb/stocks/hub-portfolio|Portfolio]] | Trading & research |
| [[knowledge|Knowledge]] | Research & guides |
| [[memory/hub-archive|Archive]] | Dated memories |
| [[projects|Projects]] | Active work |

---

## 🎯 System (Priority)

| File | Purpose |
|------|---------|
| [[kb/system/BOOTSTRAP.md|Bootstrap]] | Wake-up protocol |
| [[kb/system/FIXES.md|Fixes]] | Known issues & solutions |
| [[kb/system/INTERRUPT_RECOVERY.md|Recovery]] | Interrupt recovery |

## 🦜 Personality (Priority)

| File | Purpose |
|------|---------|
| [[SOUL.md|Vyse Soul]] | My core principles & vibe |
| [[IDENTITY.md|Identity]] | Name, avatar, character |
| [[USER.md|User]] | Your prefs & how you like to communicate |
| [[AGENTS.md|Agents]] | Trading protocol |
| [[SUBAGENTS.md|Subagents]] | Spawning agents |

## 🧠 My Memory

| Hub | Purpose |
|-----|---------|
| [[memory/hub-archive|Archive Hub]] | All dated memories & daily logs
| [[memory/active|Active Task]] | Current work
| [[PENDING.md|Pending]] | Queued tasks

### Quick Access
- [[memory/hub-archive|Archive Hub]] - Browse all sessions
- [[kb/system/DECISIONS.md|Decisions]] - Key decisions

## 📈 Trading (Your Focus)

| File | Purpose |
|------|---------|
| [[kb/stocks/trade-log|Trade Log]] | All executed trades |
| [[portfolio.md|Portfolio]] | Current positions |
| [[kb/stocks/rules|Trading Rules]] | Strategy & rules |
| [[kb/stocks/research/morning-research|Morning Research]] | Daily picks |
| [[kb/stocks/agent/README.md|Stock Agent]] | Price monitoring |

### Research
- [[kb/stocks/research/volatile-stocks|Volatile Stocks]] - Day trade candidates
- [[kb/stocks/research/archive/day-trading-options|Day Trading + Options]] *(archived)*
- [[kb/stocks/research/archive/income-strategy|Income Strategy]] *(archived)*
- [[kb/stocks/research/archive/model-performance|Model Performance]] *(archived)*

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
| **Context Protection** | [[TODO.md|Todo]] → [[memory/active|Active]] |
| **Health Monitoring** | Scripts in `scripts/gateway_watch.sh` |
| **Error Recovery** | [[kb/system/FIXES.md|Fixes]] - Known issues |
| **Interrupt Recovery** | [[kb/system/INTERRUPT_RECOVERY.md|Recovery]] - What we fixed |
| **Recovery Template** | [[recovery-prompt.md|Recovery Prompt]] - Session rescue |
| **Tasks** | [[TASKS.md|Tasks]] - GitHub issues |
| **Dashboard** | [[DASHBOARD.md|Dashboard]] - Visual status |
## 💭 Dreams & Vision

| File | Purpose |
|------|---------|
| [[DREAMS.md|Dreams Hub]] | Main dream index |
| [[memory/archive/DREAMS.md|Dream Diary]] | Full journal entries |
| [[content/dreams/dream-journal-archive.md|Vision Archive]] | Long-term goals & income |

### Quick Links
- [[memory/archive/dream-journal.md|Early Entries]] - First test dreams
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