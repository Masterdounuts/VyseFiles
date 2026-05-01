#!/usr/bin/env node
// Stock price fetcher using Yahoo Finance API (no rate limits!)
// Usage: node get-stock-price.js SYMBOL [SYMBOL...]

const https = require('https');

async function getQuote(symbol) {
  return new Promise((resolve, reject) => {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol.toUpperCase()}?interval=1d&range=1y`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.chart?.result?.[0]) {
            resolve({ symbol, error: 'No data' });
            return;
          }
          const r = json.chart.result[0];
          const meta = r.meta;
          const price = meta.regularMarketPrice;
          const volume = meta.regularMarketVolume;
          
          // Get 52-week high/low from meta
          const high52 = meta.fiftyTwoWeekHigh || Math.max(...(r.indicators?.quote?.[0]?.high || []).filter(v => v));
          const low52 = meta.fiftyTwoWeekLow || Math.min(...(r.indicators?.quote?.[0]?.low || []).filter(v => v));
          
          // Calculate change from yesterday's close (last close in historical data)
          const timestamps = r.timestamp || [];
          const closes = r.indicators?.quote?.[0]?.close || [];
          const yesterdayClose = closes[closes.length - 2] || closes[closes.length - 1];
          const change = yesterdayClose ? ((price - yesterdayClose) / yesterdayClose * 100) : null;
          
          resolve({
            symbol: symbol.toUpperCase(),
            price: price?.toFixed(2),
            change: change?.toFixed(2),
            prevClose: yesterdayClose?.toFixed(2),
            volume: volume?.toLocaleString(),
            high52: high52?.toFixed(2),
            low52: low52?.toFixed(2)
          });
        } catch (e) {
          resolve({ symbol, error: e.message });
        }
      });
    }).on('error', reject);
  });
}

const args = process.argv.slice(2);
if (!args.length) {
  console.log('Usage: node get-stock-price.js SYMBOL [SYMBOL...]');
  process.exit(1);
}

Promise.all(args.map(getQuote))
  .then(results => console.log(JSON.stringify(results, null, 2)))
  .catch(e => console.error(JSON.stringify({error: e.message})));