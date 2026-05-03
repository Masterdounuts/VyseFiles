# Project_Rehab
Rehabilitate a disorganized agent who "forgets" how to do things - through teach, repair, maintain.
README

## EXECUTIVE SUMMARY
Project Rehab is a modular system designed to reduce apparent "agent forgetfulness" by enforcing disciplined organization of tools, skills, and files.
Rather than treating memory issues as cognitive failures, this system treats them as **organizational failures** and corrects them through:
1. Behavior modification  (modify startup instructions to create stricter rules for storage of tools and skills)
2. Structural repair  (consolidate existing tokens & keys in one .env file, move tools and skills into files)
3. Future maintenance
## Intended Users
The anticipated user is someone who has a new agent that has not been organized or developed any consistent behaviors regarding files and tools.  They must be willing to accept the recommended naming conventions for tools and keys, and to use their agent to follow up on the flagged items (conflicts, duplicates, etc).  Aimed at heyron.ai community, but not limited to that.

## Install from Github repo  
- Copy all .md files into Project_rehab folder in root
- Follow preflight instructions in Readme
- Tell agent to launch using controller.md

## Core Concept
Like misplacing your house keys, agents often "forget" because:
- tools are inconsistently stored  
- instructions are scattered  
- structure is unclear  
By enforcing consistent placement and habits, recall improves naturally.
---
## System Architecture
Project Rehab is composed of modular instruction files and creates others.
Instructions Included
- controller.md
- prep.md
- teach_behavior.md
- api_consolidation.md
- tools_rebuild.md
- updating_tools.md
- stop_routine.md
Support Files Created or Used
- state.md – tracker for interruptions
- idempotency_rules.md – duplicate handling
- markdowns.md – inserts for tools.md, agents.md, and soul.md
- flag.md – logs conflicts, duplicates, unclear cases
- summarylog.md – chronological log of all actions taken
- soul.md – behavioral definitions (modified by teach_behavior.md)
- agents.md – agent-level references (modified by teach_behavior.md)
- tools.md – tool index and handling rules (modified by multiple modules)

## Execution Flow

START (At startup, controller.md loads idempotency_rules.md and applies all global safety rules.)
↓  
Check state.md
↓  
prep.md
↓  
teach_behavior.md
↓  
api_consolidation.md
↓  
tools_rebuild.md
↓  
updating_tools.md
↓  
stop_routine.md
↓  
END

At any point:
→ User may STOP  
→ System saves state  
→ Resume later from same point  ---

## Key Features
### ✅ State Tracking
- Resume after interruption
- Handles crashes or restarts

### ✅ Idempotency
- Safe to re-run
- Prevents duplication and corruption

### ✅ Modular Design
- Each function isolated
- Easier to maintain and extend
---
## ⚠️ Preflight Requirements (IMPORTANT)
Before running Project Rehab:
### 1. Create a Full Backup
This system analyzes and restructures files!!!.
You are responsible for ensuring a complete backup of:
- workspace files  
- configuration files  
- environment variables  

Project Rehab does **not** delete files automatically, but it does reorganize and copy sensitive data.
---
### 2. Start a Fresh Session (Recommended)
For best results, start with a clean agent session using an organized model like minimax (never Gemini=flash lite)
Ensure soul.md, agents.md, and tools.md exist before installing Project Rehab.
## Installation
1.	Create a folder in root directory (ex project_rehab):
2.	 Place all `.md` files inside
3.	Ensure write access to these (Assumed available):
- root directory  
- /skills folder  
- .env file  

## Usage
Project Rehab may modify:
- .env
- soul.md
- agents.md
- tools.md
- /skills directory
All modifications follow idempotency rules and are logged.
To begin:
1. Last chance to back up and Start a new session (recommended)
2. Instruct agent: “Run Project Rehab using /rehab_project/controller.md”

## Stopping & Resuming
At any prompt, user may type: STOP
System will:
- save progress to `state.md`
- write logs
- safely exit
To resume: Run Project Rehab using controller.md
System will continue from last step.
---
## Logs & Outputs
Project Rehab creates:
### Flag.md
- Issues requiring user attention
- Conflicts, duplicates, uncertainties
soul.md – updated with Tool Awareness
agents.md – updated with Tool Reference
tools.md – updated with Tool Handling and new tool entries

### SummaryLog.md
- Step-by-step record of actions taken
- Tracks any changes to:
  - tools.md
  - soul.md
  - agents.md
---
## Safety Model
- No automatic deletion
- All conflicts logged before action
- Sensitive data centralized into `.env`
All modules follow idempotency_rules.md:
- never duplicate entries
- never overwrite existing content without verification
- always log conflicts instead of resolving automatically

## Extending the System
To add new tools:
→ Follow instructions in:
/skills/UPDATING_SKILLS.md
---
## Final Notes
Project Rehab is not just a one-time script.
It is a **behavioral framework** for maintaining long-term system clarity.
Occasional reuse leads to:
- improved tool reliability  
- reduced "forgetfulness"  
- cleaner system architecture  
 
FLOW CHART
```mermaid
flowchart TD

A[Start] --> B{state.md exists?}

B -- No --> C[Create state.md]
B -- Yes --> D[Read state.md]

C --> D

D --> E{status}

E -- complete --> F[Ask user to restart?]
F -- Yes --> G[Reset state → prep]
F -- No --> Z[Exit]

E -- paused --> H[Resume from current_module]
E -- running --> H

H --> I{current_module}

I -- prep --> P[Run prep.md]
I -- teach_behavior --> T[Run teach_behavior.md]
I -- api_consolidation --> A1[Run api_consolidation.md]
I -- tools_rebuild --> R[Run tools_rebuild.md]
I -- updating_tools --> U[Run updating_tools.md]

P --> Q{User Continue?}
T --> Q
A1 --> Q
R --> Q
U --> Q

Q -- Stop --> S[Run stop_routine.md]
Q -- Continue --> N[Next Module]

N --> I

S --> Z[End]
U --> S
