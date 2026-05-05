# Rebalancing Rules

*When to add to winning positions, when to cut losers*

---

## When to ADD to Position (Scale Up)

| Condition | Action | How Much |
|-----------|--------|----------|
| Position up >+10% | Add 50% more | Half of original position size |
| Strong momentum confirmed | Add on pullback | 25% of capital max |
| Hit first target, still strong | Add more | Take from profit, not capital |
| New thesis confirmed | Add | Research first |

### Add Rules
- Max total in one stock: 25% of capital
- Only add with profits, not new capital
- After adding, adjust stop to breakeven

---

## When to CUT Position (Scale Down)

| Condition | Action | How Much |
|-----------|--------|----------|
| Stop hit (-7%) | Exit | 100% - take the loss |
| Position down >-5% on news | Cut 50% | Reduce risk |
| Thesis broken | Exit | 100% - don't hold broken thesis |
| Better opportunity | Move capital | Sell to buy better play |

### Cut Rules
- If thesis breaks → Exit regardless of P/L
- Never average down on losing positions
- Move capital to winners, not losers

---

## Position Review Checklist (Every Check)

- [ ] Position >+10%? → Consider adding
- [ ] Position >+15%? → Move stop to breakeven
- [ ] Position <-5%? → Re-evaluate thesis
- [ ] Position <-7%? → Exit (stop hit)
- [ ] Better opportunity? → Rebalance

---

## Rebalancing Formula

```
if (position_pct > 10 AND momentum_strong):
    add_position(size / 2)
    move_stop_to_breakeven()

if (position_pct < -5 AND thesis_uncertain):
    cut_position(size / 2)

if (position_pct <= -7):
    exit_full()
```

---

## Capital Reallocation

When selling:
1. Take profit → Keep 50% cash, redeploy 50%
2. Stop loss → Move 100% to cash, wait for next opportunity
3. Thesis break → Move to cash, re-research

---

*Rebalancing keeps us flexible while maximizing winners*