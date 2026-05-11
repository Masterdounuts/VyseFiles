#!/usr/bin/env node
// ROBINHOOD STOCK CATEGORIES
// Organized by type/purpose for trading

const STOCKS = {
  // === GROWTH/TECH (Primary for SMC strategy) ===
  tech: [
    'NVDA', 'MSFT', 'AAPL', 'GOOGL', 'AMZN', 'META', 'AMD', 'INTC', 'AVGO', 'QCOM',
    'TXN', 'NXPI', 'MRVL', 'ARM', 'PLTR', 'COIN', 'SMCI', 'SNOW', 'DDOG', 'CRWD',
    'ZS', 'NET', 'MDB', 'OKTA', 'TSLA'
  ],
  
  // === CRYPTO MINING (High volatility) ===
  cryptoMining: [
    'MARA', 'RIOT', 'BTBT', 'BIT', 'CLBM', 'BST', 'WG', 'HYPR'
  ],
  
  // === ETFs (Long-term + leveraged) ===
  etfs: {
    // Piggy bank (long-term hold)
    piggybank: ['QQQ', 'SPY', 'VGT'],
    // Leveraged (high risk - for advanced)
    leveraged: ['TNA', 'TQQQ', 'SQQQ', 'SOXL', 'SMH', 'ARKK']
  },
  
  // === FINANCE ===
  finance: [
    'JPM', 'BAC', 'WFC', 'C', 'GS', 'MS', 'BLK', 'SCHW'
  ],
  
  // === HEALTHCARY ===
  healthcare: [
    'JNJ', 'UNH', 'PFE', 'MRK', 'ABBV', 'LLY', 'GILD', 'AMGN'
  ],
  
  // === ENERGY ===
  energy: [
    'XOM', 'CVX', 'COP', 'SLB', 'EOG', 'MPC', 'PSX', 'VLO'
  ],
  
  // === INDUSTRIAL ===
  industrial: [
    'CAT', 'BA', 'HON', 'UNP', 'RTX', 'NOC', 'LMT', 'GE'
  ],
  
  // === CONSUMER ===
  consumer: [
    'WMT', 'HD', 'COST', 'TGT', 'LOW', 'BBY', 'DIS', 'NFLX', 'NKE'
  ],
  
  // === OTHER (For scanning) ===
  other: [
    'GME', 'AMC', 'SOFI', 'UPST', 'HOOD', 'RIVN', 'LCID'
  ]
};

// Flat list for scanner (all stocks)
const SCAN_UNIVERSE = [
  ...STOCKS.tech,
  ...STOCKS.cryptoMining,
  ...STOCKS.finance,
  ...STOCKS.healthcare,
  ...STOCKS.energy,
  ...STOCKS.industrial,
  ...STOCKS.consumer,
  ...STOCKS.other,
  'SPY', 'QQQ', 'IWM', 'TNA', 'TQQQ'
];

module.exports = { STOCKS, SCAN_UNIVERSE };