#!/bin/bash
# Skill System Self-Drill - Verifies trigger system works

echo "=== SKILL SYSTEM DRILL ==="
echo ""

# Count skills
TOTAL=$(find ~/.openclaw/workspace/skills -name "SKILL.md" | wc -l)
WITH_TRIGGERS=$(grep -l "trigger phrases" ~/.openclaw/workspace/skills/*/SKILL.md | wc -l)
CORE=$(grep -l "always: true" ~/.openclaw/workspace/skills/*/SKILL.md | wc -l)

echo "Skill Stats:"
echo "  Total: $TOTAL"
echo "  With triggers: $WITH_TRIGGERS" 
echo "  Core (always:true): $CORE"
echo ""

# Find orphans
echo "Checking for orphans (no frontmatter + no triggers)..."
ORPHANS=0
for f in ~/.openclaw/workspace/skills/*/SKILL.md; do
    if ! grep -q "^---" "$f" && ! grep -q "trigger phrases" "$f"; then
        echo "  ORPHAN: $(dirname $f | xargs basename)"
        ORPHANS=$((ORPHANS + 1))
    fi
done

if [ $ORPHANS -eq 0 ]; then
    echo "  ✅ No orphans found"
fi
echo ""

# Test trigger detection
echo "Trigger Detection Test:"
echo "  Input: 'check my stock position'"
TRADING_TRIGGERS=$(grep "trigger phrases" ~/.openclaw/workspace/skills/trading/SKILL.md | grep -o "stock\|position" | wc -l)
if [ $TRADING_TRIGGERS -ge 2 ]; then
    echo "  ✅ Trading skill would load (found: stock, position)"
else
    echo "  ❌ Trading skill missing triggers"
fi

echo ""
echo "=== DRILL COMPLETE ==="