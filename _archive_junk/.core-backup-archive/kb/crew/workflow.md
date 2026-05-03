# Crew Workflow

## Subagent Session Rule
**When subagent task completes:**
1. Read output from session file
2. Report result to David
3. **Clear subagent session** (delete .jsonl files in agents/[name]/sessions/)
4. Save any needed data to memory

**Why:** Stale session data causes old context - clearing keeps things clean.
