#!/usr/bin/env node
/**
 * Unified Price System
 * 
 * CORE RULE: Browser = ALL numeric price data
 * Per USER.md: "Browser = Stock DATA and PRICES"
 * 
 * This module provides price lookup for trading.
 * Run with BROWSER tool to get actual prices.
 */

const CRYPTO_GOOGLE = {
  'BTC': 'BTC-USD',
  'DOGE': 'DOGE-USD', 
  'ETH': 'ETH-USD',
};

const STOCKS = ['EZGO', 'AMC', 'GME', 'NVDA', 'TSLA'];

/**
 * Get URL for a symbol
 */
function getUrl(symbol) {
  const upper = symbol.toUpperCase();
  if (CRYPTO_GOOGLE[upper]) {
    return `https://www.google.com/finance/quote/${CRYPTO_GOOGLE[upper]}`;
  }
  return `https://finance.yahoo.com/quote/${upper}`;
}

/**
 * Check if symbol is crypto
 */
function isCrypto(symbol) {
  return !!CRYPTO_GOOGLE[symbol.toUpperCase()];
}

/**
 * Price check summary for current positions
 */
const POSITIONS = {
  'BTC': { shares: 0.00002159, entry: 79000 },
  'EZGO': { shares: 864, entry: 0.017 },
  'DOGE': { shares: 28.23, entry: 0.114 },
};

console.log(`
=== PRICE SYSTEM ===
Positions to check: ${Object.keys(POSITIONS).join(', ')}

URLs:
${Object.keys(POSITIONS).map(s => `${s}: ${getUrl(s)}`).join('\n')}

Usage:
1. Navigate browser to URL
2. Get snapshot
3. Extract price from output
`);