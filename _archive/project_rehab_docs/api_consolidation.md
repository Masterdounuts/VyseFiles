# API CONSOLIDATION Project Rehab

# SECRET SCANNING RULES
Scan only the following file types:
- .env
- .json
- .yaml / .yml
- .toml
- .ini
- .md
- .txt
Use these detection patterns:
- KEY=VALUE pairs
- strings containing “token”, “secret”, “api”, “key”, “auth”
- URLs containing embedded credentials
- JSON fields containing “key”, “token”, “secret”, “auth”
Ignore:
- node_modules
- .git
- /logs
Ensure root .env exists (create if not)
Scan workspace for:
  - API keys
  - tokens
  - URLs
  - secrets
Rules:
- Do NOT EVER delete originals
- Copy into .env using:
  SERVICE_NAME=VALUE
- If identical duplicates are found:
 - log both paths in Flag.md 
-If two different entries for same tool are found, do not copy either one
- If secrets stored elsewhere than .env:
  - log file path for possible deletion
# UPDATE STATE
current_module: tools_rebuild
last_completed_step: API consolidation complete (.env updated, conflicts logged)
status: running
last_updated: [timestamp]
Log Summary before continuing.
Confirm state.md has been updated before proceeding.
Pause and Prompt user:
"API keys consolidated, Summary logged. Continue or Stop?"
