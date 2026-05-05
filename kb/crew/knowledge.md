## 2026-05-04 - Role Test
- **From**: Scribe Role Test
- **Learned**: Testing if correct role loads
- **Apply**: Verify role is correct

## 2026-05-05

### From vyse
- **Type:** discovery (system design)
- **Learned:** The crew has no learning workflow - knowledge.md was empty, no one knew to store learnings
- **Apply:** When setting up any new crew member - give them the learning loop
- **Evidence:** Scribe audit showed only 1 test entry from May 4

### From vyse
- **Type:** fix
- **Learned:** context monitor timed out 24x because scripts took too long
- **Apply:** Keep background cron scripts under 30 seconds
- **Evidence:** cron job context-monitor consecutiveErrors: 24