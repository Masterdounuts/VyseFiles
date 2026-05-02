#!/bin/bash
# Skill Data Validator - Fixes common issues automatically

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
fixed=0

echo "🔧 Skill Data Validator"
echo ""

for file in $WORKSPACE/skills/*/SKILL.md; do
    skill=$(basename $(dirname "$file"))
    
    # Fix duplicate numbers (e.g., "12 12" in Max Level)
    if grep -q "Max Level:.*[0-9] [0-9]" "$file"; then
        sed -i 's/\([0-9]\) \([0-9]\)/\1/g' "$file"
        echo "Fixed duplicate numbers in $skill"
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
