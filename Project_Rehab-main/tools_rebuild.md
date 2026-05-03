# TOOLS & SKILLS REBUILD -Project Rehab

- Ensure /skills exists
# TOOL NAMING RULES
Map each .env variable to its corresponding tool/service name:

| .env Variable | → Skill Folder |
|---------------|----------------|
| *_API_KEY | skills/<service_name>/ |
| *_TOKEN | skills/<service_name>/ |

Generic examples:
- ELEVENLABS_API_KEY → skills/elevenlabs/
- GITHUB_TOKEN → skills/github/
- DISCORD_BOT_TOKEN → skills/discord/

For each unique SERVICE (not each .env variable):
  - Create skills/<service_name>/
  - Use the mapped tool name, not the raw variable name
Inside each tool folder:
- skill_tool_name.md → purpose + usage
- docs/ → extended documentation (if available)
Rules:
- Do NOT delete old files
- Log duplicates or unclear items to Flag.md
QUALITY CHECK:
- Confirm all tools captured
- Look for:
  - browsers
  - databases
  - communication tools
  - storage systems
  - APIs
- Add all tools to tools.md index section
# UPDATE STATE
current_module: updating_tools
last_completed_step: Tools and skills rebuild complete (skills folders created/verified, tools indexed)
status: running
last_updated: [timestamp]

Log Summary before continuing.
Confirm state.md has been updated before proceeding.
Pause and Prompt user:
"Tools rebuilt, log updated. Continue or Stop?"
