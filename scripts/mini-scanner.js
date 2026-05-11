#!/usr/bin/env node
// MINI SCANNER - Crypto/Weekend Trading
// Max $2 profit per trade, profit reinvests to mini

const https = require('https');
const fs = require('fs');
const path = require('path');

const MAX_PROFIT = 2.00;

const cryptoUniverse = ['DOGE', 'WLFI', 'BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE', 'PEPE', 'SHIB', 'BONK', 'MATIC', 'DOT', 'LINK', 'AVAX', 'ARB', 'OP'];

async function getPrice(sym) {
  return new Promise((resolve) => {
    const isCrypto = ['DOGE', 'WLFE'].includes(sym);
    const url = isCrypto 
      ? `https://api.coingecko.com/api/v3/simple/price?ids=${sym.toLowerCase()}&vs_currencies=usd`
      : `https://query1.finance.yahoo.com/v8/finance/chart/${sym}%3DC-USD?interval=1d`;
    
    https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          if (isCrypto) {
            const j = JSON.parse(d);
            resolve({ symbol: sym, price: j[sym.toLowerCase()]?.usd, source: 'coingecko' });
          } else {
            const j = JSON.parse(d);
            const c = j.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
            resolve({ symbol: sym, price: c ? c[c.length - 1] : null, source: 'yahoo' });
          }
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function scan() {
  console.log('🪙 MINI SCANNER (Crypto/Weekend)');
  console.log('================================');
  console.log(`🎯 Max profit per trade: $${MAX_PROFIT}`);
  console.log('');
  
  const results = await Promise.all(cryptoUniverse.map(getPrice));
  const valid = results.filter(r => r && r.price);
  
  // Sort by 24h change
  const prices = valid.map(r => ({
    symbol: r.symbol,
    price: r.price,
    change: ((Math.random() - 0.5) * 10).toFixed(2) // Placeholder - would need history for real change
  }));
  
  console.log('📊 Crypto Prices:');
  prices.forEach(p => {
    console.log(`  ${p.symbol}: $${p.price.toFixed(4)}`);
  });
  
  console.log('\n💡 For mini trading:');
  console.log('- Max $2 profit per trade');
  console.log('- Reinvest profit back to mini');
  console.log('- Can trade any time, especially weekends');
  console.log('- Use web_search for news/catalysts');
  
  console.log('\n================================');
}

scan().catch(console.error);