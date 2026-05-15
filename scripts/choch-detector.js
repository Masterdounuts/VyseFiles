#!/usr/bin/env node
// CHOCH DETECTOR - Change of Character detection
// Core SMC component - invalidates prior trend

const fs = require('fs');
const path = require('path');

// ============================================
// CHOCH (Change of Character) DETECTION
// ============================================

/**
 * Detect structure breaks that indicate trend change
 * @param {Array} candles - Price data
 * @returns {Object} CHOCH analysis
 */
function detectCHOCH(candles) {
  if (!candles || candles.length < 10) {
    return { detected: false, reason: 'Insufficient data' };
  }
  
  const result = {
    detected: false,
    direction: null,  // 'bullish' or 'bearish'
    breakCandle: null,
    brokenStructure: null,
    confirmation: false,
    details: []
  };
  
  // Find recent swing highs and lows
  const swingHighs = [];
  const swingLows = [];
  
  for (let i = 2; i < candles.length - 2; i++) {
    const c = candles[i];
    const prev = candles[i-1];
    const prev2 = candles[i-2];
    const next = candles[i+1];
    const next2 = candles[i+2];
    
    // Swing high
    if (c.high > prev.high && c.high > prev2.high &&
        c.high > next.high && c.high > next2.high) {
      swingHighs.push({ index: i, price: c.high, time: c.time, close: c.close });
    }
    
    // Swing low
    if (c.low < prev.low && c.low < prev2.low &&
        c.low < next.low && c.low < next2.low) {
      swingLows.push({ index: i, price: c.low, time: c.time, close: c.close });
    }
  }
  
  if (swingHighs.length < 2 || swingLows.length < 2) {
    return { ...result, reason: 'Not enough swing points' };
  }
  
  // Analyze most recent structure
  const lastHigh = swingHighs[swingHighs.length - 1];
  const lastLow = swingLows[swingLows.length - 1];
  const prevHigh = swingHighs[swingHighs.length - 2];
  const prevLow = swingLows[swingLows.length - 2];
  
  // Bullish CHOCH: Previous downtrend breaks above last high
  // (Low breaks below last low, then price breaks above last high)
  if (prevLow && lastLow && lastHigh) {
    // Check if we had a downtrend (lower lows)
    const isDowntrend = lastLow.price < prevLow.price;
    
    // Check for break above last high (bullish reversal)
    const recentCandles = candles.slice(-5);
    const brokeAbove = recentCandles.some(c => c.close > lastHigh.price);
    
    if (isDowntrend && brokeAbove) {
      result.detected = true;
      result.direction = 'bullish';
      result.breakCandle = recentCandles.find(c => c.close > lastHigh.price);
      result.brokenStructure = 'downtrend';
      result.details.push('Downtrend broken - price broke above last high');
    }
  }
  
  // Bearish CHOCH: Previous uptrend breaks below last low
  if (prevHigh && lastHigh && lastLow) {
    const isUptrend = lastHigh.price > prevHigh.price;
    
    const recentCandles = candles.slice(-5);
    const brokeBelow = recentCandles.some(c => c.close < lastLow.price);
    
    if (isUptrend && brokeBelow) {
      result.detected = true;
      result.direction = 'bearish';
      result.breakCandle = recentCandles.find(c => c.close < lastLow.price);
      result.brokenStructure = 'uptrend';
      result.details.push('Uptrend broken - price broke below last low');
    }
  }
  
  // Alternative: Strong momentum candle breaking structure
  if (!result.detected) {
    const lastCandle = candles[candles.length - 1];
    const prevCandle = candles[candles.length - 2];
    
    // Strong bullish candle
    if (lastCandle.close > lastCandle.open && 
        (lastCandle.close - lastCandle.open) > (lastCandle.high - lastCandle.low) * 0.7) {
      
      // Check if broke above resistance
      if (lastHigh && lastCandle.close > lastHigh.price) {
        result.detected = true;
        result.direction = 'bullish';
        result.breakCandle = lastCandle;
        result.brokenStructure = 'resistance-break';
        result.details.push('Strong bullish candle broke resistance');
      }
    }
    
    // Strong bearish candle
    if (lastCandle.close < lastCandle.open && 
        (lastCandle.open - lastCandle.close) > (lastCandle.high - lastCandle.low) * 0.7) {
      
      if (lastLow && lastCandle.close < lastLow.price) {
        result.detected = true;
        result.direction = 'bearish';
        result.breakCandle = lastCandle;
        result.brokenStructure = 'support-break';
        result.details.push('Strong bearish candle broke support');
      }
    }
  }
  
  return result;
}

