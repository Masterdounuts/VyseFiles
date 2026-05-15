#!/usr/bin/env node
// TREND DETECTOR - Detect HH+HL (uptrend) or LL+LH (downtrend)
// Core SMC component #1

const fs = require('fs');
const path = require('path');

// ============================================
// TREND DETECTION FUNCTIONS
// ============================================

/**
 * Analyze price data to detect trend
 * @param {Array} candles - Array of {time, open, high, low, close, volume}
 * @returns {Object} - {trend: 'up'|'down'|'neutral', hhs:[], hls:[], lls:[], lhs:[]}
 */
function detectTrend(candles) {
  if (!candles || candles.length < 10) {
    return { trend: 'insufficient-data', hhs: [], hls: [], lls: [], lhs: [] };
  }
  
  // Find swing highs and swing lows
  const swingHighs = [];
  const swingLows = [];
  
  // Simple swing detection (pivot points)
  for (let i = 2; i < candles.length - 2; i++) {
    const prev2 = candles[i - 2];
    const prev1 = candles[i - 1];
    const curr = candles[i];
    const next1 = candles[i + 1];
    const next2 = candles[i + 2];
    
    // Swing high (HH)
    if (curr.high > prev1.high && curr.high > prev2.high &&
        curr.high > next1.high && curr.high > next2.high) {
      swingHighs.push({ index: i, price: curr.high, time: curr.time });
    }
    
    // Swing low (LL)
    if (curr.low < prev1.low && curr.low < prev2.low &&
        curr.low < next1.low && curr.low < next2.low) {
      swingLows.push({ index: i, price: curr.low, time: curr.time });
    }
  }
  
  // Analyze trend
  let trend = 'neutral';
  let hhs = []; // Higher highs
  let hls = []; // Higher lows
  let lls = []; // Lower lows
  let lhs = []; // Lower highs
  
  // Find HH+HL (Uptrend)
  for (let i = 1; i < swingHighs.length; i++) {
    if (swingHighs[i].price > swingHighs[i-1].price) {
      hhs.push(swingHighs[i]);
    }
  }
  
  for (let i = 1; i < swingLows.length; i++) {
    if (swingLows[i].price > swingLows[i-1].price) {
      hls.push(swingLows[i]);
    }
  }
  
  // Find LL+LH (Downtrend)
  for (let i = 1; i < swingLows.length; i++) {
    if (swingLows[i].price < swingLows[i-1].price) {
      lls.push(swingLows[i]);
    }
  }
  
  for (let i = 1; i < swingHighs.length; i++) {
    if (swingHighs[i].price < swingHighs[i-1].price) {
      lhs.push(swingHighs[i]);
    }
  }
  
  // Determine trend
  if (hhs.length > 0 && hls.length > 0) {
    trend = 'up'; // HH+HL
  } else if (lls.length > 0 && lhs.length > 0) {
    trend = 'down'; // LL+LH
  }
  
  return {
    trend,
    hhs: hhs.map(h => h.price),
    hls: hls.map(l => l.price),
    lls: lls.map(l => l.price),
    lhs: lhs.map(h => h.price),
    swingHighs: swingHighs.map(h => ({ price: h.price, time: h.time })),
    swingLows: swingLows.map(l => ({ price: l.price, time: l.time }))
  };
}

/**
 * Check if we're in a valid trend for trading
 */
function validateTrendForTrade(trendResult, minSwings = 2) {
  if (trendResult.trend === 'insufficient-data') {
    return { valid: false, reason: 'Insufficient data for trend detection' };
  }
  
  if (trendResult.trend === 'neutral') {
    return { valid: false, reason: 'No clear trend - market ranging' };
  }
  
  const totalSwings = trendResult.hhs.length + trendResult.hls.length +
                      trendResult.lls.length + trendResult.lhs.length;
  
  if (totalSwings < minSwings) {
    return { valid: false, reason: `Only ${totalSwings} swings detected, need ${minSwings}+` };
  }
  
  return {
    valid: true,
    direction: trendResult.trend === 'up' ? 'long' : 'short',
    reason: `Clear ${trendResult.trend.toUpperCase()} trend (HH+HL or LL+LH confirmed)`
  };
}

/**
 * Get trend summary
 */
function getTrendSummary(candles) {
  const trend = detectTrend(candles);
  const validation = validateTrendForTrade(trend);
  
  console.log('\n📈 TREND ANALYSIS');
  console.log('═'.repeat(50));
  console.log(`Trend: ${trend.trend.toUpperCase()}`);
  console.log(`Swings: ${trend.swingHighs.length} highs, ${trend.swingLows.length} lows`);
  
  if (trend.trend === 'up') {
    console.log(`Higher Highs: ${trend.hhs.join(', ') || 'none'}`);
    console.log(`Higher Lows: ${trend.hls.join(', ') || 'none'}`);
  } else if (trend.trend === 'down') {
    console.log(`Lower Lows: ${trend.lls.join(', ') || 'none'}`);
    console.log(`Lower Highs: ${trend.lhs.join(', ') || 'none'}`);
  }
  
  console.log(`\n✅ Valid for ${validation.direction}: ${validation.reason}`);
  
  return { trend, validation };
}

// ============================================
// CLI
// ============================================

const args = process.argv.slice(2);

if (args.includes('--test') || args.length === 0) {
  // Demo with fake data
  const demoCandles = [
    { time: '2026-05-01', open: 100, high: 105, low: 98, close: 103, volume: 1000 },
    { time: '2026-05-02', open: 103, high: 108, low: 101, close: 106, volume: 1200 },
    { time: '2026-05-03', open: 106, high: 110, low: 104, close: 108, volume: 1100 },
    { time: '2026-05-04', open: 108, high: 112, low: 106, close: 109, volume: 1300 },
    { time: '2026-05-05', open: 109, high: 115, low: 108, close: 114, volume: 1500 },
    { time: '2026-05-06', open: 114, high: 118, low: 112, close: 116, volume: 1400 },
    { time: '2026-05-07', open: 116, high: 120, low: 114, close: 118, volume: 1600 },
    { time: '2026-05-08', open: 118, high: 125, low: 117, close: 124, volume: 2000 },
    { time: '2026-05-09', open: 124, high: 128, low: 122, close: 126, volume: 1800 },
    { time: '2026-05-10', open: 126, high: 130, low: 124, close: 128, volume: 1700 },
    { time: '2026-05-11', open: 128, high: 135, low: 127, close: 134, volume: 2200 },
    { time: '2026-05-12', open: 134, high: 138, low: 132, close: 136, volume: 1900 },
  ];
  
  getTrendSummary(demoCandles);
}

module.exports = { detectTrend, validateTrendForTrade, getTrendSummary };