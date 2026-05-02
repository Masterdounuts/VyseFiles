#!/bin/bash
# Chain Reaction Drill - Exercises connected skills for cascading level-ups

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
XP="$WORKSPACE/scripts/xp-gain.sh"

echo "🔗 CHAIN REACTION DRILL"
echo "========================"
echo ""
echo "A real-world task that exercises connected skills..."
echo ""

# Simulate a real task: "Fix and improve the skill system"
# This requires: system, workflow, pattern-recognition, learning, control-ui

echo "🎯 Task: Diagnose skill health and improve leveling"
echo ""

# Step 1: Check system health (uses system + workflow)
echo "   Step 1: System diagnosis..."
$XP system 5 "Drill: diagnosing system health"

# Step 2: Analyze patterns (uses pattern-recognition + learning)
echo "   Step 2: Pattern analysis..."
$XP pattern-recognition 5 "Drill: analyzing patterns"

# Step 3: Improve workflow (uses workflow + control-ui)
echo "   Step 3: Workflow improvement..."
$XP workflow 5 "Drill: improving workflow"

# Step 4: Learning from the work
echo "   Step 4: Document learning..."
$XP learning 5 "Drill: learning from drill"

echo ""
echo "🔄 Chain Reaction Summary:"
echo "==========================="
echo "- Each skill gained XP"
echo "- Cross-pollination gave +3 to related skills"
echo "- Pattern-recognition gets +3 from EVERY action"
echo "- Watch for cascading level-ups in output above!"
echo ""

# Show current state
echo "📊 Current Leaderboard:"
bash $XP system 1 "drill status check" 2>/dev/null | grep -A10 "LEADERBOARD:"
