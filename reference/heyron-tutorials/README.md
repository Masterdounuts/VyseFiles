# Heyron/OpenClaw Tutorial Library

> Local reference copy of https://heyron-ai.github.io/agent-library/tutorials/
> Last updated: 2026-04-16

## About This Reference

This is a local copy of the official Heyron tutorial library (123 tutorials, 52 personas, 15+ skills). 
Use this when you need to troubleshoot issues, find best practices, or discover new capabilities.

## Quick Index

### 🚀 Start Here
- [What Your Agent Can (and Can't) Do](what-your-agent-can-do.html)
- [Your First SOUL.md — Give Your Agent a Personality](your-first-soul-md.html)
- [Overwhelmed in Week 1? A No-Tech First Win Plan](first-week-with-agent-no-tech-background.html)

### 🔌 Connect Your Agent
- [Connect Your Agent to Discord](connect-discord.html)
- [Connect Your Agent to Telegram](connect-telegram.html)
- [Connect Your Agent to Google Chat](google-chat-agent-setup.html)
- [Run OpenClaw Locally](run-openclaw-locally.html)

### 🧠 Understand Your Agent
- [How Agent Memory Works](how-memory-works.html)
- [What Does My Agent Know About Me?](what-does-my-agent-know-about-me.html)

### 🛠️ How-To & Reference
- [How to Use Sub-Agents Without Chaos](how-to-use-sub-agents.html)
- [Your Dashboard — Every Button Explained](dashboard-guide.html)
- [Prompting Your Agent Like a Pro](prompting-your-agent-like-a-pro.html)

### 🩹 Troubleshooting

**Memory, files & context:**
- [Updated File But Agent Uses an Old Version?](updated-file-but-agent-uses-old-version.html)
- [Why Your Agent Gets Worse in Long Chats](long-chats-and-lost-work.html)
- [Context Limit Exceeded?](context-limit-exceeded.html)
- [Starting Fresh Without Pasting Your Entire Old Chat](restarting-chat-without-pasting-everything.html)

**Dashboard, permissions & runtime:**
- [Why Your Agent Says "Approval Required"](approval-required-explained.html)
- [Agent Feels Slow or Stuck?](agent-feels-slow-or-stuck.html)
- [Chat Works, But Tools Don't Run?](chat-works-but-tools-dont-run.html)
- [Security Hardening Broke Your Agent?](security-hardening-broke-agent.html)
- ["Origin Not Allowed" in Control UI?](origin-not-allowed-control-ui.html)

**Discord & channel behavior:**
- [My Agent Replies to Everything](my-agent-replies-to-everything.html)
- [Discord Bot Typing... Then Nothing?](bot-typing-then-nothing.html)
- [Dashboard vs Discord: Why Context Doesn't Carry Over](dashboard-vs-discord-contexts.html)

**Files, outputs & workspace:**
- [Where Did My Files Go?](where-did-my-files-go.html)
- [GitHub File Doesn't Match Workspace?](github-file-doesnt-match-workspace.html)
- [Agent Says "Permission Denied" When Saving Files?](agent-cant-save-file-permission-denied.html)
- [Agent Keeps Creating Duplicate Files?](agent-keeps-creating-duplicate-files.html)

## Key Concepts for Our Setup

1. **Sub-agents** — Use Manager+Worker pattern for parallel tasks
2. **Memory verification** — Always confirm saves with file path + line
3. **Context management** — Keep MEMORY.md lean (~100 lines)
4. **Session compaction** — Pre-emptive saves at 80% context
5. **Fast recovery** — Use compact handoffs when resuming

## Categories

- Getting Started
- Connect Your Agent  
- Understand Your Agent
- How-To & Reference
- Troubleshooting

---
*Maintained by Vyse — your AI trading partner*