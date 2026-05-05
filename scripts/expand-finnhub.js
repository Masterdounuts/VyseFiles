#!/usr/bin/env node
// Expanded Finnhub API - More endpoints for trading
// Usage: node expand-finnhub.js [command] [args]
// Commands: quote, profile, earnings, sentiment, market

const https = require('https');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'd7t4vshr01qugn09d39gd7t4vshr01qugn09d3a0';

// 1. Real-time Quote
async function getQuote(symbol) {
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            symbol: symbol.toUpperCase(),
            current: json.c,
            high: json.h,
            low: json.l,
            open: json.o,
            prevClose: json.pc,
            change: ((json.c - json.pc) / json.pc * 100).toFixed(2)
          });
        } catch (e) { resolve({ error: e.message }); }
      });
    }).on('error', reject);
  });
}

// 2. Company Profile
async function getProfile(symbol) {
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            name: json.name,
            exchange: json.exchange,
            industry: json.finnhubIndustry,
            marketCap: json.marketCapitalization,
            shares: json.shareOutstanding,
            weburl: json.weburl
          });
        } catch (e) { resolve({ error: e.message }); }
      });
    }).on('error', reject);
  });
}

// 3. Upcoming Earnings
async function getEarnings(from, to) {
  const fromDate = from || new Date().toISOString().split('T')[0];
  const toDate = to || new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0];
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/earnings?from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.slice(0, 20).map(e => ({
            symbol: e.symbol,
            date: e.date,
            estimate: e.estimate,
            actual: e.actual
          })));
        } catch (e) { resolve({ error: e.message }); }
      });
    }).on('error', reject);
  });
}

// 4. Stock Sentiment (social buzz)
async function getSentiment(symbol) {
  const toDate = new Date().toISOString().split('T')[0];
  const fromDate = new Date(Date.now() - 7*24*60*60*1000).toISOString().split('T')[0];
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/news-sentiment?symbol=${symbol.toUpperCase()}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            symbol: symbol.toUpperCase(),
            buzz: json.buzz,
            sentiment: json.sentiment,
            articleCount: json.articleCount
          });
        } catch (e) { resolve({ error: e.message }); }
      });
    }).on('error', reject);
  });
}

// 5. Market Status
async function getMarketStatus() {
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/market/status?token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            isOpen: json.isOpen,
            session: json.session,
            market: json.market
          });
        } catch (e) { resolve({ error: e.message }); }
      });
    }).on('error', reject);
  });
}

// Parse arguments
const args = process.argv.slice(2);
const cmd = args[0];

(async () => {
  try {
    switch(cmd) {
      case 'quote':
        console.log(JSON.stringify(await getQuote(args[1] || 'NVDA'), null, 2));
        break;
      case 'profile':
        console.log(JSON.stringify(await getProfile(args[1] || 'NVDA'), null, 2));
        break;
      case 'earnings':
        console.log(JSON.stringify(await getEarnings(args[1], args[2]), null, 2));
        break;
      case 'sentiment':
        console.log(JSON.stringify(await getSentiment(args[1] || 'NVDA'), null, 2));
        break;
      case 'status':
        console.log(JSON.stringify(await getMarketStatus(), null, 2));
        break;
      default:
        console.log('Finnhub Expanded API');
        console.log('Commands: quote, profile, earnings, sentiment, status');
        console.log('Usage: node expand-finnhub.js quote NVDA');
    }
  } catch(e) {
    console.error(JSON.stringify({ error: e.message }));
  }
})();