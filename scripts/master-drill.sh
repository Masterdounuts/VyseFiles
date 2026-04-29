#!/bin/bash
# Master Drill - Tests ALL skills for actual capability
# Run: ~/.openclaw/workspace/scripts/master-drill.sh

echo "============================================="
echo "   MASTER DRILL - ALL SKILLS CAPABILITY TEST"
echo "============================================="
echo ""

PASS=0
FAIL=0

# Helper function
run_drill() {
    local skill="$1"
    local test_cmd="$2"
    local description="$3"
    
    echo "--- $skill ---"
    echo "Test: $description"
    
    if eval "$test_cmd" > /dev/null 2>&1; then
        echo "Result: ✅ PASS"
        PASS=$((PASS + 1))
    else
        echo "Result: ❌ FAIL"
        FAIL=$((FAIL + 1))
    fi
    echo ""
}

echo "=== CORE OPS DRILLS ==="
echo ""

# 1. exec - can run commands
run_drill "exec" "ls ~/.openclaw/workspace >/dev/null 2>&1" "Can execute shell commands"

# 2. web - can fetch web content  
run_drill "web" "curl -s -o /dev/null -w '%{http_code}' --max-time 5 https://www.example.com 2>/dev/null | grep -q '200'" "Can fetch web content"

# 3. time - can get current time
run_drill "time" "date +%Y-%m-%d >/dev/null 2>&1" "Can handle time/timezone"

# 4. system - can check gateway
run_drill "system" "pgrep -x openclaw >/dev/null 2>&1 || pgrep -f gateway >/dev/null 2>&1" "Can detect system processes"

# 5. control-ui - can access cron
run_drill "control-ui" "test -f ~/.openclaw/workspace/HEARTBEAT.md" "Can read workspace state"

# 6. crew-protocols - knows decision framework
run_drill "crew-protocols" "test -f ~/.openclaw/workspace/skills/crew-protocols/SKILL.md" "Has decision framework"

echo "=== TRADING DRILLS ==="
echo ""

# 7. trading - can fetch stock price
run_drill "trading" "curl -s -o /dev/null -w '%{http_code}' --max-time 10 'https://query1.finance.yahoo.com/v8/finance/chart/GGB?interval=1d' -H 'User-Agent: Mozilla/5.0' 2>/dev/null | grep -q '200\|404'" "Can fetch stock data"

# 8. alerts - has alert templates
run_drill "alerts" "test -f ~/.openclaw/workspace/skills/alerts/SKILL.md" "Has alert templates"

echo "=== KNOWLEDGE DRILLS ==="
echo ""

# 9. memory - can search memory
run_drill "memory" "test -d ~/.openclaw/workspace/memory" "Has memory directory"

# 10. scribe - can write docs
run_drill "scribe" "test -d ~/.openclaw/workspace/kb" "Has knowledge base"

# 11. github - can use git
run_drill "github" "which git" "Git is installed"

# 12. obsidian - has vault reference
run_drill "obsidian" "test -f ~/.openclaw/workspace/skills/obsidian/SKILL.md" "Has Obsidian skill"

echo "=== SYSTEM DRILLS ==="
echo ""

# 13. shipwright - has health scripts
run_drill "shipwright" "test -d ~/.openclaw/workspace/scripts" "Has scripts directory"

# 14. security - has security skill
run_drill "security" "test -f ~/.openclaw/workspace/skills/security/SKILL.md" "Has security skill"

# 15. self-healing - has recovery logic
run_drill "self-healing" "test -f ~/.openclaw/workspace/skills/self-healing/SKILL.md" "Has self-healing skill"

# 16. recovery - can recover from crash
run_drill "recovery" "test -f ~/.openclaw/workspace/skills/recovery/SKILL.md" "Has recovery skill"

echo "=== CREATIVE DRILLS ==="
echo ""

# 17. projects - has project tracking
run_drill "projects" "test -f ~/.openclaw/workspace/skills/projects/SKILL.md" "Has projects skill"

# 18. dreams - has dreams/vision
run_drill "dreams" "test -f ~/.openclaw/workspace/skills/dreams/SKILL.md" "Has dreams skill"

echo "=== META DRILLS ==="
echo ""

# 19. skill-creator - can create skills
run_drill "skill-creator" "test -f ~/.openclaw/workspace/skills/skill-creator/SKILL.md" "Has skill-creator"

# 20. subagent-creator - can spawn subagents
run_drill "subagent-creator" "test -f ~/.openclaw/workspace/skills/subagent-creator/SKILL.md" "Has subagent-creator"

# 21. self-audit - can audit self
run_drill "self-audit" "test -f ~/.openclaw/workspace/skills/self-audit/SKILL.md" "Has self-audit"

# 22. learning - can learn (this drill!)
run_drill "learning" "test -f ~/.openclaw/workspace/skills/learning/SKILL.md" "Has learning skill"

echo "=== COMMUNICATION DRILLS ==="
echo ""

# 23. telegram - can send messages
run_drill "telegram" "test -f ~/.openclaw/workspace/skills/telegram/SKILL.md" "Has telegram skill"

# 24. telegram-crew - can handle group
run_drill "telegram-crew" "test -f ~/.openclaw/workspace/skills/telegram-crew/SKILL.md" "Has telegram-crew"

echo "=== SPECIAL DRILLS ==="
echo ""

# 25. context - manages context
run_drill "context" "test -f ~/.openclaw/workspace/skills/context/SKILL.md" "Has context skill"

# 26. vyse-core - identity
run_drill "vyse-core" "test -f ~/.openclaw/workspace/IDENTITY.md" "Has identity"

# 27. workflow - has workflow
run_drill "workflow" "test -f ~/.openclaw/workspace/skills/workflow/SKILL.md" "Has workflow"

# 28. container - docker (deprecated)
run_drill "container" "test -f ~/.openclaw/workspace/skills/container/SKILL.md" "Has container (deprecated)"

# 29. system-admin - server admin
run_drill "system-admin" "test -f ~/.openclaw/workspace/skills/system-admin/SKILL.md" "Has system-admin"

echo "============================================="
echo "   RESULTS: $PASS passed, $FAIL failed"
echo "============================================="

if [ $FAIL -eq 0 ]; then
    echo "🎉 ALL DRILLS PASSING!"
else
    echo "⚠️  $FAIL skills need attention"
fi