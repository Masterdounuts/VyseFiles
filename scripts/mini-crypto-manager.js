#!/usr/bin/env node
// MINI CRYPTO MANAGER - Smart profit reinvestment
// Uses CoinGecko API for live prices

const https = require('https');

// Map symbols to CoinGecko IDs
const COINGECKO_IDS = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'DOGE': 'dogecoin',
  'SOL': 'solana',
  'SHIB': 'shiba-inu',
  'LTC': 'litecoin',
  'ADA': 'cardano',
  'XRP': 'ripple',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'ATOM': 'cosmos',
  'MATIC': 'matic-network',
  'FIL': 'filecoin',
  'TRX': 'tron',
  'XLM': 'stellar',
  'NEAR': 'near',
  'ALGO': 'algorand',
  'VET': 'vechain'
};

// ============================================
// GET LIVE PRICES FROM COINGECKO
// ============================================

function getCryptoPrices(symbols = null) {
  return new Promise((resolve) => {
    const ids = Object.values(COINGECKO_IDS).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // Convert to our format
          const prices = {};
          Object.entries(COINGECKO_IDS).forEach(([sym, id]) => {
            if (json[id]) {
              prices[sym] = {
                price: json[id].usd,
                change: json[id].usd_24h_change || 0,
                volume: 0, // Not available in this endpoint
                id
              };
            }
          });
          resolve(prices);
        } catch(e) { 
          console.log('Error parsing:', e.message);
          resolve({}); 
        }
      });
    }).on('error', (e) => {
      console.log('Error:', e.message);
      resolve({});
    });
  });
}

// ============================================
// ANALYZE CRYPTO
// ============================================

function analyzeCrypto(symbol, priceData) {
  const data = priceData[symbol];
  if (!data) return null;
  
  const change = data.change || 0;
  
  // Score based on movement
  let score = 0;
  const signals = [];
  
  // Strong upward momentum
  if (change > 3) {
    score += 4;
    signals.push('Strong momentum +3%');
  } else if (change > 1) {
    score += 2;
    signals.push('Positive momentum');
  } else if (change > 0) {
    score += 1;
    signals.push('Slightly up');
  }
  
  // Dip opportunity
  if (change < -3) {
    score += 3;
    signals.push('Dip opportunity');
  } else if (change < -1) {
    score += 2;
    signals.push('Undervalued');
  }
  
  return {
    symbol,
    price: data.price,
    change,
    score,
    signals
  };
}

// ============================================
// DECISION ENGINE
// ============================================

function decideMiniAction(currentCrypto, currentPrice, entryPrice) {
  const profitPct = ((currentPrice - entryPrice) / entryPrice) * 100;
  
  const decision = {
    action: 'HOLD',
    reason: '',
    target: null,
    likelihood: 0,
    confidence: 0
  };
  
  // Decision tree
  if (profitPct >= 10) {
    // Take strong profits
    decision.action = 'SELL';
    decision.reason = `Excellent profit +${profitPct.toFixed(1)}% - secure gains`;
    decision.target = 'Take 50% profit, hold rest';
    decision.likelihood = 95;
    decision.confidence = 95;
  } else if (profitPct >= 5) {
    // Good profit - evaluate strength
    decision.action = 'HOLD';
    decision.reason = `Good profit +${profitPct.toFixed(1)}% - hold for more`;
    decision.target = '+10% next';
    decision.likelihood = 50;
    decision.confidence = 60;
  } else if (profitPct >= 2) {
    // Small profit - hold
    decision.action = 'HOLD';
    decision.reason = `Modest profit +${profitPct.toFixed(1)}% - hold for better`;
    decision.target = '+5%';
    decision.likelihood = 40;
    decision.confidence = 50;
  } else if (profitPct <= -3) {
    // Stop loss
    decision.action = 'SELL';
    decision.reason = `Stop loss -${Math.abs(profitPct).toFixed(1)}%`;
    decision.likelihood = 100;
    decision.confidence = 100;
  } else if (profitPct <= -1) {
    // Near stop - hold for recovery
    decision.action = 'HOLD';
    decision.reason = `Near stop -${Math.abs(profitPct).toFixed(1)}% - hold for recovery`;
    decision.likelihood = 30;
    decision.confidence = 40;
  } else {
    // No profit yet - hold
    decision.action = 'HOLD';
    decision.reason = 'No significant profit/loss - hold';
    decision.likelihood = 30;
    decision.confidence = 30;
  }
  
  return decision;
}

// ============================================
// FIND ROTATION TARGETS
// ============================================

function findBestRotate(priceData, exclude) {
  const scores = [];
  
  Object.keys(priceData).forEach(sym => {
    if (sym === exclude) return;
    const analysis = analyzeCrypto(sym, priceData);
    if (analysis) {
      scores.push(analysis);
    }
  });
  
  // Sort by score (highest first)
  scores.sort((a, b) => b.score - a.score);
  
  return scores.slice(0, 5);
}

// ============================================
// OUTPUT
// ============================================

async function runMiniAnalysis(position) {
  console.log('\n🪙 MINI CRYPTO DECISION');
  console.log('═'.repeat(50));
  
  // Get prices
  console.log('📡 Fetching prices...');
  const prices = await getCryptoPrices();
  
  const { symbol, entry, shares } = position;
  const current = prices[symbol];
  
  if (!current) {
    console.log(`❌ No price data for ${symbol}`);
    return;
  }
  
  const currentPrice = current.price;
  const profit = (currentPrice - entry) * shares;
  const profitPct = ((currentPrice - entry) / entry) * 100;
  
  console.log(`\n📊 CURRENT POSITION:`);
  console.log(`   Symbol: ${symbol}`);
  console.log(`   Entry: $${entry.toFixed(4)}`);
  console.log(`   Current: $${currentPrice.toFixed(4)}`);
  console.log(`   Shares: ${shares}`);
  console.log(`   P/L: $${profit.toFixed(2)} (${profitPct >= 0 ? '+' : ''}${profitPct.toFixed(1)}%)`);
  
  // Decision
  const decision = decideMiniAction(symbol, currentPrice, entry);
  
  console.log(`\n🎯 DECISION: ${decision.action}`);
  console.log(`   Reason: ${decision.reason}`);
  if (decision.target) {
    console.log(`   Target: ${decision.target}`);
  }
  console.log(`   Likelihood: ${decision.likelihood}%`);
  console.log(`   Confidence: ${decision.confidence}%`);
  
  // If selling with profit - show rotation options
  if (decision.action === 'SELL' && profit > 0) {
    console.log(`\n🔄 ROTATION OPTIONS (from $${profit.toFixed(2)} profit):`);
    const targets = findBestRotate(prices, symbol);
    targets.slice(0, 3).forEach((t, i) => {
      console.log(`\n   ${i+1}. ${t.symbol} - Score: ${t.score}`);
      console.log(`      Price: $${t.price.toFixed(4)} | 24h: ${t.change >= 0 ? '+' : ''}${t.change.toFixed(1)}%`);
      console.log(`      Signal: ${t.signals[0] || 'neutral'}`);
    });
  }
  
  return decision;
}

// ============================================
// CLI
// ============================================

const args = process.argv.slice(2);

if (require.main === module) {
  // Example position
  const position = {
    symbol: args[0] || 'DOGE',
    entry: parseFloat(args[1]) || 0.10,
    shares: parseInt(args[2]) || 100
  };
  
  console.log(`Analyzing ${position.symbol}...`);
  runMiniAnalysis(position).catch(console.error);
}

module.exports = { getCryptoPrices, analyzeCrypto, decideMiniAction, findBestRotate, runMiniAnalysis };