#!/usr/bin/env node
// ORDER BLOCK DETECTOR - Video 37 Strategy
// Detects institutional entry zones (order blocks)
// Green = bullish OB (institutions buying)
// Red = bearish OB (institutions selling)

const https = require('https');

async function getData(sym, interval = '1h', days = 5) {
  return new Promise((resolve) => {
    https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=${interval}&range=${days}d`,
      {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const r = j.chart?.result?.[0];
          if (!r) return resolve(null);
          const closes = r.indicators?.quote?.[0]?.close.filter(x => x);
          const highs = r.indicators?.quote?.[0]?.high.filter(x => x);
          const lows = r.indicators?.quote?.[0]?.low.filter(x => x);
          const opens = r.indicators?.quote?.[0]?.open.filter(x => x);
          const volumes = r.indicators?.quote?.[0]?.volume.filter(x => x);
          const timestamps = r.timestamp;
          resolve({ closes, highs, lows, opens, volumes, timestamps });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function findOrderBlocks(data) {
  if (!data) return { bullish: [], bearish: [] };
  
  const { closes, highs, lows, opens, volumes } = data;
  const avgVol = volumes.reduce((a,b) => a+b, 0) / volumes.length;
  
  let bullishOB = [];
  let bearishOB = [];
  
  for (let i = 2; i < closes.length - 2; i++) {
    // BULLISH ORDER BLOCK (Video 37)
    // 1. Large green candle (institutions bought)
    // 2. Next 2+ candles push down (creating liquidity)
    // 3. Price returns to that zone = bounce
    
    const isGreen = closes[i] > opens[i];
    const body = Math.abs(closes[i] - opens[i]);
    const range = highs[i] - lows[i];
    const bodyRatio = body / (range || 1);
    const volRatio = volumes[i] / avgVol;
    
    // Large candle with above-average volume (relaxed for detection)
    if (isGreen && bodyRatio > 0.5 && volRatio > 1.0) {
      // Check if next 2 candles push down (manipulation)
      let pushDown = true;
      for (let j = 1; j <= 2; j++) {
        if (i + j >= closes.length) { pushDown = false; break; }
        if (closes[i+j] > closes[i+j-1]) { pushDown = false; break; }
      }
      
      if (pushDown) {
        // This is a potential bullish order block
        const obZone = { 
          price: lows[i],  // Low of the candle = entry zone
          entry: opens[i],
          close: closes[i],
          strength: (volRatio * bodyRatio).toFixed(2)
        };
        bullishOB.push(obZone);
      }
    }
    
    // BEARISH ORDER BLOCK
    // Large red candle, next 2+ candles push up
    const isRed = closes[i] < opens[i];
    if (isRed && bodyRatio > 0.5 && volRatio > 1.0) {
      let pushUp = true;
      for (let j = 1; j <= 2; j++) {
        if (i + j >= closes.length) { pushUp = false; break; }
        if (closes[i+j] < closes[i+j-1]) { pushUp = false; break; }
      }
      
      if (pushUp) {
        const obZone = {
          price: highs[i],  // High of the candle = entry zone
          entry: opens[i],
          close: closes[i],
          strength: (volRatio * bodyRatio).toFixed(2)
        };
        bearishOB.push(obZone);
      }
    }
  }
  
  return { bullish: bullishOB.slice(-5), bearish: bearishOB.slice(-5) };
}

function analyzeAMD(data) {
  if (!data) return null;
  const { closes, volumes } = data;
  const avgVol = volumes.reduce((a,b) => a+b, 0) / volumes.length;
  
  // AMD Phases (Video 71)
  // Accumulation: low volatility, sideways, volume stable
  // Manipulation: fake breakout, stops hit
  // Distribution: high volume, institutional exit
  
  const recentVol = volumes.slice(-10).reduce((a,b) => a+b, 0) / 10;
  const volRatio = recentVol / avgVol;
  
  const recentRange = Math.max(...closes.slice(-10)) - Math.min(...closes.slice(-10));
  const avgRange = (closes.slice(-20).reduce((a,b) => a+b, 0) / 20) * 0.03; // 3% avg
  
  let phase = 'UNKNOWN';
  let confidence = 0;
  
  if (volRatio < 0.8 && recentRange < avgRange * 2) {
    phase = 'ACCUMULATION';
    confidence = ((1 - volRatio) * 100).toFixed(0);
  } else if (volRatio > 1.5) {
    phase = 'DISTRIBUTION';
    confidence = ((volRatio - 1) * 50).toFixed(0);
  } else if (volRatio > 1.0 && recentRange > avgRange * 2) {
    phase = 'MANIPULATION';
    confidence = ((volRatio - 1) * 50).toFixed(0);
  }
  
  return { phase, confidence: Math.min(confidence, 95), volRatio: volRatio.toFixed(2) };
}

async function analyze(sym) {
  console.log(`\n🟢 ORDER BLOCK ANALYSIS: ${sym}`);
  console.log('═'.repeat(50));
  
  const [ hourly, daily ] = await Promise.all([
    getData(sym, '30m', 2),
    getData(sym, '1d', 14)
  ]);
  
  if (!hourly || !daily) { console.log('❌ No data'); return; }
  
  const price = daily.closes[daily.closes.length - 1];
  
  // Find order blocks
  const obs = findOrderBlocks(hourly);
  
  console.log('\n📈 BULLISH ORDER BLOCKS (Green - Institutions Buying):');
  if (obs.bullish.length === 0) {
    console.log('   None found in recent data');
  } else {
    obs.bullish.forEach((ob, i) => {
      const dist = ((price - ob.price) / price * 100).toFixed(1);
      console.log(`   ${i+1}. Entry: $${ob.entry.toFixed(2)} | Zone: $${ob.price.toFixed(2)} | ${dist}% below | Strength: ${ob.strength}`);
    });
  }
  
  console.log('\n📉 BEARISH ORDER BLOCKS (Red - Institutions Selling):');
  if (obs.bearish.length === 0) {
    console.log('   None found in recent data');
  } else {
    obs.bearish.forEach((ob, i) => {
      const dist = ((ob.price - price) / price * 100).toFixed(1);
      console.log(`   ${i+1}. Entry: $${ob.entry.toFixed(2)} | Zone: $${ob.price.toFixed(2)} | ${dist}% above | Strength: ${ob.strength}`);
    });
  }
  
  // AMD Analysis
  const amd = analyzeAMD(daily);
  console.log('\n🔄 AMD PHASE (Video 71):');
  console.log(`   Phase: ${amd.phase}`);
  console.log(`   Confidence: ${amd.confidence}%`);
  console.log(`   Volume Ratio: ${amd.volRatio}x avg`);
  
  // Current price vs OBs
  console.log('\n🎯 CURRENT STATUS:');
  console.log(`   Price: $${price.toFixed(2)}`);
  
  if (obs.bullish.length > 0) {
    const nearest = obs.bullish[obs.bullish.length - 1];
    if (price < nearest.price * 1.05) {
      console.log(`   ✅ Near bullish OB - potential bounce zone`);
    }
  }
  
  if (obs.bearish.length > 0) {
    const nearest = obs.bearish[obs.bearish.length - 1];
    if (price > nearest.price * 0.95) {
      console.log(`   ⚠️ Near bearish OB - potential resistance`);
    }
  }
  
  console.log('\n' + '─'.repeat(50));
  console.log('📋 ORDER BLOCK RULES (Video 37):');
  console.log('   1. Wait for price to hit green/red order block');
  console.log('   2. Look for confirmation (price slowing = bottom wick)');
  console.log('   3. Wait for confirmation candle to CLOSE at block');
  console.log('   4. Enter at close, SL below/above block');
}

const sym = process.argv[2] || 'EOSE';
analyze(sym);