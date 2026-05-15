#!/usr/bin/env node
// IMPORT TRADES - Populate trade-learner with all historical trades
// Reads from positions.md and imports into learning system

const fs = require('fs');
const path = require('path');

// Trade history from positions.md
const TRADES = [
  // Format: [date, action, symbol, shares, price, profit, reason]
  ['2026-05-05', 'BUY', 'NVDA', 0.050426, 198.31, null, 'AI/GPU play'],
  ['2026-05-05', 'BUY', 'WGS', 1, 35.94, null, 'Bull case'],
  ['2026-05-07', 'SELL', 'WGS', 1, 38.36, 2.42, 'Exit at target'],
  ['2026-05-07', 'BUY', 'NIO', 1, 5.94, null, 'SMC setup'],
  ['2026-05-08', 'SELL', 'NVDA', 1, 215.00, 0.92, 'Exit'],
  ['2026-05-08', 'SELL', 'NIO', 1, 5.87, -0.07, 'Exit - ADR rule'],
  ['2026-05-08', 'BUY', 'QQQ', 0.021, 708.78, null, 'Piggybank'],
  ['2026-05-08', 'BUY', 'DOGE', 7.16, 0.1118, null, 'Crypto'],
  ['2026-05-09', 'BUY', 'WLFI', 14.5, 0.06873, null, 'Crypto weekend'],
  ['2026-05-12', 'SELL', 'DOGE', 7.16, 0.11, -0.02, 'Exited'],
  ['2026-05-12', 'SELL', 'WLFI', 14.5, 0.067, -0.02, 'Exited'],
  ['2026-05-12', 'BUY', 'XCN', 391, 2.02, null, 'OnyxCoin'],
  ['2026-05-13', 'BUY', 'EOSE', 1, 9.27, null, 'Big trader setup'],
  ['2026-05-13', 'SELL', 'AMC', 17, 1.34, -1.70, 'Big traders distributing'],
];

// Setup categories mapping
const SETUP_MAP = {
  'AI/GPU play': 'sector-momentum',
  'Bull case': 'fundamental',
  'SMC setup': 'smc',
  'Piggybank': 'long-term-hold',
  'Crypto': 'mini-trading',
  'OnyxCoin': 'mini-trading',
  'Big trader setup': 'big-trader',
  'Big traders distributing': 'big-trader',
};

// Analyze trades
function analyze() {
  console.log('📊 TRADE ANALYSIS');
  console.log('═'.repeat(50));
  
  let wins = 0;
  let losses = 0;
  let totalProfit = 0;
  const setupStats = {};
  const symbolStats = {};
  
  TRADES.forEach(t => {
    const [date, action, symbol, shares, price, profit, reason] = t;
    const setup = SETUP_MAP[reason] || 'unknown';
    
    if (action === 'SELL' && profit !== null) {
      const pnl = parseFloat(profit);
      totalProfit += pnl;
      
      if (pnl > 0) {
        wins++;
      } else {
        losses++;
      }
      
      // Track by setup
      if (!setupStats[setup]) setupStats[setup] = { wins: 0, losses: 0, profit: 0, trades: 0 };
      if (pnl > 0) setupStats[setup].wins++;
      else setupStats[setup].losses++;
      setupStats[setup].profit += pnl;
      setupStats[setup].trades++;
      
      // Track by symbol
      if (!symbolStats[symbol]) symbolStats[symbol] = { wins: 0, losses: 0, profit: 0, trades: 0 };
      if (pnl > 0) symbolStats[symbol].wins++;
      else symbolStats[symbol].losses++;
      symbolStats[symbol].profit += pnl;
      symbolStats[symbol].trades++;
    }
  });
  
  const total = wins + losses;
  const winRate = total > 0 ? (wins / total * 100).toFixed(1) : 0;
  
  console.log(`\n📈 OVERALL:`);
  console.log(`   Total Trades: ${total}`);
  console.log(`   Wins: ${wins} | Losses: ${losses}`);
  console.log(`   Win Rate: ${winRate}%`);
  console.log(`   Total P/L: $${totalProfit.toFixed(2)}`);
  
  console.log(`\n🎯 BY SETUP:`);
  Object.entries(setupStats).sort((a,b) => b[1].profit - a[1].profit).forEach(([setup, stats]) => {
    const wr = stats.trades > 0 ? (stats.wins / stats.trades * 100).toFixed(0) : 0;
    console.log(`   ${setup}: ${wr}% win rate, $${stats.profit.toFixed(2)} profit (${stats.trades} trades)`);
  });
  
  console.log(`\n💰 BY SYMBOL:`);
  Object.entries(symbolStats).sort((a,b) => b[1].profit - a[1].profit).forEach(([symbol, stats]) => {
    const wr = stats.trades > 0 ? (stats.wins / stats.trades * 100).toFixed(0) : 0;
    console.log(`   ${symbol}: ${wr}% win rate, $${stats.profit.toFixed(2)} profit (${stats.trades} trades)`);
  });
  
  // Recommendations
  console.log(`\n🧠 LEARNINGS:`);
  const bestSetup = Object.entries(setupStats).sort((a,b) => b[1].profit - a[1].profit)[0];
  const worstSetup = Object.entries(setupStats).sort((a,b) => a[1].profit - b[1].profit)[0];
  
  if (bestSetup) {
    console.log(`   ✅ BEST: ${bestSetup[0]} ($${bestSetup[1].profit.toFixed(2)})`);
  }
  if (worstSetup && worstSetup[0] !== bestSetup[0]) {
    console.log(`   ❌ WORST: ${worstSetup[0]} ($${worstSetup[1].profit.toFixed(2)})`);
  }
  
  // Store analysis for future reference
  const analysis = {
    generated: new Date().toISOString(),
    total,
    wins,
    losses,
    winRate,
    totalProfit,
    setupStats,
    symbolStats,
    bestSetup: bestSetup ? { name: bestSetup[0], ...bestSetup[1] } : null,
    worstSetup: worstSetup ? { name: worstSetup[0], ...worstSetup[1] } : null
  };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'kb', 'trading', 'trade-analysis.json'),
    JSON.stringify(analysis, null, 2)
  );
  console.log(`\n✅ Analysis saved to kb/trading/trade-analysis.json`);
}

analyze();