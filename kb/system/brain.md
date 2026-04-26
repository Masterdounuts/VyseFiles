# Brain System

*How Vyse uses GitHub as a second brain*

## Structure

```
workspace/
├── kb/                 # Permanent knowledge (wiki)
│   ├── system/         # OpenClaw, skills, fixes
│   ├── crew/           # Subagents, protocols
│   ├── stocks/         # Trading, positions, research
│   ├── dreams/         # Vision, creative ideas
│   ├── concepts/       # Ideas, patterns
│   ├── reference/      # Docs, links
│   ├── personal/       # David's projects, notes
│   └── immigration/    # Immigration info
│
└── memory/             # Session logs
    ├── 2026-04-XX.md   # Daily session logs
    ├── content/        # Promoted content
    └── active.md       # Current session state
```

## Promotion Protocol

**When to promote memory → kb:**

| Trigger | Action |
|---------|--------|
| Fix applied | → kb/system/FIXES.md |
| New skill created | → skills/[name]/SKILL.md |
| Decision made | → kb/system/decisions.md |
| Project milestone | → kb/personal/projects.md |
| Research complete | → memory/content/ → kb/appropriate hub |

## Daily Workflow

1. **Wake**: Pull from GitHub
2. **Work**: Log to memory/YYYY-MM-DD.md
3. **Promote**: Extract permanent knowledge → kb/
4. **Sleep**: Push to GitHub (auto via post-commit)

## GitHub Search

**Quick recall:**
```bash
# Search all kb/ files
gh search code "keyword" --repo Masterdounuts/VyseFiles --path kb

# Or use web_search with "site:github.com/Masterdounuts/VyseFiles kb"
```

## Memory Search (Primary)

Before any research:
```bash
memory_search "topic"
```
Searches memory/*.md + kb/*.md

---

*Brain maintained by Vyse - evolves as I learn*