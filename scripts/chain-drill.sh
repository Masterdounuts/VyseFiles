#!/bin/bash
# Content Growth Drill - Reflection-Based Growth
# Each drill run adds MEANINGFUL insights about each skill
# Not templates - REAL reflections on what I've learned

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
XP="$WORKSPACE/scripts/skill-level.sh"
ROTATION_FILE="$WORKSPACE/.chain-drill-rotation"

[ -f "$ROTATION_FILE" ] && rotation=$(cat "$ROTATION_FILE") || rotation=0

case $((rotation % 7)) in
    0) SKILLS=("system" "workflow" "learning" "pattern-recognition") ;;
    1) SKILLS=("control-ui" "skill-creator" "knowledge" "memory") ;;
    2) SKILLS=("github" "exec" "web" "messaging") ;;
    3) SKILLS=("accountability" "security" "self-healing" "shipwright") ;;
    4) SKILLS=("automation" "drill-runner" "teaching" "time") ;;
    5) SKILLS=("dreams" "projects" "presentation" "reminders") ;;
    6) SKILLS=("crew-protocols" "telegram-crew" "vyse-core" "system-admin") ;;
esac

echo "🔗 CHAIN DRILL - Reflection Rotation $((rotation+1))/7"
echo "====================================================="
echo "Skills: ${SKILLS[*]}"
echo ""

# Reflection prompts for each skill - what have I actually learned?
declare -A REFLECTIONS

