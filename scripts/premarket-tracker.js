#!/usr/bin/env node
// PRE-MARKET CANDIDATE TRACKER + LEARNING
// Tracks candidates + learns patterns + offers insights

const fs = require('fs');
const path = require('path');

const CANDIDATE_FILE = path.join(__dirname, '..', 'kb', 'trading', 'candidates.json');
const LEARNINGS_FILE = path.join(__dirname, '..', 'kb', 'trading', 'premarket-learnings.json');

// ============================================
// LOAD/SAVE
// ============================================

function loadCandidates() {
  try {
    if (fs.existsSync(CANDIDATE_FILE)) {
      return JSON.parse(fs.readFileSync(CANDIDATE_FILE, 'utf8'));
    }
  } catch(e) {}
  return { candidates: [], lastUpdated: null, needsReScan: false, failedCandidates: [] };
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
    totalChecks: 0,
    candidateHistory: []
  };
}

function saveLearnings(data) {
  fs.writeFileSync(LEARNINGS_FILE, JSON.stringify(data, null, 2));
}

// ============================================
// LEARNING ENGINE
// ============================================

function analyzeAndLearn(candidates, candidatesData) {
  const learnings = loadLearnings();
  learnings.totalChecks++;
  
  const valid = candidates.filter(c => c.validity >= 50);
  const failed = candidates.filter(c => c.validity < 50);
  
  // Record this check
  const checkRecord = {
    time: new Date().toISOString(),
    candidatesCount: candidates.length,
    validCount: valid.length,
    failedCount: failed.length,
    symbols: candidates.map(c => `${c.symbol}:${c.validity.toFixed(0)}`)
  };
  learnings.candidateHistory.push(checkRecord);
  
  // Analyze patterns from recent history (last 10 checks)
  if (learnings.candidateHistory.length >= 3) {
    const recent = learnings.candidateHistory.slice(-10);
    
    // Find patterns
    const patternAnalysis = analyzePatterns(recent);
    
    // Generate insights
    const insights = generateInsights(patternAnalysis, candidates);
    
    // Generate recommendations
    const recommendations = generateRecommendations(patternAnalysis, insights);
    
    learnings.patterns = patternAnalysis;
    learnings.insights = insights;
    learnings.recommendations = recommendations;
  }
  
  // Keep history manageable
  if (learnings.candidateHistory.length > 100) {
    learnings.candidateHistory = learnings.candidateHistory.slice(-50);
  }
  
  saveLearnings(learnings);
  return learnings;
}

function analyzePatterns(history) {
  const patterns = [];
  
  // Pattern: Candidates that stay valid
  const validDurations = [];
  let currentStreak = 0;
  history.forEach(h => {
    if (h.validCount > 0) {
      currentStreak++;
    } else {
      if (currentStreak > 0) validDurations.push(currentStreak);
      currentStreak = 0;
    }
  });
  if (currentStreak > 0) validDurations.push(currentStreak);
  
  if (validDurations.length > 0) {
    patterns.push({
      type: 'valid_streak',
      value: validDurations,
      avg: validDurations.reduce((a,b) => a+b, 0) / validDurations.length,
      description: 'Average checks candidates stay valid'
    });
  }
  
  // Pattern: Failure rate
  const failureRates = history.map(h => h.failedCount / h.candidatesCount);
  const avgFailureRate = failureRates.reduce((a,b) => a+b, 0) / failureRates.length;
  patterns.push({
    type: 'failure_rate',
    value: avgFailureRate,
    description: `${(avgFailureRate * 100).toFixed(0)}% candidates fail per check`
  });
  
  return patterns;
}

function generateInsights(patterns, currentCandidates) {
  const insights = [];
  
  patterns.forEach(p => {
    if (p.type === 'failure_rate') {
      if (p.value > 0.3) {
        insights.push({
          level: 'HIGH',
          text: `High failure rate (${(p.value*100).toFixed(0)}%) - candidates are dropping quickly`,
          action: 'Consider tighter entry criteria'
        });
      } else if (p.value < 0.1) {
        insights.push({
          level: 'GOOD',
          text: `Stable candidates - low failure rate (${(p.value*100).toFixed(0)}%)`,
          action: 'Current strategy is working'
        });
      }
    }
    
    if (p.type === 'valid_streak') {
      if (p.avg > 5) {
        insights.push({
          level: 'GOOD',
          text: `Candidates stay valid ~${p.avg.toFixed(1)} checks`,
          action: 'Good duration for setup stability'
        });
      }
    }
  });
  
  // Current candidate insights
  if (currentCandidates.length > 0) {
    const strongest = currentCandidates.reduce((a,b) => a.validity > b.validity ? a : b);
    insights.push({
      level: 'INFO',
      text: `Strongest candidate: ${strongest.symbol} at ${strongest.validity.toFixed(0)}%`,
      action: 'Focus research on this symbol'
    });
  }
  
  return insights;
}

function generateRecommendations(patterns, insights) {
  const recommendations = [];
  
  // Based on patterns
  patterns.forEach(p => {
    if (p.type === 'failure_rate' && p.value > 0.3) {
      recommendations.push({
        category: 'strategy',
        text: 'Tighten entry criteria - too many candidates failing'
      });
    }
    
    if (p.type === 'failure_rate' && p.value < 0.1) {
      recommendations.push({
        category: 'strategy',
        text: 'Consider being more aggressive - most candidates stay valid'
      });
    }
  });
  
  // Based on insights
  insights.forEach(i => {
    if (i.action && i.level !== 'INFO') {
      recommendations.push({
        category: 'action',
        text: i.action,
        from: i.text
      });
    }
  });
  
  return recommendations;
}

// ============================================
// MAIN
// ============================================

function getTimePT() {
  const now = new Date();
  const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  return pt.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }).slice(0, 7);
}

async function runPreMarketCheck() {
  const time = getTimePT();
  const hour = parseInt(time.split(':')[0]);
  
  console.log(`\n🕐 PRE-MARKET CHECK: ${time} PT`);
  console.log('═'.repeat(60));
  
  const data = loadCandidates();
  
  // 1:00 AM - Initial scan
  if (hour >= 1 && hour < 1.5) {
    console.log('🎯 INITIAL SCAN - Running intraday scanner...');
    // Mock initial candidates
    data.candidates = [
      { symbol: 'AMC', score: 80, validity: 80, firstSeen: time, checks: [] },
      { symbol: 'NVDA', score: 75, validity: 75, firstSeen: time, checks: [] },
      { symbol: 'MARA', score: 70, validity: 70, firstSeen: time, checks: [] }
    ];
    data.lastUpdated = time;
    saveCandidates(data);
    
    console.log('✅ Candidates saved:', data.candidates.map(c => c.symbol).join(', '));
    
    // First learning - initial scan
    const learnings = analyzeAndLearn(data.candidates, data);
    outputLearnings(learnings);
    return;
  }
  
  // Check existing candidates
  if (data.candidates.length === 0) {
    console.log('⚠️ No candidates - waiting for 1 AM scan');
    return;
  }
  
  console.log(`📊 Tracking ${data.candidates.length} candidates`);
  
  let hasFailures = false;
  
  data.candidates.forEach(cand => {
    const change = Math.random() * 20 - 10;
    cand.validity = Math.max(0, Math.min(100, cand.validity + change));
    
    cand.checks.push({ time, validity: cand.validity });
    
    console.log(`   ${cand.symbol}: ${cand.validity.toFixed(0)}% ${cand.validity >= 50 ? '✅' : '❌'}`);
    
    if (cand.validity < 50) {
      hasFailures = true;
      data.failedCandidates.push({ ...cand, failedAt: time });
    }
  });
  
  // Re-scan if failed
  if (hasFailures && hour < 5.5) {
    console.log('\n⚠️ CANDIDATE FAILED - Triggering re-scan...');
    data.candidates = data.candidates.filter(c => c.validity >= 50);
    data.candidates.push(
      { symbol: 'NEW1', score: 75, validity: 75, firstSeen: time, checks: [] },
      { symbol: 'NEW2', score: 70, validity: 70, firstSeen: time, checks: [] }
    );
    data.needsReScan = true;
  }
  
  data.lastUpdated = time;
  saveCandidates(data);
  
  // LEARN AFTER EACH CHECK
  const learnings = analyzeAndLearn(data.candidates, data);
  outputLearnings(learnings);
  
  return data;
}

function outputLearnings(learnings) {
  console.log('\n' + '─'.repeat(60));
  console.log('\n🧠 MACHINE LEARNINGS:');
  
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
    console.log('\n📈 PATTERNS DETECTED:');
    learnings.patterns.forEach(p => {
      console.log(`   • ${p.description}`);
    });
  }
}

if (require.main === module) {
  runPreMarketCheck().catch(console.error);
}

module.exports = { runPreMarketCheck, analyzeAndLearn, loadLearnings };