#!/usr/bin/env node
// MINI SCANNER - Crypto/Weekend Trading (Robinhood Supported)
// Max $2 profit per trade, profit reinvests to mini
//
// CRYPTO IS DIFFERENT FROM STOCKS:
// - No "smart money" - decentralized
// - 24/7 trading - no market hours
// - Driven by: sentiment, social media, news, whale movements
// - BTC leads - alts follow BTC
// - Market cap tiers matter (blue chip > mid > micro)
//
// WHAT STILL WORKS:
// - Volume spikes = big moves
// - Momentum continuation
// - Support/resistance
// - News catalysts

const https = require('https');
const fs = require('fs');
const path = require('path');

const MAX_PROFIT = 2.00;
const TOP_CRYPTOS = ['bitcoin', 'ethereum', 'dogecoin', 'solana', 'cardano', 'ripple', 'avalanche-2', 'chainlink', 'polkadot', 'dot', 'uniswap', 'litecoin', 'shib', 'injective-protocol', 'render-token', 'aptos', 'arbitrum', 'optimism', 'curve-dao-token', 'lido-dao'];

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

// Get volume data for accumulation detection
async function getVolumeData(coinIds) {
  const results = {};
  
  for (const id of coinIds.slice(0, 20)) { // Limit to avoid rate limits
    try {
      const data = await new Promise((resolve) => {
        https.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
          let d = '';
          res.on('data', c => d += c);
          res.on('end', () => {
            try {
              const j = JSON.parse(d);
              const prices = j.prices || [];
              const vols = j.total_volumes || [];
              if (prices.length > 0 && vols.length > 0) {
                const currentPrice = prices[prices.length - 1][1];
                const weekAgoPrice = prices[0][1];
                const currentVol = vols[vols.length - 1][1];
                const weekAgoVol = vols[0][1];
                const priceChange = ((currentPrice - weekAgoPrice) / weekAgoPrice) * 100;
                const volChange = ((currentVol - weekAgoVol) / weekAgoVol) * 100;
                results[id] = { priceChange, volChange, currentPrice };
              }
            } catch(e) {}
            resolve(null);
          });
        }).on('error', () => resolve(null));
      });
    } catch(e) {}
  }
  return results;
}

// Get BTC sentiment - crypto market leader
async function getBTCSentiment() {
  return new Promise((resolve) => {
    https.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const prices = j.prices || [];
          if (prices.length > 1) {
            const change = ((prices[prices.length-1][1] - prices[0][1]) / prices[0][1]) * 100;
            resolve(change);
          }
        } catch(e) {}
        resolve(0);
      });
    }).on('error', () => resolve(0));
  });
}

async function scan() {
  console.log('🪙 MINI SCANNER (Robinhood Crypto)');
  console.log('==================================');
  console.log(`🎯 Max profit per trade: $${MAX_PROFIT}`);
  console.log(`📊 Scanning ${cryptoUniverse.length} cryptos...\n`);
  
  // Check BTC first - market sentiment
  const btcChange = await getBTCSentiment();
  console.log(`📌 BTC SENTIMENT: ${btcChange > 0 ? '🟢 BULLISH' : btcChange < 0 ? '🔴 BEARISH' : '🟡 NEUTRAL'} (${btcChange?.toFixed(1)}% 24h)`);
  console.log('');
  
  const prices = await getPrices(cryptoUniverse);
  const volumes = await getVolumeData(TOP_CRYPTOS);
  
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
  
  // Volume Analysis - CRYPTO SPECIFIC
  // No "smart money" - look for momentum + volume spikes instead
  console.log('\n🎯 MOMENTUM SIGNALS (7d):');
  console.log('(Crypto driven by sentiment, not institutional money)');
  console.log('----------------------------------------');
  
  const strong = [];   // Price UP + Volume UP (momentum)
  const dip = [];       // Price DOWN + Volume UP (potential bounce)
  const weak = [];      // Price DOWN + Volume DOWN
  
  Object.entries(volumes).forEach(([id, v]) => {
    const sym = cryptoUniverse.find(c => c.id === id)?.symbol || id;
    if (v.priceChange > 0 && v.volChange > 0) {
      strong.push({ symbol: sym, ...v });
    } else if (v.priceChange < 0 && v.volChange > 0) {
      dip.push({ symbol: sym, ...v });
    } else if (v.priceChange < 0 && v.volChange < 0) {
      weak.push({ symbol: sym, ...v });
    }
  });
  
  if (strong.length > 0) {
    console.log('✅ STRONG MOMENTUM (Price ↑ + Volume ↑):');
    strong.slice(0, 5).forEach(s => {
      console.log(`  ${s.symbol}: +${s.priceChange?.toFixed(1)}% price | +${s.volChange?.toFixed(0)}% volume`);
    });
  }
  
  if (dip.length > 0) {
    console.log('\n🟢 DIP OPPORTUNITY (Price ↓ + Volume ↑):');
    console.log('   (Volume spike = potential bounce - crypto swings fast)');
    dip.slice(0, 5).forEach(d => {
      console.log(`  ${d.symbol}: ${d.priceChange?.toFixed(1)}% price | +${d.volChange?.toFixed(0)}% volume`);
    });
  }
  
  if (weak.length > 0) {
    console.log('\n❌ WEAK (Price ↓ + Volume ↓):');
    weak.slice(0, 5).forEach(w => {
      console.log(`  ${w.symbol}: ${w.priceChange?.toFixed(1)}% price | ${w.volChange?.toFixed(0)}% volume`);
    });
  }
  
  if (strong.length === 0 && dip.length === 0 && weak.length === 0) {
    console.log('  Checking top coins...');
  }
  
  console.log('\n💡 CRYPTO TRADING RULES:');
  console.log('- Max $2 profit per trade');
  console.log('- Reinvest profit back to mini');
  console.log('- Trade 24/7, especially weekends');
  console.log('- Watch BTC first - alts follow BTC');
  console.log('- Volume spike + price dip = potential bounce');
  console.log('- Use web_search for news/catalysts (partnerships, launches)');
  console.log('- Crypto swings faster - take profits fast');
  
  console.log('\n==================================');
}

scan().catch(console.error);