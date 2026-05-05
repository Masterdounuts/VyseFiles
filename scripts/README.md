# Trading Scripts

*Finnhub + Yahoo Finance powered scripts for daily trading*

---

## Quick Reference

| Script | What It Does | Usage |
|--------|--------------|-------|
| `get-stock-price.js` | Price + 52W data (Yahoo) | `node get-stock-price.js NVDA` |
| `get-stock-news.js` | Breaking news (Finnhub) | `node get-stock-news.js` |
| `expand-finnhub.js` | Quotes, profiles (Finnhub) | See commands below |

---

## get-stock-price.js

**What:** Fetches stock prices from Yahoo Finance (no API key needed)

**Usage:**
```bash
node get-stock-price.js NVDA WGS DOGE
```

**Returns:**
```json
{
  "symbol": "NVDA",
  "price": "196.50",
  "change": "-1.00",
  "prevClose": "198.48",
  "volume": "105,072,736",
  "high52": "216.83",
  "low52": "110.82"
}
```

---

## get-stock-news.js

**What:** Fetches breaking market news from Finnhub

**Usage:**
```bash
# Market news
node get-stock-news.js

# Company-specific news
node get-stock-news.js NVDA
```

**Returns:**
```json
[
  {
    "headline": "Nasdaq hits record as AI chip stocks surge",
    "source": "Reuters",
    "url": "https://...",
    "datetime": "2026-05-05T18:31:38.000Z"
  }
]
```

---

## expand-finnhub.js

**What:** Extended Finnhub API for quotes, profiles, market status

**Commands:**

### Quote (Real-time price)
```bash
node expand-finnhub.js quote NVDA
```
Returns: current price, high, low, open, prevClose, change %

### Company Profile
```bash
node expand-finnhub.js profile NVDA
```
Returns: name, exchange, industry, market cap, shares, weburl

### Market Status
```bash
node expand-finnhub.js status
```
Returns: isOpen, session, market

---

## Workflow Examples

### Morning Check
```bash
node get-stock-news.js
node get-stock-price.js NVDA WGS
```

### Research a Stock
```bash
node expand-finnhub.js quote NVDA
node expand-finnhub.js profile NVDA
node get-stock-price.js NVDA
```

### Full Analysis
```bash
# 1. Find news
node get-stock-news.js

# 2. Check specific stock
node expand-finnhub.js quote NVDA
node expand-finnhub.js profile NVDA
node get-stock-price.js NVDA
```

---

## Environment

API keys loaded from `.env`:
- `FINNHUB_API_KEY` - For news and quotes

---

*Scripts are timezone-aware: times in PT (David's timezone)*