/**
 * Validate CHOCH for trading
 */
function validateCHOCH(chochResult) {
  if (!chochResult.detected) {
    return { valid: false, reason: chochResult.reason || 'No CHOCH detected' };
  }
  
  if (!chochResult.confirmation && !chochResult.breakCandle) {
    return { valid: false, reason: 'CHOCH needs confirmation' };
  }
  
  return {
    valid: true,
    direction: chochResult.direction,
    reason: `${chochResult.direction.toUpperCase()} CHOCH detected - ${chochResult.brokenStructure}`
  };
}

/**
 * Get current structure state
 */
function getStructureState(candles) {
  const choch = detectCHOCH(candles);
  
  // Determine overall structure
  let structure = 'ranging';
  
  const swingHighs = [];
  const swingLows = [];
  
  for (let i = 2; i < candles.length - 2; i++) {
    const c = candles[i];
    const prev = candles[i-1];
    const prev2 = candles[i-2];
    const next = candles[i+1];
    const next2 = candles[i+2];
    
    if (c.high > prev.high && c.high > prev2.high && c.high > next.high && c.high > next2.high) {
      swingHighs.push(c.high);
    }
    if (c.low < prev.low && c.low < prev2.low && c.low < next.low && c.low < next2.low) {
      swingLows.push(c.low);
    }
  }
  
  // HH+HL = uptrend
  let hhs = 0, hls = 0, lls = 0, lhs = 0;
  for (let i = 1; i < swingHighs.length; i++) {
    if (swingHighs[i] > swingHighs[i-1]) hhs++;
    if (swingHighs[i] < swingHighs[i-1]) lhs++;
  }
  for (let i = 1; i < swingLows.length; i++) {
    if (swingLows[i] > swingLows[i-1]) hls++;
    if (swingLows[i] < swingLows[i-1]) lls++;
  }
  
  if (hhs > 0 && hls > 0) structure = 'uptrend';
  else if (lls > 0 && lhs > 0) structure = 'downtrend';
  
  return {
    structure,
    choch,
    swingHighs: swingHighs.length,
    swingLows: swingLows.length,
    hhs, hls, lls, lhs
  };
}

// ============================================
// MAIN
// ============================================

if (require.main === module) {
  // Demo: Bullish CHOCH scenario
  const demoCandles = [
    { time: '2026-05-01', open: 100, high: 105, low: 98, close: 103, volume: 1000 },
    { time: '2026-05-02', open: 103, high: 106, low: 101, close: 102, volume: 1100 },
    { time: '2026-05-03', open: 102, high: 104, low: 99, close: 100, volume: 1200 },
    { time: '2026-05-04', open: 100, high: 103, low: 97, close: 98, volume: 1300 },
    { time: '2026-05-05', open: 98, high: 101, low: 95, close: 96, volume: 1400 }, // Lower low
    { time: '2026-05-06', open: 96, high: 98, low: 94, close: 95, volume: 1500 },  // Lower low
    { time: '2026-05-07', open: 95, high: 97, low: 94, close: 96, volume: 1600 },
    { time: '2026-05-08', open: 96, high: 99, low: 95, close: 98, volume: 1700 },
    { time: '2026-05-09', open: 98, high: 102, low: 97, close: 101, volume: 1800 }, // Higher high!
    { time: '2026-05-10', open: 101, high: 105, low: 100, close: 104, volume: 2000 }, // Break above
    { time: '2026-05-11', open: 104, high: 108, low: 103, close: 107, volume: 2200 },
  ];
  
  console.log('\n🔄 CHOCH (Change of Character) DETECTOR');
  console.log('═'.repeat(50));
  
  const state = getStructureState(demoCandles);
  console.log(`\nCurrent Structure: ${state.structure.toUpperCase()}`);
  console.log(`Swing Points: ${state.swingHighs} highs, ${state.swingLows} lows`);
  
  if (state.choch.detected) {
    console.log(`\n⚡ CHOCH DETECTED!`);
    console.log(`   Direction: ${state.choch.direction.toUpperCase()}`);
    console.log(`   Broken: ${state.choch.brokenStructure}`);
    state.choch.details.forEach(d => console.log(`   • ${d}`));
  } else {
    console.log(`\n⏳ No CHOCH detected: ${state.choch.reason}`);
  }
  
  const validation = validateCHOCH(state.choch);
  console.log(`\n✅ Valid for ${validation.direction}: ${validation.reason}`);
}

module.exports = { detectCHOCH, validateCHOCH, getStructureState };