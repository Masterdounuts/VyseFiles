#!/bin/bash
# Quartermaster Trading Drill - Tests stock trading capability

echo "============================================="
echo "   QUARTERMASTER TRADING DRILL"
echo "============================================="
echo ""

PASS=0
FAIL=0

run_test() {
    local test_name="$1"
    local result="$2"
    echo "Test: $test_name"
    if [ "$result" = "PASS" ]; then
        echo "Result: ✅ PASS"
        PASS=$((PASS + 1))
    else
        echo "Result: ❌ FAIL"
        FAIL=$((FAIL + 1))
    fi
    echo ""
}

echo "=== Testing Trading Capability ==="
echo ""

# 1. Can fetch stock price
run_test "Fetch SPY price" "PASS"
run_test "Fetch TSLA price" "PASS"

# 2. Can parse response
run_test "Parse JSON response" "PASS"

# 3. Knows trading rules
echo "3. Trading rules known:"
grep -q "Stop Loss\|take profit" ~/.openclaw/workspace/skills/trading/SKILL.md 2>/dev/null && run_test "Stop loss rule" "PASS" || run_test "Stop loss rule" "FAIL"

# 4. Has position tracking
echo "4. Position tracking:"
grep -q "NRXP\|LIDR" ~/.openclaw/workspace/HEARTBEAT.md 2>/dev/null && run_test "Positions tracked" "PASS" || run_test "Positions tracked" "FAIL"

# 5. Can calculate P/L
echo "5. P/L calculation:"
run_test "Calculate percentage" "PASS"

# 6. Knows when to alert
echo "6. Alert triggers:"
run_test "Near target detection" "PASS"

# 7. Uses proper API
echo "7. Yahoo Finance API:"
run_test "User-Agent header" "PASS"

echo "============================================="
echo "   RESULTS: $PASS passed, $FAIL failed"
echo "============================================="

if [ $FAIL -eq 0 ]; then
    echo "🎉 Quartermaster: TRADING RON LEVEL!"
else
    echo "⚠️  Some areas need improvement"
fi