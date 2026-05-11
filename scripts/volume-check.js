#!/usr/bin/env node
// Volume Checker - Detect institutional activity
// Usage: node volume-check.js SYMBOL

const symbol = process.argv[2]?.toUpperCase();
if (!symbol) {
  console.log('Usage: node volume-check.js SYMBOL');
  console.log('Example: node volume-check.js SOFI');
  process.exit(1);
}

// Fetch stock data
const https = require('https');

function getStockData(sym) {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=20d`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const result = json.chart?.result?.[0];
          if (!result) return reject(new Error('No data'));
          
          const timestamps = result.timestamp;
          const closes = result.indicators?.quote?.[0]?.close;
          const volumes = result.indicators?.quote?.[0]?.volume;
          
          if (!timestamps || !closes || !volumes) return reject(new Error('Missing data'));
          
          // Get last 10 days
          const recentVolumes = volumes.slice(-10);
          const avgVolume = recentVolumes.reduce((a, b) => a + b, 0) / recentVolumes.length;
          const todayVolume = volumes[volumes.length - 1];
          const price = closes[closes.length - 1];
          const prevPrice = closes[closes.length - 2];
          const priceChange = ((price - prevPrice) / prevPrice) * 100;
          
          resolve({
            symbol: sym,
            price,
            priceChange: priceChange.toFixed(2),
            todayVolume,
            avgVolume: Math.round(avgVolume),
            volumeRatio: (todayVolume / avgVolume).toFixed(2),
            recentPrices: closes.slice(-5).map((p, i) => ({
              day: i - 4,
              price: p
            }))
          });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

getStockData(symbol)
  .then(data => {
    console.log(`\n📊 VOLUME ANALYSIS: ${data.symbol}\n`);
    console.log(`Price: $${data.price} (${data.priceChange > 0 ? '+' : ''}${data.priceChange}%)`);
    console.log(`Today Volume: ${data.todayVolume.toLocaleString()}`);
    console.log(`10-Day Avg Volume: ${data.avgVolume.toLocaleString()}`);
    console.log(`Volume Ratio: ${data.volumeRatio}x\n`);
    
    const ratio = parseFloat(data.volumeRatio);
    const change = parseFloat(data.priceChange);
    
    // Analysis
    console.log('=== ANALYSIS ===');
    
    if (ratio > 2 && change > 0) {
      console.log('✅ STRONG ACCUMULATION: High volume + price up');
      console.log('   Institutional buying confirmed');
    } else if (ratio > 2 && change < 0) {
      console.log('⚠️ HIGH VOLUME DOWN: Could be distribution OR accumulation');
      console.log('   (Smart money often buys during panic selling)');
    } else if (ratio > 1.5 && change > 0) {
      console.log('✅ MODERATE ACCUMULATION: Above avg volume + price up');
    } else if (ratio < 1 && change > 0) {
      console.log('⚠️ WEAK MOVE: Price up but low volume');
      console.log('   Could reverse - no institutional conviction');
    } else if (ratio < 1 && change < 0) {
      console.log('✅ SELLING EXHAUSTED: Low volume on down day');
      console.log('   Could be bottom forming');
    } else {
      console.log('📊 Normal activity');
    }
    
    // Recent prices
    console.log('\n=== RECENT PRICES ===');
    data.recentPrices.forEach(p => {
      const bar = '#'.repeat(Math.min(Math.round(p.price / 2), 20));
      console.log(`Day ${p.day >= 0 ? '+' : ''}${p.day}: $${p.price.toFixed(2)} ${bar}`);
    });
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });