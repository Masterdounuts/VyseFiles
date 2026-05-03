# PROJECT REHAB - FLAG.md
Issues requiring user attention, conflicts, duplicates, uncertainties.

---
## Entries

### 2026-05-03 04:07 UTC
- **Rehab started** (restarted by user)

### 2026-05-03 04:08 UTC
- **teach_behavior module**: All insertions already present (idempotent)
  - soul.md: Tool Awareness found (line 247)
  - tools.md: Tool Handling found (line 10)
  - agents.md: Tool Reference found (line 125)
  - **No conflicts found**

### 2026-05-03 04:10 UTC
- **api_consolidation module**:
  - Found: GitHub token in .git/config
  - Action: Copied to .env as GITHUB_TOKEN
  - .git/config still contains token (do NOT delete originals per rules)

### 2026-05-03 04:11 UTC
- **tools_rebuild module**:
  - skills/github/ exists ✓
  - Added GitHub to tools.md index

### 2026-05-03 04:13 UTC
- **updating_tools module**:
  - UPDATING_SKILLS.md reference already in tools.md (line 14)
  - No changes needed (idempotent)
