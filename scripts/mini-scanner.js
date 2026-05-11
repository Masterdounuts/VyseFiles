#!/usr/bin/env node
// MINI SCANNER - Crypto/Weekend Trading (Robinhood Supported)
// Max $2 profit per trade, profit reinvests to mini

const https = require('https');
const fs = require('fs');
const path = require('path');

const MAX_PROFIT = 2.00;

// All 71 Robinhood-supported cryptos with CoinGecko IDs
const cryptoUniverse = [
  { symbol: 'BTC', id: 'bitcoin' },
  { symbol: 'ETH', id: 'ethereum' },
  { symbol: 'DOGE', id: 'dogecoin' },
  { symbol: 'SOL', id: 'solana' },
  { symbol: 'ADA', id: 'cardano' },
  { symbol: 'XRP', id: 'ripple' },
  { symbol: 'DOT', id: 'polkadot' },
  { symbol: 'LINK', id: 'chainlink' },
  { symbol: 'AVAX', id: 'avalanche-2' },
  { symbol: 'UNI', id: 'uniswap' },
  { symbol: 'LTC', id: 'litecoin' },
  { symbol: 'BCH', id: 'bitcoin-cash' },
  { symbol: 'ETC', id: 'ethereum-classic' },
  { symbol: 'XLM', id: 'stellar' },
  { symbol: 'ATOM', id: 'cosmos' },
  { symbol: 'XMR', id: 'monero' },
  { symbol: 'ALGO', id: 'algorand' },
  { symbol: 'VET', id: 'vechain' },
  { symbol: 'FIL', id: 'filecoin' },
  { symbol: 'NEAR', id: 'near' },
  { symbol: 'APT', id: 'aptos' },
  { symbol: 'ARB', id: 'arbitrum' },
  { symbol: 'OP', id: 'optimism' },
  { symbol: 'SHIB', id: 'shiba-inu' },
  { symbol: 'PEPE', id: 'pepecoin' },
  { symbol: 'WIF', id: 'dogwifhat' },
  { symbol: 'BONK', id: 'bonk' },
  { symbol: 'AAVE', id: 'aave' },
  { symbol: 'GRT', id: 'the-graph' },
  { symbol: 'SNX', id: 'synthetix' },
  { symbol: 'MKR', id: 'maker' },
  { symbol: 'CRV', id: 'curve-dao-token' },
  { symbol: 'LDO', id: 'lido-dao' },
  { symbol: 'COMP', id: 'compound-governance-token' },
  { symbol: 'RNDR', id: 'render-token' },
  { symbol: 'INJ', id: 'injective-protocol' },
  { symbol: 'SUI', id: 'sui' },
  { symbol: 'SEI', id: 'sei' },
  { symbol: 'IMX', id: 'immutable-x' },
  { symbol: 'RARE', id: 'rare-gem' },
  { symbol: 'ZRO', id: 'layerzero' },
  { symbol: 'ONDO', id: 'ondo-finance' },
  { symbol: 'PYTH', id: 'pyth-network' },
  { symbol: 'W', id: 'wormhole' },
  { symbol: 'ZEC', id: 'zcash' },
  { symbol: 'XTZ', id: 'tezos' },
  { symbol: 'BNB', id: 'binancecoin' },
  { symbol: 'HBAR', id: 'hedera-hashgraph' },
  { symbol: 'TON', id: 'the-open-network' },
  { symbol: 'QNT', id: 'quant-network' },
  { symbol: 'MEGA', id: 'mega' },
  { symbol: 'EIGEN', id: 'eigenlayer' },
  { symbol: 'HYPE', id: 'hyperliquid' },
  { symbol: 'WLFI', id: 'world-liberty-financial' },
];

// Batch fetch prices
async function getPrices(cryptos) {
  const ids = cryptos.map(c => c.id).join(',');
  return new Promise((resolve) => {
    https.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          resolve(j);
        } catch(e) { resolve({}); }
      });
    }).on('error', () => resolve({}));
  });
}

async function scan() {
  console.log('🪙 MINI SCANNER (Robinhood Crypto)');
  console.log('==================================');
  console.log(`🎯 Max profit per trade: $${MAX_PROFIT}`);
  console.log(`📊 Scanning ${cryptoUniverse.length} cryptos...\n`);
  
  const prices = await getPrices(cryptoUniverse);
  
  const valid = cryptoUniverse
    .map(c => {
      const data = prices[c.id];
      return data ? { symbol: c.symbol, price: data.usd, change: data.usd_24h_change } : null;
    })
    .filter(r => r && r.price);
  
  // Sort by 24h change
  valid.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  
  console.log('📈 TOP MOVERS (24h):');
  valid.slice(0, 10).forEach((p, i) => {
    const arrow = p.change > 0 ? '📈' : '📉';
    const price = p.price < 1 ? p.price.toFixed(4) : p.price.toFixed(2);
    console.log(`  ${i+1}. ${p.symbol}: $${price} ${arrow} ${p.change?.toFixed(1)}%`);
  });
  
  console.log('\n💡 For mini trading:');
  console.log('- Max $2 profit per trade');
  console.log('- Reinvest profit back to mini');
  console.log('- Trade 24/7, especially weekends');
  console.log('- Use web_search for news/catalysts');
  
  console.log('\n==================================');
}

scan().catch(console.error);