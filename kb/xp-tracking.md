# Skill XP & Level Tracking

*Automatic XP system - levels up based on actions, NOT fixed ceiling*

## Dynamic Max System
- **Max level is NOT fixed at 7** - it expands with discoveries
- Current max: 15 (will grow as we learn more)
- No skill is truly "maxed" - there's always room to grow

## XP Thresholds (Aligned with Heyron AI Architecture)
| Level | XP Required | What It Means |
|-------|-------------|---------------|
| L1 | 10 | Can perform basics |
| L2 | 20 | Improved capability |
| L3 | 30 | Solid foundation |
| L4 | 40 | Strong skill |
| L5 | 50 | Advanced user |
| L6 | 60 | Expert |
| L7-L9 | 70-90 | Can TEACH individuals (like Heyron user) |
| L10-L12 | 100-120 | **RON** - Manage 10-50 agents (orchestrator level) |
| L13-L15 | 130-150 | **RON+** - Production: 100+ agents, 100% uptime |

## RON Definition (from heyron.ai research - Mar 2026)
- **Heyron AI**: Beta platform with 1,850+ active agents
- **Multi-agent orchestration**: Orchestrator manages specialized sub-agents
- **Patterns**: Hub-and-spoke, pipeline, hierarchical, event-driven
- **RON** = Can coordinate 10-50+ agents like Heyron's orchestrator
- **RON+** = Production-level with 100+ agents, self-healing

## Heyron-Style Architecture We Have
- **Orchestrator** (me/Vyse) - manages workflow
- **Sub-agents**: Quartermaster (trading), Scribe (knowledge), Shipwright (health)
- **Task delegation**: Each specialized for their domain
- **Isolated contexts**: Each sub-agent has own workspace

## Web Research Tools (Parallel)
| Tool | Use | Status |
|------|-----|--------|
| web_search | Find info (Gemini + Google) | ✅ Working |
| web_fetch | Read page content | ✅ Available |
| browser | Automate interactions | ⚠️ Remote server issues |
| wiki-search.sh | Fallback (Wikipedia API) | ✅ Ready |

## Current Skills (Dynamic - will grow)

| Skill | XP | Level | Max |
|-------|-----|-------|-----|
| control-ui | 65 | 6 | 15 (dynamic) |
| shipwright | 70 | 7 | 15 (dynamic) |
| trading | 60 | 6 | 15 (dynamic) |
| knowledge | 70 | 7 | 15 (dynamic) |
| skill-creator | 70 | 7 | 15 (dynamic) |

*Note: No skill is truly "maxed" - max is 15 now, will grow*