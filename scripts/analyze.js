#!/usr/bin/env node
// ANALYZE - Unified input for trading machine
// Runs all scanners and outputs data for recommendation

const exec = require('child_process').execSync;
const args = process.argv.slice(2);
const symbol = args[0]?.toUpperCase() || 'SYMBOL';

console.log('\n🔍 ANALYZING: ' + symbol);
console.log('═'.repeat(50));

// What we need to gather
const analysis = {
  symbol,
  price: null,
  volume: null,
  bigTrader: null,
  fvg: null,
  orderBlocks: null,
  trend: null,
  sdZone: null,
  fibLevels: null,
  preMarketMove: null
};

// Try to get price data
try {
  const priceCmd = `curl -s "https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d"`;
  const priceData = exec(priceCmd, { encoding: 'utf8' });
  const j = JSON.parse(priceData);
  const meta = j.chart?.result?.[0]?.meta;
  analysis.price = meta?.regularMarketPrice;
  analysis.prevClose = meta?.previousClose;
  
  // Calculate pre-market move
  if (analysis.price && analysis.prevClose) {
    analysis.preMarketMove = ((analysis.price - analysis.prevClose) / analysis.prevClose * 100).toFixed(2);
  }
  
  // Volume
  const vol = j.chart?.result?.[0]?.indicators?.quote?.[0]?.volume;
  if (vol) {
    analysis.volume = vol[vol.length - 1];
  }
} catch(e) {
  console.log('⚠️ Could not fetch price data');
}

// Try to run big trader detector (if script exists)
try {
  const btCmd = `cd ~/.openclaw/workspace-vyse && node scripts/big-trader-detector.js ${symbol} 2>/dev/null`;
  const btOutput = exec(btCmd, { encoding: 'utf8' });
  if (btOutput.includes('Big Trader') || btOutput.includes('Accumulation')) {
    analysis.bigTrader = 'Found';
  }
} catch(e) {
  // Script may not exist or errored
}

// Try FVG detector
try {
  const fvgCmd = `cd ~/.openclaw/workspace-vyse && node scripts/fvg-detector.js ${symbol} 2>/dev/null`;
  const fvgOutput = exec(fvgCmd, { encoding: 'utf8' });
  if (fvgOutput.includes('FVG') || fvgOutput.includes('Valid')) {
    analysis.fvg = 'Found';
  }
} catch(e) {}

// Try Order Block detector
try {
  const obCmd = `cd ~/.openclaw/workspace-vyse && node scripts/order-block-detector.js ${symbol} 2>/dev/null`;
  const obOutput = exec(obCmd, { encoding: 'utf8' });
  if (obOutput.includes('Order Block') || obOutput.includes('Demand')) {
    analysis.orderBlocks = 'Found';
  }
} catch(e) {}

// OUTPUT THE ANALYSIS
console.log('\n📊 ANALYSIS RESULTS');
console.log('─'.repeat(50));

console.log(`\n💵 PRICE DATA:`);
console.log(`   Current:  $${analysis.price || 'N/A'}`);
console.log(`   Prev Close: $${analysis.prevClose || 'N/A'}`);
console.log(`   Pre-Market: ${analysis.preMarketMove || 0}%`);

console.log(`\n📈 SMC COMPONENTS:`);
console.log(`   Big Trader: ${analysis.bigTrader || '❓'}`);
console.log(`   FVG: ${analysis.fvg || '❓'}`);
console.log(`   Order Blocks: ${analysis.orderBlocks || '❓'}`);

console.log('\n🎯 INPUT SUMMARY FOR RECOMMENDATION:');
console.log(`   Symbol: ${symbol}`);
console.log(`   Entry:  $${analysis.price || '[ENTER PRICE]'}`);
console.log(`   Stop:   $[STOP]`);
console.log(`   Target: $[TARGET]`);
console.log(`   BigTrader: $[BIG TRADER PRICE]`);

console.log('\n📋 NEXT:');
console.log(`   1. Fill in [STOP], [TARGET], [BIG TRADER PRICE]`);
console.log(`   2. Run: node scripts/recommend.js ${symbol} intraday [ENTRY] [STOP] [TARGET] [BIGTRADER]`);
console.log(`   3. Or run full check: node scripts/trading-system.js check ${symbol} [ENTRY] [STOP] [TARGET]`);

// Export for other scripts
const output = JSON.stringify(analysis, null, 2);
console.log('\n' + '─'.repeat(50));
console.log('📦 RAW DATA (for debugging):');
console.log(output);