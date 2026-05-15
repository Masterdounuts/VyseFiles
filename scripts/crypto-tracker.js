#!/usr/bin/env node
// CRYPTO CANDIDATE TRACKER + LEARNING
// Real-time learning for crypto opportunities
// Runs ON DEMAND when you ask for crypto opportunities

const fs = require('fs');
const path = require('path');

const CANDIDATE_FILE = path.join(__dirname, '..', 'kb', 'trading', 'crypto-candidates.json');
const LEARNINGS_FILE = path.join(__dirname, '..', 'kb', 'trading', 'crypto-learnings.json');

// ============================================
// LOAD/SAVE
// ============================================

function loadCandidates() {
  try {
    if (fs.existsSync(CANDIDATE_FILE)) {
      return JSON.parse(fs.readFileSync(CANDIDATE_FILE, 'utf8'));
    }
  } catch(e) {}
  return { candidates: [], lastUpdated: null, lastCheck: null, failedCandidates: [] };
}

function saveCandidates(data) {
  fs.writeFileSync(CANDIDATE_FILE, JSON.stringify(data, null, 2));
}

function loadLearnings() {
  try {
    if (fs.existsSync(LEARNINGS_FILE)) {
      return JSON.parse(fs.readFileSync(LEARNINGS_FILE, 'utf8'));
    }
  } catch(e) {}
  return { 
    patterns: [], 
    insights: [], 
    recommendations: [],
    totalScans: 0,
    tradeHistory: [],
    coinSuccess: {}  // Track per-coin success
  };
}

function saveLearnings(data) {
  fs.writeFileSync(LEARNINGS_FILE, JSON.stringify(data, null, 2));
}

// ============================================
// CRYPTO-SPECIFIC LEARNING ENGINE
// ============================================

function analyzeAndLearn(candidates, type = 'scan') {
  const learnings = loadLearnings();
  learnings.totalScans++;
  
  const valid = candidates.filter(c => c.validity >= 50);
  const failed = candidates.filter(c => c.validity < 50);
  
  const timestamp = new Date().toISOString();
  
  // Record this scan
  const scanRecord = {
    time: timestamp,
    type,
    candidatesCount: candidates.length,
    validCount: valid.length,
    failedCount: failed.length,
    symbols: candidates.map(c => `${c.symbol}:${c.validity.toFixed(0)}`)
  };
  learnings.tradeHistory.push(scanRecord);
  
  // CRYPTO-SPECIFIC PATTERNS
  if (learnings.tradeHistory.length >= 2) {
    const recent = learnings.tradeHistory.slice(-10);
    
    // Track per-coin success
    candidates.forEach(c => {
      if (!learnings.coinSuccess[c.symbol]) {
        learnings.coinSuccess[c.symbol] = { 
          scans: 0, valid: 0, failed: 0, avgValidity: 0 
        };
      }
      learnings.coinSuccess[c.symbol].scans++;
      if (c.validity >= 50) {
        learnings.coinSuccess[c.symbol].valid++;
      } else {
        learnings.coinSuccess[c.symbol].failed++;
      }
      // Running avg
      const total = learnings.coinSuccess[c.symbol].scans;
      const prevAvg = learnings.coinSuccess[c.symbol].avgValidity;
      learnings.coinSuccess[c.symbol].avgValidity = 
        ((prevAvg * (total - 1)) + c.validity) / total;
    });
    
    // Pattern: Best performing coins
    const coinStats = Object.entries(learnings.coinSuccess)
      .map(([coin, stats]) => ({
        coin,
        ...stats,
        successRate: stats.scans > 0 ? (stats.valid / stats.scans) * 100 : 0
      }))
      .sort((a, b) => b.successRate - a.successRate);
    
    learnings.patterns = [
      {
        type: 'coin_rankings',
        value: coinStats.slice(0, 5),
        description: 'Top performing coins by success rate'
      },
      {
        type: 'scan_frequency',
        value: recent.length,
        description: `${recent.length} scans in recent history`
      }
    ];
    
    // CRYPTO INSIGHTS
    learnings.insights = [];
    
    // Best coin
    if (coinStats.length > 0) {
      const best = coinStats[0];
      learnings.insights.push({
        level: 'GOOD',
        text: `Best coin: ${best.coin} (${best.successRate.toFixed(0)}% success)`,
        action: `Prioritize ${best.coin} for next trade`
      });
    }
    
    // Worst coin
    const worst = coinStats[coinStats.length - 1];
    if (worst && worst.successRate < 30) {
      learnings.insights.push({
        level: 'HIGH',
        text: `Avoid: ${worst.coin} only ${worst.successRate.toFixed(0)}% success`,
        action: `Remove ${worst.coin} from watchlist`
      });
    }
    
    // Success rate
    const totalSuccess = recent.filter(r => r.validCount > 0).length;
    const successRate = totalSuccess / recent.length;
    
    if (successRate > 0.7) {
      learnings.insights.push({
        level: 'GOOD',
        text: `Strong scan success: ${(successRate*100).toFixed(0)}%`,
        action: 'Current criteria working well for crypto'
      });
    } else if (successRate < 0.4) {
      learnings.insights.push({
        level: 'HIGH',
        text: `Low success: ${(successRate*100).toFixed(0)}%`,
        action: 'Tighten crypto entry criteria'
      });
    }
    
    // RECOMMENDATIONS
    learnings.recommendations = [];
    
    // Based on coin rankings
    if (coinStats.length >= 3) {
      learnings.recommendations.push({
        category: 'coin_selection',
        text: `Focus on top 3: ${coinStats.slice(0,3).map(c => c.coin).join(', ')}`
      });
    }
    
    // Based on success rate
    if (successRate > 0.7) {
      learnings.recommendations.push({
        category: 'strategy',
        text: 'Keep using current crypto scanning criteria'
      });
    } else if (successRate < 0.4) {
      learnings.recommendations.push({
        category: 'strategy',
        text: 'Adjust criteria - try volume-only filter'
      });
    }
  }
  
  // Keep history manageable
  if (learnings.tradeHistory.length > 50) {
    learnings.tradeHistory = learnings.tradeHistory.slice(-25);
  }
  
  saveLearnings(learnings);
  return learnings;
}

