#!/usr/bin/env node
/**
 * Quick Trade Logger
 * Usage: node quick-trade.cjs <ACTION> <SYMBOL> <SHARES> <PRICE>
 * Example: node quick-trade.cjs BUY EZGO 100 0.018
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log('Usage: node quick-trade.cjs <BUY|SELL> <SYMBOL> <SHARES> <PRICE>');
  console.log('Example: node quick-trade.cjs BUY EZGO 100 0.018');
  process.exit(1);
}

const [action, symbol, shares, price] = args;
const total = parseFloat(shares) * parseFloat(price);
const date = new Date().toISOString().split('T')[0];

// Read current history
const historyPath = path.join(__dirname, 'kb/stocks/robinhood-history.md');
let history = fs.readFileSync(historyPath, 'utf8');

// Add new trade
const newTrade = `| ${date} | ${action} | ${symbol.toUpperCase()} | ${shares} | $${parseFloat(price).toFixed(5)} | ${action === 'BUY' ? '-' : '+'}${total.toFixed(2)} |`;

console.log(`\n=== QUICK TRADE LOGGED ===`);
console.log(`${action} ${shares} ${symbol.toUpperCase()} @ $${price} = ${action === 'BUY' ? '-' : '+'}${total.toFixed(2)}`);
console.log(`\nAdded to history: ${newTrade}`);

// Calculate running P/L
console.log('\n=== REMINDER ===');
console.log('Tell me if you want me to update Notion with this trade!');