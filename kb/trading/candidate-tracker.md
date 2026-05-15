# PRE-MARKET CANDIDATE TRACKER
*Tracks candidates through the night*

---

## Corrected Flow

```
1:00 AM    → Run INTRADAY SCANNER → Get candidates (store in candidates.json)
1:30 AM    → Check candidates: Still valid? Update score
2:00 AM    → Check candidates: Still valid? Update score
2:30 AM    → Check candidates: Still valid? Update score
3:00 AM    → Check candidates: Still valid? Update score
3:30 AM    → Check candidates: Still valid? Update score
4:00 AM    → Check candidates: Still valid? Update score
4:30 AM    → Check candidates: Still valid? Update score
5:00 AM    → Check candidates: Still valid? Update score
5:30 AM    → FINAL CHECK: Are candidates still good?
            → IF failed: Run intraday scanner AGAIN to get new candidates
6:00 AM    → Review final candidates + prepare
6:30 AM    → Execute on VALID candidates only
```

---

## Candidate Data Structure

```json
{
  "lastUpdated": "2026-05-14T01:00:00-07:00",
  "candidates": [
    {
      "symbol": "AMC",
      "score": 85,
      "trend": "up",
      "volume": "high",
      "price": 1.44,
      "validityScore": 8,
      "firstSeen": "1:00 AM",
      "lastChecked": "5:30 AM",
      "checks": [
        { "time": "1:00 AM", "valid": true, "score": 80 },
        { "time": "1:30 AM", "valid": true, "score": 82 },
        { "time": "2:00 AM", "valid": true, "score": 85 },
        { "time": "2:30 AM", "valid": false, "score": 45 },  // Failed!
        { "time": "3:00 AM", "valid": "RE-SCAN", "score": 0 }
      ]
    }
  ],
  "needsReScan": true,
  "reason": "Candidate AMC validity dropped below 50%"
}
```

---

## Rules

| Validity Score | Status | Action |
|----------------|--------|--------|
| **80-100** | ✅ Strong | Keep monitoring |
| **50-79** | ⚠️ Weak | Check more frequently |
| **Below 50** | ❌ Failed | Trigger re-scan |

---

## Re-Scan Trigger

If ANY candidate drops below 50%:
1. Log the failure
2. Run intraday scanner immediately
3. Replace failed candidate with new one
4. Continue monitoring new candidate

---

*File: kb/trading/candidates.json*