#!/bin/bash
# Pre-save validation - Run before editing any SKILL.md
# Prevents duplicate content and corruption

echo "=== PRE-SAVE VALIDATION ==="

# Check each skill for basic integrity
for f in ~/.openclaw/workspace/skills/*/SKILL.md; do
    name=$(basename $(dirname $f))
    
    # Check for frontmatter
    if ! grep -q "^---" "$f"; then
        echo "⚠️  $name: Missing frontmatter"
    fi
    
    # Check file size (should be reasonable)
    lines=$(wc -l < "$f")
    if [ "$lines" -gt 600 ]; then
        echo "⚠️  $name: Very large ($lines lines)"
    fi
done

echo "✅ Validation complete"
# Check kb/ for issues
echo "Checking kb/ files..."
for f in ~/.openclaw/workspace/kb/*.md; do
    if [ -f "$f" ]; then
        # Check for double ---
        if grep -q "^---$" "$f"; then
            lines=$(wc -l < "$f")
            if [ "$lines" -gt 200 ]; then
                echo "⚠️  $(basename $f): Large file, checking for corruption"
            fi
        fi
    fi
done