# Container Runbook - Superpowers Integration

*How to prepare containers for Vyse with superpowers memory system*

---

## Pre-Build (Dockerfile)

```dockerfile
# Install Python deps for superpowers scripts
RUN pip install pyyaml --break-system-packages

# Copy superpowers skills (not symlinked)
COPY --chown=openclaw:openclaw extensions/superpowers/skills/openclaw-native /home/openclaw/.openclaw/workspace-vyse/skills/superpowers-openclaw
COPY --chown=openclaw:openclaw extensions/superpowers/skills/core /home/openclaw/.openclaw/workspace-vyse/skills/superpowers-core
```

---

## Post-Start (First Run)

```bash
# 1. Copy superpowers skills to workspace (not symlinks - security)
cp -r ~/.openclaw/extensions/superpowers/skills/core/* ~/.openclaw/workspace-vyse/skills/
cp -r ~/.openclaw/extensions/superpowers/skills/openclaw-native/* ~/.openclaw/workspace-vyse/skills/

# 2. Create state directories
mkdir -p ~/.openclaw/skill-state/{session-persistence,memory-dag-compactor,memory-graph-builder,memory-integrity-checker,persistent-memory-hygiene,dag-recall}

# 3. Install Python deps
pip install pyyaml --break-system-packages

# 4. Run initial import
python3 ~/.openclaw/workspace-vyse/skills/session-persistence/persist.py --import
```

---

## Volume Mounts (Persistence)

Ensure these paths persist across container updates:

| Path | What It Contains |
|------|-------------------|
| `~/.openclaw/skill-state/` | DAG state, cron state |
| `~/.openclaw/lcm-db/` | SQLite message database |
| `~/.openclaw/workspace-vyse/memory/` | Daily memory files |
| `~/.openclaw/workspace-vyse/MEMORY.md` | Long-term memory |
| `~/.openclaw/workspace-vyse/context-vault/` | Structured vault |

---

## Cron Setup (If Available)

If container has cron daemon:

```bash
# session-persistence every 15 min
*/15 * * * * python3 ~/.openclaw/workspace-vyse/skills/session-persistence/persist.py --import >> /tmp/superpowers.log 2>&1

# memory-dag-compactor daily 11pm PT
0 6 * * * python3 ~/.openclaw/workspace-vyse/skills/memory-dag-compactor/compact.py --compact >> /tmp/superpowers.log 2>&1

# persistent-memory-hygiene daily 11pm PT
0 6 * * * python3 ~/.openclaw/workspace-vyse/skills/persistent-memory-hygiene/hygiene.py >> /tmp/superpowers.log 2>&1
```

---

## Verification

```bash
# Check skills loaded
openclaw skills list | grep -c "✓ ready"

# Check session persistence
python3 skills/session-persistence/persist.py --status

# Check DAG compactor
python3 skills/memory-dag-compactor/compact.py --status

# Test search
python3 skills/session-persistence/persist.py --search "AMC"
```

---

## Our Hybrid Memory System

| Component | What We Keep | What Superpowers Adds |
|-----------|--------------|----------------------|
| **MEMORY.md** | ✅ Manual writes | ✅ Auto-summaries |
| **memory/*.md** | ✅ Daily raw | ✅ DAG hierarchy |
| **context-vault/** | ✅ Our structure | ✅ Search |
| **Trading** | ✅ HEARTBEAT | ✅ Backup search |

---

*Last updated: 2026-05-11*