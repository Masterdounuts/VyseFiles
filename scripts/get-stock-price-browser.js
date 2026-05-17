#!/usr/bin/env node
/**
 * Stock price fetcher - Uses OpenClaw BROWSER tool
 * Per USER.md: "Browser = Stock DATA and PRICES"
 * 
 * This script returns instructions for using browser tool
 * to get stock prices. Run via browser tool, not exec.
 * 
 * Usage: 
 *   browser(action=open, targetUrl="https://www.google.com/finance/quote/SYMBOL:EXCHANGE")
 *   then snapshot to get price data
 */

console.log(`
=== BROWSER PRICE FETCH ===

Use OpenClaw browser tool to get stock prices:

1. Navigate to Google Finance:
   browser(action=navigate, targetUrl="https://www.google.com/finance/quote/AMC:NYSE")

2. Get snapshot:
   browser(action=snapshot, targetId="t1", compact=true)

3. Parse from output - look for:
   - text: "$1.28 -4.48%"
   - text: "52-wk high $4.08"
   - text: "52-wk low $0.93"

URL pattern: https://www.google.com/finance/quote/SYMBOL:EXCHANGE
- NYSE: :NYSE suffix
- NASDAQ: :NASDAQ suffix
- Crypto: :CURRENCY suffix (e.g., BTC-USD)

Example symbols:
- AMC: https://www.google.com/finance/quote/AMC:NYSE
- GME: https://www.google.com/finance/quote/GME:NYSE  
- NVDA: https://www.google.com/finance/quote/NVDA:NASDAQ
- BTC: https://www.google.com/finance/quote/BTC-USD
`);