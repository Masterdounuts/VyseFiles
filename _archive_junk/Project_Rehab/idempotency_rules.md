# IDEMPOTENCY RULES Project Rehab
Purpose:
Ensure all actions are safe to repeat without duplication or corruption.
---
# GLOBAL RULES
1. NEVER duplicate:
   - .env entries
   - skills folders
   - tool index entries

2. BEFORE creating anything:
   - check if it already exists
3. IF something exists:
   - verify correctness
   - update if needed
   - do NOT recreate
4. LOG instead of overwrite:
 - conflicting files → Flag.md
   - unclear cases → Flag.md
---
# SPECIFIC RULES
## .env
- Do not duplicate keys
- If key exists → skip
- If conflicting values → log both
## skills folders
- If folder exists → verify contents
- Do not recreate
- Only add missing pieces
## markdown inserts
- Do not duplicate sections
- Check if section already exists before adding

## logs
- Always append, never overwrite
---
# PRINCIPLE
"Safe to run twice without breaking anything"
