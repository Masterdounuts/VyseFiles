#!/usr/bin/env node
// SETUP DECISION - Complete analysis for MY decision making
// Combines: Price + Big Trader + Timeline + Volume = SCORE

const https = require('https');

// ============================================
// GET DATA
// ============================================
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

async function getBigTraderData(sym) {
  return new Promise((resolve) => {
    // Use 15min data for big trader detection
    https.get(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=15m&range=3d`,
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
          resolve({ closes, highs, lows, volumes });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// ============================================
// INDICATORS
// ============================================
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

// ============================================
// BIG TRADER DETECTION
// ============================================
function detectBigTraders(data) {
  if (!data) return null;
  
  const { closes, highs, lows, volumes } = data;
  const avgVol = volumes.reduce((a,b) => a+b, 0) / volumes.length;
  const avgPrice = closes.reduce((a,b) => a+b, 0) / closes.length;
  
  let absorbing = 0, distributing = 0;
  let theirEntries = [];
  
  for (let i = 1; i < closes.length; i++) {
    const priceChange = Math.abs(closes[i] - closes[i-1]);
    const volRatio = volumes[i] / avgVol;
    const priceRatio = (priceChange / avgPrice) * 100;
    
    // High volume + small price move = big trader activity
    if (volRatio > 1.5 && priceRatio < 0.5) {
      if (closes[i] > closes[i-1]) {
        absorbing++;
        theirEntries.push(closes[i]);
      } else {
        distributing++;
      }
    }
  }
  
  const avgEntry = theirEntries.length > 0 
    ? theirEntries.slice(-10).reduce((a,b) => a+b, 0) / theirEntries.slice(-10).length
    : avgPrice;
  
  return {
    absorbing,
    distributing,
    avgEntry,
    ratio: absorbing - distributing
  };
}

// ============================================
// MAIN DECISION
// ============================================
async function analyze(sym) {
  console.log(`\n🎯 ${sym} - COMPLETE ANALYSIS`);
  console.log('═'.repeat(50));
  
  const [daily, btData] = await Promise.all([
    getData(sym, '1d', 30),
    getBigTraderData(sym)
  ]);
  
  if (!daily) { console.log('❌ No data'); return; }
  
  const price = daily.meta.regularMarketPrice;
  const closes = daily.closes;
  const highs = daily.highs;
  const lows = daily.lows;
  const volumes = daily.volumes;
  
  // ========== PRICE ANALYSIS ==========
  const rsi = calculateRSI(closes);
  const support = Math.min(...lows.slice(-20));
  const resistance = Math.max(...highs.slice(-20));
  const range = resistance - support;
  const position = ((price - support) / range * 100).toFixed(0);
  const supportTests = lows.slice(-20).filter(l => l <= support * 1.02).length;
  
  // ========== TIMELINE ==========
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
  const avgBounce = bounceTimes.length > 0 
    ? (bounceTimes.reduce((a,b) => a+b, 0) / bounceTimes.length * 24).toFixed(1)
    : null;
  
  // ========== VOLUME ==========
  const avgVol = volumes.slice(-20).reduce((a,b) => a+b, 0) / 20;
  const recentVol = volumes.slice(-5).reduce((a,b) => a+b, 0) / 5;
  const volTrend = ((recentVol / avgVol - 1) * 100).toFixed(0);
  
  // ========== BIG TRADER ==========
  const bt = detectBigTraders(btData);
  
  // ========== OUTPUT ==========
  console.log(`💵 Price: $${price} | Range: ${position}% from bottom`);
  console.log(`📊 RSI: ${rsi?.toFixed(1)} ${rsi < 30 ? '🟢' : rsi > 70 ? '🔴' : '🟡'}`);
  console.log(`📍 Support: $${support.toFixed(2)} (${supportTests}x tested)`);
  
  if (bt) {
    const theirPL = ((price - bt.avgEntry) / bt.avgEntry * 100).toFixed(1);
    console.log(`👥 Big Traders: ${theirPL > 0 ? '🟢' : '🔴'} ${theirPL}% (${bt.absorbing} absorb / ${bt.distributing} dist)`);
  }
  
  if (avgBounce) {
    console.log(`⏱️ Timeline: ~${avgBounce} hours to bounce`);
  }
  console.log(`📈 Volume: ${volTrend}% trend`);
  
  // ========== MY DECISION SCORE ==========
  console.log('\n' + '─'.repeat(50));
  console.log('🎯 MY DECISION:');
  
  let score = 0;
  let reasons = [];
  
  // RSI (max 2)
  if (rsi < 30) { score += 2; reasons.push('✅ RSI oversold'); }
  else if (rsi > 70) { score -= 2; reasons.push('🔴 RSI overbought'); }
  else if (rsi < 40) { score += 1; reasons.push('🟢 RSI low'); }
  
  // Position (max 2)
  if (parseInt(position) < 25) { score += 2; reasons.push('✅ Near support'); }
  else if (parseInt(position) > 75) { score -= 2; reasons.push('🔴 Near resistance'); }
  
  // Support tests (max 2)
  if (supportTests >= 3) { score += 2; reasons.push('✅ Support tested 3x'); }
  else if (supportTests === 0) { score -= 1; reasons.push('⚠️ Untested support'); }
  
  // Big trader (max 3)
  if (bt) {
    const theirPL = (price - bt.avgEntry) / bt.avgEntry * 100;
    if (theirPL > 0) { score += 3; reasons.push('✅ BT in profit (pump ready)'); }
    else if (theirPL < -5) { score += 2; reasons.push('✅ BT underwater (panic pump)'); }
    else if (theirPL > -3) { score -= 2; reasons.push('🔴 BT stuck (-3% to 0%)'); }
  }
  
  // Timeline (max 2)
  if (avgBounce && parseFloat(avgBounce) < 48) { score += 2; reasons.push('✅ Timeline clear'); }
  
  // Volume (max 1)
  if (parseInt(volTrend) > 20) { score += 1; reasons.push('✅ Volume rising'); }
  else if (parseInt(volTrend) < -30) { score -= 1; reasons.push('⚠️ Volume falling'); }
  
  reasons.forEach(r => console.log('   ' + r));
  
  console.log(`\n🏆 SCORE: ${score}/15`);
  
  if (score >= 10) console.log('   🚀 ENTER - HIGH CONFIDENCE');
  else if (score >= 7) console.log('   🤔 ENTER - MEDIUM CONFIDENCE');
  else if (score >= 4) console.log('   😐 RESEARCH MORE');
  else console.log('   ❌ SKIP - LOW CONFIDENCE');
  
  // The 5 checks summary
  console.log('\n' + '═'.repeat(50));
  console.log('📋 5 CHECKS SUMMARY:');
  console.log(`   1. Big Trader: ${bt ? (price - bt.avgEntry)/bt.avgEntry*100 > -3 ? '✅/❌' : '✅' : '❌'}`);
  console.log(`   2. Timeline: ${avgBounce && parseFloat(avgBounce) < 48 ? '✅' : '❌'}`);
  console.log(`   3. Support: ${supportTests >= 3 ? '✅' : '⚠️'}`);
  console.log(`   4. Accumulation: ${bt && bt.absorbing > bt.distributing ? '✅' : '❌'}`);
  console.log(`   5. Capital: (check manually)`);
}

const sym = process.argv[2] || 'AMC';
analyze(sym);
