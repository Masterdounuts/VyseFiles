#!/usr/bin/env node
// INTRADAY SCANNER - ACCUMULATION FIRST
// Core Strategy: Same-day entry, same-day exit with volume UP = smart money buying

const https = require('https');
const fs = require('fs');
const path = require('path');

const PREDICTION_LOG = path.join(__dirname, '..', 'memory', 'daily', 'predictions-' + new Date().toISOString().slice(0,10) + '.json');
const MAX_52WEEK_POS = 80;

const universe = ['AAPL','MSFT','GOOGL','AMZN','META','NVDA','AMD','INTC','MU','AVGO','QCOM','TXN','NXPI','MRVL','ARM','PLTR','COIN','MARA','RIOT','HOOD','SOFI','BBAI','UPST','QS','RIVN','LCID','SMCI','SNOW','DDOG','CRWD','ZS','NET','MDB','OKTA','TSLA','WMT','HD','COST','TGT','LOW','BBY','JPM','BAC','WFC','C','GS','MS','BLK','SCHW','JNJ','UNH','PFE','MRK','ABBV','LLY','XOM','CVX','COP','SLB','EOG','CAT','BA','HON','UNP','RTX','NOC','LMT','DIS','NFLX','LIN','APD','SHW','KO','PEP','PG','GME','AMC','SPY','QQQ'];

async function getStockData(sym) {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=30d',{headers:{'User-Agent':'Mozilla/5.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const r=j.chart?.result?.[0];if(!r)return resolve(null);const c=r.indicators?.quote?.[0]?.close,h=r.indicators?.quote?.[0]?.high,l=r.indicators?.quote?.[0]?.low,v=r.indicators?.quote?.[0]?.volume;if(!c||!h||!l||!v)return resolve(null);resolve({symbol:sym,closes:c,highs:h,lows:l,volumes:v})}catch(e){resolve(null)}}) }).on('error',()=>resolve(null));
  });
}

async function get52WeekPos(sym) {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=1y',{headers:{'User-Agent':'Mozilla/5.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const h=j.chart?.result?.[0]?.indicators?.quote?.[0]?.high,l=j.chart?.result?.[0]?.indicators?.quote?.[0]?.low,c=j.chart?.result?.[0]?.indicators?.quote?.[0]?.close;if(!h||!l||!c)return resolve(null);const current=c[c.length-1],high52=Math.max(...h),low52=Math.min(...l.filter(x=>x));const pos=((current-low52)/(high52-low52))*100;resolve({symbol:sym,rangePos:pos,high52,low52,current})}catch(e){resolve(null)}}) }).on('error',()=>resolve(null));
  });
}

// DETECT ACCUMULATION - Core Strategy!
function detectAccumulation(data) {
  const closes = data.closes.slice(-10);
  const volumes = data.volumes.slice(-10);
  
  // Is price trending DOWN?
  const priceChange = closes[closes.length-1] - closes[0];
  const priceDown = priceChange < 0;
  const pctDown = (priceChange / closes[0] * 100);
  
  // Is volume UP during this period?
  const avgVolEarly = volumes.slice(0,5).reduce((a,b)=>a+b,0)/5;
  const avgVolLate = volumes.slice(5,10).reduce((a,b)=>a+b,0)/5;
  const volIncreasing = avgVolLate > avgVolEarly * 1.2; // 20%+ volume increase
  
  // Near 52-week low?
  const yearLow = Math.min(...data.lows.slice(-252));
  const yearHigh = Math.max(...data.highs.slice(-252));
  const current = closes[closes.length-1];
  const rangePos = (current - yearLow) / (yearHigh - yearLow);
  const nearLow = rangePos < 0.40; // Bottom 40% of range
  
  // ACCUMULATION = Price DOWN + Volume UP + Near Low
  if (priceDown && volIncreasing && nearLow) {
    return { 
      type: 'ACCUMULATION', 
      priceDown: pctDown.toFixed(1), 
      volIncrease: (avgVolLate/avgVolEarly).toFixed(1)+'x',
      rangePos: (rangePos*100).toFixed(0),
      score: 10 
    };
  }
  
  // V3 BOTTOM = Price down significantly, volume declining (smart money hiding)
  if (priceDown && pctDown < -10 && rangePos < 0.25) {
    return { type: 'V3_BOTTOM', priceDown: pctDown.toFixed(1), rangePos: (rangePos*100).toFixed(0), score: 8 };
  }
  
  return null;
}

