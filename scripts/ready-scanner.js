#!/usr/bin/env node
// Ready-To-Enter Scanner
// Finds stocks where entry zone is close (FVG or liquidity within 5%)
// Usage: node ready-scanner.js

const https = require('https');

// Broad universe of stocks
const universe = [
  // Tech
  'AAPL','MSFT','GOOGL','AMZN','META','NVDA','AMD','INTC','MU','AVGO','QCOM','TXN','NXPI','MRVL','ARM',
  // Consumer
  'TSLA','WMT','HD','COST','TGT','LOW','BBY','ROST','TJX',
  // Finance
  'JPM','BAC','WFC','C','GS','MS','BLK','SCHW','COF','USB','PNC','AXP','DFS','TRV','CME','ICE',
  // Healthcare
  'JNJ','UNH','PFE','MRK','ABBV','LLY','BMY','AMGN','GILD','ISRG','MDT','SYK','BSX','DHR','EW','ABT',
  // Energy
  'XOM','CVX','COP','SLB','EOG','PSX','VLO','MPC','OXY','HAL','DVN','FANG',
  // Industrial
  'CAT','BA','HON','UNP','GE','MMM','DE','UPS','FDX','RTX','NOC','LMT','GD','ITW','ETN','EMR','PH',
  // Crypto/AI plays
  'COIN','MARA','RIOT','HOOD','PLTR','SOUN','SMCI','ASTS','SNOW','DDOG','CRWD','ZS','NET','MDB','OKTA',
  // Communication
  'DIS','NFLX','CMCSA','T','VZ','TMUS','AMC',
  // Real Estate
  'AMT','PLD','CCI','EQIX','PSA','O','SPG',
  // Materials
  'LIN','APD','ECL','SHW','NEM','FCX','AA','NUE',
  // Consumer Staples
  'KO','PEP','PG','PM','MO','STZ','HSY','MDLZ','KHC',
  // Meme/Volatile
  'GME','BBBY','SOFI','LCID','RIVN','QS','BBAI','UPST','DKNG',
];

async function getStockData(sym) {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=60d`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const result = json.chart?.result?.[0];
          if (!result) return resolve(null);
          
          const closes = result.indicators?.quote?.[0]?.close;
          const highs = result.indicators?.quote?.[0]?.high;
          const lows = result.indicators?.quote?.[0]?.low;
          const volumes = result.indicators?.quote?.[0]?.volume;
          
          if (!closes || !highs || !lows || !volumes) return resolve(null);
          
          resolve({ symbol: sym, closes, highs, lows, volumes });
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function findEntryZones(closes, highs, lows) {
  const currentPrice = closes[closes.length - 1];
  const zones = [];
  
  // Find swing lows (liquidity)
  for (let i = 2; i < lows.length - 2; i++) {
    if (lows[i] < lows[i-1] && lows[i] < lows[i-2] && 
        lows[i] < lows[i+1] && lows[i] < lows[i+2]) {
      const distance = (currentPrice - lows[i]) / currentPrice * 100;
      if (distance > -10 && distance < 15) { // Within reasonable range
        zones.push({ type: 'Liquidity', price: lows[i], distance });
      }
    }
  }
  
  // Find FVGs
  for (let i = 1; i < highs.length - 1; i++) {
    // Bearish FVG (gap down) - support on way up
    if (highs[i] < lows[i-1]) {
      const fvgMid = (lows[i-1] + highs[i]) / 2;
      const distance = (currentPrice - fvgMid) / currentPrice * 100;
      if (distance > -10 && distance < 15) {
        zones.push({ type: 'FVG', price: fvgMid, distance });
      }
    }
  }
  
  // Sort by distance (closest first)
  zones.sort((a, b) => a.distance - b.distance);
  
  return { currentPrice, zones: zones.slice(0, 3) };
}

async function scan() {
  console.log('🔍 SCANNING FOR READY-TO-ENTER SETUPS...\n');
  
  const results = [];
  
  // Process in batches
  for (let i = 0; i < universe.length; i += 10) {
    const batch = universe.slice(i, i + 10);
    const data = await Promise.all(batch.map(s => getStockData(s)));
    
    for (const stock of data) {
      if (!stock) continue;
      
      const { currentPrice, zones } = findEntryZones(stock.closes, stock.highs, stock.lows);
      
      if (zones.length > 0 && zones[0].distance > -2 && zones[0].distance < 5) {
        // Within 5% and not too far below
        results.push({
          symbol: stock.symbol,
          price: currentPrice,
          nearestZone: zones[0],
          change: ((currentPrice - stock.closes[stock.closes.length - 2]) / stock.closes[stock.closes.length - 2] * 100).toFixed(1)
        });
      }
    }
    
    // Progress
    process.stdout.write('.');
  }
  
  console.log('\n');
  console.log('=== READY-TO-ENTER CANDIDATES ===\n');
  
  if (results.length === 0) {
    console.log('No setups found within entry zone.\n');
    console.log('Try expanding search or waiting for pullbacks.');
  } else {
    // Sort by distance (closest first)
    results.sort((a, b) => Math.abs(a.nearestZone.distance) - Math.abs(b.nearestZone.distance));
    
    results.forEach((r, i) => {
      const direction = r.nearestZone.distance > 0 ? '↓' : '↑';
      console.log(`${i+1}. ${r.symbol} $${r.price.toFixed(2)} (${r.change}%)`);
      console.log(`   Zone: ${r.nearestZone.type} @ $${r.nearestZone.price.toFixed(2)} (${direction}${Math.abs(r.nearestZone.distance).toFixed(1)}%)`);
      console.log('');
    });
  }
  
  return results;
}

scan().then(results => {
  console.log(`\nFound ${results.length} candidate(s)`);
}).catch(err => {
  console.error('Error:', err.message);
});