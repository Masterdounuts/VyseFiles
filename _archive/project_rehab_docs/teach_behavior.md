# TEACH / CHANGE BEHAVIOR - Project Rehab

Source content: markdowns.md
# INSERTION RULES (Idempotent)
Before inserting any content into soul.md, tools.md, or agents.md:
1. Check whether the exact text already exists.
2. If it exists → do not insert again.
3. If a partial or conflicting version exists → log to Flag.md.
4. Insert new content by appending to the bottom of the file under a header named after the module:
   Example:
   ## From teach_behavior module
   [inserted content]
Steps:
1. Add "Tool Awareness" → soul.md
2. Review soul.md for conflicts with Tool Awareness
   - Log issues to Flag.md
   - If none: "no conflicts found in soul"
3. Add "Tool Handling" → tools.md
4. Review tools.md for conflicts with Tool Handling
   - Log issues to Flag.md
   - If none: "no conflicts found in tools"
5. Add “Tool Reference” -> agents.md
6.  Review agents.md for conflicts, misunderstanding or duplication with Tool Reference
  -Log issues to Flag.md
  - If none: “No problems found in agents”
# UPDATE STATE
current_module: teach_behavior
last_completed_step: Prep completed, logs created
status: running
last_updated: [timestamp]
Log Summary before continuing.

Confirm state.md has been updated before proceeding.

Pause +Prompt User:
"Tool awareness installed, any conflicts logged. Continue or Stop
