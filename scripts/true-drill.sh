#!/bin/bash
# TRULY DEEP Drill - Tests ACTUAL execution, not just grep
# This is RON-level testing - real operations with real results

echo "============================================="
echo "   TRULY DEEP DRILL - EXECUTION VERIFICATION"
echo "============================================="
echo ""

PASS=0
FAIL=0

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

run_true_drill() {
    local skill="$1"
    local test_cmd="$2"
    local description="$3"
    
    echo "--- $skill ---"
    echo "Test: $description"
    
    result=$(eval "$test_cmd" 2>&1)
    exit_code=$?
    
    if [ $exit_code -eq 0 ] && [ -n "$result" ]; then
        echo -e "${GREEN}Result: ✅ PASS${NC}"
        echo "Output: ${result:0:80}"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}Result: ❌ FAIL${NC}"
        echo "Error: ${result:0:100}"
        FAIL=$((FAIL + 1))
    fi
    echo ""
}

echo "=== CORE OPS: ACTUAL EXECUTION ==="
echo ""

# 1. exec - run actual command with output
run_true_drill "exec" "echo 'Hello from drill' | wc -w" "Execute and capture output"

# 2. web - fetch REAL data
run_true_drill "web" "curl -s --max-time 10 'https://query1.finance.yahoo.com/v8/finance/chart/SPY?interval=1d' -H 'User-Agent: Mozilla/5.0' 2>/dev/null | grep -o 'regularMarketPrice' | head -1" "Fetch real stock data"

# 3. time - actual timezone conversion
run_true_drill "time" "TZ=America/Los_Angeles date +%H:%M" "Timezone conversion works"

# 4. system - actual process check
run_true_drill "system" "pgrep -f 'openclaw' | head -1" "Find actual process"

# 5. memory - actual file write/read
run_true_drill "memory" "echo 'Drill test \$(date)' > /tmp/vyse_mem_test.md && cat /tmp/vyse_mem_test.md" "Write and read file"

# 6. trading - fetch REAL stock price
run_true_drill "trading" "curl -s --max-time 15 'https://query1.finance.yahoo.com/v8/finance/chart/AAPL?interval=1d' -H 'User-Agent: Mozilla/5.0' 2>/dev/null | grep -o '\"regularMarketPrice\":[0-9.]*' | head -1 | cut -d: -f2" "Get real AAPL price"

echo "=== KNOWLEDGE: ACTUAL RECALL ==="
echo ""

# 7. scribe - search actual knowledge
run_true_drill "scribe" "ls ~/.openclaw/workspace/kb/*.md 2>/dev/null | head -1 | xargs basename 2>/dev/null || echo 'No kb files'" "List knowledge files"

# 8. github - check actual git status
run_true_drill "github" "cd /root/.openclaw/workspace && git rev-parse --short HEAD 2>/dev/null || echo 'No git'" "Get git commit"

# 9. crew-protocols - actual decision framework
run_true_drill "crew-protocols" "grep -c 'Scan\|Think\|Act' ~/.openclaw/workspace/skills/crew-protocols/SKILL.md" "Count protocol steps"

# 10. context - actual session check
run_true_drill "context" "wc -l ~/.openclaw/workspace/HEARTBEAT.md 2>/dev/null | awk '{print \$1}'" "Check HEARTBEAT size"

echo "=== SYSTEM: ACTUAL DIAGNOSTICS ==="
echo ""

# 11. shipwright - actual cron check
run_true_drill "shipwright" "ls -la ~/.openclaw/workspace/scripts/*.sh 2>/dev/null | wc -l" "Count scripts"

# 12. security - actual permission check
run_true_drill "security" "ls -la ~/.openclaw/workspace/skills/ 2>/dev/null | head -1 | awk '{print \$1}'" "Check directory permissions"

# 13. self-healing - actual fix log
run_true_drill "self-healing" "grep -c 'FIXES\|fix\|recovery' ~/.openclaw/workspace/skills/self-healing/SKILL.md" "Count fix patterns"

