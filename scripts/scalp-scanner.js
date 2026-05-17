#!/usr/bin/env node
// Pre-market scalping scanner
// Scans for penny stock candidates with volume + catalyst

const https = require('https');

// Configuration
const VOLUME_THRESHOLD = 500000; // 500K minimum
const PRICE_MAX = 1.00; // Penny stocks

// Default watchlist (will be loaded from config)
const DEFAULT_WATCHLIST = [
  'EZGO', 'Sono', 'BNMV', 'AETHER', 'AIM', 
  'ATOS', 'AEHR', 'NAKD', 'SENS', 'MTCH'
];

async function fetchQuote(symbol) {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const r = json.chart?.result?.[0];
          if (!r) { resolve({ symbol, error: 'No data' }); return; }
          
          const meta = r.meta;
          const price = meta.regularMarketPrice;
          const prevClose = meta.previousClose;
          const volume = meta.regularMarketVolume;
          
          // Get 5-day data for range
          const timestamps = r.timestamp || [];
          const highs = r.indicators?.quote?.[0]?.high || [];
          const lows = r.indicators?.quote?.[0]?.low || [];
          
          const dayHigh = Math.max(...highs.filter(v => v));
          const dayLow = Math.min(...lows.filter(v => v));
          const dayRange = dayHigh - dayLow;
          const dayRangePct = dayRange > 0 ? (dayRange / dayLow * 100).toFixed(1) : 0;
          
          resolve({
            symbol,
            price: price?.toFixed(4),
            prevClose: prevClose?.toFixed(4),
            change: prevClose ? ((price - prevClose) / prevClose * 100).toFixed(1) : '0',
            volume: volume?.toLocaleString(),
            dayHigh: dayHigh?.toFixed(4),
            dayLow: dayLow?.toFixed(4),
            dayRangePct
          });
        } catch (e) {
          resolve({ symbol, error: e.message });
        }
      });
    }).on('error', reject);
  });
}

async function searchPennyStocks() {
  console.log('🔍 Pre-Market Scalp Scanner');
  console.log('='.repeat(40));
  
  // For now, scan the default watchlist
  // TODO: Expand to scan all penny stocks
  const watchlist = process.argv[2] ? process.argv[2].split(',') : DEFAULT_WATCHLIST;
  
  console.log(`Scanning: ${watchlist.join(', ')}\n`);
  
  const results = await Promise.all(watchlist.map(s => fetchQuote(s)));
  
  console.log('SCAN RESULTS');
  console.log('-'.repeat(60));
  
  const candidates = [];
  
  for (const r of results) {
    if (r.error) {
      console.log(`${r.symbol}: Error - ${r.error}`);
      continue;
    }
    
    const vol = parseInt(r.volume?.replace(/,/g, '') || '0');
    const price = parseFloat(r.price);
    
    // Check criteria
    const isPenny = price < PRICE_MAX;
    const hasVolume = vol >= VOLUME_THRESHOLD;
    const hasMovement = parseFloat(r.dayRangePct || '0') > 10;
    
    const status = isPenny ? '✅' : '❌';
    const volStatus = hasVolume ? '✅' : '❌';
    const moveStatus = hasMovement ? '✅' : '❌';
    
    console.log(`${r.symbol} | $${r.price} | Vol: ${r.volume} | ${r.change}% | Range: ${r.dayRangePct}%`);
    console.log(`  Penny: ${status} | Vol ${volStatus} | Movement: ${moveStatus}`);
    
    if (isPenny && hasVolume) {
      candidates.push({
        symbol: r.symbol,
        price: r.price,
        volume: r.volume,
        change: r.change,
        dayRangePct: r.dayRangePct
      });
    }
  }
  
  console.log('\n' + '='.repeat(40));
  console.log(`FOUND ${candidates.length} CANDIDATES`);
  console.log('='.repeat(40));
  
  for (const c of candidates) {
    console.log(`🎯 ${c.symbol} - $${c.price} | Vol: ${c.volume} | ${c.change}%`);
  }
  
  return candidates;
}

// Run if called directly
if (require.main === module) {
  searchPennyStocks().then(c => {
    process.exit(c.length > 0 ? 0 : 1);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = { searchPennyStocks, fetchQuote };