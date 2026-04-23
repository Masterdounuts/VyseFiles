#!/bin/bash
# Quick stock scraper using web_fetch via Node
SYMBOL="${1:-GGB}"
NODE_SCRIPT='
const https = require("https");
const symbol = process.argv[1].toUpperCase();
const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1h`;
https.get(url, {headers: {"User-Agent": "Mozilla/5.0"}}, (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      const result = json.chart.result[0];
      const meta = result.meta;
      const price = meta.regularMarketPrice;
      const change = meta.regularMarketChangePercent;
      console.log(JSON.stringify({symbol, price, change: change?.toFixed(2)}));
    } catch(e) {
      console.log(JSON.stringify({error: e.message}));
    }
  });
}).on("error", e => console.log(JSON.stringify({error: e.message})));
'
node -e "$NODE_SCRIPT" "$SYMBOL"
'