#!/usr/bin/env node
// UNIFIED TRADE RECOMMENDATIONS - All 3 Types
// Outputs: Stock choices, why, target, likelihood

const https = require('https');

// CoinGecko mapping
const COINGECKO_IDS = {
  'BTC': 'bitcoin', 'ETH': 'ethereum', 'DOGE': 'dogecoin', 'SOL': 'solana',
  'SHIB': 'shiba-inu', 'ADA': 'cardano', 'XRP': 'ripple', 'DOT': 'polkadot',
  'AVAX': 'avalanche-2', 'LINK': 'chainlink'
};

// ============================================
// GET PRICES
// ============================================

function getPrices() {
  return new Promise((resolve) => {
    const ids = Object.values(COINGECKO_IDS).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          const prices = {};
          Object.entries(COINGECKO_IDS).forEach(([sym, id]) => {
            if (json[id]) prices[sym] = { price: json[id].usd, change: json[id].usd_24h_change || 0 };
          });
          resolve(prices);
        } catch(e) { resolve({}); }
      });
    }).on('error', () => resolve({}));
  });
}

// ============================================
// STOCK CHOICES FOR EACH TYPE
// ============================================

const STOCK_PICKS = {
  mini: [
    { symbol: 'DOGE', reason: 'Momentum + volume spike', setup: 'FVG + big trader' },
    { symbol: 'SOL', reason: 'Strong performer, dip buy', setup: 'Order block' },
    { symbol: 'BTC', reason: 'Market leader, institutional', setup: 'Liquidity sweep' }
  ],
  intraday: [
    { symbol: 'AMC', reason: 'High volatility, meme stock', setup: 'Big trader entry' },
    { symbol: 'NVDA', reason: 'AI momentum', setup: 'Trend continuation' },
    { symbol: 'MARA', reason: 'Bitcoin miner, high beta', setup: 'Sector play' }
  ],
  daytoday: [
    { symbol: 'QQQ', reason: 'Steady uptrend', setup: 'Swing hold' },
    { symbol: 'NVDA', reason: 'Long-term AI thesis', setup: 'Position trade' },
    { symbol: 'SOL', reason: 'Strong crypto sector', setup: 'Multi-day' }
  ]
};

// ============================================
// FORMAT OUTPUT FOR EACH TYPE
// ============================================

function formatOutput(type, prices) {
  const picks = STOCK_PICKS[type];
  
  const names = { mini: 'CRYPTO (MINI)', intraday: 'INTRADAY', daytoday: 'DAY-TO-DAY' };
  const targets = { mini: '5-10%', intraday: '5%', daytoday: '12%' };
  const timeframes = { mini: 'Same day', intraday: 'Same day', daytoday: '1-2 days' };
  const timecuts = { mini: 'End of day', intraday: '12:30 PM PT', daytoday: 'Next close' };
  
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎯 ${names[type]} - RECOMMENDATIONS`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`\n📊 Type: ${names[type]}`);
  console.log(`⏱️  Timeframe: ${timeframes[type]}`);
  console.log(`🎯 Target: ${targets[type]}`);
  console.log(`🛑 Exit By: ${timecuts[type]}`);
  
  // For crypto, add live prices
  if (type === 'mini' && prices) {
    console.log(`\n📈 LIVE CRYPTO PRICES:`);
    Object.entries(prices).forEach(([sym, data]) => {
      const change = data.change >= 0 ? `+${data.change.toFixed(1)}%` : `${data.change.toFixed(1)}%`;
      console.log(`   ${sym}: $${data.price.toFixed(4)} (${change})`);
    });
  }
  
  console.log(`\n📋 STOCK CHOICES:`);
  picks.forEach((p, i) => {
    console.log(`\n   ${i+1}. ${p.symbol}`);
    console.log(`      Why: ${p.reason}`);
    console.log(`      Setup: ${p.setup}`);
    console.log(`      Target: ${targets[type]}`);
    console.log(`      Likelihood: ${type === 'mini' ? '50-60%' : type === 'intraday' ? '40-50%' : '50-60%'}`);
    
    // Add crypto-specific info
    if (type === 'mini' && prices && prices[p.symbol]) {
      const data = prices[p.symbol];
      console.log(`      Current: $${data.price.toFixed(4)} | 24h: ${data.change >= 0 ? '+' : ''}${data.change.toFixed(1)}%`);
    }
  });
  
  // Type-specific rules
  console.log(`\n📋 ${names[type]} RULES:`);
  
  if (type === 'mini') {
    console.log(`   ✅ Quick flip primary (+5%)`);
    console.log(`   ✅ Hold 1-2 days if strong setup`);
    console.log(`   ✅ Bolster with profits if bullish expected`);
    console.log(`   ✅ Rotate to next best setup`);
  } else if (type === 'intraday') {
    console.log(`   ✅ Entry window: 6:30 AM - 12:30 PM PT`);
    console.log(`   ✅ 12:30 PM PT HARD CUTOFF`);
    console.log(`   ✅ Big trader exits = immediate exit`);
    console.log(`   ✅ No overnight holds`);
  } else {
    console.log(`   ✅ Buy at close, sell next close`);
    console.log(`   ✅ T+1 settlement`);
    console.log(`   ✅ +12% target or Fib -2% stop`);
    console.log(`   ✅ Big trader distribution = exit`);
  }
  
  console.log(`\n${'─'.repeat(70)}`);
}

// ============================================
// MAIN
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const type = args[0] || 'all';
  
  let prices = {};
  
  // Get crypto prices if needed
  if (type === 'all' || type === 'mini') {
    console.log('📡 Fetching crypto prices...');
    prices = await getPrices();
  }
  
  if (type === 'all') {
    formatOutput('mini', prices);
    formatOutput('intraday', null);
    formatOutput('daytoday', null);
  } else {
    formatOutput(type, prices);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { getPrices, STOCK_PICKS, formatOutput };