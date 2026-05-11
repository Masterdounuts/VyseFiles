#!/usr/bin/env node
// PREDICTION VS ACTUAL - End of Day Analyzer
// Compares what we predicted vs what actually happened
// Run: node scripts/prediction-vs-actual.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const PREDICTIONS_DIR = path.join(__dirname, '..', 'memory', 'daily');
const RESULTS_FILE = path.join(__dirname, '..', 'memory', 'trading-results.json');

// Get current price for a symbol
function getPrice(sym) {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=2d', {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const c = j.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
          resolve(c ? c[c.length - 1] : null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// Get all prediction files
function getPredictionFiles() {
  const files = fs.readdirSync(PREDICTIONS_DIR).filter(f => f.startsWith('predictions-'));
  return files.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(PREDICTIONS_DIR, f), 'utf8'));
    return { file: f, ...data };
  });
}

async function analyze() {
  console.log('=== PREDICTION VS ACTUAL ANALYSIS ===\n');
  
  const predictions = getPredictionFiles();
  if (predictions.length === 0) {
    console.log('No predictions found');
    return;
  }
  
  const latest = predictions[predictions.length - 1];
  console.log(`Date: ${latest.date}\n`);
  
  // Analyze top movers prediction accuracy
  console.log('--- BIG MOVERS (What we predicted would run) ---');
  for (const m of latest.topMovers || []) {
    const currentPrice = await getPrice(m.symbol);
    if (!currentPrice) continue;
    
    const actualChange = ((currentPrice - m.price) / m.price * 100).toFixed(1);
    const predicted = parseFloat(m.change);
    const actual = parseFloat(actualChange);
    const match = (predicted > 0 && actual > 0) || (predicted < 0 && actual < 0);
    
    console.log(`${m.symbol}: Predicted ${predicted > 0 ? '+' : ''}${m.change}% → Actual ${actual > 0 ? '+' : ''}${actual}% ${match ? '✅' : '❌'}`);
  }
  
  console.log('\n--- WHAT ACTUALLY WORKED (Biggest gains) ---');
  const allSymbols = [...new Set([
    ...(latest.topMovers || []).map(m => m.symbol),
    ...(latest.chochReady || []).map(c => c.symbol),
    ...(latest.accumulation || []).map(a => a.symbol)
  ])];
  
  const results = await Promise.all(allSymbols.map(async sym => {
    const pred = latest.topMovers?.find(m => m.symbol === sym);
    const price = await getPrice(sym);
    if (!price || !pred) return null;
    return { 
      symbol: sym, 
      predicted: parseFloat(pred.change), 
      actual: ((price - pred.price) / pred.price * 100),
      entry: pred.price,
      current: price
    };
  }));
  
  const valid = results.filter(r => r).sort((a, b) => b.actual - a.actual);
  
  console.log('Top performers today:');
  valid.slice(0, 5).forEach((r, i) => {
    console.log(`${i+1}. ${r.symbol}: ${r.actual > 0 ? '+' : ''}${r.actual.toFixed(1)}% (entry: $${r.entry.toFixed(2)})`);
  });
  
  // Pattern learning
  console.log('\n--- PATTERN LEARNING ---');
  const winners = valid.filter(r => r.actual > 0);
  const losers = valid.filter(r => r.actual < 0);
  
  const predictedWinners = valid.filter(r => r.predicted > 0 && r.actual > 0);
  const predictedLosers = valid.filter(r => r.predicted < 0 && r.actual < 0);
  
  console.log(`Total picks: ${valid.length}`);
  console.log(`Actual winners: ${winners.length} (${(winners.length/valid.length*100).toFixed(0)}%)`);
  console.log(`Predicted correctly: ${predictedWinners.length + predictedLosers.length} (${((predictedWinners.length + predictedLosers.length)/valid.length*100).toFixed(0)}%)`);
  
  if (winners.length > 0) {
    const avgWin = winners.reduce((a,b) => a + b.actual, 0) / winners.length;
    console.log(`Average gain: +${avgWin.toFixed(1)}%`);
  }
  
  // Save result
  const result = {
    date: latest.date,
    totalPicks: valid.length,
    winners: winners.length,
    losers: losers.length,
    accuracy: ((predictedWinners.length + predictedLosers.length) / valid.length * 100).toFixed(0) + '%',
    bestPick: valid[0]?.symbol || 'N/A',
    bestGain: valid[0]?.actual?.toFixed(1) + '%' || 'N/A'
  };
  
  let existing = [];
  try { existing = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8')); } catch(e) {}
  existing.push(result);
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(existing, null, 2));
  
  console.log('\n✅ Results saved for learning');
}

analyze();