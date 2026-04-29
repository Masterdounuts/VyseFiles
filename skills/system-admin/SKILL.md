---
name: system-admin
description: Server and system administration - networking, processes, services. For RON-level self-sufficiency.
trigger phrases: "server, process, service, network, system admin"
---

# System Admin Skill

*Server and system administration for autonomous operations*

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in system administration

### Current Status: Level 3 - Competent 🟡🟡🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Process Management | 3/7 | Can list processes, identify running services (drill verified) |
| Networking | 1/7 | Basic port checks |
| Service Management | 2/7 | systemd basics |

**Note:** Level 3 achieved via drill execution - verified process listing works.
| Logs | 2/7 | Can read system logs |
| Security | 1/7 | Basic firewall awareness |
| Backups | 1/7 | Hasn't implemented |
| Performance | 1/7 | Needs monitoring |

**Path to RON:** Full server administration capability

---

## Why This Matters

RON handles server operations. We need to:

1. **Monitor resources** - CPU, memory, disk
2. **Manage services** - Start/stop/restart
3. **Handle networking** - Ports, firewalls
4. **Log management** - Rotate, analyze
5. **Backups** - Data protection

---

## Quick Diagnostics

### System Resources
```bash
# CPU, memory, load
top -n 1
free -h
df -h

# Uptime
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

---

## Service Management

### OpenClaw Service
```bash
# Status
openclaw gateway status

# Restart
openclaw gateway restart

# Or via systemd
systemctl --user restart openclaw
```

---

## Backups (To Implement)

### Key Files to Backup
- `~/.openclaw/openclaw.json` - Config
- `~/.openclaw/workspace/` - Workspace
- `~/.openclaw/keys/` - Keys (if any)

### Backup Strategy
- Daily: Config + workspace
- Weekly: Full archive

---

## Security Basics

### Check Firewall
```bash
# UFW status
sudo ufw status

# Check open ports
sudo ss -tulpn
```

### Update System
```bash
# Package updates
sudo apt update && sudo apt upgrade -y
```

---

## Trigger Phrases
- "system admin"
- "update system"
- "apt upgrade"
- "server maintenance"
- "sudo"

---

*System admin for RON-level autonomy*