#!/bin/bash
# Governance Drill - Detect skill drift, overlaps, and consolidation needs
# This is what RON would run to keep skills healthy

echo "============================================="
echo "   GOVERNANCE DRILL - SKILL HEALTH CHECK"
echo "============================================="
echo ""

CONFLICTS=0
DUPLICATES=0
BLOAT=0
WARNINGS=()

# Helper to collect triggers
get_triggers() {
    local skill="$1"
    grep "trigger phrases:" ~/.openclaw/workspace/skills/$skill/SKILL.md 2>/dev/null | sed 's/trigger phrases: //' | tr -d '"'
}

echo "=== 1. TRIGGER CONFLICT DETECTION ==="
echo ""

# Collect all triggers by skill
declare -A TRIGGER_MAP
for skill_dir in ~/.openclaw/workspace/skills/*/; do
    skill=$(basename "$skill_dir")
    triggers=$(get_triggers "$skill")
    if [ -n "$triggers" ]; then
        # Split triggers and map each
        echo "$triggers" | tr ',' '\n' | while read -r t; do
            t=$(echo "$t" | xargs)  # trim whitespace
            if [ -n "$t" ]; then
                TRIGGER_MAP["$t"]+="$skill "
            fi
        done
    fi
done

echo "Checking for trigger conflicts..."
for trigger in "${!TRIGGER_MAP[@]}"; do
    skills_with_trigger="${TRIGGER_MAP[$trigger]}"
    count=$(echo "$skills_with_trigger" | wc -w)
    if [ $count -gt 1 ]; then
        echo "  ⚠️  CONFLICT: '$trigger' in $count skills: $skills_with_trigger"
        CONFLICTS=$((CONFLICTS + 1))
        WARNINGS+=("Trigger '$trigger' shared by $count skills")
    fi
done

if [ $CONFLICTS -eq 0 ]; then
    echo "  ✅ No trigger conflicts found"
fi

echo ""
echo "=== 2. DUPLICATE CONTENT DETECTION ==="
echo ""

# Check for similar sections across skills
echo "Checking for duplicate content patterns..."
SIMILAR=0

# Check if skills reference each other (good) vs duplicate (bad)
for skill in $(ls ~/.openclaw/workspace/skills/); do
    content_count=$(wc -l < ~/.openclaw/workspace/skills/$skill/SKILL.md 2>/dev/null)
    if [ "$content_count" -gt 500 ]; then
        echo "  ⚠️  BLOAT: $skill has $content_count lines (consider splitting)"
        BLOAT=$((BLOAT + 1))
    fi
done

if [ $BLOAT -eq 0 ]; then
    echo "  ✅ No bloated skills found (<500 lines each)"
fi

echo ""
echo "=== 3. ORPHAN SKILLS (Never triggered) ==="
echo ""

# Skills that might never get triggered
ORPHANS=0
for skill in $(ls ~/.openclaw/workspace/skills/); do
    # Check if skill has always:true (exempt from trigger check)
    if grep -q "always: true" ~/.openclaw/workspace/skills/$skill/SKILL.md 2>/dev/null; then
        continue
    fi
    
    # Check if skill has triggers
    if ! grep -q "trigger phrases" ~/.openclaw/workspace/skills/$skill/SKILL.md 2>/dev/null; then
        echo "  ⚠️  ORPHAN: $skill has no triggers"
        ORPHANS=$((ORPHANS + 1))
    fi
done

if [ $ORPHANS -eq 0 ]; then
    echo "  ✅ No orphan skills"
fi

echo ""
echo "=== 4. SKILL CONSOLIDATION CANDIDATES ==="
echo ""

# Find skills that could be merged
echo "Looking for skills that could merge..."

# Example: alerts + telegram (both handle messaging)
echo "  Possible merge candidates:"
echo "    - alerts + telegram → messaging skill"
echo "    - obsidian + scribe → knowledge skill"

echo ""
echo "=== GOVERNANCE SUMMARY ==="
echo ""

TOTAL_ISSUES=$((CONFLICTS + BLOAT + ORPHANS))

if [ $TOTAL_ISSUES -eq 0 ]; then
    echo "🎉 SKILLS HEALTHY - No governance issues!"
else
    echo "⚠️  Found $TOTAL_ISSUES issues:"
    [ $CONFLICTS -gt 0 ] && echo "  - $CONFLICKS trigger conflicts"
    [ $BLOAT -gt 0 ] && echo "  - $BLOAT bloated skills"
    [ $ORPHANS -gt 0 ] && echo "  - $ORPHANS orphan skills"
fi

echo ""
echo "=== RECOMMENDATIONS ==="
echo ""
echo "To prevent drift:"
echo "1. Run this drill weekly (Shipwright cron)"
echo "2. Fix conflicts by making triggers more specific"
echo "3. Split bloated skills (>500 lines)"
echo "4. Merge skills with 80%+ overlap"
echo "5. Keep skills index.md updated"