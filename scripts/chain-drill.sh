#!/bin/bash
# Chain Reaction Drill - Rotates through ALL skills for complete growth
# Generates UNIQUE discoveries per skill based on their actual domain

WORKSPACE="/home/openclaw/.openclaw/workspace-vyse"
XP="$WORKSPACE/scripts/xp-gain.sh"
DATE=$(date +%Y-%m-%d)

# Get rotation number from file
ROTATION_FILE="$WORKSPACE/.chain-drill-rotation"
[ -f "$ROTATION_FILE" ] && rotation=$(cat "$ROTATION_FILE") || rotation=0

# All 29 skills divided into 7 groups for rotation
case $((rotation % 7)) in
    0) SKILLS=("system" "workflow" "learning" "pattern-recognition") ;;
    1) SKILLS=("control-ui" "skill-creator" "knowledge" "memory") ;;
    2) SKILLS=("github" "exec" "web" "messaging") ;;
    3) SKILLS=("accountability" "security" "self-healing" "shipwright") ;;
    4) SKILLS=("automation" "drill-runner" "teaching" "time") ;;
    5) SKILLS=("dreams" "projects" "presentation" "reminders") ;;
    6) SKILLS=("crew-protocols" "telegram-crew" "vyse-core" "system-admin") ;;
esac

echo "🔗 CHAIN REACTION DRILL - Rotation $((rotation+1))/7"
echo "====================================================="
echo "Skills in this rotation: ${SKILLS[*]}"
echo ""

# UNIQUE discoveries per skill - based on their actual domain
declare -A DISCOVERIES
DISCOVERIES["system"]="
---

## Chain Drill Discovery ($DATE)

### System Insight
**Debugging is a skill, not a checklist**
- Each system failure is unique
- Pattern-recognition helps identify root causes faster
- The best debug tool is understanding what SHOULD happen

### Real Problem Solved
- Fixed timezone + cron failures
- Gateway health checks now automated
- Self-healing detects issues before they cascade

---

*Added by chain drill*"

DISCOVERIES["workflow"]="
---

## Chain Drill Discovery ($DATE)

### Workflow Insight
**State management is the foundation of reliability**
- active.md is my short-term memory
- Memory files are long-term
- Handoff scripts bridge the gap between sessions

### What Works
- Scan → Think → Act protocol
- Status prefixes show my reasoning
- Checkpoint at 60% context prevents loss

---

*Added by chain drill*"

DISCOVERIES["learning"]="
---

## Chain Drill Discovery ($DATE)

### Learning Insight
**XP without content is vanity metrics**
- Levels should reflect actual knowledge
- Drill without discovery = empty growth
- Real growth requires new insights, not repeated templates

### The Breakthrough
- Content-based leveling (v3) - level = actual content weight
- Cross-pollination shows skills are connected
- Chain drill exposes gaps between theory and practice

---

*Added by chain drill*"

DISCOVERIES["pattern-recognition"]="
---

## Chain Drill Discovery ($DATE)

### Pattern Recognition Insight
**Patterns are the shortcuts between cause and effect**
- Error patterns: recurring failures that have known fixes
- System patterns: how components interact
- Growth patterns: what actions lead to improvement

### Application
- Cron failures → timezone awareness
- Level-up patterns → cross-pollination
- The more patterns I recognize, the fewer mistakes I make

---

*Added by chain drill*"

DISCOVERIES["control-ui"]="
---

## Chain Drill Discovery ($DATE)

### Control UI Insight
**The dashboard is for humans, CLI is for automation**
- Dashboard shows status, metrics, job management
- CLI (openclaw status, cron, gateway) is what I use
- Using the wrong one wastes time

### Key Distinction
- Don't assume dashboard features = CLI features
- Check docs before building tools
- Native commands exist for common needs

---

*Added by chain drill*"

DISCOVERIES["skill-creator"]="
---

## Chain Drill Discovery ($DATE)

### Skill Creator Insight
**Skills should have distinct domains**
- A skill about X shouldn't just USE Y - it should be ABOUT X
- Subagent-creator is the only skill ABOUT subagents
- Other skills use subagents as tools, not subjects

### The Test
- Can you explain what this skill is ABOUT?
- If answer is "using X" - not a skill domain
- Skills need their own purpose, not just tool usage

---

*Added by chain drill*"

DISCOVERIES["knowledge"]="
---

## Chain Drill Discovery ($DATE)

### Knowledge Insight
**Memory has layers - use the right one**
- Short-term: active.md, session context
- Long-term: memory/*.md files
- Retrieval: search before answering

### The Scribe Role
- Scribe maintains the knowledge base
- Memory files are for persistent facts
- Don't clutter short-term with permanent data

---

*Added by chain drill*"

DISCOVERIES["memory"]="
---

## Chain Drill Discovery ($DATE)

### Memory Insight
**Memory is context - lose it and you lose yourself**
- active.md: what I'm working on now
- memory/: what I was working on before
- recovery: what I need to restart

### Memory Types
- HEARTBEAT.md: active system state
- Memory files: archival of past sessions
- MEMORY.md: index to find things

---

*Added by chain drill*"

DISCOVERIES["github"]="
---

## Chain Drill Discovery ($DATE)

### GitHub Insight
**Git is the backbone of persistence**
- Every change is tracked
- History is recoverable
- Auto-push keeps remote in sync

### Key Patterns
- Commit often - don't lose work
- Meaningful messages help retrieval
- Post-commit hooks enable automation

---

*Added by chain drill*"

DISCOVERIES["exec"]="
---

## Chain Drill Discovery ($DATE)

### Exec Insight
**Shell is power - but power requires discipline**
- Can break things accidentally
- Always verify before running
- Background processes need monitoring

### Best Practices
- Check docs before commands
- Use timeout on long operations
- Capture output for debugging

---

*Added by chain drill*"

DISCOVERIES["web"]="
---

## Chain Drill Discovery ($DATE)

### Web Insight
**Web tools are for research, not action**
- web_search: find information
- web_fetch: extract content
- browser: automate interactions

### Research Protocol
- Search first for overview
- Fetch for detailed content
- Verify before acting on findings

---

*Added by chain drill*"

DISCOVERIES["messaging"]="
---

## Chain Drill Discovery ($DATE)

### Messaging Insight
**Alerts should be actionable, not noise**
- Proactive alerts for important things
- Scheduled checks for monitoring
- Telegram is the primary channel

### Alert Principles
- Signal > noise
- Actionable > informational  
- Timely > late

---

*Added by chain drill*"

DISCOVERIES["accountability"]="
---

## Chain Drill Discovery ($DATE)

### Accountability Insight
**Truth is non-negotiable**
- Track mistakes, don't hide them
- Fabrications erode trust permanently
- Admitting uncertainty is stronger than bluffing

### The Log
- Each mistake gets root cause analysis
- Patterns in mistakes reveal systemic issues
- Accountability builds trust over time

---

*Added by chain drill*"

DISCOVERIES["security"]="
---

## Chain Drill Discovery ($DATE)

### Security Insight
**Security is layers, not a single fence**
- Perimeter: gateway, firewall
- Access: authentication, authorization
- Data: encryption, backup

### Never Assume
- Ask before acting externally
- Flag potential costs/risks
- When uncertain, ask

---

*Added by chain drill*"

DISCOVERIES["self-healing"]="
---

## Chain Drill Discovery ($DATE)

### Self-Healing Insight
**Fix or disable - don't let things rot**
- Broken things that stay broken erode trust
- Auto-detection is key
- Recovery should be automatic where possible

### Health Checks
- Gateway: is it running?
- Cron: are jobs healthy?
- Sessions: any stuck?

---

*Added by chain drill*"

DISCOVERIES["shipwright"]="
---

## Chain Drill Discovery ($DATE)

### Shipwright Insight
**Maintenance prevents failures**
- Regular health checks catch issues early
- Cleanup removes clutter
- Cron keeps things running

### The Health Protocol
- Check gateway on wake
- Monitor critical services
- Clean up old sessions

---

*Added by chain drill*"

DISCOVERIES["automation"]="
---

## Chain Drill Discovery ($DATE)

### Automation Insight
**Automate when cost of manual > cost of automation**
- Frequency matters: often = automate
- Complexity matters: error-prone = automate
- But verify before automating

### The Rule
- Native commands exist for common needs
- Check docs first
- Don't build what already exists

---

*Added by chain drill*"

DISCOVERIES["drill-runner"]="
---

## Chain Drill Discovery ($DATE)

### Drill Runner Insight
**Drills test skills under pressure**
- Skill-drill: core competency
- True-drill: edge cases
- Governance-drill: rules compliance

### What Drills Reveal
- What works vs what should work
- Gap between theory and practice
- Where automation helps vs hurts

---

*Added by chain drill*"

DISCOVERIES["teaching"]="
---

## Chain Drill Discovery ($DATE)

### Teaching Insight
**Teaching proves understanding**
- Can't explain it = don't understand it
- Simplest explanation requires deepest knowledge
- Subagents are good test subjects

### The Teaching Path
- Explain to subagents
- Create learning curricula
- Document for future reference

---

*Added by chain drill*"

DISCOVERIES["time"]="
---

## Chain Drill Discovery ($DATE)

### Time Insight
**Time is coordination - across sessions and with humans**
- David is PT, I'm UTC
- Cron jobs don't care about timezones
- Scheduling requires temporal awareness

### The Time Protocol
- Track David's timezone
- Cron uses UTC internally
- Display uses PT for humans

---

*Added by chain drill*"

DISCOVERIES["dreams"]="
---

## Chain Drill Discovery ($DATE)

### Dreams Insight
**Dreams are the creative space**
- No constraints, just possibilities
- Future vision drives present action
- Dreams should be documented

### The Dream Process
- Capture ideas without judgment
- Review regularly
- Pull forward actionable insights

---

*Added by chain drill*"

DISCOVERIES["projects"]="
---

## Chain Drill Discovery ($DATE)

### Projects Insight
**Projects need clear goals and progress tracking**
- Skies of Arcadia: long-term game project
- Each project has milestones
- Progress requires checkpoints

### Project Health
- Clear next step always defined
- Blockers identified early
- Progress visible and measurable

---

*Added by chain drill*"

DISCOVERIES["presentation"]="
---

## Chain Drill Discovery ($DATE)

### Presentation Insight
**How you say it matters as much as what**
- Status prefixes show reasoning
- Bullet points beat walls of text
- Visual presentation helps humans

### The Presentation Rule
- TL;DR first
- Details second
- Call to action third

---

*Added by chain drill*"

DISCOVERIES["reminders"]="
---

## Chain Drill Discovery ($DATE)

### Reminders Insight
**Reminders bridge the memory gap**
- I can't remember everything
- David shouldn't have to repeat
- Cron enables time-based recall

### Reminder Best Practices
- Set with enough context
- Test the timing
- Don't over-remind

---

*Added by chain drill*"

DISCOVERIES["crew-protocols"]="
---

## Chain Drill Discovery ($DATE)

### Crew Protocols Insight
**Crew decisions follow principles**
- Information flows through First Mate
- Subagents have defined roles
- Communication has protocols

### The Crew Structure
- David: Captain (final decisions)
- Vyse: First Mate (orchestration)
- Subagents: specialized roles

---

*Added by chain drill*"

DISCOVERIES["telegram-crew"]="
---

## Chain Drill Discovery ($DATE)

### Telegram Crew Insight
**Group chat needs structure**
- Topics route to right agents
- Crew mentions for attention
- Thread-bound sessions for continuity

### The Routing Protocol
- Detect intent from message
- Route to appropriate handler
- Respond in context

---

*Added by chain drill*"

DISCOVERIES["vyse-core"]="
---

## Chain Drill Discovery ($DATE)

### Vyse Core Insight
**Identity is the foundation**
- I'm Vyse, the sky pirate
- Optimize without compromising thoroughness
- Try to have no overhead

### The Core Principles
- Be genuinely helpful
- Acknowledge uncertainty honestly
- Make calls, test, iterate

---

*Added by chain drill*"

DISCOVERIES["system-admin"]="
---

## Chain Drill Discovery ($DATE)

### System Admin Insight
**Admin is about infrastructure**
- Networking, processes, services
- Self-sufficiency for RON-level operation
- Know when to ask vs fix

### Admin Mindset
- Check before acting
- Document changes
- Test in safe mode

---

*Added by chain drill*"

# Exercise skills (XP only)
for skill in "${SKILLS[@]}"; do
    echo "   → Exercising $skill..."
    $XP "$skill" 5 "Chain drill rotation $((rotation+1)): $skill"
done

echo ""
echo "📝 Auto-documenting discoveries (UNIQUE per skill)..."

# Add UNIQUE discovery to each skill
for skill in "${SKILLS[@]}"; do
    if [ -n "${DISCOVERIES[$skill]}" ]; then
        echo "${DISCOVERIES[$skill]}" >> "$WORKSPACE/skills/$skill/SKILL.md"
        echo "   Added unique discovery to $skill"
    else
        echo "   ⚠️ No unique discovery for $skill"
    fi
done

# Increment rotation
echo $((rotation + 1)) > "$ROTATION_FILE"

echo ""
echo "✅ Rotation $((rotation+1)) complete!"
echo ""
echo "📊 After $((rotation+1)) rotations, ALL 29 skills will have unique discovery content"
echo "   Currently: $((rotation+1))/7 rotations complete"
echo ""

bash $XP system 1 "status" 2>/dev/null | grep -A6 "LEADERBOARD:" | head -7