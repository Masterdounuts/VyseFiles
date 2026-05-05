# BOOT.md - Gateway Restart Recovery

*Runs automatically when gateway restarts*

## On Gateway Start
Run the session handoff to recover previous state:
```bash
bash /home/openclaw/.openclaw/workspace-vyse/scripts/session-start-handoff.sh
```

## What This Does
1. Loads HANDOFF.md (previous session summary)
2. Injects memory/core/ (user.md, goals.md, contacts.md)
3. Appends handoff to MEMORY.md for bootstrap
4. Runs memory recall for important info

## Verify
After running, check:
- `active.md` should have "RECOVERED" in title
- `memory/core/` files should be loaded