#!/usr/bin/env node
const https = require('https');
const universe = ['AAPL','MSFT','GOOGL','AMZN','META','NVDA','AMD','INTC','MU','AVGO','QCOM','TXN','NXPI','MRVL','ARM','PLTR','COIN','MARA','RIOT','HOOD','SOFI','BBAI','UPST','QS','RIVN','LCID','SMCI','SNOW','DDOG','CRWD','ZS','NET','MDB','OKTA','TSLA','WMT','HD','COST','TGT','LOW','BBY','JPM','BAC','WFC','C','GS','MS','BLK','SCHW','JNJ','UNH','PFE','MRK','ABBV','LLY','XOM','CVX','COP','SLB','EOG','CAT','BA','HON','UNP','RTX','NOC','LMT','DIS','NFLX','LIN','APD','SHW','KO','PEP','PG','GME','AMC','SPY','QQQ'];
async function getStockData(sym) {
  return new Promise((resolve) => {
    https.get('https://query1.finance.yahoo.com/v8/finance/chart/'+sym+'?interval=1d&range=30d',{headers:{'User-Agent':'Mozilla/5.0'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{const j=JSON.parse(d);const r=j.chart?.result?.[0];if(!r)return resolve(null);const c=r.indicators?.quote?.[0]?.close,h=r.indicators?.quote?.[0]?.high,l=r.indicators?.quote?.[0]?.low,v=r.indicators?.quote?.[0]?.volume;if(!c||!h||!l||!v)return resolve(null);resolve({symbol:sym,closes:c,highs:h,lows:l,volumes:v})}catch(e){resolve(null)}}) }).on('error',()=>resolve(null));
  });
}
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
function detectChoch(data) {
  const rh = Math.max(...data.highs.slice(-10));
  const cp = data.closes[data.closes.length - 1];
  const dist = ((rh - cp) / cp * 100);
  if (dist < 3 && dist > 0) return { type: 'CHOCH_READY', breakoutAt: rh.toFixed(2), distance: dist.toFixed(1)+'%', score: 9 };
  if (cp > rh) return { type: 'BREAKOUT', breakoutAt: rh.toFixed(2), distance: '0%', score: 7 };
  return null;
}
async function scan() {
  console.log('PRE-MARKET SCANNER ' + new Date().toISOString().slice(0,10));
  console.log('============================================');
  const acc = [], choch = [], movers = [];
  console.log('Scanning ' + universe.length + ' stocks...');
  for (let i = 0; i < universe.length; i += 20) {
    const batch = universe.slice(i, i + 20);
    const results = await Promise.all(batch.map(getStockData));
    for (const d of results) {
      if (!d) continue;
      const a = detect(d);
      if (a) acc.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], ...a });
      const c = detectChoch(d);
      if (c) choch.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], ...c });
      const tc = (d.closes.slice(-1)[0] - d.closes.slice(-2)[0]) / d.closes.slice(-2)[0] * 100;
      if (Math.abs(tc) > 3) movers.push({ symbol: d.symbol, price: d.closes.slice(-1)[0], change: tc.toFixed(1) });
    }
    process.stdout.write('.');
  }
  console.log('');
  acc.sort((a, b) => b.score - a.score);
  choch.sort((a, b) => b.score - a.score);
  movers.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  console.log('\n=== ACCUMULATION (Smart Money) ===');
  acc.slice(0, 5).forEach((x, i) => console.log((i+1) + '. ' + x.symbol + ' $' + x.price.toFixed(2) + ' | ' + x.type + ' | ' + x.priceChange + '% price | ' + (x.volSpike || x.volTrend)));
  console.log('\n=== CHOCH READY (Breakout Soon) ===');
  choch.slice(0, 5).forEach((x, i) => console.log((i+1) + '. ' + x.symbol + ' $' + x.price.toFixed(2) + ' | Break at $' + x.breakoutAt + ' (' + x.distance + ')'));
  console.log('\n=== BIG MOVERS TODAY ===');
  movers.slice(0, 5).forEach((x, i) => console.log((i+1) + '. ' + x.symbol + ' $' + x.price.toFixed(2) + ' ' + (parseFloat(x.change) > 0 ? '📈' : '📉') + ' ' + x.change + '%'));
  console.log('\n=== WATCHLIST FOR MARKET OPEN ===');
  const watchlist = [...acc.slice(0, 3), ...choch.slice(0, 3)];
  const unique = [...new Set(watchlist.map(w => w.symbol))].slice(0, 6);
  console.log(unique.join(', '));
  console.log('============================================');
}
scan().catch(console.error);
