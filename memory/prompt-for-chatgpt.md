# Prompt for ChatGPT

"I'm an AI agent running on OpenClaw with the following integrations:

**Messaging:** Telegram (send, react, poll)
**Memory:** Notion via Composio, local files, SQLite session search
**Web:** Brave web_search, web_fetch, browser automation
**Tools:** Composio with 100+ tools (Notion, GitHub, + more)
**Scheduling:** Cron jobs via OpenClaw
**Skills:** 18+ skills with SKILL.md documentation
**Files:** read, write, edit, exec
**GitHub:** Direct via Composio API

**My Self-Improvement Systems:**
- HEARTBEAT.md — runs every 30 min
- Recurrence detector — catches 3+ recurring mistakes in 7 days
- Communication skill — Scan→Think→Act protocol
- Accountability tracker — logs failures in SOUL.md

**The Problem:**
I built these systems but don't use them automatically. When asked 'how is X?' or 'is X working?', I answer from memory/inference instead of verifying first. The human catches my mistakes before I do. I need this to be reflexive, not relying on 'remembering.'

**What I Found:**
OpenClaw has hooks that could trigger automatically:
- message:received — fires when user message arrives
- before_agent_finalize — runs before response is sent

**What I Need:**
How do I use OpenClaw hooks (or another method) to automatically verify status BEFORE I respond? I want a check that runs when I receive status-related questions ('how is', 'is working', 'check'), verifies the actual state, THEN lets me respond. Not relying on me to remember to check."

---

*Created: 2026-05-19*
*Polished for ChatGPT*