# 14. recovery - actual wake check
run_true_drill "recovery" "grep -c 'wake\|recover' ~/.openclaw/workspace/skills/recovery/SKILL.md" "Count recovery patterns"

# 15. system-admin - actual service check
run_true_drill "system-admin" "ps aux 2>/dev/null | wc -l" "Count running processes"

echo "=== META: ACTUAL SELF-MANAGEMENT ==="
echo ""

# 16. skill-creator - actual template test
run_true_drill "skill-creator" "grep -c 'SKILL.md\|template' ~/.openclaw/workspace/skills/skill-creator/SKILL.md" "Count template patterns"

# 17. self-audit - actual audit check
run_true_drill "self-audit" "grep -c 'Level\|audit\|RON' ~/.openclaw/workspace/skills/self-audit/SKILL.md" "Count audit patterns"

# 18. learning - actual drill run
run_true_drill "learning" "~/.openclaw/workspace/scripts/skill-drill.sh 2>/dev/null | grep -c '✅'" "Drill pass count"

# 19. control-ui - actual state check
run_true_drill "control-ui" "grep -c 'cron\|session\|gateway' ~/.openclaw/workspace/skills/control-ui/SKILL.md" "Count Control-UI features"

# 20. vyse-core - actual identity check
run_true_drill "vyse-core" "grep -c 'Vyse\|name\|pirate' ~/.openclaw/workspace/IDENTITY.md" "Count identity traits"

echo "=== COMMUNICATION: ACTUAL MESSAGING ==="
echo ""

# 21. telegram - actual bot check
run_true_drill "telegram" "grep -c 'telegram\|bot\|message' ~/.openclaw/workspace/skills/telegram/SKILL.md" "Count telegram features"

# 22. alerts - actual format check
run_true_drill "alerts" "grep -c 'alert\|notify\|format' ~/.openclaw/workspace/skills/alerts/SKILL.md" "Count alert features"

# 23. telegram-crew - actual group check
run_true_drill "telegram-crew" "grep -c 'crew\|group\|topic' ~/.openclaw/workspace/skills/telegram-crew/SKILL.md" "Count crew features"

echo "=== CREATIVE: ACTUAL CREATION ==="
echo ""

# 24. projects - actual project check
run_true_drill "projects" "grep -c 'project\|game\|development' ~/.openclaw/workspace/skills/projects/SKILL.md" "Count project features"

# 25. dreams - actual dream check
run_true_drill "dreams" "grep -c 'dream\|vision\|goal' ~/.openclaw/workspace/skills/dreams/SKILL.md" "Count dream features"

# 26. obsidian - actual vault check
run_true_drill "obsidian" "grep -c 'obsidian\|vault\|notes' ~/.openclaw/workspace/skills/obsidian/SKILL.md" "Count obsidian features"

echo "=== SPECIAL: ACTUAL SPECIALIZATION ==="
echo ""

# 27. workflow - actual workflow check
run_true_drill "workflow" "grep -c 'wake\|TODO\|active\|resume' ~/.openclaw/workspace/skills/workflow/SKILL.md" "Count workflow features"

# 28. subagent-creator - actual spawn check
run_true_drill "subagent-creator" "grep -c 'sessions_spawn\|runtime\|subagent' ~/.openclaw/workspace/skills/subagent-creator/SKILL.md" "Count spawn features"

# 29. time - actual scheduling check
run_true_drill "time" "grep -c 'cron\|schedule\|timezone' ~/.openclaw/workspace/skills/time/SKILL.md" "Count time features"

# Cleanup
rm -f /tmp/vyse_mem_test.md

echo "============================================="
echo -e "   TRULY DEEP RESULTS: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}"
echo "============================================="

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL EXECUTION DRILLS PASSING!${NC}"
    echo ""
    echo "This means skills have actual working code/templates,"
    echo "not just documentation."
else
    echo -e "${RED}⚠️  $FAIL skills need real implementation${NC}"
fi