#!/usr/bin/env node
// BIG TRADER DETECTION SCRIPT
// Priority 1 analysis for any stock
// Finds: Entry zones, targets, supports, stops

const https = require('https');
const symbol = process.argv[2] || 'RIVN';

console.log(`=== BIG TRADER DETECTION: ${symbol} ===\n`);

async function analyze(symbol) {
  // Get 5-minute data for detailed analysis
  const data = await getData(symbol, '5m', '5d');
  if (!data) { console.log('No data'); return; }
  
  const { closes, volumes, highs, lows } = data;
  const avgVol = volumes.reduce((a,b) => a+b, 0) / volumes.length;
  
  console.log('--- STEP 1: FIND BIG TRADER MOVES ---');
  console.log(`Looking for: Low volume (<30% avg) + Big move (>0.05)\n`);
  
  const bigMoves = [];
  for (let i = 1; i < closes.length; i++) {
    const move = closes[i] - closes[i-1];
    const volRatio = volumes[i] / avgVol;
    
    // BIG TRADER: Low volume + big move
    if (Math.abs(move) > 0.05 && volRatio < 0.3) {
      const direction = move > 0 ? '📈 ABSORBING (buying)' : '📉 SHORTING (selling)';
      bigMoves.push({ 
        i, 
        price: closes[i], 
        move, 
        volRatio,
        direction 
      });
    }
  }
  
  if (bigMoves.length === 0) {
    console.log('No big trader moves detected (retail activity only)\n');
  } else {
    console.log(`Found ${bigMoves.length} big trader moves:\n`);
    bigMoves.slice(0, 10).forEach(m => {
      console.log(`  ${m.direction}`);
      console.log(`  Price: $${m.price.toFixed(2)} | Move: $${m.move.toFixed(2)} | Vol: ${(m.volRatio*100).toFixed(0)}%`);
      console.log('');
    });
  }
  
  // Recent big moves = their activity
  const recentBigMoves = bigMoves.filter(m => m.i > closes.length - 50);
  console.log(`Recent big trader activity: ${recentBigMoves.length} moves`);
  
  console.log('\n--- STEP 2: FIND THEIR ENTRIES ---');
  console.log('Where they absorbed (price dropped + low volume = big buy):\n');
  
  const entries = bigMoves.filter(m => m.move < 0);
  if (entries.length > 0) {
    entries.slice(0, 5).forEach(e => {
      console.log(`  Entry zone: $${e.price.toFixed(2)}`);
    });
  } else {
    console.log('  No entry zones detected');
  }
  
  console.log('\n--- STEP 3: FIND SUPPORT (THEIR STOPS) ---');
  const recentLows = lows.slice(-50).sort((a,b) => a-b);
  const support = recentLows[0];
  const support2 = recentLows[1];
  
  console.log(`Recent lows: $${support.toFixed(2)}, $${support2 ? support2.toFixed(2) : 'N/A'}`);
  console.log('Their stop is likely just below support');
  
  console.log('\n--- STEP 4: FIND TARGET (RESISTANCE) ---');
  const recentHighs = highs.slice(-50).sort((a,b) => b-a);
  const resistance = recentHighs[0];
  const resistance2 = recentHighs[1];
  
  console.log(`Recent highs: $${resistance.toFixed(2)}, $${resistance2 ? resistance2.toFixed(2) : 'N/A'}`);
  console.log('Their target is likely resistance');
  
  console.log('\n--- STEP 5: CURRENT POSITION ANALYSIS ---');
  const current = closes[closes.length - 1];
  const currentVol = volumes[volumes.length - 1];
  const volRatioNow = currentVol / avgVol;
  
  console.log(`Current price: $${current.toFixed(2)}`);
  console.log(`Current volume: ${(volRatioNow*100).toFixed(0)}% of average`);
  
  // Where is price relative to their zones?
  console.log('\n--- VERDICT ---');
  if (current < support * 1.02) {
    console.log('🟡 PRICE NEAR SUPPORT - Could bounce');
  } else if (current > resistance * 0.98) {
    console.log('🟡 PRICE NEAR RESISTANCE - May pull back');
  } else {
    console.log('🟢 PRICE IN THE MIDDLE - Range trading');
  }
  
  // Big trader bias
  const absorbing = bigMoves.filter(m => m.move > 0).length;
  const shorting = bigMoves.filter(m => m.move < 0).length;
  
  if (absorbing > shorting) {
    console.log('🟢 BIG TRADERS: ABSORBING (buying) = bullish');
  } else if (shorting > absorbing) {
    console.log('🔴 BIG TRADERS: SHORTING (selling) = bearish');
  } else {
    console.log('🟡 BIG TRADERS: NEUTRAL');
  }
  
  console.log('\n=== SUMMARY FOR TRADING ===');
  console.log(`Entry above: $${(support + 0.10).toFixed(2)}`);
  console.log(`Stop below:  $${(support - 0.10).toFixed(2)}`);
  console.log(`Target:      $${resistance.toFixed(2)}`);
}

function getData(sym, interval, range) {
  return new Promise(resolve => {
    https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=${interval}&range=${range}`, 
      {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const r = j.chart?.result?.[0];
          if (!r) { resolve(null); return; }
          resolve({
            closes: r.indicators.quote[0].close.filter(x => x),
            volumes: r.indicators.quote[0].volume.filter(x => x),
            highs: r.indicators.quote[0].high.filter(x => x),
            lows: r.indicators.quote[0].low.filter(x => x)
          });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

analyze(symbol).catch(console.error);