// Detect momentum (for secondary)
function detectMomentum(data) {
  const closes = data.closes.slice(-5);
  const tc = (closes[4] - closes[0]) / closes[0] * 100;
  if (Math.abs(tc) > 3) return { change: tc.toFixed(1) };
  return null;
}

async function scan() {
  console.log('INTRADAY SCANNER - ACCUMULATION FIRST');
  console.log('============================================');
  console.log('🎯 Strategy: Same-day entry, same-day exit with volume UP = smart money buying\n');
  
  const acc = [], movers = [];
  const week52Data = {};
  
  // Get 52-week data
  console.log('Checking 52-week ranges...');
  for (let i = 0; i < universe.length; i += 20) {
    const batch = universe.slice(i, i + 20);
    const results = await Promise.all(batch.map(get52WeekPos));
    for (const r of results) if (r) week52Data[r.symbol] = r;
    process.stdout.write('.');
  }
  console.log(' done.\n');
  
  // Scan for accumulation
  console.log('Scanning for accumulation...');
  for (let i = 0; i < universe.length; i += 20) {
    const batch = universe.slice(i, i + 20);
    const results = await Promise.all(batch.map(getStockData));
    for (const d of results) {
      if (!d) continue;
      const w52 = week52Data[d.symbol];
      const rangePos = w52 ? w52.rangePos : 50;
      if (rangePos >= MAX_52WEEK_POS) continue; // Skip stocks at top
      
      const a = detectAccumulation(d);
      if (a) acc.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], rangePos, ...a });
      
      const m = detectMomentum(d);
      if (m && Math.abs(m.change) > 3) movers.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], change: m.change, rangePos });
    }
    process.stdout.write('.');
  }
  console.log('');
  
  // Sort accumulation by score (strongest first)
  acc.sort((a, b) => b.score - a.score);
  movers.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  
  console.log('\n🎯 === ACCUMULATION (PRIMARY - SMART MONEY BUYING) ===');
  if (acc.length === 0) {
    console.log('No accumulation signals found today');
  } else {
    acc.slice(0, 8).forEach((x, i) => {
      const arrow = parseFloat(x.priceDown) < 0 ? '📉' : '📈';
      console.log(`${i+1}. ${x.symbol} $${x.price.toFixed(2)} | Price ${arrow} ${x.priceDown}% | Vol ${x.volIncrease || 'N/A'} | 52W: ${x.rangePos}% | ${x.type}`);
    });
  }
  
  console.log('\n📈 === MOMENTUM (SECONDARY) ===');
  const safeMovers = movers.filter(m => m.rangePos < MAX_52WEEK_POS).slice(0, 5);
  safeMovers.forEach((x, i) => {
    console.log(`${i+1}. ${x.symbol} $${x.price.toFixed(2)} ${parseFloat(x.change) > 0 ? '📈' : '📉'} ${x.change}% [${x.rangePos}% 52W]`);
  });
  
  console.log('\n❌ === AVOID (52W > 80%) ===');
  const avoid = movers.filter(m => m.rangePos >= MAX_52WEEK_POS).slice(0, 5);
  avoid.forEach(x => console.log(`❌ ${x.symbol}: ${x.rangePos.toFixed(0)}% of 52W`));
  
  // Save for learning
  const prediction = {
    date: new Date().toISOString().slice(0,10),
    timestamp: new Date().toISOString(),
    accumulation: acc.slice(0, 5).map(a => ({symbol: a.symbol, price: a.price, type: a.type, priceDown: a.priceDown, rangePos: a.rangePos})),
    momentum: safeMovers.slice(0, 3).map(m => ({symbol: m.symbol, change: m.change, price: m.price, rangePos: m.rangePos})),
    avoid: avoid.map(a => ({symbol: a.symbol, rangePos: a.rangePos}))
  };
  
  const memDir = path.join(__dirname, '..', 'memory', 'daily');
  if (!fs.existsSync(memDir)) fs.mkdirSync(memDir, {recursive:true});
  fs.writeFileSync(PREDICTION_LOG, JSON.stringify(prediction, null, 2));
  console.log('\n💾 Predictions saved');
  
  console.log('============================================');
}

scan().catch(console.error);