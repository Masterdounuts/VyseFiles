#!/usr/bin/env node
// TRADING SYSTEM - Bulletproof Trading Machine
// All-in-one: Entry Checklist, Position Calculator, Exit Rules, Capital Tracker, Rule Validator

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'kb', 'trading');
const CAPITAL_FILE = path.join(DATA_DIR, 'capital.json');
const POSITIONS_FILE = path.join(DATA_DIR, 'positions-active.json');

// ============================================
// CONSTANTS
// ============================================
const RULES = {
  maxRiskPercent: 2,      // 2% max risk per trade
  minRR: 2.5,             // Minimum 2.5:1 reward to risk
  entryTime: {            // Intraday: 6:30 AM - 12:30 PM PT
    min: '06:30',
    max: '12:30'
  },
  daytoday: {             // Day-to-Day: Buy at close, sell next close
    entry: 'before-close',
    exit: 'next-close'
  },
  mini: {                 // Mini (Crypto): $2 max profit
    maxProfit: 2,
    hold: 'weekend-only'
  },
  fibLevels: [0, 0.706, 0.618, 1, 0.79],  // From Video 73
  stopLoss: -7            // -7% stop loss
};

const SMC_COMPONENTS = [
  { name: 'Trend', check: 'HH+HL or LL+LH identified', required: true },
  { name: 'Liquidity', check: 'Stop sweep occurred', required: true },
  { name: 'Zone', check: 'At supply or demand zone', required: true },
  { name: 'Confirmation', check: 'FVG + CHoCH + Volume + Order Block', required: true },
  { name: 'Entry', check: 'At golden zone (71% Fib) or better', required: true },
  { name: 'Risk', check: 'R:R > 2.5:1, ATR stop set', required: true },
  { name: 'Big Trader', check: 'Entry at or below big trader price', required: true },
  { name: '52-Week', check: 'Below 80% of 52-week range', required: true }
];

// ============================================
// CAPITAL TRACKER
// ============================================
function getCapital() {
  try {
    if (fs.existsSync(CAPITAL_FILE)) {
      return JSON.parse(fs.readFileSync(CAPITAL_FILE, 'utf8'));
    }
  } catch(e) {}
  return {
    total: 55,
    types: {
      mini: { name: 'Crypto', allocated: 5, available: 5, used: 0, profitCycle: 'same-day', reinvest: 'crypto' },
      intraday: { name: 'Intraday', allocated: 25, available: 25, used: 0, profitCycle: 'same-day', reinvest: 'next-intraday' },
      daytoday: { name: 'Day-to-Day', allocated: 25, available: 25, used: 0, profitCycle: '2-days', reinvest: 'next-daytoday' }
    }
  };
}

function saveCapital(data) {
  fs.writeFileSync(CAPITAL_FILE, JSON.stringify(data, null, 2));
}

function updateCapital(type, amount, action) {
  const cap = getCapital();
  if (action === 'use') {
    cap[type].used += amount;
    cap[type].available -= amount;
  } else if (action === 'release') {
    cap[type].used -= amount;
    cap[type].available += amount;
  }
  cap.total += action === 'use' ? -amount : amount;
  saveCapital(cap);
  return cap;
}

// ============================================
// POSITION SIZE CALCULATOR
// ============================================
function calculatePositionSize(entryPrice, stopLoss, capital) {
  // Risk = entry - stop (dollar amount)
  const riskPerShare = Math.abs(entryPrice - stopLoss);
  if (riskPerShare === 0) return { shares: 0, risk: 0 };
  
  // Max dollar risk = 2% of capital
  const maxDollarRisk = capital * (RULES.maxRiskPercent / 100);
  
  // Shares = risk / riskPerShare
  const shares = Math.floor(maxDollarRisk / riskPerShare);
  const actualRisk = shares * riskPerShare;
  
  return { shares, risk: actualRisk, riskPercent: (actualRisk / capital * 100) };
}

