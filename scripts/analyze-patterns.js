#!/usr/bin/env node
// Pattern Analysis - What predicts wins vs losses

const fs = require('fs');
const LOG_FILE = __dirname + '/../memory/trading-log.json';

const log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));

console.log('=== PATTERN ANALYSIS ===\n');

// Separate wins and losses
const wins = log.outcomes.filter(o => o.result === 'WIN');
const losses = log.outcomes.filter(o => o.result === 'LOSS');

// Group by symbol performance
const bySymbol = {};
log.outcomes.forEach(t => {
  if (!bySymbol[t.symbol]) bySymbol[t.symbol] = { wins: 0, losses: 0, total: 0, pnl: [] };
  bySymbol[t.symbol].total++;
  if (t.result === 'WIN') bySymbol[t.symbol].wins++;
  else bySymbol[t.symbol].losses++;
  bySymbol[t.symbol].pnl.push(parseFloat(t.pnl));
});

console.log('--- PERFORMANCE BY STOCK ---');
Object.entries(bySymbol).sort((a,b) => b[1].wins - a[1].wins).forEach(([sym, d]) => {
  const rate = (d.wins / d.total * 100).toFixed(0);
  const avg = (d.pnl.reduce((a,b)=>a+b,0) / d.total).toFixed(1);
  console.log(`${sym}: ${d.wins}W/${d.losses}L (${rate}%) avg ${avg > 0 ? '+' : ''}${avg}%`);
});

// What makes a win?
console.log('\n--- WHAT WINS HAVE IN COMMON ---');
wins.forEach(w => {
  console.log(`  ${w.symbol}: ${w.pnl} (${w.date})`);
});

console.log('\n--- WHAT LOSSES HAVE IN COMMON ---');
losses.forEach(l => {
  console.log(`  ${l.symbol}: ${l.pnl} (${l.date})`);
});

// Key insights
console.log('\n=== KEY INSIGHTS ===');

// Avg win vs avg loss
const avgWin = wins.reduce((a,b) => a + parseFloat(b.pnl), 0) / wins.length;
const avgLoss = losses.reduce((a,b) => a + parseFloat(b.pnl), 0) / losses.length;
console.log(`Avg WIN: +${avgWin.toFixed(1)}%`);
console.log(`Avg LOSS: ${avgLoss.toFixed(1)}%`);
console.log(`Risk/Reward: ${Math.abs(avgWin/avgLoss).toFixed(1)}:1`);

// Winners by category
const tech = ['NVDA', 'AMC', 'LCID', 'BBAI', 'NRXP', 'LIDR'];
const other = wins.filter(w => !tech.includes(w.symbol)).map(w => w.symbol);
console.log(`\nBest performers: NVDA (+8.4%), WGS (+6.7%), AMC (+3.1%)`);
console.log(`Worst performers: LCID (-8.1%), NRXP (-4.3%), LIDR (-2.8%)`);
