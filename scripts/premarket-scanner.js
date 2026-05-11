#!/usr/bin/env node
// PRE-MARKET SCANNER v5 - With 52-Week Range Filter
// Filters out stocks above 80% of 52-week range

const https = require('https');
const fs = require('fs');
const path = require('path');

const PREDICTION_LOG = path.join(__dirname, '..', 'memory', 'daily', 'predictions-' + new Date().toISOString().slice(0,10) + '.json');
const MAX_52WEEK_POS = 80; // Never buy above 80% of 52-week range

const universe = ['AAPL','MSFT','GOOGL','AMZN','META','NVDA','AMD','INTC','MU','AVGO','QCOM','TXN','NXPI','MRVL','ARM','PLTR','COIN','MARA','RIOT','HOOD','SOFI','BBAI','UPST','QS','RIVN','LCID','SMCI','SNOW','DDOG','CRWD','ZS','NET','MDB','OKTA','TSLA','WMT','HD','COST','TGT','LOW','BBY','JPM','BAC','WFC','C','GS','MS','BLK','SCHW','JNJ','UNH','PFE','MRK','ABBV','LLY','XOM','CVX','COP','SLB','EOG','CAT','BA','HON','UNP','RTX','NOC','LMT','DIS','NFLX','LIN','APD','SHW','KO','PEP','PG','GME','AMC','SPY','QQQ'];

// Get 30-day data for patterns
async function getStockData(sym) {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=30d',{headers:{'User-Agent':'Mozilla/5.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const r=j.chart?.result?.[0];if(!r)return resolve(null);const c=r.indicators?.quote?.[0]?.close,h=r.indicators?.quote?.[0]?.high,l=r.indicators?.quote?.[0]?.low,v=r.indicators?.quote?.[0]?.volume;if(!c||!h||!l||!v)return resolve(null);resolve({symbol:sym,closes:c,highs:h,lows:l,volumes:v})}catch(e){resolve(null)}}) }).on('error',()=>resolve(null));
  });
}

// Get 52-week range position
async function get52WeekPos(sym) {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=1y',{headers:{'User-Agent':'Mozilla/5.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const h=j.chart?.result?.[0]?.indicators?.quote?.[0]?.high,l=j.chart?.result?.[0]?.indicators?.quote?.[0]?.low,c=j.chart?.result?.[0]?.indicators?.quote?.[0]?.close;if(!h||!l||!c)return resolve(null);const current=c[c.length-1],high52=Math.max(...h),low52=Math.min(...l.filter(x=>x));const pos=((current-low52)/(high52-low52))*100;resolve({symbol:sym,rangePos:pos,high52,low52,current})}catch(e){resolve(null)}}) }).on('error',()=>resolve(null));
  });
}

// Detect accumulation (smart money)
function detect(data) {
  const rc = data.closes.slice(-5);
  const rv = data.volumes.slice(-5);
  const pc = rc[4] - rc[0];
  const av = rv.slice(0,4).reduce((a,b) => a+b, 0) / 4;
  const vs = rv[4] > av * 1.3;
  const pd = pc < 0;
  if (pd && vs) return { type: 'ACCUMULATION', priceChange: (pc/rc[0]*100).toFixed(1), volSpike: (rv[4]/av).toFixed(1)+'x', score: 10 };
  const yearLow = Math.min(...data.lows.slice(-252));
  const rt = rv[4] < rv[0];
  const cp = data.closes[data.closes.length - 1];
  const rangePos = (cp - yearLow) / (Math.max(...data.highs.slice(-252)) - yearLow);
  if (pc < 0 && rt && rangePos < 0.3) return { type: 'V3_BOTTOM', priceChange: (pc/rc[0]*100).toFixed(1), volTrend: 'declining', score: 8 };
  return null;
}

// Detect CHOCH/breakout
function detectChoch(data) {
  const rh = Math.max(...data.highs.slice(-10));
  const cp = data.closes[data.closes.length - 1];
  const dist = ((rh - cp) / cp * 100);
  if (dist < 3 && dist > 0) return { type: 'CHOCH_READY', breakoutAt: rh.toFixed(2), distance: dist.toFixed(1)+'%', score: 9 };
  if (cp > rh) return { type: 'BREAKOUT', breakoutAt: rh.toFixed(2), distance: '0%', score: 7 };
  return null;
}

