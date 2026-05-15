#!/usr/bin/env node
// SMC SCANNER - Unified SMC analysis combining ALL detections
// Combines: Trend + Liquidity + CHOCH + 52-week (local)
// FVG, Order Blocks, Big Trader - use separate live tools

// ============================================
// UNIFIED SMC SCANNER
// ============================================

const { detectTrend, validateTrendForTrade } = require('./trend-detector.js');
const { findLiquidityZones, detectLiquiditySweep, getActiveLiquidity } = require('./liquidity-detector.js');
const { getStructureState } = require('./choch-detector.js');
const { check52WeekRule } = require('./52week-check.js');

/**
 * Run complete SMC analysis on any stock
 */
function smcScan(symbol, candles, week52 = null) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🔍 SMC SCAN: ${symbol}`);
  console.log(`   Candles: ${candles.length}`);
  console.log(`${'═'.repeat(60)}`);
  
  const results = {
    symbol,
    timestamp: new Date().toISOString(),
    trend: null,
    liquidity: null,
    choch: null,
    fvg: null,
    orderBlocks: null,
    bigTrader: null,
    week52: null,
    validEntry: false,
    recommendation: null,
    violations: []
  };
  
  // 1. TREND
  console.log('\n📈 1. TREND ANALYSIS');
  results.trend = detectTrend(candles);
  console.log(`   Trend: ${results.trend.trend.toUpperCase()}`);
  
  const trendValidation = validateTrendForTrade(results.trend);
  if (!trendValidation.valid) {
    results.violations.push(`Trend: ${trendValidation.reason}`);
  }
  console.log(`   Status: ${trendValidation.valid ? '✅' : '❌'} ${trendValidation.reason}`);
  
  // 2. LIQUIDITY
  console.log('\n💧 2. LIQUIDITY');
  results.liquidity = {
    zones: findLiquidityZones(candles),
    sweep: null,
    active: null
  };
  results.liquidity.sweep = detectLiquiditySweep(candles, results.liquidity.zones);
  results.liquidity.active = getActiveLiquidity(candles, results.liquidity.zones);
  
  if (results.liquidity.sweep.swept) {
    console.log(`   Sweep: ✅ ${results.liquidity.sweep.direction.toUpperCase()} @ $${results.liquidity.sweep.sweepPrice.toFixed(2)}`);
  } else {
    console.log(`   Sweep: ⏳ Waiting for sweep`);
    results.violations.push('Liquidity: No sweep detected yet');
  }
  
  // 3. CHOCH
  console.log('\n🔄 3. CHANGE OF CHARACTER');
  results.choch = getStructureState(candles);
  if (results.choch.choch.detected) {
    console.log(`   CHOCH: ✅ ${results.choch.choch.direction.toUpperCase()}`);
  } else {
    console.log(`   CHOCH: ⏳ ${results.choch.choch.reason || 'No clear break'}`);
    results.violations.push('CHOCH: No clear change of character');
  }
  
  // 4. FVG (manual check)
  console.log('\n📊 4. FAIR VALUE GAP');
  console.log(`   FVG: ⏳ Use: node fvg-detector.js <SYMBOL>`);
  
  // 5. ORDER BLOCKS (manual check)
  console.log('\n🧱 5. ORDER BLOCKS');
  console.log(`   OB: ⏳ Use: node order-block-detector.js <SYMBOL>`);
  
  // 6. BIG TRADER (manual check)
  console.log('\n🏦 6. BIG TRADER');
  console.log(`   Big Trader: ⏳ Use: node big-trader-detector.js <SYMBOL>`);
  
  // 7. 52-WEEK RULE
  console.log('\n📅 7. 52-WEEK RULE');
  if (week52) {
    results.week52 = check52WeekRule(
      candles[candles.length - 1].close,
      week52.high,
      week52.low
    );
    console.log(`   Position: ${results.week52.percentage}%`);
    console.log(`   Status: ${results.week52.inRange ? '✅' : '❌'} ${results.week52.message}`);
    
    if (!results.week52.inRange) {
      results.violations.push(`52-Week: Above 80% of range (${results.week52.percentage}%)`);
    }
  } else {
    console.log(`   Status: ⚠️ No 52-week data`);
    results.violations.push('52-Week: No data provided');
  }
  
  // FINAL VALIDATION
  console.log('\n' + '─'.repeat(60));
  console.log('\n🎯 ENTRY VALIDATION');
  
  let greenLights = 0;
  let total = 4;
  
  if (trendValidation.valid) greenLights++;
  if (results.liquidity.sweep.swept) greenLights++;
  if (results.choch.choch.detected) greenLights++;
  if (results.week52 && results.week52.inRange) greenLights++;
  
  console.log(`\nGreen Lights: ${greenLights}/${total}`);
  
  results.validEntry = greenLights >= 3;
  
  if (results.validEntry) {
    console.log(`\n✅ VALID ENTRY - Core criteria met`);
    results.recommendation = {
      action: results.trend.trend === 'up' ? 'LONG' : 'SHORT',
      confidence: Math.round((greenLights / total) * 100),
      nextSteps: 'Run fvg-detector, order-block-detector, big-trader-detector for full picture'
    };
  } else {
    console.log(`\n❌ NOT READY - Violations:`);
    results.violations.forEach(v => console.log(`   • ${v}`));
    results.recommendation = {
      action: 'WAIT',
      confidence: Math.round((greenLights / total) * 100),
      nextSteps: 'Fix violations before proceeding'
    };
  }
  
  return results;
}

// ============================================
// CLI
// ============================================

if (require.main === module) {
  // Demo candles
  const demoCandles = [];
  let price = 100;
  for (let i = 0; i < 30; i++) {
    const move = (Math.random() - 0.45) * 2;
    price += move;
    demoCandles.push({
      time: `2026-05-${String(i+1).padStart(2,'0')}`,
      open: price,
      high: price + Math.random(),
      low: price - Math.random(),
      close: price + (Math.random() - 0.5),
      volume: 1000
    });
  }
  
  smcScan('DEMO', demoCandles, { high: 120, low: 85 });
}

module.exports = { smcScan };