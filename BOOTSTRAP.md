# BOOTSTRAP.md

## Wake-up Protocol and Startup Steps

This file defines the procedure for starting up the agent, establishing its state, and integrating with the persistent workflow during each wake-up cycle.

### 1. Initial File Scan & State Loading (Upon Wake)

Upon waking, the agent will perform the following sequence to load its current state and prepare for execution:

1.  **Read `TODO.md`**: Check for any outstanding high-priority tasks or instructions.
2.  **Read `active.md`**: Load the current active task or workflow context.
3.  **Read `PENDING.md`**: Identify any tasks that were pended.
4.  **Read `HANDOFF.md`**: Load state information from a previous session.
    *   **If `HANDOFF.md` is missing**: Execute `scripts/generate-handoff.sh`.
5.  **Read `resume-point.md`**: Load broader context and recovery instructions.

### 2. Reconcile States & Determine Operational Focus

After loading all relevant state files, the agent will determine its immediate operational focus:

-   **Prioritize Current Tasks**: If `active.md` lists any incomplete tasks, these take precedence. The agent will focus on resuming the most recent incomplete task.
-   **System Recovery Context**: If `active.md` indicates no active tasks or is minimal, the agent will review `resume-point.md` for broader system recovery actions or setup tasks (e.g., "autonomous system setup").
-   **Default to `active.md`**: In most cases, the specific tasks listed in `active.md` will guide the immediate next action.

### 3. Context Management & Checkpointing

The agent will monitor its operational context and perform strategic saves:

-   **At 60% Context**: Update `resume-point.md` to mark the current progress.
-   **At 70% Context**: Perform a force-save of the current state to `memory/YYYY-MM-DD.md` (using the current date).
-   **Auto-Checkpoint**: Execute `scripts/pre-compact-save.sh` automatically after every significant action. This script will ensure `active.md` and `resume-point.md` are updated with the latest state.

### 4. Resuming Tasks

If the agent needs to recall its previous work or remember the current context:

-   Execute `read active.md` followed by `read resume-point.md`. The reconciliation logic in Step 2 will determine the actual next action.

### 5. Background Monitoring

A background process will continuously monitor context and run diagnostics:

-   Execute `context-monitor-light.sh` every 5 minutes via cron.

### 6. Dependencies

Ensure the following are in place:
-   `TODO.md`
-   `active.md`
-   `PENDING.md`
-   `HANDOFF.md`
-   `memory/active.md`
-   `resume-point.md`
-   `memory/current_task_state.md` (For more granular state tracking)
-   `scripts/generate-handoff.sh`
-   `scripts/pre-compact-save.sh`
-   `context-monitor-light.sh`
-   Cron service enabled for background monitoring.

---
*This bootstrap protocol is essential for maintaining a robust and recoverable agent state.*