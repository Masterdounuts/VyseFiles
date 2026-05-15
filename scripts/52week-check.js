#!/usr/bin/env node
// 52-WEEK RULE CHECKER - Ensure we're buying below 80% of range
// Critical rule from TradingLab

// ============================================
// 52-WEEK RULE
// ============================================

/**
 * Calculate 52-week (or N-day) range position
 * @param {number} currentPrice - Current price
 * @param {number} high - 52-week high
 * @param {number} low - 52-week low
 * @returns {Object} - { percentage, inRange, message }
 */
function check52WeekRule(currentPrice, high, low) {
  const range = high - low;
  const percentage = ((currentPrice - low) / range) * 100;
  
  const result = {
    currentPrice,
    high,
    low,
    range,
    percentage: percentage.toFixed(1),
    inRange: percentage <= 80,
    message: ''
  };
  
  if (percentage <= 50) {
    result.message = '🟢 EXCELLENT - Below 50% of range (deep value)';
  } else if (percentage <= 70) {
    result.message = '🟢 GOOD - Below 70% of range';
  } else if (percentage <= 80) {
    result.message = '🟡 CAUTION - Between 70-80% (still okay)';
  } else {
    result.message = '🔴 AVOID - Above 80% of range (too high)';
  }
  
  return result;
}

/**
 * Check using 52-week high/low from data
 */
function check52WeekFromData(candles) {
  if (!candles || candles.length < 252) {
    // Not enough data for 52 weeks
    return { 
      inRange: null, 
      message: 'Insufficient data for 52-week rule (need 252+ candles)' 
    };
  }
  
  const yearCandles = candles.slice(-252);
  const highs = yearCandles.map(c => c.high);
  const lows = yearCandles.map(c => c.low);
  
  const high = Math.max(...highs);
  const low = Math.min(...lows);
  const current = candles[candles.length - 1].close;
  
  return check52WeekRule(current, high, low);
}

/**
 * Quick check with provided high/low
 */
function quickCheck(currentPrice, week52High, week52Low) {
  console.log('\n📊 52-WEEK RULE CHECK');
  console.log('═'.repeat(50));
  console.log(`Current Price: $${currentPrice.toFixed(2)}`);
  console.log(`52-Week High:  $${week52High.toFixed(2)}`);
  console.log(`52-Week Low:   $${week52Low.toFixed(2)}`);
  
  const result = check52WeekRule(currentPrice, week52High, week52Low);
  
  console.log(`\nRange Position: ${result.percentage}%`);
  console.log(`Status: ${result.message}`);
  
  return result;
}

// ============================================
// CLI
// ============================================

const args = process.argv.slice(2);

// Example: AMC at $1.44 with 52-week range
if (args.includes('--demo') || args.length === 0) {
  // AMC example
  const amc = quickCheck(1.44, 11.56, 0.89);
  
  console.log('\n' + '─'.repeat(50));
  
  // NVDA example
  const nvda = quickCheck(135.0, 152.89, 86.00);
  
  console.log('\n' + '─'.repeat(50));
  
  // Summary
  console.log('\n📋 SUMMARY:');
  console.log(`AMC:  ${amc.percentage}% - ${amc.inRange ? '✅ OK' : '❌ TOO HIGH'}`);
  console.log(`NVDA: ${nvda.percentage}% - ${nvda.inRange ? '✅ OK' : '❌ TOO HIGH'}`);
}

module.exports = { check52WeekRule, check52WeekFromData, quickCheck };