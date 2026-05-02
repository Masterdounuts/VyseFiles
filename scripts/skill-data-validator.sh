#!/bin/bash
# Skill Data Validator - Fixes common issues automatically
# Run AFTER post-commit to validate skill files

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
fixed=0

echo "🔧 Skill Data Validator"
echo ""

for file in $WORKSPACE/skills/*/SKILL.md; do
    skill=$(basename $(dirname "$file"))
    
    # Fix duplicate numbers at END of line only (e.g., "12 12" → "12")
    # This is more precise - only targets trailing duplicates
    if grep -qE "Max Level:.*[0-9]+ [0-9]+$" "$file"; then
        # More precise fix - only for "NN NN" at end
        sed -i 's/\([0-9]\) \([0-9]\)$/\1\2/' "$file"
        echo "Fixed trailing duplicates in $skill"
        fixed=$((fixed + 1))
    fi
    
    # Fix missing Max Level
    if ! grep -q "Max Level:" "$file"; then
        echo "WARNING: $skill has no Max Level!"
    fi
done

echo ""
if [ "$fixed" -gt 0 ]; then
    echo "✅ Fixed $fixed skill files"
else
    echo "✅ All skill data clean"
fi
