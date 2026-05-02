#!/bin/bash
# Vyse Trigger Check - OUR work only

# Triggers that mean it's about OUR work
OUR_TRIGGERS=(
    "skill"
    "memory"
    "script"
    "github"
    "project"
    "decision"
    "drill"
    "level"
    "progress"
    "system"
    "vyse"
    "arcadia"
    "we built"
    "we made"
    "our work"
)

INPUT="$*"

if [ -z "$INPUT" ]; then
    echo "NONE"
    exit 0
fi

INPUT_LOWER=$(echo "$INPUT" | tr '[:upper:]' '[:lower:]')

for trigger in "${OUR_TRIGGERS[@]}"; do
    if echo "$INPUT_LOWER" | grep -qi "$trigger"; then
        echo "FOUND|$INPUT"
        exit 0
    fi
done

echo "NONE"
exit 0