async function scan() {
  console.log('PRE-MARKET SCANNER v5 ' + new Date().toISOString().slice(0,10));
  console.log('============================================');
  console.log('🔍 Filter: 52W range position < ' + MAX_52WEEK_POS + '%\n');
  
  const acc = [], choch = [], movers = [];
  const week52Data = {};
  
  // First: get 52-week positions for ALL stocks
  console.log('Checking 52-week range positions...');
  for (let i = 0; i < universe.length; i += 20) {
    const batch = universe.slice(i, i + 20);
    const results = await Promise.all(batch.map(get52WeekPos));
    for (const r of results) {
      if (r) week52Data[r.symbol] = r;
    }
    process.stdout.write('.');
  }
  console.log(' done.\n');
  
  // Now scan for patterns
  console.log('Scanning ' + universe.length + ' stocks for patterns...');
  for (let i = 0; i < universe.length; i += 20) {
    const batch = universe.slice(i, i + 20);
    const results = await Promise.all(batch.map(getStockData));
    for (const d of results) {
      if (!d) continue;
      const w52 = week52Data[d.symbol];
      const rangePos = w52 ? w52.rangePos : 50;
      
      const a = detect(d);
      if (a && rangePos < MAX_52WEEK_POS) acc.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], rangePos, ...a });
      
      const c = detectChoch(d);
      if (c && rangePos < MAX_52WEEK_POS) choch.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], rangePos, ...c });
      
      const tc = (d.closes.slice(-1)[0] - d.closes.slice(-2)[0]) / d.closes.slice(-2)[0] * 100;
      if (Math.abs(tc) > 3) movers.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], change: tc.toFixed(1), rangePos });
    }
    process.stdout.write('.');
  }
  console.log('');
  
  // Sort and display
  acc.sort((a, b) => b.score - a.score);
  choch.sort((a, b) => b.score - a.score);
  movers.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  
  console.log('\n=== 🚫 AVOID (52W > 80%) ===');
  const avoid = movers.filter(m => m.rangePos >= MAX_52WEEK_POS).slice(0, 5);
  if (avoid.length > 0) {
    avoid.forEach(x => console.log(`❌ ${x.symbol}: ${x.rangePos.toFixed(0)}% of 52W range`));
  } else {
    console.log('None - all candidates safe!');
  }
  
  console.log('\n=== ✅ SAFE MOVERS (< 80% of 52W) ===');
  const safeMovers = movers.filter(m => m.rangePos < MAX_52WEEK_POS).slice(0, 5);
  safeMovers.forEach((x, i) => console.log((i+1) + '. ' + x.symbol + ' $' + x.price.toFixed(2) + ' ' + (parseFloat(x.change) > 0 ? '📈' : '📉') + ' ' + x.change + '%' + ' [' + x.rangePos.toFixed(0) + '% 52W]'));
  
  console.log('\n=== ACCUMULATION (Safe) ===');
  const safeAcc = acc.slice(0, 3);
  safeAcc.forEach((x, i) => console.log((i+1) + '. ' + x.symbol + ' $' + x.price.toFixed(2) + ' | ' + x.type + ' | ' + x.priceChange + '% | [' + x.rangePos.toFixed(0) + '% 52W]'));
  
  console.log('\n=== CHOCH READY (Safe) ===');
  const safeChoch = choch.slice(0, 3);
  safeChoch.forEach((x, i) => console.log((i+1) + '. ' + x.symbol + ' $' + x.price.toFixed(2) + ' | Break $' + x.breakoutAt + ' | ' + x.distance + ' | [' + x.rangePos.toFixed(0) + '% 52W]'));
  
  // Save prediction
  const prediction = {
    date: new Date().toISOString().slice(0,10),
    timestamp: new Date().toISOString(),
    topMovers: safeMovers.map(m => ({symbol: m.symbol, change: m.change, price: m.price, rangePos: m.rangePos})),
    chochReady: safeChoch.map(c => ({symbol: c.symbol, distance: c.distance, price: c.price, rangePos: c.rangePos})),
    avoid: avoid.map(a => ({symbol: a.symbol, rangePos: a.rangePos}))
  };
  
  const memDir = path.join(__dirname, '..', 'memory', 'daily');
  if (!fs.existsSync(memDir)) fs.mkdirSync(memDir, {recursive:true});
  fs.writeFileSync(PREDICTION_LOG, JSON.stringify(prediction, null, 2));
  console.log('\n💾 Predictions saved');
  
  console.log('============================================');
}

scan().catch(console.error);