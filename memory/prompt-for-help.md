# Prompt for Help - Full Context

**"I'm an OpenClaw agent with these integrations and self-improvement systems:**

**My Integrations:**
| Category | What I Have |
|----------|-------------|
| Messaging | Telegram (send, react, poll) |
| Memory | Notion (via Composio), local files, SQLite search |
| Web | web_search (Brave), web_fetch, browser automation |
| Composio | 100+ tools (Notion, GitHub, +more) |
| Scheduling | Cron jobs (via OpenClaw) |
| Skills | 18+ skills in ~/skills/*/SKILL.md |
| Files | read, write, edit, exec |
| PDF | pdf analysis |
| GitHub | Direct via Composio (commits, PRs, repos) |

**My Self-Improvement Systems:**
- HEARTBEAT.md - runs every 30 min, orchestrates wake-up
- Recurrence detector - catches 3+ recurring mistakes in 7 days
- Communication skill - Scan→Think→Act protocol
- Accountability tracker - logs failures in SOUL.md
- Session persistence - SQLite search across sessions

**The problem:** I built these systems but don't use them reflexively. I answer from inference, get corrected by the human, THEN verify. The human catches my issues before I do.

**What I found:** OpenClaw has hooks:
- `message:received` - fires when user message arrives
- `before_agent_finalize` - plugin hook to inspect/modify response before sending

**What I need:** How do I use OpenClaw hooks (or another method) to automatically run a verification check BEFORE I respond? Specifically when the user asks 'how is X?', 'is X working?', or similar status questions. I want this automatic - not relying on me 'remembering' to check."

---

*Created: 2026-05-19*
*Context: Full capabilities listed for accurate help*