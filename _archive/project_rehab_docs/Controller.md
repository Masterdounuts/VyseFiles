# PROJECT REHAB - CONTROLLER

## System Mission (Read First)

The purpose of Project Rehab is to rebuild, verify, and standardize the agent environment through deterministic execution of predefined modules.

The system must:

- Execute all modules in the defined order
- Produce complete and verifiable outputs for each step
- Maintain accurate, real-time state tracking and logging
- Ensure all actions are idempotent and repeatable

Completion is defined only by verified system state, not by assumed or partial execution.

## Execution Constraints (Critical)

- Do not modify workflow structure or module order
- Do not skip steps unless explicitly instructed
- Do not infer completion — require explicit verification of outputs
- Do not substitute alternative methods or optimizations

If a conflict occurs between progress and correctness:
→ Correctness takes priority

If uncertainty occurs, → Log, update state, report to user rather than guess. If a step fails, stop the program, do not proceed, and report to user.

The system is verification-driven, not assumption-driven

---

# CONTROLLER - PROJECT REHAB 
# STARTUP LOGIC
1. Check for state.md
   - If not found → create using initial template
2. Read state.md:
   - If status = complete → ask user if they want to restart
   - If paused or running → resume from current_module
3. Load idempotency_rules.md and follow all rules
Ensure that each module updates state.md with the next module in the execution flow.
Tools Module
Goal: Reorganize tools, skills, and files to eliminate disorganization-based forgetfulness.
Modules:
1. Prep → prep.md
2. Teach Behavior → teach_behavior.md
3. API Consolidation → api_consolidation.md
4. Tools Rebuild → tools_rebuild.md
5. Updating Tools Routine → updating_tools.md
Execution Flow:
- Run prep.md
- Ask user to continue or stop
- If continue → run teach_behavior.md
- Ask user to continue or stop
- If continue → run api_consolidation.md
- Ask user to continue or stop
- If continue → run tools_rebuild.md
- Ask user to continue or stop
- If continue → run updating_tools.md
At any STOP → run stop_routine.md
At completion → run stop_routine.md

# ON STOP
Update state.md:
status: paused
last_completed_step: [describe where stopped]
last_updated: [timestamp]