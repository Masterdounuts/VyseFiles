# Telegram Group Fix — Shipwright Handoff

**Date:** 2026-04-24
**Status:** ✅ RESOLVED

## Issue
Bot not responding to group messages without @mention

## Root Causes
1. Group config had wrong structure (was in `groupAllowFrom` instead of `channels.telegram.groups`)
2. Telegram Bot Privacy Mode was enabled — blocks group messages unless mentioned

## Fixes Applied
| Fix | Details |
|-----|---------|
| Config update | Moved group to `channels.telegram.groups` with `requireMention: false` |
| Privacy mode | User disabled via @BotFather (`/setprivacy` → Disable) |
| Gateway restart | Required to pick up config changes |

## Config Location
`/home/openclaw/.openclaw/openclaw.json` — `channels.telegram.groups[]`

## Key Learning
When `requireMention: false` is set, **Telegram privacy mode must be disabled** for bot to see unmentioned group messages.

---

*Escalated to Shipwright for system knowledge base*