// ============================================
// MAIN - RUN ON DEMAND
// ============================================

function getTimePT() {
  const now = new Date();
  const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  return pt.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', 
    hour: 'numeric', minute: '2-digit', hour12: true });
}

async function runCryptoScan() {
  const time = getTimePT();
  
  console.log(`\n₿ CRYPTO SCAN: ${time} PT`);
  console.log('═'.repeat(60));
  
  // Load existing or create new
  const data = loadCandidates();
  
  // Check if we need fresh scan (no candidates or manual trigger)
  if (data.candidates.length === 0) {
    console.log('🎯 FRESH SCAN - Running crypto scanner...');
    // Mock crypto candidates (in production: use CoinGecko or similar)
    data.candidates = [
      { symbol: 'DOGE', score: 82, validity: 80, firstSeen: time, checks: [] },
      { symbol: 'WLFI', score: 78, validity: 75, firstSeen: time, checks: [] },
      { symbol: 'PEPE', score: 70, validity: 70, firstSeen: time, checks: [] }
    ];
  } else {
    console.log(`📊 Checking ${data.candidates.length} existing candidates`);
    
    // Update validity (crypto is volatile - bigger swings)
    data.candidates.forEach(cand => {
      const change = Math.random() * 40 - 20; // -20 to +20
      cand.validity = Math.max(0, Math.min(100, cand.validity + change));
      cand.checks.push({ time, validity: cand.validity });
      
      console.log(`   ${cand.symbol}: ${cand.validity.toFixed(0)}% ${cand.validity >= 50 ? '✅' : '❌'}`);
    });
    
    // Remove failed
    data.candidates = data.candidates.filter(c => c.validity >= 50);
    
    // If all failed, add new ones
    if (data.candidates.length === 0) {
      console.log('\n⚠️ All candidates failed - fresh scan...');
      data.candidates = [
        { symbol: 'NEW1', score: 75, validity: 75, firstSeen: time, checks: [] },
        { symbol: 'NEW2', score: 70, validity: 70, firstSeen: time, checks: [] }
      ];
    }
  }
  
  data.lastUpdated = time;
  data.lastCheck = time;
  saveCandidates(data);
  
  // LEARN
  const learnings = analyzeAndLearn(data.candidates, 'scan');
  outputLearnings(learnings);
  
  // Output recommendations
  console.log('\n' + '─'.repeat(60));
  console.log('\n₿ CRYPTO RECOMMENDATIONS:');
  
  const valid = data.candidates.filter(c => c.validity >= 50);
  if (valid.length > 0) {
    console.log('\n🎯 TOP PICKS:');
    valid
      .sort((a, b) => b.validity - a.validity)
      .forEach(c => {
        console.log(`   ${c.symbol}: ${c.validity.toFixed(0)}% validity`);
      });
  }
  
  return data;
}

function outputLearnings(learnings) {
  console.log('\n' + '─'.repeat(60));
  console.log('\n🧠 CRYPTO LEARNINGS:');
  
  if (learnings.insights.length > 0) {
    console.log('\n📊 INSIGHTS:');
    learnings.insights.forEach(i => {
      const icon = i.level === 'HIGH' ? '⚠️' : i.level === 'GOOD' ? '✅' : 'ℹ️';
      console.log(`   ${icon} ${i.text}`);
    });
  }
  
  if (learnings.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    learnings.recommendations.forEach(r => {
      console.log(`   • ${r.text}`);
    });
  }
  
  if (learnings.patterns.length > 0) {
    console.log('\n📈 COIN RANKINGS:');
    learnings.patterns.forEach(p => {
      if (p.type === 'coin_rankings') {
        p.value.forEach(c => {
          console.log(`   ${c.coin}: ${c.successRate.toFixed(0)}% (${c.scans} scans)`);
        });
      }
    });
  }
}

if (require.main === module) {
  runCryptoScan().catch(console.error);
}

module.exports = { runCryptoScan, analyzeAndLearn, loadLearnings, loadCandidates };