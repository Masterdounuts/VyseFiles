#!/usr/bin/env node
// Swing Levels Finder - Detect support/resistance
// Usage: node swing-levels.js SYMBOL

const symbol = process.argv[2]?.toUpperCase();
if (!symbol) {
  console.log('Usage: node swing-levels.js SYMBOL');
  console.log('Example: node swing-levels.js SOFI');
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
          const highs = result.indicators?.quote?.[0]?.high;
          const lows = result.indicators?.quote?.[0]?.low;
          const closes = result.indicators?.quote?.[0]?.close;
          
          resolve({ symbol: sym, timestamps, highs, lows, closes });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function findSwingLevels(highs, lows, closes) {
  const swingLows = [];
  const swingHighs = [];
  
  // Find swing lows (local minima)
  for (let i = 2; i < lows.length - 2; i++) {
    if (lows[i] < lows[i-1] && lows[i] < lows[i-2] && 
        lows[i] < lows[i+1] && lows[i] < lows[i+2]) {
      swingLows.push({ index: i, price: lows[i] });
    }
  }
  
  // Find swing highs (local maxima)
  for (let i = 2; i < highs.length - 2; i++) {
    if (highs[i] > highs[i-1] && highs[i] > highs[i-2] && 
        highs[i] > highs[i+1] && highs[i] > highs[i+2]) {
      swingHighs.push({ index: i, price: highs[i] });
    }
  }
  
  return { swingLows, swingHighs };
}

function clusterLevels(levels, threshold = 0.02) {
  if (levels.length === 0) return [];
  
  const sorted = [...levels].sort((a, b) => a.price - b.price);
  const clusters = [];
  let currentCluster = [sorted[0]];
  
  for (let i = 1; i < sorted.length; i++) {
    const prev = currentCluster[currentCluster.length - 1].price;
    const curr = sorted[i].price;
    
    if (Math.abs(curr - prev) / prev < threshold) {
      currentCluster.push(sorted[i]);
    } else {
      if (currentCluster.length > 0) {
        const avg = currentCluster.reduce((a, b) => a + b.price, 0) / currentCluster.length;
        clusters.push({ price: avg, count: currentCluster.length, levels: currentCluster });
      }
      currentCluster = [sorted[i]];
    }
  }
  
  if (currentCluster.length > 0) {
    const avg = currentCluster.reduce((a, b) => a + b.price, 0) / currentCluster.length;
    clusters.push({ price: avg, count: currentCluster.length, levels: currentCluster });
  }
  
  return clusters.sort((a, b) => b.count - a.count);
}

getStockData(symbol)
  .then(data => {
    const { swingLows, swingHighs } = findSwingLevels(data.highs, data.lows, data.closes);
    const currentPrice = data.closes[data.closes.length - 1];
    
    console.log(`\n📊 SWING LEVELS: ${data.symbol}\n`);
    console.log(`Current Price: $${currentPrice.toFixed(2)}\n`);
    
    // Cluster and display support (swing lows)
    const supportClusters = clusterLevels(swingLows);
    console.log('=== SUPPORT LEVELS (Swing Lows) ===');
    if (supportClusters.length === 0) {
      console.log('No clear support clusters');
    } else {
      supportClusters.slice(0, 5).forEach((cluster, i) => {
        const distance = ((currentPrice - cluster.price) / currentPrice * 100).toFixed(1);
        const strength = cluster.count >= 3 ? '🔴 STRONG' : cluster.count === 2 ? '🟡 MEDIUM' : '🟢 WEAK';
        console.log(`${i+1}. $${cluster.price.toFixed(2)} (${distance}% below) ${strength}`);
      });
    }
    
    // Cluster and display resistance (swing highs)
    const resistanceClusters = clusterLevels(swingHighs);
    console.log('\n=== RESISTANCE LEVELS (Swing Highs) ===');
    if (resistanceClusters.length === 0) {
      console.log('No clear resistance clusters');
    } else {
      resistanceClusters.slice(0, 5).forEach((cluster, i) => {
        const distance = ((cluster.price - currentPrice) / currentPrice * 100).toFixed(1);
        const strength = cluster.count >= 3 ? '🔴 STRONG' : cluster.count === 2 ? '🟡 MEDIUM' : '🟢 WEAK';
        console.log(`${i+1}. $${cluster.price.toFixed(2)} (${distance}% above) ${strength}`);
      });
    }
    
    // Latest swing low (liquidity)
    if (swingLows.length > 0) {
      const lastLow = swingLows[swingLows.length - 1];
      console.log(`\n=== LIQUIDITY ===`);
      console.log(`Latest Swing Low: $${lastLow.price.toFixed(2)}`);
      console.log(`Distance: ${((currentPrice - lastLow.price) / currentPrice * 100).toFixed(1)}% below current`);
    }
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });