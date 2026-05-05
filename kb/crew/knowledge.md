## 2026-05-04 - Role Test
- **From**: Scribe Role Test
- **Learned**: Testing if correct role loads
- **Apply**: Verify role is correct

## 2026-05-05

### From quartermaster
- **Type:** success
- **Learned:** GGB was best trade - +18% ($3.44), held 12 days, patience paid off
- **Apply:** When stock has good momentum but no clear exit - hold for 10+ days
- **Evidence:** Trade #1-#10, bought $4.18, sold $4.32

### From quartermaster
- **Type:** success
- **Learned:** Dividend plays work - PFE small profit + dividends
- **Apply:** For stable dividend stocks, small profit is acceptable
- **Evidence:** Trade #9, #11 - bought $26.90, sold $27.02 (+0.4%)

### From quartermaster
- **Type:** success
- **Learned:** Quick momentum works - AMC +3% in 1 day
- **Apply:** High-volatility momentum plays - hold 1-2 days max
- **Evidence:** Trade #3, #4 - bought $1.64, sold $1.69

### From quartermaster
- **Type:** failure
- **Learned:** Quick losses happen - LCID/BBAI lost within 1-2 days
- **Apply:** Cut losses quickly, don't hope for recovery
- **Evidence:** Trade #7 (LCID -8%), Trade #8 (BBAI -2.5%)

### From quartermaster
- **Type:** success
- **Learned:** Stop-loss discipline works - 71% win rate, losses under 8%
- **Apply:** Stick to -7% stop-loss rule strictly
- **Evidence:** Only 2 losses out of 14 trades

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