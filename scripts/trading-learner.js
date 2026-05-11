#!/usr/bin/env node
// TRADING LEARNING SYSTEM
// Analyzes patterns and learns what predicts wins
// Run: node scripts/trading-learner.js

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'memory', 'trading-log.json');
const ANALYSIS_FILE = path.join(__dirname, '..', 'memory', 'trading-analysis.json');

// Load or initialize log
function loadLog() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
    }
  } catch (e) {}
  return { trades: [], outcomes: [] };
}

function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

// Log a prediction
function logPrediction(data) {
  const log = loadLog();
  log.trades.push({
    timestamp: new Date().toISOString(),
    symbols: data.symbols || [],
    predictions: data.predictions || [],
    preMarketMovers: data.preMarketMovers || [],
    marketOpen: data.marketOpen || []
  });
  saveLog(log);
  console.log('✅ Logged prediction');
}

// Record outcome for a symbol
function recordOutcome(symbol, entryPrice, exitPrice, entryTime, exitTime) {
  const log = loadLog();
  const pnl = ((exitPrice - entryPrice) / entryPrice * 100);
  
  log.outcomes.push({
    symbol,
    entryPrice,
    exitPrice,
    pnl: pnl.toFixed(2) + '%',
    entryTime,
    exitTime,
    result: pnl > 0 ? 'WIN' : 'LOSS'
  });
  
  saveLog(log);
  analyzePatterns();
}

// Analyze what predicted wins
function analyzePatterns() {
  const log = loadLog();
  if (log.outcomes.length === 0) {
    console.log('No outcomes to analyze yet');
    return;
  }
  
  const wins = log.outcomes.filter(o => o.result === 'WIN');
  const losses = log.outcomes.filter(o => o.result === 'LOSS');
  
  const analysis = {
    totalTrades: log.outcomes.length,
    wins: wins.length,
    losses: losses.length,
    winRate: ((wins.length / log.outcomes.length) * 100).toFixed(1) + '%',
    avgWin: wins.length ? (wins.reduce((a, b) => a + parseFloat(b.pnl), 0) / wins.length).toFixed(1) + '%' : '0%',
    avgLoss: losses.length ? (losses.reduce((a, b) => a + parseFloat(b.pnl), 0) / losses.length).toFixed(1) + '%' : '0%',
    bestStock: wins.sort((a, b) => parseFloat(b.pnl) - parseFloat(a.pnl))[0]?.symbol || 'N/A',
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(ANALYSIS_FILE, JSON.stringify(analysis, null, 2));
  console.log('📊 Analysis:', JSON.stringify(analysis, null, 2));
}

// Show current stats
function showStats() {
  const log = loadLog();
  if (log.outcomes.length === 0) {
    console.log('No trading history yet');
    return;
  }
  
  const analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf8'));
  console.log('\n=== TRADING PERFORMANCE ===');
  console.log(`Total Trades: ${analysis.totalTrades}`);
  console.log(`Win Rate: ${analysis.winRate}`);
  console.log(`Avg Win: ${analysis.avgWin}`);
  console.log(`Avg Loss: ${analysis.avgLoss}`);
  console.log(`Best Performer: ${analysis.bestStock}`);
}

// CLI
const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if (cmd === 'log' && arg1) {
  logPrediction(JSON.parse(arg1));
} else if (cmd === 'record' && arg1 && arg2 && arg3) {
  recordOutcome(arg1, parseFloat(arg2), parseFloat(arg3), arg4, arg5);
} else if (cmd === 'stats') {
  showStats();
} else {
  console.log('Trading Learner');
  console.log('Usage:');
  console.log('  node trading-learner.js log <json>   - Log a prediction');
  console.log('  node trading-learner.js record <sym> <entry> <exit> - Record outcome');
  console.log('  node trading-learner.js stats         - Show performance');
}