#!/usr/bin/env node
// CRYPTO QUICK TRADE - 15-30 min entries
// Goal: $0.10+ profit per trade
// Track profits for reinvestment
// Strategy: Price down + Volume UP = Dip buy, quick exit

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROFIT_FILE = path.join(__dirname, '..', 'kb', 'stocks', 'crypto-profits.md');

// Yahoo pairs (more reliable than CoinGecko)
// Focus on Robinhood-supported cryptos
const CRYPTO_PAIRS = [
  'DOGE-USD', 'ETH-USD', 'SOL-USD', 'BTC-USD', 'XRP-USD', 'ADA-USD',
  'LTC-USD', 'DOGE-USD', 'SHIB-USD', 'ETC-USD', 'XLM-USD', 'AVAX-USD',
  'LINK-USD', 'UNI-USD', 'ATOM-USD', 'ALGO-USD', 'VET-USD', 'FIL-USD'
];

// Quick scan using Yahoo - 15min data
async function quickScan() {
  console.log('⚡ CRYPTO QUICK SCAN (15-30 min momentum)');
  console.log('============================================');
  console.log('Goal: Find dip buys (price ↓ + volume ↑)\n');
  
  async function scanPair(pair) {
    return new Promise((resolve) => {
      const sym = pair.replace('-USD', '');
      https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${pair}?interval=15m&range=1d`, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          try {
            const j = JSON.parse(d);
            const r = j.chart.result[0];
            const closes = r.indicators.quote[0].close.filter(x => x);
            const vols = r.indicators.quote[0].volume.filter(x => x);
            
            const current = closes[closes.length-1];
            const start = closes[0];
            const priceChange = ((current - start) / start) * 100;
            
            const earlyVol = vols.slice(0, 4).reduce((a,b) => a+b, 0) / 4;
            const lateVol = vols.slice(-4).reduce((a,b) => a+b, 0) / 4;
            const volChange = earlyVol > 0 ? ((lateVol - earlyVol) / earlyVol) * 100 : 0;
            
            // DIP BUY: Price down + Volume UP
            if (priceChange < -1 && volChange > 30) {
              console.log(`🟢 ${sym}: $${current.toFixed(4)} | ${priceChange.toFixed(1)}% price | +${volChange.toFixed(0)}% vol | DIP BUY`);
            }
            // BUILDING: Small gain, building momentum
            else if (priceChange > 0 && priceChange < 3) {
              console.log(`📈 ${sym}: $${current.toFixed(4)} | +${priceChange.toFixed(1)}% price | BUILDING`);
            }
          } catch(e) {}
          resolve();
        });
      }).on('error', () => resolve());
    });
  }
  
  await Promise.all(CRYPTO_PAIRS.map(scanPair));
  
  console.log('\n💡 Strategy:');
  console.log('- Buy when: Price ↓ + Volume ↑ (dip)');
  console.log('- Hold: 15-30 min');
  console.log('- Exit: +$0.10+ profit or cover spread');
}

// Record a trade
function recordTrade(symbol, entryPrice, exitPrice, quantity) {
  const profit = (exitPrice - entryPrice) * quantity;
  console.log(`\n💰 Trade: ${symbol}`);
  console.log(`   Entry: $${entryPrice.toFixed(4)} | Exit: $${exitPrice.toFixed(4)}`);
  console.log(`   Profit: $${profit.toFixed(2)}`);
  
  if (profit >= 0.10) {
    console.log(`   ✅ Target met (>$0.10)`);
  } else if (profit > 0) {
    console.log(`   ⚠️ Small profit (cover spread?)`);
  } else {
    console.log(`   ❌ Loss`);
  }
}

const cmd = process.argv[2];
if (cmd === 'scan') {
  quickScan();
} else if (cmd === 'record') {
  const [sym, entry, exit, qty] = process.argv.slice(3);
  if (sym && entry && exit && qty) {
    recordTrade(sym, parseFloat(entry), parseFloat(exit), parseFloat(qty));
  } else {
    console.log('Usage: node crypto-quick.js record <symbol> <entry> <exit> <quantity>');
  }
} else {
  console.log(`
⚡ CRYPTO QUICK TRADE

Usage:
  node crypto-quick.js scan           - Scan for momentum
  node crypto-quick.js record <sym> <entry> <exit> <qty> - Record trade

Goal:
  - 15-30 min entries
  - $0.10+ profit per trade
  - Cover spread fee
  - Reinvest profits
`);
}
