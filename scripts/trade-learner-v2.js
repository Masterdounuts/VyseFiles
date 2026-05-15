#!/usr/bin/env node
// TRADE LEARNER V2 - Learning system for trading
// Analyzes what setups work, makes recommendations based on history

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'kb', 'trading', 'trade-history.json');

// ============================================
// TRADING CATEGORIES (CORRECTED)
// ============================================
//
// TRADING TYPE: Intraday / Day-to-Day / Mini (Crypto)
// STRATEGY: SMC (Smart Money Concepts) - uses multiple components
// SETUP: The specific entry trigger
//
// HIERARCHY:
//   Trading Type (Intraday/Day-to-Day/Mini) 
//     → Strategy (SMC)
//       → Components (Liquidity, Big Trader, S/D Zones, FVG, etc.)
//         → Setup (FVG pullback, Order Block bounce, etc.)

const TRADING_TYPES = ['intraday', 'daytoday', 'mini'];

// The strategy we use
const STRATEGY = 'smc';

// Components of SMC (what we're actually analyzing)
const SMC_COMPONENTS = [
  'liquidity-sweep',
  'big-trader',
  'sd-zones',
  'fvg',
  'order-block',
  'choch',
  'fib-golden',
  'amd'
];

// Setup = specific entry trigger
const SETUPS = [
  'fvg-pullback',
  'order-block-bounce',
  'liquidity-sweep',
  'breakout',
  'accumulation',
  'fundamental',
  'sector-momentum',
  'piggybank'
];

// Load or initialize data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch(e) {}
  return { trades: [], lessons: [] };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Add a trade
function addTrade(symbol, type, setup, result, profit) {
  const data = loadData();
  data.trades.push({
    date: new Date().toISOString().split('T')[0],
    symbol: symbol.toUpperCase(),
    type, // intraday, daytoday, mini
    strategy: STRATEGY, // smc
    setup,
    result, // 'win' or 'loss'
    profit: parseFloat(profit)
  });
  saveData(data);
  console.log(`✅ Added: ${symbol} | ${type} | ${setup} | ${result} $${profit}`);
}

// Add lesson
function addLesson(text) {
  const data = loadData();
  data.lessons.push({
    date: new Date().toISOString().split('T')[0],
    text
  });
  saveData(data);
  console.log(`✅ Lesson added: "${text}"`);
}

// Analyze and recommend
function analyzeAndRecommend() {
  const data = loadData();
  
  console.log('\n🎓 TRADING LEARNING SYSTEM');
  console.log('═'.repeat(50));
  
  // Stats
  const wins = data.trades.filter(t => t.result === 'win').length;
  const losses = data.trades.filter(t => t.result === 'loss').length;
  const total = wins + losses;
  const winRate = total > 0 ? (wins / total * 100).toFixed(1) : 0;
  
  console.log(`\n📊 OVERALL STATS (${total} trades):`);
  console.log(`   Win Rate: ${winRate}%`);
  console.log(`   Wins: ${wins} | Losses: ${losses}`);
  
  // By Trading Type
  const typeStats = {};
  data.trades.forEach(t => {
    if (!typeStats[t.type]) typeStats[t.type] = { wins: 0, losses: 0, profit: 0 };
    if (t.result === 'win') typeStats[t.type].wins++;
    else typeStats[t.type].losses++;
    typeStats[t.type].profit += t.profit;
  });
  
  console.log('\n📈 BY TRADING TYPE:');
  Object.entries(typeStats).forEach(([type, stats]) => {
    const wr = stats.wins + stats.losses > 0 ? (stats.wins / (stats.wins + stats.losses) * 100).toFixed(0) : 0;
    const emoji = wr >= 60 ? '✅' : wr >= 40 ? '🟡' : '❌';
    console.log(`   ${emoji} ${type}: ${wr}% ($${stats.profit.toFixed(2)})`);
  });
  
  // By Setup
  const setupStats = {};
  data.trades.forEach(t => {
    if (!setupStats[t.setup]) setupStats[t.setup] = { wins: 0, losses: 0, profit: 0 };
    if (t.result === 'win') setupStats[t.setup].wins++;
    else setupStats[t.setup].losses++;
    setupStats[t.setup].profit += t.profit;
  });
  
  console.log('\n🎯 BY SETUP (Entry Trigger):');
  Object.entries(setupStats).forEach(([setup, stats]) => {
    const wr = stats.wins + stats.losses > 0 ? (stats.wins / (stats.wins + stats.losses) * 100).toFixed(0) : 0;
    const emoji = wr >= 60 ? '✅' : wr >= 40 ? '🟡' : '❌';
    console.log(`   ${emoji} ${setup}: ${wr}% ($${stats.profit.toFixed(2)})`);
  });
  
  // By Symbol
  const symbolStats = {};
  data.trades.forEach(t => {
    if (!symbolStats[t.symbol]) symbolStats[t.symbol] = { wins: 0, losses: 0, profit: 0 };
    if (t.result === 'win') symbolStats[t.symbol].wins++;
    else symbolStats[t.symbol].losses++;
    symbolStats[t.symbol].profit += t.profit;
  });
  
  console.log('\n💰 BY SYMBOL:');
  Object.entries(symbolStats).forEach(([symbol, stats]) => {
    const wr = stats.wins + stats.losses > 0 ? (stats.wins / (stats.wins + stats.losses) * 100).toFixed(0) : 0;
    const emoji = wr >= 60 ? '✅' : wr >= 40 ? '🟡' : '❌';
    console.log(`   ${emoji} ${symbol}: ${wr}% ($${stats.profit.toFixed(2)})`);
  });
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  // Best trading type
  const bestType = Object.entries(typeStats)
    .sort((a, b) => b[1].profit - a[1].profit)[0];
  if (bestType) {
    console.log(`   🏆 Best type: ${bestType[0]}`);
  }
  
  // Best setup
  const bestSetup = Object.entries(setupStats)
    .filter(([_, s]) => s.wins + s.losses >= 1)
    .sort((a, b) => b[1].profit - a[1].profit)[0];
  if (bestSetup) {
    console.log(`   🏆 Best setup: ${bestSetup[0]}`);
  }
  
  // Recent lessons
  if (data.lessons.length > 0) {
    console.log('\n📝 RECENT LESSONS:');
    data.lessons.slice(-3).forEach(l => {
      console.log(`   • ${l.text}`);
    });
  }
  
  // Strategy reminder
  console.log('\n🎓 STRATEGY: SMC (Smart Money Concepts)');
  console.log('   Components: Liquidity, Big Trader, S/D Zones, FVG, Order Blocks');
  
  return { winRate, bestType, bestSetup };
}

