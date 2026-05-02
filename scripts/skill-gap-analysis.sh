#!/bin/bash
# Skill Gap Analysis - Find what's missing

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"

echo "🔍 **SKILL GAP ANALYSIS**"
echo ""

echo "📉 LOW CONTENT (need growth):"
for dir in $WORKSPACE/skills/*/; do
    skill=$(basename "$dir")
    lines=$(wc -l < "$dir/SKILL.md")
    sections=$(grep -c '^## ' "$dir/SKILL.md")
    if [ "$lines" -lt 80 ]; then
        echo "   ⚠️  $skill: $lines lines, $sections sections"
    fi
done

echo ""
echo "🎯 HIGH POTENTIAL (lots of lines, low level):"
for dir in $WORKSPACE/skills/*/; do
    skill=$(basename "$dir")
    lines=$(wc -l < "$dir/SKILL.md")
    level=$(grep "Current Status:" "$dir/SKILL.md" | head -1 | grep -oE 'Level [0-9]+' | awk '{print $2}')
    if [ "$lines" -gt 150 ] && [ "$level" -lt 6 ]; then
        echo "   💡 $skill: $lines lines but only L$level"
    fi
done

echo ""
echo "🏆 TOP CONTENT SKILLS:"
for dir in $WORKSPACE/skills/*/; do
    skill=$(basename "$dir")
    lines=$(wc -l < "$dir/SKILL.md")
    sections=$(grep -c '^## ' "$dir/SKILL.md")
    subs=$(grep -c '^### ' "$dir/SKILL.md")
    echo "$lines|$sections|$subs|$skill"
done | sort -t'|' -k1,1nr | head -5 | while IFS='|' read -r lines subs s name; do
    echo "   $name: $lines lines, $subs subsections"
done
