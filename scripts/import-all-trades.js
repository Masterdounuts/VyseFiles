#!/usr/bin/env node
// Import ALL historical trades into learning system

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'memory', 'trading-log.json');

// All our trades with entry AND exit prices
const allTrades = [
  // April trades
  { symbol: 'GGB', entry: 4.18, exit: 4.28, date: '2026-04-14', result: 'WIN', type: 'historical' },
  { symbol: 'AMC', entry: 1.64, exit: 1.69, date: '2026-04-17', result: 'WIN', type: 'historical' },
  { symbol: 'LCID', entry: 7.18, exit: 6.60, date: '2026-04-23', result: 'LOSS', type: 'historical' },
  { symbol: 'BBAI', entry: 3.88, exit: 3.78, date: '2026-04-23', result: 'LOSS', type: 'historical' },
  { symbol: 'GGB', entry: 4.18, exit: 4.32, date: '2026-04-24', result: 'WIN', type: 'historical' },
  { symbol: 'PFE', entry: 26.90, exit: 27.02, date: '2026-04-27', result: 'WIN', type: 'historical' },
  // Still open
  { symbol: 'NRXP', entry: 3.04, exit: 2.91, date: '2026-04-27', result: 'LOSS', type: 'historical' },
  { symbol: 'LIDR', entry: 2.14, exit: 2.08, date: '2026-04-27', result: 'LOSS', type: 'historical' },
  // May trades
  { symbol: 'WGS', entry: 35.94, exit: 38.36, date: '2026-05-05', result: 'WIN', type: 'historical' },
  { symbol: 'NVDA', entry: 198.31, exit: 215.00, date: '2026-05-08', result: 'WIN', type: 'historical' },
  { symbol: 'NIO', entry: 5.94, exit: 5.87, date: '2026-05-08', result: 'LOSS', type: 'historical' },
  { symbol: 'QQQ', entry: 708.78, exit: 714.20, date: '2026-05-11', result: 'WIN', type: 'historical' },
];

// Load existing log
let log = { trades: [], outcomes: [] };
try {
  log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
} catch(e) {}

// Clear and re-add all trades
log.outcomes = [];

for (const t of allTrades) {
  const pnl = ((t.exit - t.entry) / t.entry * 100);
  log.outcomes.push({
    symbol: t.symbol,
    entryPrice: t.entry,
    exitPrice: t.exit,
    pnl: pnl.toFixed(2) + '%',
    date: t.date,
    result: t.result,
    type: t.type
  });
}

fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));

console.log('✅ Imported', allTrades.length, 'trades');
console.log('\n=== COMPLETE TRADE HISTORY ===\n');

const wins = log.outcomes.filter(o => o.result === 'WIN');
const losses = log.outcomes.filter(o => o.result === 'LOSS');

console.log('Total:', log.outcomes.length);
console.log('Wins:', wins.length);
console.log('Losses:', losses.length);
console.log('Win Rate:', (wins.length / log.outcomes.length * 100).toFixed(0) + '%');

// Calculate total profit
let totalProfit = 0;
log.outcomes.forEach(t => {
  const pct = parseFloat(t.pnl);
  totalProfit += pct;
});
console.log('Avg P/L per trade:', (totalProfit / log.outcomes.length).toFixed(1) + '%');

console.log('\n--- ALL TRADES (chronological) ---');
log.outcomes.forEach((t, i) => {
  console.log(`${i+1}. ${t.date} ${t.symbol}: ${t.pnl} ${t.result}`);
});
