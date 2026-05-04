name: system-admin
description: Server and system administration - networking, processes, services. For RON-level self-sufficiency.
trigger phrases: "server, process, service, network, system admin"

# System Admin Skill

## Content-Based Leveling

**Formula:** Level = sections + subsections + lines/100
**Tier:** Supporting (75 max)

### Current: Level 22
- Sections: 8
- Subsections: 14
- Lines: 75 / 100 = 0
- Total: 8 + 14 + 0 = 22

## Quick Diagnostics

### System Resources
```bash
# CPU, memory, load
top -n 1
free -h
df -h
uptime
```

### Process Management
```bash
# Find process
ps aux | grep openclaw

# Kill process
kill <pid>

# Service status
systemctl status openclaw
```

### Networking
```bash
# Check ports
ss -tulpn | grep 18789

# Test connectivity
curl -s http://127.0.0.1:18789
```

### Logs
```bash
# System logs
journalctl -u openclaw --since "1 hour ago"

# OpenClaw logs
tail -f ~/.openclaw/logs/gateway.log
```

## Service Management

```bash
# Status
openclaw gateway status

# Restart
openclaw gateway restart
```

## Trigger Phrases
- "server", "process", "service"
- "network", "system admin"

### References
- exec - Diagnostics
- cron - Scheduling
