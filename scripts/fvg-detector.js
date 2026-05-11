#!/usr/bin/env node
// FVG (Fair Value Gap) Detector
// Finds potential entry zones where price may pull back to
// Usage: node fvg-detector.js SYMBOL

const symbol = process.argv[2]?.toUpperCase();
if (!symbol) {
  console.log('Usage: node fvg-detector.js SYMBOL');
  console.log('Example: node fvg-detector.js RIVN');
  process.exit(1);
}

const https = require('https');

function getStockData(sym) {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=60d`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const result = json.chart?.result?.[0];
          if (!result) return reject(new Error('No data'));
          
          const timestamps = result.timestamp;
          const opens = result.indicators?.quote?.[0]?.open;
          const highs = result.indicators?.quote?.[0]?.high;
          const lows = result.indicators?.quote?.[0]?.low;
          const closes = result.indicators?.quote?.[0]?.close;
          const volumes = result.indicators?.quote?.[0]?.volume;
          
          resolve({ symbol: sym, timestamps, opens, highs, lows, closes, volumes });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Find FVGs - gaps down that create potential support on way up
function findFVGs(highs, lows, closes) {
  const fvgs = [];
  
  for (let i = 2; i < lows.length - 2; i++) {
    const prevLow = lows[i-1];
    const currHigh = highs[i];
    const nextLow = lows[i+1];
    
    // FVG: Current candle high < Previous candle low (gap down)
    // Or: Previous candle high < Next candle low (gap up)
    
    // Bearish FVG (gap down) - potential support on return
    if (currHigh < lows[i-1]) {
      const fvgTop = lows[i-1];
      const fvgBottom = currHigh;
      const fvgSize = fvgTop - fvgBottom;
      
      fvgs.push({
        type: 'bearish', // Gap down (will fill on way up)
        index: i,
        top: fvgTop,
        bottom: fvgBottom,
        size: fvgSize,
        mid: (fvgTop + fvgBottom) / 2
      });
    }
  }
  
  return fvgs;
}

// Find liquidity zones (swing lows)
function findLiquidity(zones, prices) {
  const liquidity = [];
  
  for (let i = 2; i < prices.length - 2; i++) {
    if (prices[i] < prices[i-1] && prices[i] < prices[i-2] && 
        prices[i] < prices[i+1] && prices[i] < prices[i+2]) {
      liquidity.push({ index: i, price: prices[i] });
    }
  }
  
  return liquidity;
}

getStockData(symbol)
  .then(data => {
    const currentPrice = data.closes[data.closes.length - 1];
    const fvgs = findFVGs(data.highs, data.lows, data.closes);
    const liquidity = findLiquidity(data.highs, data.lows);
    
    console.log(`\n📊 FVG DETECTOR: ${data.symbol}\n`);
    console.log(`Current Price: $${currentPrice.toFixed(2)}\n`);
    
    // Show recent FVGs (last 5)
    const recentFVGs = fvgs.slice(-10);
    console.log('=== FAIR VALUE GAPS (Potential Support) ===');
    if (recentFVGs.length === 0) {
      console.log('No clear FVGs found');
    } else {
      recentFVGs.forEach((fvg, i) => {
        const distance = ((currentPrice - fvg.mid) / currentPrice * 100);
        const direction = distance > 0 ? 'below (potential support)' : 'above (passed)';
        console.log(`${i+1}. $${fvg.mid.toFixed(2)} (${Math.abs(distance).toFixed(1)}% ${direction}) - Size: $${fvg.size.toFixed(2)}`);
      });
    }
    
    // Show liquidity zones
    console.log('\n=== LIQUIDITY ZONES (Swing Lows) ===');
    const recentLiq = liquidity.slice(-5);
    if (recentLiq.length === 0) {
      console.log('No clear liquidity zones');
    } else {
      recentLiq.forEach((l, i) => {
        const distance = ((currentPrice - l.price) / currentPrice * 100).toFixed(1);
        console.log(`${i+1}. $${l.price.toFixed(2)} (${distance}% below)`);
      });
    }
    
    // Entry zones
    console.log('\n=== POTENTIAL ENTRY ZONES ===');
    const entryZones = [];
    
    // Add FVG zones that are below current price
    fvgs.slice(-5).forEach(fvg => {
      if (fvg.mid < currentPrice) {
        entryZones.push({ price: fvg.mid, type: 'FVG', distance: ((currentPrice - fvg.mid) / currentPrice * 100) });
      }
    });
    
    // Add liquidity zones
    liquidity.slice(-3).forEach(l => {
      entryZones.push({ price: l.price, type: 'Liquidity', distance: ((currentPrice - l.price) / currentPrice * 100) });
    });
    
    // Sort by distance (closest first)
    entryZones.sort((a, b) => a.distance - b.distance);
    
    entryZones.slice(0, 5).forEach((z, i) => {
      console.log(`${i+1}. ${z.type} @ $${z.price.toFixed(2)} (${z.distance.toFixed(1)}% below)`);
    });
    
    // Signal
    if (entryZones.length > 0 && entryZones[0].distance < 3) {
      console.log(`\n⚠️ NEAR ENTRY ZONE: ${entryZones[0].type} at $${entryZones[0].price.toFixed(2)}`);
    } else if (entryZones.length > 0 && entryZones[0].distance < 8) {
      console.log(`\n📊 Watching: ${entryZones[0].type} at $${entryZones[0].price.toFixed(2)}`);
    } else {
      console.log(`\n📉 No near-term entry zones`);
    }
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });