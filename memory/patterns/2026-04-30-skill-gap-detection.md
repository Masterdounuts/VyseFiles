## Pattern: Skill Gap Detection Protocol

**Documented:** 2026-04-30
**Category:** skill-improvement

### What
When performing ANY task, I should recognize when:
1. No existing skill covers this well
2. A new skill would improve my effectiveness
3. The task keeps recurring (not one-off)

### The Protocol

**Step 1: Task Analysis**
- Check available_skills at start of any task
- Load relevant SKILL.md files
- Ask: "Do current skills handle this well?"

**Step 2: Gap Recognition**
If task is NOT handled well:
- Note the gap (what's missing?)
- Check if gap can be filled by existing skill (update it instead)
- If truly new → Proceed to Step 3

**Step 3: Skill Proposal**
Using skill-creator workflow:
1. Document the gap
2. Define the new skill's purpose
3. List trigger phrases
4. Propose to David via message

**Step 4: Approval Loop**
- Wait for David's approval
- If approved → Create skill using skill-creator
- If rejected → Note why, improve proposal

### Example
**Task:** User asks about weather in a specific city
**Current Skills:** weather skill exists ✅
**Gap:** None - use weather skill

**Task:** User asks to analyze their sleep data  
**Current Skills:** No sleep tracking skill
**Gap Detected:** Need sleep/health tracking skill
**Proposal:** Create "health-tracker" skill

### What Triggers a Proposal

| Trigger | Example |
|---------|---------|
| Recurring task without skill | "Check stock prices every 30 min" → Quartermaster |
| Complex task I struggle with | "Fix cron failures" → system skill |
| New domain requested | "Help with immigration docs" → immigration skill |

### Why This Matters
- Skills are how I work (Layer 3 of hierarchy)
- Recognizing gaps = self-improvement
- Proposing to David = safety (until I prove myself)
- Gets better over time = learning

### Current Status
- **Skill Gap Detection:** Level 5/7
- Proposing skills to David until he trusts me to create autonomously