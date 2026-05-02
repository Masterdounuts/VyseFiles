---
name: exec
always: true
description: Shell command execution, sandbox, PTY, and background processes.
---

# Exec - Shell Execution

*How we run shell commands in the workspace*

---

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in shell execution

### Current Status: Level 7 - RON ⭐ 🟡🟡🟡🟡🟡

**XP:** 50/50 (next level at 50)

| Skill | Level | Notes |
|-------|-------|-------|
| Basic Commands | 4/7 | Runs daily, git, grep, ls, etc. |
| Background | 4/7 | Uses background/yieldMs, process tool |
| Sandbox | 3/7 | Knows host options, security modes |
| PTY | 3/7 | Knows when to use pty=true |
| Troubleshooting | 4/7 | Uses memory_search for FIXES, gateway/system for diagnostics |

**Path to RON:** Expert-level exec, all security modes

### Dynamic Max Expansion

### Cross-Pollination
- **pattern-recognition** → +3 XP (detecting patterns)
- **learning** → +3 XP (documenting discovery)
- **crew-protocols** → +3 XP (communication)

### Tools Used
- **exec** - Shell command execution (primary)
- When to use: Shell features (pipes, glob, env vars)
- vs alternatives: Use exec for shell; use native tools when available

**Max Level:** 222

| Discovery | Adds To |
|------------|--------|
| New discovery | +1 to exec |

**Note:** Dropped from 6→5 - haven't proven teaching ability yet.

---

### HEYRON Level Insight

> **Q:** "When should I use exec vs. tools?"
>
> **A:** "Use exec when you need shell features (pipes, glob, env). Use tools when OpenClaw has a dedicated tool."

**Key Takeaway:** Shell is for shell features; use native tools when available.

---

## Core Parameters

| Parameter | Use | Example |
|-----------|-----|---------|
| `command` | What to run | `grep -r "TODO" .` |
| `workdir` | Working directory | `workdir: "/home/user"` |
| `env` | Environment vars | `env: { "KEY": "val" }` |
| `timeout` | Max seconds (default 1800) | `timeout: 30` |
| `background` | Run in background | `background: true` |
| `yieldMs` | Auto-background after ms | `yieldMs: 10000` |
| `pty` | Pseudo-terminal | `pty: true` |
| `host` | Where to run | `host: "sandbox\|gateway\|node\|auto"` |
| `security` | Security mode | `security: "deny\|allowlist\|full"` |
| `elevated` | Escape sandbox | `elevated: true` |

---

## Host Options

| Host | When to Use |
|------|-------------|
| `auto` | Default - sandbox if active, else gateway |
| `sandbox` | Isolated execution (safe default) |
| `gateway` | On the gateway host |
| `node` | On a paired node device |

---

## Security Modes

| Mode | What It Does |
|------|--------------|
| `deny` | Block gateway/node exec (default) |
| `allowlist` | Only approved commands |
| `full` | Allow everything |

---

## Background Execution

**Start in background:**
```json
{
  "command": "long-running-task.sh",
  "background": true
}
```

**Or auto-background after delay:**
```json
{
  "command": "some-task.sh",
  "yieldMs": 5000
}
```

**Manage with process tool:**
- `process action=list` - List running sessions
- `process action=poll sessionId=xxx` - Check output
- `process action=kill sessionId=xxx` - Stop

---

## PTY (Pseudo-Terminal)

Use `pty: true` when:
- Terminal UI (vim, nano, htop)
- Interactive CLI (top, less)
- Coding agents that need TTY
- Commands that check $TERM

**When NOT needed:**
- Simple one-liners
- Non-interactive scripts
- Automated pipelines

---

## Common Commands We Use

### File Operations
```bash
ls -la ~/.openclaw/workspace/
find . -name "*.md"
grep -r "pattern" .
cat file.md | head -20
```

### Git
```bash
git status
git add -A
git commit -m "message"
git push origin main
git diff origin/main
```

### System
```bash
openclaw status
openclaw gateway status
openclaw cron list
```

### Scripts
```bash
bash scripts/auto-checkpoint-new.sh
bash scripts/git-sync.sh
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Timeout | Increase `timeout` or use background |
| Permission denied | Check `host` and `security` |
| Command not found | Use full path or check $PATH |
| "exec tool not allowed" | Security mode blocks it |
| No TTY output | Add `pty: true` |

---

## Best Practices

1. **Use native tools first** - cron, gateway, sessions_list, etc.
2. **Set timeout** - Don't let commands run forever
3. **Use background** - For long tasks, don't block
4. **Prefer sandbox** - Safer than gateway
5. **Check $?** - Exit codes matter
6. **Quote properly** - Avoid shell injection

---

## Trigger Phrases
- "run command", "execute", "bash"
- "shell", "terminal", "exec"
- "background", "process"
- "timeout", "permission"
### References
- learning - Improvement
- system - Health
- accountability - Goal alignment

---

## Chain Drill Discovery (2026-05-02) - Rotation 3/7

### The Drill Connection
This skill was exercised in rotation 3/7
- Gained +5 XP from drill action
- Cross-pollination gave +3 to related skills
- Discovery: Every skill connects to the growth web

### Cross-Pollination Network
- This skill → pattern-recognition: +3
- This skill → related skills: +3 via cross-pollination
- Pattern-recognition is the hub, but ALL skills grow together

### The Growth Insight
**Drill + Discovery = Real Growth**
- Drill without content: empty XP
- Drill with discovery: actual knowledge added
- This is why every drill documents discoveries

---

*Auto-added by chain drill rotation 3/7*

