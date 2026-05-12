#!/usr/bin/env node
// CRYPTO SCANNER V2 - 15-30 min trades
// Focus: Volume spikes + momentum = quick moves
// Profit target: 1-3% (realistic for short timeframe)

const https = require('https');

const CRYPTOS = [
  { sym: 'DOGE', yahoo: 'DOGE-USD', robinhood: true },
  { sym: 'ETH', yahoo: 'ETH-USD', robinhood: true },
  { sym: 'BTC', yahoo: 'BTC-USD', robinhood: true },
  { sym: 'SOL', yahoo: 'SOL-USD', robinhood: true },
  { sym: 'ADA', yahoo: 'ADA-USD', robinhood: true },
  { sym: 'XRP', yahoo: 'XRP-USD', robinhood: true },
  { sym: 'SHIB', yahoo: 'SHIB-USD', robinhood: true },
  { sym: 'PEPE', yahoo: 'PEPE-USD', robinhood: true },
  { sym: 'WIF', yahoo: 'WIF-USD', robinhood: true },
  { sym: 'BONK', yahoo: 'BONK-USD', robinhood: true },
  { sym: 'OP', yahoo: 'OP-USD', robinhood: true },
  { sym: 'ARB', yahoo: 'ARB-USD', robinhood: true },
  { sym: 'LDO', yahoo: 'LDO-USD', robinhood: true },
  { sym: 'CRV', yahoo: 'CRV-USD', robinhood: true },
  { sym: 'XLM', yahoo: 'XLM-USD', robinhood: true },
  { sym: 'LINK', yahoo: 'LINK-USD', robinhood: true },
  { sym: 'AVAX', yahoo: 'AVAX-USD', robinhood: true },
  { sym: 'DOT', yahoo: 'DOT-USD', robinhood: true },
  { sym: 'UNI', yahoo: 'UNI-USD', robinhood: true },
  { sym: 'LTC', yahoo: 'LTC-USD', robinhood: true },
];

const BUDGET = 1.00; // $1 per trade (2% rule)

// 5-min data for short timeframe
async function get5MinData(yahoo) {
  return new Promise((resolve) => {
    https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${yahoo}?interval=5m&range=1d`, 
      {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const r = j.chart.result[0];
          const closes = r.indicators.quote[0].close.filter(x => x);
          const volumes = r.indicators.quote[0].volume.filter(x => x);
          resolve({ closes, volumes });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function scan() {
  console.log('⚡ CRYPTO SCANNER V2 - 15/30 MIN TRADES');
  console.log('========================================');
  console.log(`Budget: \$${BUDGET} | Target: 1-3% profit\n`);
  
  const results = [];
  
  for (const crypto of CRYPTOS) {
    const data = await get5MinData(crypto.yahoo);
    if (!data) continue;
    
    const { closes, volumes } = data;
    if (closes.length < 10) continue;
    
    const price = closes[closes.length - 1];
    if (price <= 0 || price > 50) continue; // Skip expensive
    
    // Last 30 min analysis (6 candles)
    const last6 = closes.slice(-6);
    const last6Vol = volumes.slice(-6);
    const priceChange30m = ((last6[5] - last6[0]) / last6[0]) * 100;
    const avgVol30m = last6Vol.reduce((a,b) => a+b, 0) / 6;
    const prevVol30m = volumes.slice(-12, -6).reduce((a,b) => a+b, 0) / 6;
    const volChange30m = ((avgVol30m - prevVol30m) / prevVol30m) * 100;
    
    // Last 15 min (3 candles)
    const last3 = closes.slice(-3);
    const last3Vol = volumes.slice(-3);
    const priceChange15m = ((last3[2] - last3[0]) / last3[0]) * 100;
    const vol15m = last3Vol.reduce((a,b) => a+b, 0);
    const prev15m = volumes.slice(-6, -3).reduce((a,b) => a+b, 0);
    const volSpike15m = ((vol15m - prev15m) / prev15m) * 100;
    
    // SCORE: What we want for quick trades
    // 1. Volume SPIKE (momentum building)
    // 2. Price MOVING (not flat)
    // 3. Affordable
    
    let score = 0;
    let signals = [];
    
    // Volume spike in last 15 min = IMMINENT move
    if (volSpike15m > 50) { score += 30; signals.push('VOL SPIKE'); }
    else if (volSpike15m > 30) { score += 20; signals.push('vol up'); }
    
    // Price moving in last 15 min
    if (Math.abs(priceChange15m) > 1) { score += 15; signals.push('moving'); }
    
    // Dip + volume = good for reversal
    if (priceChange15m < -1 && volSpike15m > 20) { score += 20; signals.push('DIP BUY'); }
    
    // Momentum building
    if (priceChange30m > 0 && volChange30m > 20) { score += 15; signals.push('momentum'); }
    
    const shares = Math.floor(BUDGET / price);
    const profit1pct = price * 0.01 * shares;
    const profit3pct = price * 0.03 * shares;
    
    if (score >= 20 && shares > 0) {
      results.push({
        sym: crypto.sym,
        price,
        priceChange15m,
        priceChange30m,
        volSpike15m,
        volChange30m,
        signals,
        shares,
        profit1pct,
        profit3pct,
        score
      });
    }
  }
  
  // Sort by score (best opportunities first)
  results.sort((a, b) => b.score - a.score);
  
  if (results.length === 0) {
    console.log('❌ No setups found. Wait for volume spike.');
    return;
  }
  
  console.log('🎯 TOP OPPORTUNITIES:\n');
  results.slice(0, 8).forEach(r => {
    console.log(`${r.sym}: \$${r.price.toFixed(4)} | ${r.priceChange15m.toFixed(1)}%/15m | Vol ${r.volSpike15m.toFixed(0)}% | ${r.signals.join(', ')}`);
    console.log(`   => \$${r.price.toFixed(4)} → \$${(r.price * 1.01).toFixed(4)} (+1%) = \$${r.profit1pct.toFixed(2)} profit`);
    console.log(`   => \$${r.price.toFixed(4)} → \$${(r.price * 1.03).toFixed(4)} (+3%) = \$${r.profit3pct.toFixed(2)} profit`);
    console.log('');
  });
  
  console.log('💡 Strategy:');
  console.log('- Enter on VOLUME SPIKE + price moving');
  console.log('- Hold 15-30 min max');
  console.log('- Exit at +1% (minimum) or +3% (target)');
  console.log('- Stop at -1% (max loss)');
}

scan().catch(console.error);