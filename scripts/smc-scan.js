#!/usr/bin/env node
// SMC Scanner v9 - Volume-First Detection
// Rebuild May 8, 2026: Volume + Price Action as gatekeeper

// BROAD UNIVERSE: Common US stocks (~200)
const universe = [
  // Tech
  'AAPL','MSFT','GOOGL','AMZN','META','NVDA','AMD','INTC','MU','AVGO','AMAT','LRCX','KLAC','TSM','QCOM','TXN','NXPI','MRVL','ON','MRAM','ARM','SNPS','CDNS','ANSS','KEYS','GLW','COHR','LITE','FLEX','IPG',
  // Consumer/Retail
  'TSLA','AMZN','WMT','HD','COST','TGT','LOW','DLTR','BBY','ROST','TJX','GPS','URBN','ANF','EXPR','JWN','KSS','M','BBWI',
  // Auto
  'F','GM','RIVN','LCID','WORK',
  // Finance
  'JPM','BAC','WFC','C','GS','MS','BLK','SCHW','COF','USB','PNC','TFC','COF','AXP','DFS','SYF','MET','PRU','AFL','TRV','CME','ICE',
  // Healthcare
  'JNJ','UNH','PFE','MRK','ABBV','LLY','BMY','AMGN','GILD','BIIB','MRNA','REGN','VRTX','ALGN','ISRG','MDT','SYK','BSX','ZTS','DHR','EW','ABT',
  // Energy
  'XOM','CVX','COP','SLB','EOG','PSX','VLO','MPC','OXY','HAL','DVN','FANG','PXD','MTDR',
  // Industrial
  'CAT','BA','HON','UNP','GE','MMM','DE','LLY','UPS','FDX','RTX','NOC','LMT','GD','ITW','ETN','EMR','PH','ROK','FTV','CMI','SWK','IDXX',
  // Crypto/AI/Tech plays
  'COIN','MARA','RIOT','HOOD','PLTR','SOUN','SMCI','ASTS','PATH','U','ESTC','SNOW','DDOG','CRWD','ZS','NET','MDB','OKTA','TWLO','SNAP','PINS','RBLX','U','MTCH','CHWY','W','POSH',
  // Communication
  'DIS','NFLX','CMCSA','T','VZ','TMUS','AMC','NWSA',
  // Real Estate/REITs
  'AMT','PLD','CCI','EQIX','PSA','O','SPG','KIM','VTR','AVB','EQR','WELL',
  // Materials
  'LIN','APD','ECL','SHW','NEM','FCX','AA','NUE','STLD','X',
  // Consumer Staples
  'KO','PEP','PG','PM','MO','STZ','KMB','GIS','K','HSY','MDLZ','KHC','MKC',
  // ETFs (major indices)
  'SPY','QQQ','IWM','DIA','VTI','VOO','VEA','VWO','BND','GLD',
];

// CATEGORY FILTERS
const filters = {
  ADR: ['NIO','LCID','XPEV','LI','BABA','TAL','EDU','IQ','CDLX','GOT','TM','HMC','SNP','ING','AXP','Mitsubishi','Sony','Softbank'],
  LEVERAGED: ['TNA','TZA','SQQQ','DUST','JNUG','JDST','NERD','SOXL','TECL','FNGU','UVXY','SVOL','SPXL','SPXS','TQQQ','SQQQ'],
  MEME: ['GME','AMC','BB','BBBY','WKHS','CLNE','CEI','ATER','KOSS','NAKD','SOFI','LC','RBLX','HOOD','PTON','COIN','MARA','RIOT'],
};

function passesFilters(sym) {
  if (filters.ADR.includes(sym)) return 'ADR';
  if (filters.LEVERAGED.includes(sym)) return 'Leveraged';
  if (filters.MEME.includes(sym)) return 'Meme';
  return null;
}

// VOLUME PATTERN CLASSIFICATION (Wyckoff Method)
// Returns: { pattern: 'V1'-'V7', description: string, bullish: boolean }
function classifyVolumePattern(prices, volumes) {
  if (prices.length < 20 || volumes.length < 20) {
    return { pattern: 'unknown', description: 'Insufficient data', bullish: false };
  }
  
  // Use last 20 days for trend
  const recentPrices = prices.slice(-20);
  const recentVols = volumes.slice(-20);
  
  // Calculate trends (simple linear regression slope)
  const priceTrend = calculateTrend(recentPrices);
  const volumeTrend = calculateTrend(recentVols);
  
  // Recent vs average volume
  const avgVol = recentVols.reduce((a,b) => a+b, 0) / 20;
  const lastVol = recentVols[recentVols.length - 1];
  const volRatio = lastVol / avgVol;
  
  // Classify based on price vs volume direction
  if (priceTrend > 0 && volumeTrend > 0) {
    // Price UP + Volume UP = Healthy Uptrend
    if (volRatio > 1.8) {
      return { pattern: 'V1', description: 'Strong uptrend (healthy)', bullish: true };
    } else if (volRatio > 1.2) {
      return { pattern: 'V1', description: 'Uptrend (confirmed)', bullish: true };
    } else {
      return { pattern: 'V1', description: 'Uptrend (low vol)', bullish: true };
    }
  } else if (priceTrend > 0 && volumeTrend < 0) {
    // Price UP + Volume DOWN = Weakness
    return { pattern: 'V2', description: 'Price up + vol down = WEAKNESS', bullish: false };
  } else if (priceTrend < 0 && volumeTrend < 0) {
    // Price DOWN + Volume DOWN = Bottom forming
    if (volRatio < 0.7) {
      return { pattern: 'V3', description: 'Bottom forming (selling exhausted)', bullish: true };
    } else {
      return { pattern: 'V3', description: 'Downtrend weakening', bullish: true };
    }
  } else if (priceTrend < 0 && volumeTrend > 0) {
    // Price DOWN + Volume UP = Accumulation (institutions buying)
    if (volRatio > 1.5) {
      return { pattern: 'V4', description: 'ACCUMULATION (smart money buying)', bullish: true };
    } else {
      return { pattern: 'V4', description: 'Potential accumulation', bullish: true };
    }
  } else if (volumeTrend > 0.5 && Math.abs(priceTrend) < 0.1) {
    // Volume spike with flat price = anomaly
    return { pattern: 'V5', description: 'Volume spike (anomaly)', bullish: null };
  } else if (priceTrend > 0 && volRatio > 2.0) {
    // Price up + huge volume spike = possible absorption
    return { pattern: 'V6', description: 'Absorption? (large vol spike)', bullish: false };
  }
  
  return { pattern: 'V7', description: 'Mixed/Unclear', bullish: null };
}

