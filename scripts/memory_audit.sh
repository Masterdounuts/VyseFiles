#!/usr/bin/env bash
# memory_audit.sh – Daily audit of memory persistence and lesson capture
# Purpose: ensure all memory writes are logged, detect duplicate sections, and verify
# that pre‑compaction flushes have been performed.

MEMORY_DIR="/root/.openclaw/workspace/memory"
TODAY=$(date -u +"%Y-%m-%d")
LOG_FILE="${MEMORY_DIR}/${TODAY}.md"

# Header
echo "## Auto‑Memory Audit $(date -u)" >> "${LOG_FILE}"

echo "### Audit actions performed:" >> "${LOG_FILE}"

# 1. Verify that each write operation (append) includes a line number reference.
# Simple heuristic: count occurrences of "##" headings that indicate a write.
WRITE_COUNT=$(grep -c "##" "${LOG_FILE}")
if [ $WRITE_COUNT -gt 0 ]; then
  echo "- Detected $WRITE_COUNT top‑level sections (potential memory writes)." >> "${LOG_FILE}"
else
  echo "- No top‑level sections found – possible missing writes." >> "${LOG_FILE}"
fi

# 2. Check for duplicate headings within today’s file (simple duplicate detection)
DUPES=$(grep -E "^## " "${LOG_FILE}" | sort | uniq -d)
if [ -n "$DUPES" ]; then
  echo "- Duplicate headings detected:" >> "${LOG_FILE}"
  echo "$DUPES" >> "${LOG_FILE}"
else
  echo "- No duplicate headings found." >> "${LOG_FILE}"
fi

# 3. Ensure a pre‑compaction entry exists (look for the phrase "Pre‑Compaction Save")
if grep -q "Pre‑Compaction Save" "${LOG_FILE}"; then
  echo "- Pre‑Compaction Save entry present." >> "${LOG_FILE}"
else
  echo "- Warning: No Pre‑Compaction Save entry found for today." >> "${LOG_FILE}"
fi

# 4. Summarize recent cron health status (pull from latest cron‑health.log if exists)
CRON_LOG="/root/.openclaw/workspace/cron-health.log"
if [ -f "$CRON_LOG" ]; then
  echo "\n### Recent Cron Health Summary" >> "${LOG_FILE}"
  tail -n 20 "$CRON_LOG" >> "${LOG_FILE}"
else
  echo "\n- Cron health log not found at $CRON_LOG." >> "${LOG_FILE}"
fi

# End of audit
echo "\n--- End of auto‑memory audit ---" >> "${LOG_FILE}"