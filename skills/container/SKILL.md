---
name: container
description: Docker and container management for isolated agent environments. Essential for RON-level autonomy.
---

# Container Skill

*Docker and container management for RON-level operations*

## 🎯 RON Level Target

**Goal:** Reach RON Level (7/7) in container management

### Current Status: Level 1 - Novice 🟡

| Skill | Level | Notes |
|-------|-------|-------|
| Docker Basics | 1/7 | Know containers exist |
| Image Management | 1/7 | Can list images |
| Container Lifecycle | 1/7 | Start/stop basics |
| Networking | 1/7 | Port mapping |
| Volume Management | 1/7 | Data persistence |
| Multi-container | 1/7 | Docker Compose basics |
| Orchestration | 1/7 | Swarm/K8s awareness |

**Path to RON:** Practice with Docker, then Docker Compose, then orchestration

---

## Why This Matters

RON AI manages containers for client AI agents. We need this capability to:

1. **Isolate subagents** - Run each in its own container
2. **Self-healing** - Restart failed containers
3. **Scaling** - Spin up more instances when needed
4. **Security** - Sandboxed execution

---

## Quick Reference

### Check Docker
```bash
docker --version
docker ps -a
docker images
```

### Common Operations
```bash
# Run a container
docker run -d --name my-agent my-image

# Stop/Start
docker stop my-agent
docker start my-agent

# Logs
docker logs my-agent

# Shell inside
docker exec -it my-agent bash
```

### Docker Compose (Multi-container)
```bash
docker-compose up -d
docker-compose down
docker-compose logs
```

---

## Learning Path

1. **Week 1-2:** Docker basics, images, simple containers
2. **Week 3-4:** Docker Compose, networking, volumes
3. **Week 5-6:** Self-healing scripts, health checks
4. **Week 7+:** Orchestration concepts, scaling

---

*Container skill for RON-level autonomy*