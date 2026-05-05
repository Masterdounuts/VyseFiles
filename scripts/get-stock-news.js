#!/usr/bin/env node
// Stock news fetcher using Finnhub API
// Usage: node get-stock-news.js [SYMBOL] or leave empty for market news

const https = require('https');

// Load API key from .env (simple approach)
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'd7t4vshr01qugn09d39gd7t4vshr01qugn09d3a0';

async function getMarketNews() {
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            resolve(json.slice(0, 10).map(item => ({
              headline: item.headline,
              source: item.source,
              url: item.url,
              datetime: new Date(item.datetime * 1000).toISOString()
            })));
          } else {
            resolve({ error: json.error || 'No data' });
          }
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    }).on('error', reject);
  });
}

async function getCompanyNews(symbol) {
  return new Promise((resolve, reject) => {
    const url = `https://finnhub.io/api/v1/news?symbol=${symbol.toUpperCase()}&token=${FINNHUB_API_KEY}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            resolve(json.slice(0, 5).map(item => ({
              headline: item.headline,
              source: item.source,
              url: item.url,
              datetime: new Date(item.datetime * 1000).toISOString()
            })));
          } else {
            resolve({ error: json.error || 'No data' });
          }
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    }).on('error', reject);
  });
}

const args = process.argv.slice(2);
const symbol = args[0];

if (symbol) {
  getCompanyNews(symbol).then(r => console.log(JSON.stringify(r, null, 2)));
} else {
  getMarketNews().then(r => console.log(JSON.stringify(r, null, 2)));
}