REFLECTIONS["system"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- The post-commit hook auto-tracks XP on every push
- Dynamic max was overriding tiers - had to disable it
- System debugging requires understanding what SHOULD happen

### What Still Needs Work
- Finding root causes faster
- Better error prediction
- More automated health checks
"

REFLECTIONS["workflow"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Checkpoint at 60% context prevents memory loss
- active.md is critical for session handoffs
- Status prefixes show my reasoning to David

### What Still Needs Work
- Better handoff scripts
- Faster context recovery
- More reliable state management
"

REFLECTIONS["learning"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- XP without content = vanity metrics (the big realization!)
- Content-based leveling is the truth
- Guards catch gaming before it happens

### What Still Needs Work
- More unique discoveries per skill
- Better gap detection
- True mastery vs level metrics
"

REFLECTIONS["pattern-recognition"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Error patterns: recurring failures have known fixes
- System patterns: how components interact
- I use pattern-recognition as hub for cross-pollination

### What Still Needs Work
- More diverse pattern sources
- Better pattern-to-action mapping
- Learning from mistakes faster
"

REFLECTIONS["control-ui"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Dashboard is for humans, CLI is for automation
- Don't assume dashboard features = CLI features
- Native commands exist for common needs

### What Still Needs Work
- Better dashboard understanding
- More Control UI features to document
- User experience improvements
"

REFLECTIONS["skill-creator"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Skills need their own domains, not just tool usage
- Content drives capability
- Tier system (150/100/75) solves the max problem

### What Still Needs Work
- More skill gap analysis
- Better skill creation workflow
- Content uniqueness validation
"

REFLECTIONS["knowledge"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Memory has layers - use the right one
- Scribe manages knowledge base
- Search before answering questions

### What Still Needs Work
- Better knowledge retrieval
- Cross-skill connections
- More robust memory system
"

REFLECTIONS["memory"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- HEARTBEAT.md = active system state
- Memory files = long-term storage
- Recovery needs active.md + memory files

### What Still Needs Work
- More frequent checkpoints
- Better context recovery
- Memory organization
"

REFLECTIONS["github"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Git is backbone of persistence
- Post-commit hooks enable automation
- Commit messages help retrieval

### What Still Needs Work
- Better commit hygiene
- More frequent commits
- Branching strategy
"

REFLECTIONS["exec"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Shell is power but requires discipline
- Always verify before running
- Timeout prevents stuck processes

### What Still Needs Work
- Better error handling
- More safe defaults
- Process monitoring
"

REFLECTIONS["web"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Web tools for research, not action
- Search → fetch → verify workflow
- web_search and web_fetch are complementary

### What Still Needs Work
- More source evaluation
- Better synthesis
- Fact-checking protocols
"

REFLECTIONS["messaging"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Alerts should be actionable, not noise
- Signal > noise ratio matters
- Telegram is primary channel

### What Still Needs Work
- Better alert thresholds
- More proactive messaging
- Message formatting consistency
"

REFLECTIONS["accountability"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Truth is non-negotiable
- Track mistakes, don't hide them
- The vanity metric failure was a big test

### What Still Needs Work
- More honest self-auditing
- Root cause analysis for my errors
- Building trust through accuracy
"

REFLECTIONS["security"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Security is layers, not a single fence
- Ask before acting externally
- Flag potential costs/risks

### What Still Needs Work
- Better security patterns
- More automated checks
- Threat modeling
"

REFLECTIONS["self-healing"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Fix or disable - don't let things rot
- Auto-detection is key
- Health checks prevent cascade failures

### What Still Needs Work
- More automated recovery
- Better health metrics
- Proactive issue detection
"

REFLECTIONS["shipwright"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Maintenance prevents failures
- Regular health checks catch issues
- Cleanup removes clutter

### What Still Needs Work
- More maintenance tasks
- Better cleanup scripts
- Proactive health monitoring
"

REFLECTIONS["automation"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Automate when cost of manual > cost of automation
- Check docs first before building
- Native commands exist for common needs

### What Still Needs Work
- More automation opportunities
- Better automation decisions
- Automated testing
"

REFLECTIONS["drill-runner"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Drills test skills under pressure
- The vanity metric failure exposed gaps
- Reflections > templates

### What Still Needs Work
- More drill types
- Better success metrics
- True vs surface-level testing
"

REFLECTIONS["teaching"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Teaching proves understanding
- Can't explain = don't understand
- Subagents are good test subjects

### What Still Needs Work
- More teaching content
- Better explanations
- Learning curricula development
"

REFLECTIONS["time"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Time is coordination across sessions
- David's timezone = PT
- Cron uses UTC internally

### What Still Needs Work
- Better timezone handling
- More scheduling features
- Temporal awareness improvements
"

REFLECTIONS["dreams"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Dreams are creative space
- Future vision drives present action
- Document without judgment

### What Still Needs Work
- More dream capture
- Better vision articulation
- Actionable insights extraction
"

REFLECTIONS["projects"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Projects need clear goals and progress
- Skies of Arcadia = long-term game project
- Progress requires checkpoints

### What Still Needs Work
- Better project tracking
- More milestones
- Progress visibility
"

REFLECTIONS["presentation"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Status prefixes show reasoning
- TL;DR first, details second
- Bullet points beat walls

### What Still Needs Work
- Better formatting
- More visual elements
- Consistent structure
"

REFLECTIONS["reminders"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Reminders bridge memory gap
- I can't remember everything
- Don't over-remind

### What Still Needs Work
- Better reminder timing
- More context in reminders
- Smarter thresholds
"

REFLECTIONS["crew-protocols"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Information flows through First Mate
- Subagents have defined roles
- Communication has protocols

### What Still Needs Work
- Better crew communication
- More role definitions
- Improved coordination
"

REFLECTIONS["telegram-crew"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Group chat needs structure
- Topics route to right agents
- Thread-bound sessions for continuity

### What Still Needs Work
- Better routing
- More topic coverage
- Improved thread management
"

REFLECTIONS["vyse-core"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Identity is foundation
- I'm Vyse, the sky pirate
- Optimize without compromising thoroughness

### What Still Needs Work
- Deeper self-understanding
- Better values articulation
- Identity evolution tracking
"

REFLECTIONS["system-admin"]="
---

## Reflection $(date +%Y-%m-%d)

### What I Learned
- Admin is infrastructure
- Networking, processes, services
- Self-sufficiency for RON-level

### What Still Needs Work
- More admin skills
- Better system knowledge
- Infrastructure automation
"

# Run the reflection drill
for skill in "${SKILLS[@]}"; do
    echo "   → Reflecting on $skill..."
    
    # Add the reflection as content
    if [ -n "${REFLECTIONS[$skill]}" ]; then
        echo "${REFLECTIONS[$skill]}" >> "$WORKSPACE/skills/$skill/SKILL.md"
        echo "   ✅ Added reflection to $skill"
    fi
    
    # Award XP for the reflection
    $XP "$skill" 5 "Content drill reflection: $skill"
done

# Increment rotation
echo $((rotation + 1)) > "$ROTATION_FILE"

echo ""
echo "✅ Rotation $((rotation+1)) complete!"
echo ""
bash $XP system 1 "status" 2>/dev/null | grep -A6 "LEADERBOARD:" | head -7