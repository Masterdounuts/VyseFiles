#!/usr/bin/env node
// LIQUIDITY SWEEP DETECTOR - Detect stop hunts and liquidity grabs
// Core SMC component #2

const fs = require('fs');
const path = require('path');

// ============================================
// LIQUIDITY SWEEP DETECTION
// ============================================

/**
 * Find liquidity zones (swing highs/lows, recent highs/lows)
 */
function findLiquidityZones(candles, lookback = 20) {
  const recent = candles.slice(-lookback);
  const liquidityZones = {
    highs: [],  // Recent swing highs
    lows: []    // Recent swing lows
  };
  
  // Find local highs and lows
  for (let i = 2; i < recent.length - 2; i++) {
    const curr = recent[i];
    const prev = recent[i-1];
    
    // Local high
    if (curr.high > prev.high) {
      let isSwing = true;
      for (let j = 0; j < recent.length; j++) {
        if (j !== i && recent[j].high > curr.high) {
          isSwing = false;
          break;
        }
      }
      if (isSwing) {
        liquidityZones.highs.push({ price: curr.high, time: curr.time, index: i });
      }
    }
    
    // Local low
    if (curr.low < prev.low) {
      let isSwing = true;
      for (let j = 0; j < recent.length; j++) {
        if (j !== i && recent[j].low < curr.low) {
          isSwing = false;
          break;
        }
      }
      if (isSwing) {
        liquidityZones.lows.push({ price: curr.low, time: curr.time, index: i });
      }
    }
  }
  
  // Sort by price
  liquidityZones.highs.sort((a, b) => b.price - a.price);
  liquidityZones.lows.sort((a, b) => a.price - b.price);
  
  return liquidityZones;
}

/**
 * Detect if price swept liquidity (stop hunt)
 * @param {Array} candles - Price data
 * @param {Object} liquidityZones - {highs:[], lows:[]}
 * @returns {Object} - {swept: boolean, direction, sweepPrice, sweepTime, rejection}
 */
function detectLiquiditySweep(candles, liquidityZones) {
  const recent = candles.slice(-10);
  let result = {
    swept: false,
    direction: null,
    sweepPrice: null,
    sweepTime: null,
    liquidityZone: null,
    rejection: false,
    rejectionCandle: null
  };
  
  for (let i = 0; i < recent.length; i++) {
    const candle = recent[i];
    
    // Check if highs were swept (price went above, then rejected down)
    for (const high of liquidityZones.highs) {
      if (candle.high >= high.price) {
        // Check for rejection (wick or close below)
        if (candle.low < high.price - (candle.high - candle.low) * 0.3) {
          result = {
            swept: true,
            direction: 'short',
            sweepPrice: high.price,
            sweepTime: candle.time,
            liquidityZone: 'swing-high',
            rejection: true,
            rejectionCandle: candle
          };
          break;
        }
      }
    }
    
    // Check if lows were swept (price went below, then rejected up)
    for (const low of liquidityZones.lows) {
      if (candle.low <= low.price) {
        // Check for rejection (wick or close above)
        if (candle.high > low.price + (candle.high - candle.low) * 0.3) {
          result = {
            swept: true,
            direction: 'long',
            sweepPrice: low.price,
            sweepTime: candle.time,
            liquidityZone: 'swing-low',
            rejection: true,
            rejectionCandle: candle
          };
          break;
        }
      }
    }
    
    if (result.swept) break;
  }
  
  return result;
}

/**
 * Find the most recent untested liquidity
 */
function getActiveLiquidity(candles, liquidityZones) {
  const recent = candles.slice(-5);
  const currentPrice = recent[recent.length - 1].close;
  
  // Find nearest untested liquidity above current price
  const aboveLiquidity = liquidityZones.highs.filter(h => h.price > currentPrice);
  const nearestAbove = aboveLiquidity.length > 0 ? aboveLiquidity[0] : null;
  
  // Find nearest untested liquidity below current price
  const belowLiquidity = liquidityZones.lows.filter(l => l.price < currentPrice);
  const nearestBelow = belowLiquidity.length > 0 ? belowLiquidity[0] : null;
  
  return {
    currentPrice,
    nearestAbove,
    nearestBelow,
    distanceToAbove: nearestAbove ? ((nearestAbove.price - currentPrice) / currentPrice * 100).toFixed(2) + '%' : null,
    distanceToBelow: nearestBelow ? ((currentPrice - nearestBelow.price) / currentPrice * 100).toFixed(2) + '%' : null
  };
}

/**
 * Main liquidity analysis
 */
function analyzeLiquidity(candles) {
  console.log('\n💧 LIQUIDITY ANALYSIS');
  console.log('═'.repeat(50));
  
  const zones = findLiquidityZones(candles);
  console.log(`Liquidity Highs: ${zones.highs.map(h => '$' + h.price.toFixed(2)).join(', ') || 'none'}`);
  console.log(`Liquidity Lows: ${zones.lows.map(l => '$' + l.price.toFixed(2)).join(', ') || 'none'}`);
  
  const sweep = detectLiquiditySweep(candles, zones);
  
  if (sweep.swept) {
    console.log(`\n⚡ LIQUIDITY SWEEP DETECTED!`);
    console.log(`   Direction: ${sweep.direction.toUpperCase()}`);
    console.log(`   Swept Level: $${sweep.sweepPrice.toFixed(2)}`);
    console.log(`   Time: ${sweep.sweepTime}`);
    console.log(`   Rejection: ${sweep.rejection ? 'YES ✓' : 'NO'}`);
  } else {
    console.log(`\n⏳ No liquidity sweep detected in recent candles`);
  }
  
  const active = getActiveLiquidity(candles, zones);
  console.log(`\n📊 Active Liquidity:`);
  console.log(`   Current Price: $${active.currentPrice.toFixed(2)}`);
  console.log(`   Nearest Above: ${active.nearestAbove ? '$' + active.nearestAbove.price.toFixed(2) + ' (' + active.distanceToAbove + ')' : 'none'}`);
  console.log(`   Nearest Below: ${active.nearestBelow ? '$' + active.nearestBelow.price.toFixed(2) + ' (' + active.distanceToBelow + ')' : 'none'}`);
  
  return { zones, sweep, active };
}

// ============================================
// CLI
// ============================================

if (require.main === module) {
  const demoCandles = [
    { time: '2026-05-01', open: 100, high: 105, low: 98, close: 103, volume: 1000 },
    { time: '2026-05-02', open: 103, high: 108, low: 101, close: 106, volume: 1200 },
    { time: '2026-05-03', open: 106, high: 110, low: 104, close: 108, volume: 1100 },
    { time: '2026-05-04', open: 108, high: 112, low: 106, close: 109, volume: 1300 },
    { time: '2026-05-05', open: 109, high: 115, low: 108, close: 114, volume: 1500 },
    { time: '2026-05-06', open: 114, high: 118, low: 112, close: 116, volume: 1400 },
    { time: '2026-05-07', open: 116, high: 120, low: 114, close: 118, volume: 1600 },
    // Sweep scenario - price goes above 120, then rejects
    { time: '2026-05-08', open: 118, high: 125, low: 117, close: 119, volume: 2000 },
    { time: '2026-05-09', open: 119, high: 122, low: 115, close: 116, volume: 1800 },
    { time: '2026-05-10', open: 116, high: 118, low: 110, close: 112, volume: 2500 },
  ];
  
  analyzeLiquidity(demoCandles);
}

module.exports = { findLiquidityZones, detectLiquiditySweep, getActiveLiquidity, analyzeLiquidity };