// Simple trend calculation (slope of linear fit)
function calculateTrend(values) {
  const n = values.length;
  const xSum = (n * (n - 1)) / 2;
  const ySum = values.reduce((a, b) => a + b, 0);
  const xySum = values.reduce((sum, y, x) => sum + x * y, 0);
  const xxSum = (n * (n - 1) * (2 * n - 1)) / 6;
  
  const slope = (n * xySum - xSum * ySum) / (n * xxSum - xSum * xSum);
  return slope; // Positive = up, negative = down
}

console.log('=== SMC Scanner v9 - Volume-First ===\n');
console.log('Volume + Price Action = Profit\n');
console.log('Scanning ' + universe.length + ' stocks...\n');

async function scan() {
  const results = [];
  const filtered = { ADR: 0, LEVERAGED: 0, Meme: 0, noSetup: 0 };
  const patternCounts = {};
  
  for (const sym of universe) {
    const filterReason = passesFilters(sym);
    if (filterReason) {
      filtered[filterReason]++;
      continue;
    }
    
    try {
      const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' + sym + '?interval=1d&range=2mo');
      const data = await res.json();
      const r = data.chart?.result?.[0];
      if (!r) continue;
      
      const price = r.meta.regularMarketPrice;
      const volume = r.meta.regularMarketVolume;
      const q = r.indicators.quote[0];
      
      const closes = q.close.filter(x => x !== null);
      const lows = q.low.filter(x => x !== null);
      const highs = q.high.filter(x => x !== null);
      const volumes = q.volume.filter(x => x);
      
      if (closes.length < 20) continue;
      
      // STEP 1: Volume Pattern Classification (GATEKEEPER)
      const volPattern = classifyVolumePattern(closes, volumes);
      
      // Track pattern counts
      patternCounts[volPattern.pattern] = (patternCounts[volPattern.pattern] || 0) + 1;
      
      // SKIP non-bullish patterns
      if (!volPattern.bullish) continue;
      
      // STEP 2: Calculate bounce from 52W low
      const yearLow = Math.min(...lows);
      const yearHigh = Math.max(...highs);
      const trueBouncePct = ((price - yearLow) / yearLow) * 100;
      
      // STEP 3: Early stage filter (2-15% bounce)
      if (trueBouncePct < 2 || trueBouncePct > 15) continue;
      
      // STEP 4: In lower half of range
      const swingLow = Math.min(...lows.slice(-20));
      const swingHigh = Math.max(...highs.slice(-20));
      const rangePct = (price - swingLow) / (swingHigh - swingLow);
      if (rangePct > 0.55) continue;
      
      results.push({
        sym,
        price: price.toFixed(2),
        bounce: trueBouncePct.toFixed(1) + '%',
        pattern: volPattern.pattern,
        patternDesc: volPattern.description
      });
    } catch(e) {
      filtered.noSetup++;
    }
  }
  
  // Sort by earliest stage (closest to 3% bounce)
  results.sort((a, b) => parseFloat(a.bounce) - parseFloat(b.bounce));
  
  console.log('--- VOLUME-FIRST CANDIDATES ---\n');
  if (results.length === 0) {
    console.log('(none found - try scanning with relaxed bounce limits)\n');
  } else {
    console.log('Found ' + results.length + ' bullish setups:\n');
    for (const r of results.slice(0,8)) {
      console.log(r.sym + ': $' + r.price + ' | bounce +' + r.bounce + ' | ' + r.pattern + ' - ' + r.patternDesc);
    }
  }
  
  console.log('\n--- Pattern Distribution ---');
  for (const [pat, count] of Object.entries(patternCounts)) {
    console.log(pat + ': ' + count);
  }
  
  console.log('\n--- Filtered: ' + Object.values(filtered).reduce((a,b) => a+b, 0) + ' stocks ---');
  console.log('ADR: ' + filtered.ADR + ' | Leveraged: ' + filtered.LEVERAGED + ' | Meme: ' + filtered.Meme);
  
  if (results.length > 0) {
    console.log('\n💡 Best setup: ' + results[0].sym + ' (' + results[0].pattern + ')');
  }
}

scan();