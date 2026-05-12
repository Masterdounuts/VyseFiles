#!/usr/bin/env node
// TECHNICAL INDICATORS - RSI, MACD, Bollinger Bands, Stochastic
// Adds sophisticated indicators for better predictions

const https = require('https');

async function getData(sym, days = 50) {
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
          const closes = r.indicators?.quote?.[0]?.close.filter(x => x);
          const highs = r.indicators?.quote?.[0]?.high.filter(x => x);
          const lows = r.indicators?.quote?.[0]?.low.filter(x => x);
          const volumes = r.indicators?.quote?.[0]?.volume.filter(x => x);
          if (!closes) return resolve(null);
          resolve({ closes, highs, lows, volumes });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// RSI Calculation
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
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// MACD Calculation
function calculateMACD(prices) {
  if (prices.length < 26) return null;
  
  const ema = (arr, period) => {
    const k = 2 / (period + 1);
    let ema = arr[0];
    for (let i = 1; i < arr.length; i++) {
      ema = arr[i] * k + ema * (1 - k);
    }
    return ema;
  };
  
  const ema12 = ema(prices, 12);
  const ema26 = ema(prices, 26);
  const macd = ema12 - ema26;
  const signal = ema([macd], 9);
  const histogram = macd - signal;
  
  return { macd, signal, histogram };
}

// Bollinger Bands
function calculateBollinger(prices, period = 20, stdDev = 2) {
  if (prices.length < period) return null;
  
  const recent = prices.slice(-period);
  const sma = recent.reduce((a,b) => a+b, 0) / period;
  const variance = recent.reduce((sum, p) => sum + Math.pow(p - sma, 2), 0) / period;
  const std = Math.sqrt(variance);
  
  return {
    upper: sma + (stdDev * std),
    middle: sma,
    lower: sma - (stdDev * std),
    current: prices[prices.length-1]
  };
}

// Stochastic Oscillator
function calculateStochastic(highs, lows, closes, period = 14) {
  if (highs.length < period || lows.length < period) return null;
  
  const recentHigh = Math.max(...highs.slice(-period));
  const recentLow = Math.min(...lows.slice(-period));
  const current = closes[closes.length-1];
  
  const k = ((current - recentLow) / (recentHigh - recentLow)) * 100;
  return k;
}

// ATR (Average True Range) - Volatility
function calculateATR(highs, lows, closes, period = 14) {
  if (highs.length < period + 1) return null;
  
  let trs = [];
  for (let i = 1; i < highs.length; i++) {
    const tr = Math.max(
      highs[i] - lows[i],
      Math.abs(highs[i] - closes[i-1]),
      Math.abs(lows[i] - closes[i-1])
    );
    trs.push(tr);
  }
  
  const atr = trs.slice(-period).reduce((a,b) => a+b, 0) / period;
  return atr;
}

// Main
const sym = process.argv[2] || 'AMC';

getData(sym).then(data => {
  if (!data) {
    console.log(`No data for ${sym}`);
    process.exit(1);
  }
  
  const { closes, highs, lows } = data;
  const current = closes[closes.length-1];
  
  console.log(`\n📊 TECHNICAL INDICATORS: ${sym} ($${current.toFixed(2)})\n`);
  console.log('='.repeat(50));
  
  // RSI
  const rsi = calculateRSI(closes);
  if (rsi) {
    let signal = rsi > 70 ? 'OVERBOUGHT 🔴' : rsi < 30 ? 'OVERSOLD 🟢' : 'NEUTRAL 🟡';
    console.log(`RSI (14):    ${rsi.toFixed(1)} - ${signal}`);
  }
  
  // MACD
  const macd = calculateMACD(closes);
  if (macd) {
    const trend = macd.histogram > 0 ? 'BULLISH 🐂' : 'BEARISH 🐻';
    console.log(`MACD:        ${macd.macd.toFixed(3)} | Signal: ${macd.signal.toFixed(3)} | Hist: ${macd.histogram.toFixed(3)} - ${trend}`);
  }
  
  // Bollinger
  const bb = calculateBollinger(closes);
  if (bb) {
    const position = current > bb.upper ? 'Above Upper' : current < bb.lower ? 'Below Lower' : 'Middle';
    console.log(`Bollinger:   Upper: $${bb.upper.toFixed(2)} | Mid: $${bb.middle.toFixed(2)} | Lower: $${bb.lower.toFixed(2)}`);
    console.log(`             Current: $${current.toFixed(2)} - ${position}`);
  }
  
  // Stochastic
  const stoch = calculateStochastic(highs, lows, closes);
  if (stoch) {
    let signal = stoch > 80 ? 'OVERBOUGHT' : stoch < 20 ? 'OVERSOLD' : 'NEUTRAL';
    console.log(`Stochastic:  ${stoch.toFixed(1)} - ${signal}`);
  }
  
  // ATR
  const atr = calculateATR(highs, lows, closes);
  if (atr) {
    const atrPercent = (atr / current) * 100;
    console.log(`ATR (14):    $${atr.toFixed(2)} (${atrPercent.toFixed(1)}% of price) - ${atrPercent > 3 ? 'HIGH VOLATILITY' : 'NORMAL'}`);
  }
  
  console.log('\n' + '='.repeat(50));
  
  // Summary
  console.log('\n🎯 SUMMARY:');
  const signals = [];
  if (rsi) {
    if (rsi < 30) signals.push('RSI Oversold 🟢');
    if (rsi > 70) signals.push('RSI Overbought 🔴');
  }
  if (macd && macd.histogram > 0) signals.push('MACD Bullish 🐂');
  if (macd && macd.histogram < 0) signals.push('MACD Bearish 🐻');
  
  if (signals.length === 0) console.log('  No clear signals - neutral');
  else signals.forEach(s => console.log(`  ${s}`));
});