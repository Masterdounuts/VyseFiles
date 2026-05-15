#!/usr/bin/env node
// CRYPTO TOOLS - Video 53 Strategy
// Bitcoin Rainbow + Altcoin Season + Robinhood Tradable (72 coins)

const https = require('https');

// ============================================
// ROBINHOOD TRADABLE CRYPTO (72 coins - May 2026)
// ============================================
const ROBINHOOD_CRYPTO = [
  'BTC', 'ETH', 'DOGE', 'LTC', 'SHIB', 'AAVE', 'AERO', 'ARB', 'ASTER', 'AVAX',
  'AVNT', 'BCH', 'BNB', 'BONK', 'CC', 'ADA', 'MEW', 'LINK', 'COMP', 'CRV',
  'WIF', 'EIGEN', 'ENA', 'ETC', 'FLOKI', 'USDG', 'HBAR', 'HYPE', 'IMX', 'ZRO',
  'LDO', 'LIT', 'MNT', 'SYRUP', 'MEGA', 'MOODENG', 'NEAR', 'TRUMP', 'ONDO', 'XCN',
  'OP', 'ORCA', 'PAXG', 'PNUT', 'PEPE', 'XPL', 'DOT', 'POPCAT', 'PENGU', 'PYTH',
  'QNT', 'RAY', 'RENDER', 'SKR', 'SEI', 'SKY', 'SOL', 'SUI', 'XLM', 'SNX',
  'XTZ', 'GRT', 'TON', 'UNI', 'USDC', 'CHIP', 'VIRTUAL', 'WLFI', 'W', 'XRP',
  'ZEC', 'ZORA'
];

// ============================================
// GET BITCOIN PRICE
// ============================================
function getBitcoinPrice() {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD?interval=1d&range=1d',
      {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const price = j.chart?.result?.[0]?.meta?.regularMarketPrice;
          resolve(price || null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

// ============================================
// GET CRYPTO PRICES (Top Coins)
// ============================================
function getCryptoPrices(symbols) {
  return new Promise((resolve) => {
    const symList = symbols.slice(0, 10).join(',');
    https.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symList}`,
      {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const quotes = j.quoteResponse?.result || [];
          resolve(quotes.map(q => ({
            symbol: q.symbol,
            price: q.regularMarketPrice,
            change: q.regularMarketChangePercent
          })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

// ============================================
// BITCOIN RAINBOW ZONES
// ============================================
function getBitcoinRainbowZone(price) {
  if (!price) return { zone: 'UNKNOWN', action: 'Wait' };
  
  const zones = [
    { name: '🔥 Fire Sale', max: 15000, action: 'MAX BUY' },
    { name: '🟢 Buy', max: 30000, action: 'Accumulate' },
    { name: '🔵 Accumulate', max: 60000, action: 'Still cheap' },
    { name: '🟡 Still Cheap', max: 100000, action: 'Hold' },
    { name: '🟠 Hold', max: 150000, action: 'Monitor' },
    { name: '🔴 Is This Bubble?', max: 200000, action: 'Take profits?' },
    { name: '🟣 FOMO', max: 300000, action: 'Sell' },
    { name: '💣 Maximum Bubble', max: 500000, action: 'SELL EVERYTHING' },
  ];
  
  for (let z of zones) {
    if (price < z.max) {
      return { zone: z.name, action: z.action, price };
    }
  }
  return { zone: 'Unknown', action: 'Wait', price };
}

// ============================================
// ROBINHOOD LIST
// ============================================
function isOnRobinhood(symbol) {
  return ROBINHOOD_CRYPTO.includes(symbol.toUpperCase());
}

// ============================================
// MAIN
// ============================================
async function analyze() {
  console.log('\n🪙 CRYPTO TOOLS - Video 53 Strategy');
  console.log('═'.repeat(50));
  
  // 1. Bitcoin Rainbow
  const btcPrice = await getBitcoinPrice();
  const rainbow = getBitcoinRainbowZone(btcPrice);
  
  console.log('\n🔴 BITCOIN RAINBOW:');
  console.log(`   Price: $${btcPrice?.toLocaleString() || 'N/A'}`);
  console.log(`   Zone: ${rainbow.zone}`);
  console.log(`   Action: ${rainbow.action}`);
  
  // 2. Robinhood count
  console.log('\n✅ ROBINHOOD CRYPTO:');
  console.log(`   ${ROBINHOOD_CRYPTO.length} coins available`);
  
  // 3. Check specific symbols
  const checkSymbols = process.argv.slice(2);
  if (checkSymbols.length > 0) {
    console.log('\n📊 CHECKED COINS:');
    const prices = await getCryptoPrices(checkSymbols);
    prices.forEach(p => {
      const onRH = isOnRobinhood(p.symbol);
      console.log(`   ${p.symbol}: $${p.price?.toFixed(4) || 'N/A'} (${p.change?.toFixed(1) || 0}%) ${onRH ? '✅' : '❌'}`);
    });
  }
  
  // 4. Recommendations
  console.log('\n' + '─'.repeat(50));
  console.log('📋 RECOMMENDATIONS:');
  console.log(`   Total Robinhood: ${ROBINHOOD_CRYPTO.length} coins`);
  console.log('   Includes: SOL, ADA, XRP, SHIB, PEPE, DOGE, etc.');
  
  if (btcPrice && btcPrice < 60000) {
    console.log('   🟢 Good accumulation zone');
  } else if (btcPrice && btcPrice > 150000) {
    console.log('   🔴 Expensive zone - take profits');
  }
}

analyze();