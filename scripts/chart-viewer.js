#!/usr/bin/env node
// Chart Viewer - ASCII/text visualization
// Shows price action + volume in terminal
// Usage: node chart-viewer.js SYMBOL [days]

const symbol = process.argv[2]?.toUpperCase() || 'RIVN';
const days = parseInt(process.argv[3]) || 30;

const https = require('https');

function getStockData(sym, dayCount) {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=${dayCount}d`;
    
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

function renderChart(data, dayCount) {
  const { symbol, highs, lows, closes, volumes } = data;
  
  // Get range
  const recentHighs = highs.slice(-dayCount);
  const recentLows = lows.slice(-dayCount);
  const recentCloses = closes.slice(-dayCount);
  const recentVols = volumes.slice(-dayCount);
  
  const maxPrice = Math.max(...recentHighs);
  const minPrice = Math.min(...recentLows);
  const priceRange = maxPrice - minPrice;
  
  const maxVol = Math.max(...recentVols);
  
  const currentPrice = recentCloses[recentCloses.length - 1];
  const prevPrice = recentCloses[recentCloses.length - 2];
  const change = ((currentPrice - prevPrice) / prevPrice * 100).toFixed(2);
  
  console.log(`\n📈 ${symbol} - ${dayCount} Day Chart\n`);
  console.log(`Current: $${currentPrice.toFixed(2)} (${change > 0 ? '+' : ''}${change}%)`);
  console.log(`Range: $${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}\n`);
  
  // Price chart
  const chartHeight = 15;
  const chartWidth = Math.min(dayCount, 50);
  const priceStep = priceRange / chartHeight;
  
  console.log('=== PRICE CHART ===');
  console.log('$'.padStart(6) + ' '.repeat(chartWidth) + 'Vol');
  
  for (let row = chartHeight; row >= 0; row--) {
    const priceLevel = minPrice + (row * priceStep);
    let line = priceLevel.toFixed(2).padStart(6) + ' ';
    
    for (let col = 0; col < chartWidth; col++) {
      const dayIndex = col; // Most recent on right
      const dayClose = recentCloses[recentCloses.length - chartWidth + col];
      const dayHigh = recentHighs[recentHighs.length - chartWidth + col];
      const dayLow = recentLows[recentLows.length - chartWidth + col];
      
      if (!dayClose) {
        line += ' ';
        continue;
      }
      
      const inRange = dayClose >= priceLevel - priceStep/2 && dayClose <= priceLevel + priceStep/2;
      const isHigh = dayHigh >= priceLevel;
      const isLow = dayLow <= priceLevel + priceStep/2;
      
      if (inRange && dayClose >= prevPrice) {
        line += '█'; // Green candle (up)
      } else if (inRange && dayClose < prevPrice) {
        line += '▓'; // Red candle (down)
      } else if (isHigh && isLow) {
        line += '│'; // Wick
      } else if (isHigh) {
        line += '↑';
      } else if (isLow) {
        line += '↓';
      } else {
        line += ' ';
      }
    }
    
    // Volume bar on right
    const lastVol = recentVols[recentVols.length - 1];
    if (lastVol && row === 0) {
      const volHeight = Math.round((lastVol / maxVol) * 10);
      if (volHeight > 0) {
        line += ' ▏' + '█'.repeat(Math.min(volHeight, 10));
      }
    }
    
    console.log(line);
  }
  
  // Trend line
  console.log('-'.repeat(chartWidth + 8));
  
  // Summary
  console.log('\n=== LAST 5 DAYS ===');
  for (let i = 5; i >= 1; i--) {
    const idx = recentCloses.length - i;
    const close = recentCloses[idx];
    const prev = closes[idx-1];
    const vol = recentVols[idx];
    const changePct = ((close - prev) / prev * 100).toFixed(1);
    const direction = close >= prev ? '▲' : '▼';
    
    console.log(`Day ${6-i}: $${close.toFixed(2)} ${direction} ${changePct}% | Vol: ${(vol/1000000).toFixed(1)}M`);
  }
  
  // Pattern detection
  console.log('\n=== PATTERN DETECTION ===');
  
  // Recent trend
  const recent5 = recentCloses.slice(-5);
  const trend5 = recent5[4] - recent5[0];
  if (trend5 > 0) {
    console.log('📈 Short-term trend: UP');
  } else if (trend5 < 0) {
    console.log('📉 Short-term trend: DOWN');
  } else {
    console.log('➡️ Short-term trend: FLAT');
  }
  
  // Position in range
  const rangePos = ((currentPrice - minPrice) / priceRange * 100).toFixed(0);
  if (rangePos < 20) {
    console.log(`📍 Position: Near LOW (${rangePos}%)`);
  } else if (rangePos > 80) {
    console.log(`📍 Position: Near HIGH (${rangePos}%)`);
  } else {
    console.log(`📍 Position: MID-RANGE (${rangePos}%)`);
  }
  
  // Volume today vs avg
  const avgVol = recentVols.slice(-10).reduce((a,b) => a+b, 0) / 10;
  const volRatio = (recentVols[recentVols.length-1] / avgVol).toFixed(2);
  console.log(`📊 Volume: ${volRatio}x 10-day avg`);
}

getStockData(symbol, days)
  .then(data => renderChart(data, days))
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });