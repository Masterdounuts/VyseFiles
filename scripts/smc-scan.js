#!/usr/bin/env node
// SMC Scanner v8 - Early bounce detection, broad universe

// BROAD UNIVERSE: Common US stocks (~200)
// Mix of big tech, mid caps, small caps, sectors
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

console.log('=== SMC Scanner v8 ===\n');
console.log('Scanning ' + universe.length + ' stocks...\n');

async function scan() {
  const results = [];
  const filtered = { ADR: 0, LEVERAGED: 0, Meme: 0, expensive: 0, noSetup: 0 };
  
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
      
      const lows = q.low.filter(x => x !== null);
      const highs = q.high.filter(x => x !== null);
      const volumes = q.volume.filter(x => x);
      
      // 1-month lookback (20 trading days)
      const recentLows = lows.slice(-20);
      const recentHighs = highs.slice(-20);
      const recentVols = volumes.slice(-20);
      const swingLow = Math.min(...recentLows);
      const swingHigh = Math.max(...recentHighs);
      
      // ALSO calculate TRUE 52W (1 year) for bounce check
      const yearLow = Math.min(...lows);
      const yearHigh = Math.max(...highs);
      const trueBouncePct = ((price - yearLow) / yearLow) * 100;
      
      // USE TRUE 52W BOUNCE for filtering (not 20-day swing)
      const avgVolume = recentVols.reduce((a,b) => a+b, 0) / 20;
      
      const rangePct = (price - swingLow) / (swingHigh - swingLow);
      const volRatio = volume / avgVolume;
      const bouncePct = ((price - swingLow) / swingLow) * 100;
      
      // EARLY STAGE FILTERS
      // NO PRICE LIMIT - fractional shares available on Robinhood
      // if (price > 40) { filtered.expensive++; continue; }
      
      // 2. EARLY STAGE: 2-15% bounce from TRUE 52W low (not recent swing)
      if (trueBouncePct < 2 || trueBouncePct > 15) continue;
      
      // 3. In lower half of range (not extended)
      if (rangePct > 0.55) continue;
      
      // 4. Volume confirming the move
      if (volRatio < 0.6) continue;
      
      results.push({
        sym,
        price: price.toFixed(2),
        rangePct: (rangePct * 100).toFixed(0) + '%',
        bounce: trueBouncePct.toFixed(1) + '%',
        vol: volRatio.toFixed(1) + 'x'
      });
    } catch(e) {
      filtered.noSetup++;
    }
  }
  
  // Sort by EARLIEST stage (closest to 3% bounce)
  results.sort((a, b) => parseFloat(a.bounce) - parseFloat(b.bounce));
  
  console.log('--- EARLY STAGE CANDIDATES (3-12% bounce + volume) ---');
  if (results.length === 0) {
    console.log('(none found)');
  } else {
    console.log('Found ' + results.length + ' candidates:\n');
    for (const r of results.slice(0,8)) {
      console.log(r.sym + ': $' + r.price + ' | range ' + r.rangePct + ' | bounce +' + r.bounce + ' | vol ' + r.vol);
    }
  }
  
  console.log('\n--- Filtered: ' + Object.values(filtered).reduce((a,b) => a+b, 0) + ' stocks ---');
  console.log('Expensive (>30): ' + filtered.expensive);
  console.log('ADR: ' + filtered.ADR + ' | Leveraged: ' + filtered.LEVERAGED + ' | Meme: ' + filtered.Meme);
  
  if (results.length > 0) {
    console.log('\n💡 Show chart: ' + results[0].sym);
  }
}

scan();