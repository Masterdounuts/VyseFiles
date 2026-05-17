#!/usr/bin/env node
/**
 * Penny Stock Scanner for Quick Flip Scalping
 * Finds top 3 candidates under $1 with liquidity setup
 * 
 * Usage: node penny-scanner.cjs
 */

const https = require('https');

// Top penny stocks to check (from your watchlist + potential finds)
const SYMBOLS_TO_CHECK = [
  // Your current watchlist
  'EZGO', 'HAO', 'GPUS', 'LZMH', 'GDC', 'BIYA',
  // Common penny stocks under $1
  'AMC', 'NAK', 'AEI', 'SNES', 'CLNE', 'CTRM', 'ATER',
  'SENS', 'MMAT', 'NOS', 'Num', 'NIO', 'JOB', 'BGFV'
];

async function fetchQuote(symbol) {
  return new Promise((resolve) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const result = json.chart?.result?.[0];
          if (!result) return resolve(null);
          
          const meta = result.meta;
          const indicators = result.indicators?.quote?.[0];
          
          const close = meta.regularMarketPrice;
          const low52 = meta.fiftyTwoWeekLow;
          const high52 = meta.fiftyTwoWeekHigh;
          const volume = meta.regularMarketVolume;
          
          // Calculate position in 52-week range
          const range = high52 - low52;
          const position = range > 0 ? ((close - low52) / range) * 100 : 100;
          
          // Yesterday's close
          const yesterdayClose = indicators.close?.[indicators.close.length - 2];
          
          resolve({
            symbol,
            price: close,
            low52,
            high52,
            volume,
            position52w: position.toFixed(1),
            yesterdayClose,
            change: meta.regularMarketChangePercent?.toFixed(2) || '0'
          });
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function scan() {
  console.log('🔍 SCANNING PENNY STOCKS...\n');
  
  const results = [];
  
  for (const symbol of SYMBOLS_TO_CHECK) {
    try {
      const quote = await fetchQuote(symbol);
      if (quote && quote.price && quote.price < 1.0) {
        results.push(quote);
        console.log(`  ${symbol}: $${quote.price} | Vol: ${(quote.volume/1000000).toFixed(1)}M | 52W: ${quote.position52w}%`);
      }
    } catch (e) {
      // Skip errors
    }
    await new Promise(r => setTimeout(r, 200)); // Rate limit
  }
  
  // Sort by: near 52-week low (< 30%) first, then volume
  results.sort((a, b) => {
    const aScore = parseFloat(a.position52w) < 30 ? 1000 - parseFloat(a.position52w) : 0;
    const bScore = parseFloat(b.position52w) < 30 ? 1000 - parseFloat(b.position52w) : 0;
    return bScore - aScore;
  });
  
  console.log('\n=== TOP 3 CANDIDATES ===');
  const top3 = results.slice(0, 3);
  top3.forEach((r, i) => {
    console.log(`${i+1}. ${r.symbol}: $${r.price} | ${r.position52w}% in 52W range | Vol: ${(r.volume/1000000).toFixed(1)}M`);
  });
  
  return top3;
}

// Save top candidates
const fs = require('fs');
const path = require('path');

scan().then(top3 => {
  const watchlist = {
    updated: new Date().toISOString(),
    top3: top3.map(r => r.symbol)
  };
  fs.writeFileSync(
    path.join(__dirname, '../kb/stocks/watchlist.json'),
    JSON.stringify(watchlist, null, 2)
  );
  console.log('\n✅ Watchlist updated!');
});