// CLI
const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === 'stats') {
  analyzeAndRecommend();
} else if (cmd === 'record' && args.length >= 6) {
  // record SYMBOL TYPE SETUP WIN/LOSS PROFIT
  addTrade(args[1], args[2], args[3], args[4], args[5]);
} else if (cmd === 'lesson' && args.length >= 2) {
  addLesson(args.slice(1).join(' '));
} else if (cmd === 'recommend') {
  const result = analyzeAndRecommend();
  console.log('\n' + '─'.repeat(50));
  console.log('🧠 AI RECOMMENDATION:');
  if (result.bestType) {
    console.log(`   Focus on: ${result.bestType[0]} trades`);
  }
  if (result.bestSetup) {
    console.log(`   Best entry: ${result.bestSetup[0]}`);
  }
  console.log('   Remember: SMC strategy uses Liquidity + S/D + FVG + Big Trader');
} else if (cmd === 'categories') {
  console.log('📋 TRADING CATEGORIES\n');
  console.log('TRADING TYPES:');
  TRADING_TYPES.forEach(t => console.log(`   - ${t}`));
  console.log('\nSTRATEGY:');
  console.log(`   - ${STRATEGY}`);
  console.log('\nSMC COMPONENTS:');
  SMC_COMPONENTS.forEach(c => console.log(`   - ${c}`));
  console.log('\nSETUPS:');
  SETUPS.forEach(s => console.log(`   - ${s}`));
} else {
  console.log('🎓 TRADE LEARNER V2 (CORRECTED)');
  console.log('\nUsage:');
  console.log('  node trade-learner-v2 stats         - Show all stats');
  console.log('  node trade-learner-v2 categories    - Show categories');
  console.log('  node trade-learner-v2 record <sym> <type> <setup> <win|loss> <profit>');
  console.log('  node trade-learner-v2 lesson "<text>"');
  console.log('  node trade-learner-v2 recommend     - Get AI recommendation');
  console.log('\nCategories:');
  console.log('  Types: intraday, daytoday, mini');
  console.log('  Strategy: smc (uses: liquidity, big-trader, sd-zones, fvg, etc.)');
  console.log('  Setups: fvg-pullback, order-block-bounce, liquidity-sweep, breakout, accumulation');
  console.log('\nExamples:');
  console.log('  node trade-learner-v2 record NVDA intraday sector-momentum win 0.92');
  console.log('  node trade-learner-v2 record EOSE intraday big-trader loss -0.99');
  console.log('  node trade-learner-v2 record DOGE mini accumulation win 0.10');
}