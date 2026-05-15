#!/usr/bin/env node
// SMC SCANNER - UNIFIED - Type-adaptive output
// Adapts strategy for: Crypto Mini, Intraday, Day-to-Day

const { detectTrend, validateTrendForTrade } = require('./trend-detector.js');
const { findLiquidityZones, detectLiquiditySweep, getActiveLiquidity } = require('./liquidity-detector.js');
const { getStructureState } = require('./choch-detector.js');
const { check52WeekRule } = require('./52week-check.js');

// ============================================
// TYPE-SPECIFIC STRATEGIES
// ============================================

const STRATEGIES = {
  mini: {
    name: 'Crypto (Mini)',
    timeframes: ['15m', '1h', '4h'],
    entryRules: [
      'Volume spike detected',
      'FVG present',
      'Big trader accumulation'
    ],
    exitRules: [
      '+5% target (quick flip)',
      '+10% (strong setup)',
      'Hold 1-2 days if bullish',
      'Bolster with profits if upward expected'
    ],
    holdPeriod: 'Same day to 2 days',
    maxRisk: '2%',
    note: 'QUICK TURNOVER - Primary goal is flip'
  },
  intraday: {
    name: 'Intraday',
    timeframes: ['5m', '15m', '1h'],
    entryRules: [
      'AMD window (10:00 AM PT)',
      'Trend confirmed (HH+HL)',
      'Liquidity sweep occurred',
      'FVG + Order Block present',
      'Big trader entry below our entry'
    ],
    exitRules: [
      '+5% target',
      '12:30 PM PT HARD CUTOFF',
      'Big trader exits = exit immediately'
    ],
    entryWindow: '6:30 AM - 12:30 PM PT',
    exitWindow: 'Same day by 12:30 PM PT',
    maxRisk: '2%',
    note: 'SAME DAY - No holds overnight'
  },
  daytoday: {
    name: 'Day-to-Day',
    timeframes: ['1h', '4h', '1D'],
    entryRules: [
      'Close position (buy at close)',
      'Trend: HH+HL or LL+LH clear',
      'Liquidity sweep confirmed',
      'CHOCH in direction',
      '52-week rule: below 80%',
      'Order block at entry'
    ],
    exitRules: [
      '+12% target',
      'Next day close (T+1)',
      'Fib -2% stop',
      'Big trader distribution = exit immediately'
    ],
    entryTiming: 'At market close',
    exitTiming: 'Next day close',
    holdPeriod: '1-2 days',
    maxRisk: '2%',
    note: 'T+1 - Buy Day 1, Sell Day 2'
  }
};

// ============================================
// ADAPTIVE OUTPUT
// ============================================

function getStrategyForType(type) {
  return STRATEGIES[type] || STRATEGIES.intraday;
}

function formatRecForType(type, analysis) {
  const strategy = STRATEGIES[type];
  
  let output = `\n${'═'.repeat(60)}`;
  output += `\n🎯 ${strategy.name.toUpperCase()} RECOMMENDATION`;
  output += `\n${'═'.repeat(60)}`;
  
  // Basic info
  output += `\n📊 Symbol: ${analysis.symbol}`;
  output += `\n🕐 Type: ${strategy.name}`;
  output += `\n💰 Entry: $${analysis.entry?.toFixed(2) || 'TBD'}`;
  output += `\n🛡️ Stop: $${analysis.stop?.toFixed(2) || 'TBD'}`;
  output += `\n🎯 Target: $${analysis.target?.toFixed(2) || 'TBD'}`;
  output += `\n📈 R:R: ${analysis.rr || 'TBD'}`;
  
  // Type-specific rules
  output += `\n\n📋 ${strategy.name.toUpperCase()} RULES:`;
  output += `\n   Entry:`;
  strategy.entryRules.forEach(r => output += `\n   • ${r}`);
  output += `\n   Exit:`;
  strategy.exitRules.forEach(r => output += `\n   • ${r}`);
  
  // Timing
  if (strategy.entryWindow) {
    output += `\n\n⏰ Entry Window: ${strategy.entryWindow}`;
  }
  if (strategy.exitWindow) {
    output += `\n⏰ Exit Window: ${strategy.exitWindow}`;
  }
  if (strategy.entryTiming) {
    output += `\n⏰ Entry Timing: ${strategy.entryTiming}`;
  }
  if (strategy.exitTiming) {
    output += `\n⏰ Exit Timing: ${strategy.exitTiming}`;
  }
  
  // Violations
  if (analysis.violations?.length > 0) {
    output += `\n\n⚠️ VIOLATIONS:`;
    analysis.violations.forEach(v => output += `\n   • ${v}`);
  }
  
  // Notes
  output += `\n\n💡 Note: ${strategy.note}`;
  
  return output;
}

// ============================================
// MAIN SCAN WITH TYPE ADAPTATION
// ============================================

function smcScanType(symbol, candles, week52 = null, tradeType = 'intraday') {
  const strategy = STRATEGIES[tradeType];
  
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🔍 SMC SCAN: ${symbol} [${strategy.name.toUpperCase()}]`);
  console.log(`   Type: ${tradeType} | Candles: ${candles.length}`);
  console.log(`${'═'.repeat(60)}`);
  
  const results = {
    symbol,
    type: tradeType,
    strategy,
    timestamp: new Date().toISOString(),
    trend: null,
    liquidity: null,
    choch: null,
    week52: null,
    validEntry: false,
    entry: null,
    stop: null,
    target: null,
    rr: null,
    violations: []
  };
  
  // 1. TREND
  results.trend = detectTrend(candles);
  const trendValid = validateTrendForTrade(results.trend);
  if (!trendValid.valid) results.violations.push(`Trend: ${trendValid.reason}`);
  
  // 2. LIQUIDITY
  const zones = findLiquidityZones(candles);
  const sweep = detectLiquiditySweep(candles, zones);
  if (!sweep.swept) results.violations.push('Liquidity: No sweep detected');
  results.liquidity = { zones, sweep };
  
  // 3. CHOCH
  results.choch = getStructureState(candles);
  if (!results.choch.choch.detected) results.violations.push('CHOCH: No clear break');
  
  // 4. 52-WEEK
  if (week52) {
    results.week52 = check52WeekRule(candles[candles.length - 1].close, week52.high, week52.low);
    if (!results.week52.inRange) results.violations.push(`52-Week: ${results.week52.percentage}% (above 80%)`);
  }
  
  // Calculate Entry/Stop/Target based on type
  const price = candles[candles.length - 1].close;
  
  if (tradeType === 'mini') {
    // Crypto: tighter targets, quicker
    results.entry = price;
    results.stop = price * 0.97; // 3% stop for crypto
    results.target = price * 1.05; // 5% target (quick flip)
    results.rr = ((results.target - price) / (price - results.stop)).toFixed(1);
  } else if (tradeType === 'intraday') {
    // Intraday: standard SMC
    results.entry = price;
    results.stop = price * 0.98; // 2% stop
    results.target = price * 1.05; // 5% target
    results.rr = ((results.target - price) / (price - results.stop)).toFixed(1);
  } else {
    // Day-to-day: larger targets
    results.entry = price;
    results.stop = price * 0.98; // 2% stop
    results.target = price * 1.12; // 12% target
    results.rr = ((results.target - price) / (price - results.stop)).toFixed(1);
  }
  
  // Validation
  let greenLights = 0;
  if (trendValid.valid) greenLights++;
  if (sweep.swept) greenLights++;
  if (results.choch.choch.detected) greenLights++;
  if (results.week52?.inRange) greenLights++;
  
  results.validEntry = greenLights >= 3;
  
  // Output
  console.log(formatRecForType(tradeType, results));
  
  return results;
}

// ============================================
// CLI
// ============================================

const args = process.argv.slice(2);
const symbol = args[0] || 'DEMO';
const type = args[1] || 'intraday';

if (require.main === module) {
  // Demo candles
  const candles = [];
  let price = 100;
  for (let i = 0; i < 30; i++) {
    price += (Math.random() - 0.45) * 2;
    candles.push({
      time: `2026-05-${String(i+1).padStart(2,'0')}`,
      open: price, high: price + 1, low: price - 1,
      close: price + (Math.random() - 0.5), volume: 1000
    });
  }
  
  console.log('\n📊 TYPE-SPECIFIC OUTPUT DEMO');
  
  // Show each type
  smcScanType(symbol, candles, { high: 120, low: 85 }, 'mini');
  smcScanType(symbol, candles, { high: 120, low: 85 }, 'intraday');
  smcScanType(symbol, candles, { high: 120, low: 85 }, 'daytoday');
}

module.exports = { smcScanType, STRATEGIES, getStrategyForType, formatRecForType };