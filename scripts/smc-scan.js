#!/usr/bin/env node
// SMC Scanner v6 - Categorized by setup status

const candidates = [
  'AAPL','GOOGL','TSLA','MSFT','AMZN','META','NVDA','AMD','INTC','MU','AVGO',
  'MARA','RIOT','MSTR','COIN','SQ','HOOD','GME','AMC','SOL','WIF','PEPE','PLTR','SOUN','SMCI','ASTS',
  'RIVN','LCID','NIO','XPEV','LI','F','GM','TM','HMC','Nissan',
  'SNAP','PINS','TWTR','DIS','PARA','WBD','NWSA',
  'AMD','INTC','NVDA','MU','AMAT','LRCX','KLAC',
  'TNA','TZA','SQQQ','DUST','JNUG','JDST','NERD','SOXL','TECL','FNGU'
];

// Categorized setups
const setups = {
  ENTRY_READY: [],           // Valid setup, CHOCH happened, in pullback zone
  WAITING_PULLBACK: ['NIO'], // Waiting for CHOCH or pullback
  NO_SETUP: ['MSTR'],        // Ruled out - explain why
  MISSED: [],                // Price ran up too far
};

// FILTER: Stocks explicitly excluded from recommendations
const excluded = {
  'RIVN': 'Bad news: loan cut, tornado damage at factory, R2 pricing disappointment',
  'NIO': 'ADR (China) - currency/delisting risk, violates ADR rule',
  'LCID': 'ADR (Saudi) - violates ADR rule',
  'XPEV': 'ADR (China) - violates ADR rule',
  'LI': 'ADR (China) - violates ADR rule',
  'GME': 'Meme stock - unpredictable, no catalyst',
  'AMC': 'Meme stock - unpredictable, no catalyst',
  'TNA': 'Leveraged ETF - loses value over time',
  'TZA': 'Inverse ETF - loses value over time',
  'SQQQ': 'Inverse ETF - loses value over time',
  'DUST': 'Inverse ETF - loses value over time',
  'JNUG': 'Leveraged ETF - loses value over time',
  'SOXL': 'Leveraged ETF - loses value over time',
};

console.log('=== SMC Scanner v6 ===\n');
console.log('Status categories: ENTRY READY → WAITING → MISSED → NO SETUP\n');

// Show EXCLUDED first
console.log('--- EXCLUDED (not suitable) ---');
for (const [s, reason] of Object.entries(excluded)) {
  console.log(s + ': ' + reason);
}

// Show categorized
console.log('\n--- ENTRY READY (valid setup, in pullback zone) ---');
if (setups.ENTRY_READY.length === 0) console.log('(none)');
for (const s of setups.ENTRY_READY) console.log(s + ': Entry ~$14.61 | SL ~$14.04 | TP $16.52');

console.log('\n--- WAITING FOR CHOCH (need break above prior high) ---');
for (const s of setups.WAITING_PULLBACK) {
  if (s === 'ASTS') console.log('ASTS: Liquidity $63.13 → CHOCH $77 → waiting for break');
  else if (s === 'NIO') console.log('NIO: Liquidity $5.68 → CHOCH $6.69 → waiting for break');
  else console.log(s + ': setup valid, waiting');
}

console.log('\n--- NO SETUP (ruled out) ---');
for (const s of setups.NO_SETUP) console.log(s + ': Already ran up / no clear FVG');

console.log('\n--- MISSED (price too high) ---');
for (const s of setups.MISSED) console.log(s + ': Price too far from liquidity');

console.log('\n=== New Candidates (scan these) ===');

// Scan for new candidates
async function scan() {
  const results = [];
  
  // Skip all categorized + excluded
  const skip = [...setups.ENTRY_READY, ...setups.WAITING_PULLBACK, ...setups.NO_SETUP, ...setups.MISSED, ...Object.keys(excluded)];
  
  for (const sym of candidates) {
    if (skip.includes(sym)) continue;
    
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
      
      // Budget filter: must fit our buying power (~$6)
      if (price > 6.50) continue;
      
      // EARLY STAGE: Just hit liquidity (0-5% bounce only)
      if (bouncePct > 5) continue;
      
      // Also require very close to swing low
      if (rangePct > 20) continue;
      
      if (rangePct < 0.25 && bouncePct < 15 && volRatio > 0.8) {
        results.push({
          sym,
          price: price.toFixed(2),
          swingLow: swingLow.toFixed(2),
          swingHigh: swingHigh.toFixed(2),
          rangePct: (rangePct * 100).toFixed(0) + '%',
          bounce: '+' + bouncePct.toFixed(1) + '%',
          vol: volRatio.toFixed(1) + 'x'
        });
      }
    } catch(e) {}
  }
  
  results.sort((a, b) => parseFloat(a.bounce) - parseFloat(b.bounce));
  
  if (results.length === 0) {
    console.log('No new candidates found.');
  } else {
    for (const r of results) {
      console.log(r.sym + ': $' + r.price + ' | range ' + r.swingLow + '-' + r.swingHigh + ' | ' + r.rangePct + ' | ' + r.bounce);
    }
    console.log('\n💡 Show charts for: ' + results.slice(0,3).map(r => r.sym).join(', '));
  }
}

scan();