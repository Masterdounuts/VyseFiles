#!/usr/bin/env node
// MINI SCANNER - Crypto/Weekend Trading
// Max $2 profit per trade, profit reinvests to mini

const https = require('https');
const fs = require('fs');
const path = require('path');

const MAX_PROFIT = 2.00;

const cryptoUniverse = [
  { symbol: 'DOGE', id: 'dogecoin' },
  { symbol: 'WLFI', id: 'wolf-safemoon' },
  { symbol: 'BTC', id: 'bitcoin' },
  { symbol: 'ETH', id: 'ethereum' },
  { symbol: 'SOL', id: 'solana' },
  { symbol: 'XRP', id: 'ripple' },
  { symbol: 'ADA', id: 'cardano' },
];

async function getPrice(crypto) {
  return new Promise((resolve) => {
    https.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto.id}&vs_currencies=usd`, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          resolve({ symbol: crypto.symbol, price: j[crypto.id]?.usd });
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
  
  console.log('📊 Crypto Prices:');
  valid.forEach(p => {
    const price = p.price < 1 ? p.price.toFixed(4) : p.price.toFixed(2);
    console.log(`  ${p.symbol}: $${price}`);
  });
  
  console.log('\n💡 For mini trading:');
  console.log('- Max $2 profit per trade');
  console.log('- Reinvest profit back to mini');
  console.log('- Can trade any time, especially weekends');
  console.log('- Use web_search for news/catalysts');
  
  console.log('\n================================');
}

scan().catch(console.error);