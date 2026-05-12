#!/usr/bin/env node
// PATTERN RECOGNIZER - Find similar historical setups
// Looks for stocks with similar price/volume patterns to current setup

const https = require('https');

const PENNY_UNIVERSE = ['AMC', 'RIVN', 'SOFI', 'UPST', 'LCID', 'NIO', 'MARA', 'ASML', 'ASTL'];

async function getHistoricalData(sym, days = 30) {
  return new Promise((resolve) => {
    https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=${days}d`, 
      {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const r = j.chart?.result?.[0];
          if (!r) return resolve(null);
          const closes = r.indicators?.quote?.[0]?.close;
          const volumes = r.indicators?.quote?.[0]?.volume;
          if (!closes || !volumes) return resolve(null);
          
          // Get last 5 days pattern
          const recentCloses = closes.slice(-5).filter(x => x);
          const recentVols = volumes.slice(-5).filter(x => x);
          
          if (recentCloses.length < 3) return resolve(null);
          
          // Calculate pattern features
          const priceChange = ((recentCloses[recentCloses.length-1] - recentCloses[0]) / recentCloses[0]) * 100;
          const avgVol = recentVols.reduce((a,b) => a + b, 0) / recentVols.length;
          const volTrend = recentVols[recentVols.length-1] > avgVol ? 'up' : 'down';
          
          resolve({
            symbol: sym,
            priceChange,
            avgVol,
            volTrend,
            currentPrice: recentCloses[recentCloses.length-1],
            pattern: `${priceChange > 0 ? 'up' : 'down'}_${volTrend}`
          });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function findSimilarPatterns(targetSym, targetChange) {
  console.log(`🔍 Finding patterns similar to ${targetSym} (${targetChange.toFixed(1)}% change)\n`);
  
  const results = await Promise.all(
    PENNY_UNIVERSE.filter(s => s !== targetSym).map(s => getHistoricalData(s))
  );
  
  const valid = results.filter(r => r).map(r => ({
    ...r,
    similarity: 100 - Math.abs(r.priceChange - targetChange)
  })).sort((a, b) => b.similarity - a.similarity);
  
  console.log('📊 SIMILAR PATTERNS FOUND:\n');
  console.log('Stock    | Change  | Vol Trend | Similarity');
  console.log('---------|---------|-----------|------------');
  valid.slice(0, 5).forEach(r => {
    console.log(`${r.symbol.padEnd(8)}| ${r.priceChange.toFixed(1).padStart(6)}% | ${r.volTrend.padEnd(9)} | ${r.similarity.toFixed(0)}%`);
  });
  
  return valid.slice(0, 3);
}

// Run
const target = process.argv[2] || 'AMC';
const days = process.argv[3] || 5;

getHistoricalData(target, days).then(data => {
  if (!data) {
    console.log(`No data for ${target}`);
    process.exit(1);
  }
  
  console.log(`\n🎯 CURRENT SETUP: ${target}`);
  console.log(`Price Change: ${data.priceChange.toFixed(1)}%`);
  console.log(`Volume Trend: ${data.volTrend}`);
  console.log(`Current Price: $${data.currentPrice.toFixed(2)}\n`);
  
  findSimilarPatterns(target, data.priceChange);
});