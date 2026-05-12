#!/usr/bin/env node
// SETUP CHECK - All-in-one decision tool
// Shows me the complete picture for any symbol

const https = require('https');

async function getData(sym, interval = '1d', days = 30) {
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
          const volumes = r.indicators?.quote?.[0]?.volume.filter(x => x);
          resolve({ closes, highs, lows, volumes, meta: r.meta });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function calculateRSI(prices, period = 14) {
  if (prices.length < period + 1) return null;
  let gains = [], losses = [];
  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i-1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
  }
  let avgGain = gains.slice(-period).reduce((a,b) => a+b, 0) / period;
  let avgLoss = losses.slice(-period).reduce((a,b) => a+b, 0) / period;
  if (avgLoss === 0) return 100;
  return 100 - (100 / (1 + avgGain / avgLoss));
}

function calculateMACD(prices) {
  // Simple MACD (12, 26, 9)
  const ema12 = ema(prices, 12);
  const ema26 = ema(prices, 26);
  const macd = ema12 - ema26;
  const signal = ema([macd], 9);
  return { macd, signal, hist: macd - signal };
}

function ema(prices, period) {
  if (prices.length < period) return prices[prices.length-1];
  const k = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a,b) => a+b, 0) / period;
  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  return ema;
}

async function checkSymbol(sym) {
  console.log(`\n🎯 SETUP CHECK: ${sym}`);
  console.log('='.repeat(50));
  
  // Get data from multiple timeframes
  const [daily, hourly, min15] = await Promise.all([
    getData(sym, '1d', 30),
    getData(sym, '1h', 10),
    getData(sym, '15m', 3)
  ]);
  
  if (!daily) { console.log('❌ No data'); return; }
  
  const price = daily.meta.regularMarketPrice;
  const closes = daily.closes;
  const highs = daily.highs;
  const lows = daily.lows;
  const volumes = daily.volumes;
  
  // RSI
  const rsi = calculateRSI(closes);
  
  // Support/Resistance
  const support = Math.min(...lows.slice(-20));
  const resistance = Math.max(...highs.slice(-20));
  const range = resistance - support;
  const position = ((price - support) / range * 100).toFixed(0);
  
  // Recent volatility
  const recentVol = (Math.max(...closes.slice(-5)) - Math.min(...closes.slice(-5))) / price * 100;
  
  // Volume trend
  const avgVol = volumes.slice(-20).reduce((a,b) => a+b, 0) / 20;
  const recentVolAvg = volumes.slice(-5).reduce((a,b) => a+b, 0) / 5;
  const volTrend = ((recentVolAvg / avgVol - 1) * 100).toFixed(0);
  
  console.log(`📊 PRICE: $${price}`);
  console.log(`   Range: $${support.toFixed(2)} - $${resistance.toFixed(2)} (${position}% from bottom)`);
  console.log(`   5-day volatility: ${recentVol.toFixed(1)}%`);
  console.log(`   Volume trend: ${volTrend}%`);
  console.log(`   RSI: ${rsi.toFixed(1)} ${rsi < 30 ? '🟢 oversold' : rsi > 70 ? '🔴 overbought' : '🟡 neutral'}`);
  
  // Key levels
  const supportTests = lows.slice(-20).filter(l => l <= support * 1.02).length;
  const resistanceTests = highs.slice(-20).filter(h => h >= resistance * 0.98).length;
  
  console.log(`\n📍 LEVELS:`);
  console.log(`   Support: $${support.toFixed(2)} (tested ${supportTests}x)`);
  console.log(`   Resistance: $${resistance.toFixed(2)} (tested ${resistanceTests}x)`);
  
  // Timeline check
  let bounceTimes = [];
  for (let i = 1; i < closes.length; i++) {
    if (closes[i] <= support * 1.03 && closes[i] >= support * 0.97) {
      for (let j = i+1; j < Math.min(i+20, closes.length); j++) {
        if (closes[j] > closes[i] * 1.02) {
          bounceTimes.push(j - i);
          break;
        }
      }
    }
  }
  
  console.log(`\n⏱️ TIMELINE:`);
  if (bounceTimes.length > 0) {
    const avgBounce = bounceTimes.reduce((a,b) => a+b, 0) / bounceTimes.length;
    const timeHours = (avgBounce * (daily.closes.length > 30 ? 24 : 1)).toFixed(1);
    console.log(`   Avg bounce: ${timeHours} hours`);
    console.log(`   Bounces found: ${bounceTimes.length}`);
  } else {
    console.log(`   No clear bounce pattern`);
  }
  
  // MY DECISION SUMMARY
  console.log(`\n🎯 MY DECISION:`);
  
  let score = 0;
  let reasons = [];
  
  if (rsi < 35) { score += 2; reasons.push('✅ RSI oversold'); }
  else if (rsi > 65) { score -= 1; reasons.push('⚠️ RSI overbought'); }
  
  if (position < 30) { score += 2; reasons.push('✅ Near support'); }
  else if (position > 70) { score -= 1; reasons.push('⚠️ Near resistance'); }
  
  if (supportTests >= 3) { score += 2; reasons.push('✅ Support tested'); }
  else if (supportTests === 0) { score -= 1; reasons.push('⚠️ Untested support'); }
  
  if (parseInt(volTrend) > 20) { score += 1; reasons.push('✅ Volume rising'); }
  else if (parseInt(volTrend) < -20) { score -= 1; reasons.push('⚠️ Volume falling'); }
  
  if (bounceTimes.length >= 3) { score += 2; reasons.push('✅ Bounce history'); }
  
  reasons.forEach(r => console.log('   ' + r));
  
  console.log(`\n   SCORE: ${score}/10`);
  if (score >= 6) console.log('   🚀 HIGH CONFIDENCE - ENTER');
  else if (score >= 4) console.log('   🤔 MEDIUM CONFIDENCE - Research more');
  else console.log('   ❌ LOW CONFIDENCE - Skip');
}

const sym = process.argv[2] || 'AMC';
checkSymbol(sym);
