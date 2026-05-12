#!/usr/bin/env node
const https = require('https');
// BIG TRADER DETECTOR v4
// CORRECTED LOGIC: High Volume + Small Candle = Big Trader Absorbing

const symbol = process.argv[2] || 'MARA';

console.log(`=== BIG TRADER ANALYSIS: ${symbol} ===\n`);

async function analyze(sym) {
  const data = await getData(sym, '5m', '10d');
  if (!data) { console.log('No data'); return; }
  
  const { closes, volumes, highs, lows } = data;
  const avgVol = volumes.reduce((a,b) => a+b, 0) / volumes.length;
  const avgPrice = closes.reduce((a,b) => a+b, 0) / closes.length;
  const avgPriceChange = Math.abs(closes.reduce((a,b,i) => a + Math.abs(b - closes[i-1]), 0)) / closes.length;
  
  console.log('=== FINDING BIG TRADER ACTIVITY ===');
  console.log('(High Volume + Small Price Change = They\'re Accumulating)\n');
  
  let accumulation = [];
  for (let i = 1; i < closes.length; i++) {
    const priceChange = Math.abs(closes[i] - closes[i-1]);
    const vol = volumes[i];
    const volRatio = vol / avgVol;
    const priceRatio = priceChange / avgPrice * 100;
    
    // BIG TRADER: High volume (>1.5x avg) + Small price change (<0.5% avg)
    if (volRatio > 1.5 && priceRatio < 0.5) {
      accumulation.push({
        price: closes[i],
        change: priceChange,
        vol: vol,
        volRatio: (volRatio * 100).toFixed(0),
        priceRatio: priceRatio.toFixed(2),
        type: closes[i] > closes[i-1] ? 'ABSORBING (BUY)' : 'DISTRIBUTING (SELL)'
      });
    }
  }
  
  if (accumulation.length === 0) {
    console.log('❌ No big trader activity found\n');
    return;
  }
  
  const absorbing = accumulation.filter(a => a.type.includes('ABSORB'));
  const distributing = accumulation.filter(a => a.type.includes('DIST'));
  
  console.log(`Found ${accumulation.length} accumulation/distribution zones:\n`);
  console.log(`  📈 Absorbing: ${absorbing.length} | 📉 Distributing: ${distributing.length}\n`);
  
  if (absorbing.length > 0) {
    const avgAbsorb = absorbing.reduce((s, x) => s + x.price, 0) / absorbing.length;
    console.log('THEIR BUYING (Absorbing):');
    console.log(`   Avg entry: $${avgAbsorb.toFixed(2)}`);
    console.log(`   Recent: ${absorbing.slice(-3).map(a => '$' + a.price.toFixed(2)).join(', ')}`);
  }
  
  if (distributing.length > 0) {
    const avgDist = distributing.reduce((s, x) => s + x.price, 0) / distributing.length;
    console.log('\nTHEIR SELLING (Distributing):');
    console.log(`   Avg price: $${avgDist.toFixed(2)}`);
  }
  
  const current = closes[closes.length - 1];
  const avgEntry = absorbing.length > 0 
    ? absorbing.reduce((s, x) => s + x.price, 0) / absorbing.length 
    : distributing.reduce((s, x) => s + x.price, 0) / distributing.length;
  const pl = ((current - avgEntry) / avgEntry) * 100;
  
  console.log('\n=== THEIR POSITION ===\n');
  console.log(`Current:      $${current.toFixed(2)}`);
  console.log(`Their entry: $${avgEntry.toFixed(2)}`);
  console.log(`Their P/L:   ${pl > 0 ? '+' : ''}${pl.toFixed(1)}% ${pl > 0 ? '✅' : '❌'}`);
  
  const recentLows = lows.slice(-50).sort((a,b) => a-b);
  const recentHighs = highs.slice(-50).sort((a,b) => b-a);
  
  console.log('\n=== TRADE SETUP ===\n');
  console.log(`Support:  $${recentLows[0].toFixed(2)}`);
  console.log(`Target:   $${recentHighs[0].toFixed(2)}`);
  console.log(`Enter:    $${(recentLows[0] + 0.05).toFixed(2)} (at support)`);
  console.log(`Stop:     $${(recentLows[0] - 0.05).toFixed(2)}`);
  
  const risk = 0.10;
  const reward = recentHighs[0] - (recentLows[0] + 0.05);
  console.log(`Risk:     $${risk.toFixed(2)}`);
  console.log(`Reward:   $${reward.toFixed(2)}`);
  console.log(`R/R:      ${(reward/risk).toFixed(1)}:1`);
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
