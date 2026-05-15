#!/usr/bin/env node
// RECOMMENDATION OUTPUT - Standard format for every trade
// Usage: node recommend.js SYMBOL TYPE ENTRY STOP TARGET BIGTRADER

const args = process.argv.slice(2);

if (args.length < 6) {
  console.log('📊 STANDARD TRADE RECOMMENDATION');
  console.log('\nUsage: node recommend.js SYMBOL TYPE ENTRY STOP TARGET BIGTRADER');
  console.log('\nExample: node recommend.js AAPL intraday 150.00 145.00 168.00 148.00');
  console.log('\nOutput Format:');
  console.log('  Stock, Type, Setup, Reason, Entry, Stop, Target, Profit%, Profit$, R:R, Confidence%, Violations');
  process.exit(1);
}

const [symbol, type, entry, stop, target, bigTrader] = args;
const entryPrice = parseFloat(entry);
const stopPrice = parseFloat(stop);
const targetPrice = parseFloat(target);
const bigTraderPrice = parseFloat(bigTrader);

// Calculations
const profitPercent = ((targetPrice - entryPrice) / entryPrice * 100).toFixed(1);
const profitDollar = (targetPrice - entryPrice).toFixed(2);
const risk = Math.abs(entryPrice - stopPrice);
const reward = Math.abs(targetPrice - entryPrice);
const rr = (reward / risk).toFixed(2);

// Confidence (based on R:R)
let confidence = 50;
if (rr >= 3) confidence = 90;
else if (rr >= 2.5) confidence = 80;
else if (rr >= 2) confidence = 60;
else confidence = 40;

// Violations
const violations = [];
if (entryPrice > bigTraderPrice) {
  violations.push(`ENTERED ABOVE BIG TRADER ($${entryPrice} > $${bigTraderPrice})`);
}

// Output in standard format
console.log('\n' + '═'.repeat(60));
console.log('📊 TRADE RECOMMENDATION');
console.log('═'.repeat(60));

console.log(`\n┌─────────────────────────────────────────────────────────┐`);
console.log(`│ STOCK: ${symbol.padEnd(50)}│`);
console.log(`├─────────────────────────────────────────────────────────┤`);
console.log(`│ Type: ${type.padEnd(53)}│`);
console.log(`│ Setup: FVG pullback / Order Block / Liquidity Sweep   │`);
console.log(`│ Reason: [To be filled based on analysis]                │`);
console.log(`├─────────────────────────────────────────────────────────┤`);
console.log(`│ Entry:   $${entryPrice.toString().padEnd(45)}│`);
console.log(`│ Stop:    $${stopPrice.toString().padEnd(45)}│`);
console.log(`│ Target:  $${targetPrice.toString().padEnd(45)}│`);
console.log(`├─────────────────────────────────────────────────────────┤`);
console.log(`│ Profit Potential: ${profitPercent}% ($${profitDollar})`.padEnd(52) + '│');
console.log(`│ Timeline: ${type.padEnd(47)}│`);
console.log(`│ R:R: ${rr}:1`.padEnd(52) + '│');
console.log(`│ Confidence: ${confidence}%`.padEnd(48) + '│');
console.log(`├─────────────────────────────────────────────────────────┤`);

if (violations.length > 0) {
  console.log(`│ ⚠️ VIOLATIONS:`.padEnd(52) + '│');
  violations.forEach(v => {
    console.log(`│   ❌ ${v}`.padEnd(51) + '│');
  });
} else {
  console.log(`│ ✅ All rules passed`.padEnd(52) + '│');
}

console.log(`└─────────────────────────────────────────────────────────┘`);

// Decision
console.log('\n🎯 DECISION:');
if (violations.length > 0) {
  console.log('   ❌ DO NOT ENTER - Violations found');
} else if (parseFloat(rr) < 2.5) {
  console.log('   ❌ DO NOT ENTER - R:R too low');
} else if (confidence < 60) {
  console.log('   ⚠️ CAUTION - Low confidence');
} else {
  console.log('   ✅ READY TO ENTER');
}

console.log('\n' + '─'.repeat(60));
console.log('📋 NEXT STEPS:');
console.log('   1. Run full check: node trading-system.js check');
console.log('   2. Validate rules: node trading-system.js validate');
console.log('   3. Calculate size: node trading-system.js calc');
console.log('   4. Execute and record in learning system');