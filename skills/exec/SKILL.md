---

name: exec
always: true
trigger phrases: "command, shell, exec, run, terminal, bash"
description: Shell command execution, sandbox, PTY, and background processes.

# Exec - Shell Execution

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 20
- Sections: 10
- Subsections: 10
- Lines: 81 / 100 = 0
- Total: 10 + 10 + 0 = 20

## Core Parameters

| Parameter | Use | Example |
|-----------|-----|---------|
| `command` | What to run | `grep -r "TODO" .` |
| `workdir` | Working directory | `workdir: "/home/user"` |
| `timeout` | Max seconds | `timeout: 30` |
| `background` | Run in background | `background: true` |
| `yieldMs` | Auto-background after ms | `yieldMs: 10000` |
| `pty` | Pseudo-terminal | `pty: true` |
| `host` | Where to run | `host: "sandbox\|gateway"` |
| `security` | Security mode | `security: "deny"` |

## Host Options

| Host | When to Use |
|------|-------------|
| `auto` | Default |
| `sandbox` | Isolated (safe) |
| `gateway` | On gateway |
| `node` | On paired device |

## Background Execution

```json
{
  "command": "long-running.sh",
  "background": true
}
```

**Manage with process tool:**
- `list` - List running
- `poll` - Check output
- `kill` - Stop

## When to Use PTY

Use `pty: true` when:
- Terminal UI (vim, less)
- Interactive CLI
- Coding agents need TTY

## Common Commands

```bash
# File ops
ls -la ~/.openclaw/workspace/
grep -r "pattern" .
find . -name "*.md"

# Git
git status
git add -A && git commit -m "msg"
git push origin main

# OpenClaw
openclaw status
openclaw cron list
```

### References
- system - Diagnostics
- workflow - Process
