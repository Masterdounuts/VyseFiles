#!/usr/bin/env node
// Import historical trades into learning system

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'memory', 'trading-log.json');

// Our historical trades with entry AND exit prices
const historicalTrades = [
  // WGS - completed
  { symbol: 'WGS', entry: 35.94, exit: 38.36, date: '2026-05-05', result: 'WIN' },
  // NVDA - completed  
  { symbol: 'NVDA', entry: 198.31, exit: 215.00, date: '2026-05-05', result: 'WIN' },
  // NIO - completed
  { symbol: 'NIO', entry: 5.94, exit: 5.87, date: '2026-05-07', result: 'LOSS' },
  // QQQ - still holding (use current price as hypothetical exit)
  { symbol: 'QQQ', entry: 708.78, exit: 714.20, date: '2026-05-08', result: 'WIN' },
];

// Load existing log
let log = { trades: [], outcomes: [] };
try {
  log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
} catch(e) {}

// Add historical trades
for (const t of historicalTrades) {
  const pnl = ((t.exit - t.entry) / t.entry * 100);
  log.outcomes.push({
    symbol: t.symbol,
    entryPrice: t.entry,
    exitPrice: t.exit,
    pnl: pnl.toFixed(2) + '%',
    date: t.date,
    result: t.result,
    type: 'historical'
  });
}

fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));

console.log('✅ Imported', historicalTrades.length, 'historical trades');
console.log('\n=== TRADE SUMMARY ===');

const wins = log.outcomes.filter(o => o.result === 'WIN');
const losses = log.outcomes.filter(o => o.result === 'LOSS');

console.log('Total:', log.outcomes.length);
console.log('Wins:', wins.length);
console.log('Losses:', losses.length);
console.log('Win Rate:', (wins.length / log.outcomes.length * 100).toFixed(0) + '%');

// Show each
console.log('\n--- DETAILS ---');
log.outcomes.forEach((t, i) => {
  console.log(`${i+1}. ${t.symbol}: ${t.pnl} (${t.date}) ${t.result}`);
});
