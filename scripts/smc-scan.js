#!/usr/bin/env node
// SMC Scanner v6 - Category-based filtering

// CANDIDATES: Only include stocks that pass our broad criteria
const candidates = [
  'AAPL','GOOGL','TSLA','MSFT','AMZN','META','NVDA','AMD','INTC','MU','AVGO',
  'MARA','RIOT','MSTR','COIN','SQ','HOOD','PLTR','SOUN','SMCI','ASTS',
  'F','GM','TM','HMC',
  'SNAP','PINS','DIS','PARA','WBD','NWSA',
  'AMD','INTC','NVDA','MU','AMAT','LRCX','KLAC',
];

// CATEGORY FILTERS: Block by characteristics, not individual stocks
const filters = {
  // ADRs - foreign stocks with currency/delisting risk
  ADR: ['NIO','LCID','XPEV','LI','BABA','TAL','EDU','IQ','CDLX','GOT'],
  // Leveraged/Inverse ETFs - lose value over time
  LEVERAGED: ['TNA','TZA','SQQQ','DUST','JNUG','JDST','NERD','SOXL','TECL','FNGU','UVXY','SVOL','SPXL','SPXS'],
  // Meme stocks - unpredictable
  MEME: ['GME','AMC','BB','BBBY','WKHS','CLNE','CEI','ATER','KOSS','NAKD'],
};

// Check if stock fails category filters
function passesFilters(sym) {
  if (filters.ADR.includes(sym)) return 'ADR (foreign stock - currency/delisting risk)';
  if (filters.LEVERAGED.includes(sym)) return 'Leveraged/Inverse ETF (decays over time)';
  if (filters.MEME.includes(sym)) return 'Meme stock (unpredictable, no fundamentals)';
  return null; // Passes all filters
}

// Manual setups (from chart analysis)
const setups = {
  ENTRY_READY: [],
  WAITING_PULLBACK: [],
  NO_SETUP: [],
  MISSED: [],
};

console.log('=== SMC Scanner v6 ===\n');
console.log('Filters: ADR, Leveraged ETF, Meme stocks auto-excluded\n');

// Show filters
console.log('--- Category Filters ---');
console.log('ADR: ' + filters.ADR.join(', '));
console.log('Leveraged: ' + filters.LEVERAGED.join(', '));
console.log('Meme: ' + filters.MEME.join(', '));

console.log('\n--- ENTRY READY ---');
if (setups.ENTRY_READY.length === 0) console.log('(none)');
for (const s of setups.ENTRY_READY) console.log(s + ': Valid setup');

console.log('\n--- WAITING ---');
if (setups.WAITING_PULLBACK.length === 0) console.log('(none)');
for (const s of setups.WAITING_PULLBACK) console.log(s + ': Waiting for pullback');

console.log('\n--- NO SETUP ---');
if (setups.NO_SETUP.length === 0) console.log('(none)');
for (const s of setups.NO_SETUP) console.log(s + ': No valid setup');

console.log('\n--- Auto-Scan Candidates ---');

// Scan for candidates
async function scan() {
  const results = [];
  const skipped = [];
  
  for (const sym of candidates) {
    // Check filters first
    const filterReason = passesFilters(sym);
    if (filterReason) {
      skipped.push({sym, reason: filterReason});
      continue;
    }
    
    try {
      const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/' + sym + '?interval=1d&range=1mo');
      const data = await res.json();
      const r = data.chart?.result?.[0];
      if (!r) continue;
      
      const price = r.meta.regularMarketPrice;
      const volume = r.meta.regularMarketVolume;
      const q = r.indicators.quote[0];
      
      const lows = q.low.filter(x => x !== null);
      const highs = q.high.filter(x => x !== null);
      const volumes = q.volume.filter(x => x);
      
      const recentLows = lows.slice(-10);
      const recentHighs = highs.slice(-10);
      const recentVols = volumes.slice(-10);
      const swingLow = Math.min(...recentLows);
      const swingHigh = Math.max(...recentHighs);
      const avgVolume = recentVols.reduce((a,b) => a+b, 0) / 10;
      
      const rangePct = (price - swingLow) / (swingHigh - swingLow);
      const volRatio = volume / avgVolume;
      const bouncePct = ((price - swingLow) / swingLow) * 100;
      
      // Budget filter: must fit our buying power
      if (price > 6.50) continue;
      
      // Early stage: 0-5% bounce only
      if (bouncePct > 5) continue;
      
      // Must be near swing low
      if (rangePct > 0.25) continue;
      
      if (rangePct < 0.25 && bouncePct < 15 && volRatio > 0.8) {
        results.push({
          sym,
          price: price.toFixed(2),
          swingLow: swingLow.toFixed(2),
          rangePct: (rangePct * 100).toFixed(0) + '%',
          bounce: '+' + bouncePct.toFixed(1) + '%',
          vol: volRatio.toFixed(1) + 'x'
        });
      }
    } catch(e) {}
  }
  
  results.sort((a, b) => parseFloat(a.bounce) - parseFloat(b.bounce));
  
  if (results.length === 0) {
    console.log('No candidates found (all filtered or no setups)');
  } else {
    console.log('Found ' + results.length + ' candidates:');
    for (const r of results) {
      console.log(r.sym + ': $' + r.price + ' | range ' + r.rangePct + ' | bounce ' + r.bounce + ' | vol ' + r.vol);
    }
    console.log('\n💡 Show charts for: ' + results.slice(0,3).map(r => r.sym).join(', '));
  }
  
  if (skipped.length > 0) {
    console.log('\n--- Filtered (by category) ---');
    for (const s of skipped) {
      console.log(s.sym + ': ' + s.reason);
    }
  }
}

scan();