// ============================================
// ENTRY CHECKLIST
// ============================================
function runEntryChecklist(symbol, entryPrice, stopLoss, targetPrice) {
  console.log(`\n🎯 ENTRY CHECKLIST: ${symbol}`);
  console.log('═'.repeat(50));
  console.log(`Entry: $${entryPrice} | Stop: $${stopLoss} | Target: $${targetPrice}`);
  console.log('');
  
  let passed = 0;
  let failed = 0;
  
  SMC_COMPONENTS.forEach(comp => {
    console.log(`[ ] ${comp.name}: ${comp.check}`);
    console.log(`    Required: ${comp.required ? 'YES' : 'NO'}`);
  });
  
  // Calculate R:R
  const risk = Math.abs(entryPrice - stopLoss);
  const reward = Math.abs(targetPrice - entryPrice);
  const rr = reward / risk;
  
  console.log('');
  console.log(`📊 RISK/REWARD: ${rr.toFixed(2)}:1`);
  console.log(`   Required: ${RULES.minRR}:1`);
  
  if (rr < RULES.minRR) {
    console.log(`   ❌ FAILED: R:R below minimum`);
    failed++;
  } else {
    console.log(`   ✅ PASSED`);
    passed++;
  }
  
  // Check time
  const now = new Date();
  const hour = now.getHours();
  const isIntradayTime = hour >= 13 && hour < 20; // 6:30 AM - 12:30 PM PT = 13:00 - 20:00 UTC
  
  console.log('');
  console.log(`⏰ INTRADAY WINDOW: ${isIntradayTime ? '✅ OPEN' : '❌ CLOSED'}`);
  
  console.log('\n' + '─'.repeat(50));
  console.log(`📋 RESULT: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log('❌ DO NOT ENTER - Fix failures first');
    return false;
  }
  
  if (rr < RULES.minRR) {
    console.log('❌ DO NOT ENTER - R:R too low');
    return false;
  }
  
  console.log('✅ READY TO ENTER');
  return true;
}

// ============================================
// EXIT RULES
// ============================================
function getExitRule(type) {
  console.log(`\n📤 EXIT RULES: ${type}`);
  console.log('═'.repeat(50));
  
  if (type === 'intraday') {
    console.log('1. Exit by 12:30 PM PT (market closes 1 PM PT)');
    console.log('2. Target: +12% or Fib -2');
    console.log('3. Stop: -7% or below liquidity');
    console.log('4. Sell 50% at target, move rest to break-even');
  } else if (type === 'daytoday') {
    console.log('1. Buy at close, sell next day close (T+1)');
    console.log('2. Same target/stop as intraday');
    console.log('3. Hold overnight only with strong setup');
  } else if (type === 'mini') {
    console.log('1. Max profit: $2');
    console.log('2. Reinvest profits');
    console.log('3. Weekend hold for crypto');
  }
  
  return RULES[type] || null;
}

// ============================================
// RULE VALIDATOR
// ============================================
function validateEntry(entryPrice, bigTraderPrice) {
  console.log(`\n⚖️ RULE VALIDATOR`);
  console.log('═'.repeat(50));
  
  let violations = [];
  
  // Rule 1: Never enter above big trader
  if (entryPrice > bigTraderPrice) {
    violations.push(`❌ Entered ABOVE big trader ($${entryPrice} > $${bigTraderPrice})`);
  } else {
    violations.push(`✅ Entered at/below big trader ($${entryPrice} <= $${bigTraderPrice})`);
  }
  
  // Rule 2: Never enter at top of run
  // (This would need historical price data - mark as manual check)
  console.log('⚠️ MANUAL CHECK: Is this >45% run from bottom?');
  
  // Rule 3: Must have FVG pullback
  console.log('⚠️ MANUAL CHECK: Is there a FVG pullback?');
  
  // Rule 4: Must wait for liquidity sweep
  console.log('⚠️ MANUAL CHECK: Did liquidity sweep occur?');
  
  console.log('\n' + '─'.repeat(50));
  console.log('🚨 VIOLATIONS:');
  if (violations.length === 0) {
    console.log('   None! Good entry.');
  } else {
    violations.forEach(v => console.log(`   ${v}`));
  }
  
  return violations;
}

// ============================================
// ACTIVE POSITIONS
// ============================================
function getActivePositions() {
  try {
    if (fs.existsSync(POSITIONS_FILE)) {
      return JSON.parse(fs.readFileSync(POSITIONS_FILE, 'utf8'));
    }
  } catch(e) {}
  return [];
}

function addPosition(symbol, type, shares, entry, stop, target) {
  const positions = getActivePositions();
  positions.push({
    symbol,
    type,
    shares,
    entry,
    stop,
    target,
    entryDate: new Date().toISOString().split('T')[0],
    status: 'open'
  });
  fs.writeFileSync(POSITIONS_FILE, JSON.stringify(positions, null, 2));
}

function closePosition(symbol) {
  const positions = getActivePositions();
  const idx = positions.findIndex(p => p.symbol === symbol && p.status === 'open');
  if (idx >= 0) {
    positions[idx].status = 'closed';
    positions[idx].closeDate = new Date().toISOString().split('T')[0];
    fs.writeFileSync(POSITIONS_FILE, JSON.stringify(positions, null, 2));
    console.log(`✅ Closed ${symbol}`);
  }
}

// ============================================
// CAPITAL STATUS
// ============================================
function showCapital() {
  const cap = getCapital();
  console.log('\n💰 CAPITAL STATUS');
  console.log('═'.repeat(50));
  console.log(`Total: $${cap.total.toFixed(2)}`);
  console.log('');
  console.log('By Trading Type:');
  
  Object.entries(cap.types).forEach(([key, t]) => {
    const cycle = t.profitCycle === 'same-day' ? 'Same day' : '2 days';
    console.log(`\n  ${t.name.toUpperCase()} (${key}):`);
    console.log(`    Available: $${t.available} / $${t.allocated} allocated`);
    console.log(`    Profit returns: ${cycle}`);
    console.log(`    Reinvest to: ${t.reinvest}`);
  });
  
  console.log('\n' + '─'.repeat(50));
  console.log('📊 PROFIT TIMELINE:');
  console.log('  Mini:      Profit same day → reinvest crypto');
  console.log('  Intraday:  Profit same day → reinvest next intraday');
  console.log('  DayToday:  Buy Day 1, Sell Day 2, Profit Day 3 → reinvest next daytoday');
  
  return cap;
}

// ============================================
// CLI
// ============================================
const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === 'check' && args.length >= 4) {
  // check SYMBOL ENTRY STOP TARGET
  const result = runEntryChecklist(args[1], parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[4]));
} else if (cmd === 'validate' && args.length >= 3) {
  // validate ENTRY BIGTRADER
  validateEntry(parseFloat(args[1]), parseFloat(args[2]));
} else if (cmd === 'calc' && args.length >= 3) {
  // calc ENTRY STOP CAPITAL
  const result = calculatePositionSize(parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[3]));
  console.log('\n📊 POSITION SIZE:');
  console.log(`   Shares: ${result.shares}`);
  console.log(`   Risk: $${result.risk.toFixed(2)} (${result.riskPercent.toFixed(1)}%)`);
} else if (cmd === 'exit' && args.length >= 2) {
  getExitRule(args[1]);
} else if (cmd === 'capital') {
  showCapital();
} else if (cmd === 'positions') {
  const pos = getActivePositions();
  console.log('\n📊 ACTIVE POSITIONS:');
  pos.forEach(p => {
    console.log(`   ${p.symbol}: ${p.shares} shares @ $${p.entry} (${p.type})`);
  });
} else if (cmd === 'rules') {
  console.log('\n📋 TRADING RULES');
  console.log('═'.repeat(50));
  console.log(`Max Risk: ${RULES.maxRiskPercent}% per trade`);
  console.log(`Min R:R: ${RULES.minRR}:1`);
  console.log(`Intraday Window: ${RULES.entryTime.min} - ${RULES.entryTime.max} PT`);
  console.log(`Stop Loss: ${RULES.stopLoss}%`);
  console.log(`Fib Levels: ${RULES.fibLevels.join(', ')}`);
} else {
  console.log('🎯 TRADING SYSTEM - Bulletproof Trading Machine');
  console.log('\nUsage:');
  console.log('  node trading-system.js check <symbol> <entry> <stop> <target>  - Entry checklist');
  console.log('  node trading-system.js validate <entry> <bigTrader>             - Rule validator');
  console.log('  node trading-system.js calc <entry> <stop> <capital>           - Position size');
  console.log('  node trading-system.js exit <type>                             - Exit rules');
  console.log('  node trading-system.js capital                                 - Capital status');
  console.log('  node trading-system.js positions                               - Active positions');
  console.log('  node trading-system.js rules                                   - All rules');
  console.log('\nExamples:');
  console.log('  node trading-system.js check AAPL 150 142 168');
  console.log('  node trading-system.js validate 9.27 8.50');
  console.log('  node trading-system.js calc 150 145 25');
  console.log('  node trading-system.js exit intraday');
}