#!/usr/bin/env node
// SMC Scanner v7 - Live market scan, dynamic filtering

// BROAD UNIVERSE: Scan all these, filter what passes
const universe = [
  // Tech
  'AAPL','MSFT','GOOGL','AMZN','META','NVDA','AMD','INTC','MU','AVGO','AMAT','LRCX','KLAC','TSM','QCOM','TXN','AVD','MXIM',
  // Consumer
  'TSLA','F','GM','TM','HMC','Nissan','PACCAR',
  // Finance
  'JPM','BAC','WFC','C','GS','MS','BLK','SCHW','COF','USB',
  // Healthcare
  'JNJ','UNH','PFE','MRK','ABBV','LLY','BMY','AMGN','GILD',
  // Energy
  'XOM','CVX','COP','SLB','EOG',
  // Industrial
  'CAT','BA','HON','UNP','GE','MMM',
  // Crypto/AI plays
  'COIN','MARA','RIOT','HOOD','PLTR','SOUN','SMCI','ASTS',
  // Other
  'WMT','HD','DIS','NFLX','KO','PEP','COST','TGT','LOW',
];

// CATEGORY FILTERS: Block by characteristics (dynamic)
const filters = {
  ADR: ['NIO','LCID','XPEV','LI','BABA','TAL','EDU','IQ','CDLX','GOT'],
  LEVERAGED: ['TNA','TZA','SQQQ','DUST','JNUG','JDST','NERD','SOXL','TECL','FNGU','UVXY','SVOL','SPXL','SPXS'],
  MEME: ['GME','AMC','BB','BBBY','WKHS','CLNE','CEI','ATER','KOSS','NAKD'],
};

// Check if stock passes category filters
function passesFilters(sym) {
  if (filters.ADR.includes(sym)) return 'ADR';
  if (filters.LEVERAGED.includes(sym)) return 'Leveraged ETF';
  if (filters.MEME.includes(sym)) return 'Meme';
  return null;
}

console.log('=== SMC Scanner v7 ===\n');
console.log('Scanning ' + universe.length + ' stocks from broad universe...\n');

async function scan() {
  const results = [];
  const filtered = { ADR: [], LEVERAGED: [], MEME: [], noSetup: [] };
  
  for (const sym of universe) {
    const reason = passesFilters(sym);
    if (reason) {
      filtered[reason].push(sym);
      continue;
    }
    
    try {
      const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' + sym + '?interval=1d&range=3mo');
      const data = await res.json();
      const r = data.chart?.result?.[0];
      if (!r) continue;
      
      const price = r.meta.regularMarketPrice;
      const volume = r.meta.regularMarketVolume;
      const q = r.indicators.quote[0];
      
      const lows = q.low.filter(x => x !== null);
      const highs = q.high.filter(x => x !== null);
      const volumes = q.volume.filter(x => x);
      
      // Use 20-day lookback
      const recentLows = lows.slice(-20);
      const recentHighs = highs.slice(-20);
      const recentVols = volumes.slice(-20);
      const swingLow = Math.min(...recentLows);
      const swingHigh = Math.max(...recentHighs);
      const avgVolume = recentVols.reduce((a,b) => a+b, 0) / 20;
      
      const rangePct = (price - swingLow) / (swingHigh - swingLow);
      const volRatio = volume / avgVolume;
      const bouncePct = ((price - swingLow) / swingLow) * 100;
      
      // FILTERS (adjusted for real market)
      if (price > 40) continue;                    // Fit buying power
      if (bouncePct > 15) continue;                // Early stage only
      if (rangePct > 0.50) continue;                // In lower half of range
      // Volume filter disabled - most stocks don't meet 0.5x threshold
      // if (volRatio < 0.3) continue;
      
      // Passed all filters!
      results.push({
        sym,
        price: price.toFixed(2),
        swingLow: swingLow.toFixed(2),
        swingHigh: swingHigh.toFixed(2),
        rangePct: (rangePct * 100).toFixed(0) + '%',
        bounce: '+' + bouncePct.toFixed(1) + '%',
        vol: volRatio.toFixed(1) + 'x'
      });
    } catch(e) {
      filtered.noSetup.push(sym);
    }
  }
  
  // Sort by earliest stage (lowest bounce %)
  results.sort((a, b) => parseFloat(a.bounce) - parseFloat(b.bounce));
  
  console.log('--- CANDIDATES (pass all filters) ---');
  if (results.length === 0) {
    console.log('(none found)');
  } else {
    for (const r of results.slice(0,5)) {
      console.log(r.sym + ': $' + r.price + ' | range ' + r.rangePct + ' | bounce ' + r.bounce + ' | vol ' + r.vol);
    }
  }
  
  // Show filtered counts
  const totalFiltered = filtered.ADR.length + filtered.LEVERAGED.length + filtered.MEME.length;
  console.log('\n--- Filtered: ' + totalFiltered + ' stocks ---');
  if (filtered.ADR.length) console.log('ADR: ' + filtered.ADR.slice(0,5).join(', ') + (filtered.ADR.length > 5 ? '...' : ''));
  if (filtered.LEVERAGED.length) console.log('Leveraged: ' + filtered.LEVERAGED.slice(0,3).join(', '));
  if (filtered.MEME.length) console.log('Meme: ' + filtered.MEME.join(', '));
  
  if (results.length > 0) {
    console.log('\n💡 Show chart: ' + results[0].sym);
  }
}

scan();