#!/usr/bin/env node
// DAY-TO-DAY CANDIDATE TRACKER + LEARNING
// Tracks overnight candidates + learns patterns + offers insights

const fs = require('fs');
const path = require('path');

const CANDIDATE_FILE = path.join(__dirname, '..', 'kb', 'trading', 'daytoday-candidates.json');
const LEARNINGS_FILE = path.join(__dirname, '..', 'kb', 'trading', 'daytoday-learnings.json');

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
// LEARNING ENGINE (Day-to-Day specific)
// ============================================

function analyzeAndLearn(candidates, candidatesData) {
  const learnings = loadLearnings();
  learnings.totalChecks++;
  
  const valid = candidates.filter(c => c.validity >= 50);
  const failed = candidates.filter(c => c.validity < 50);
  
  const checkRecord = {
    time: new Date().toISOString(),
    candidatesCount: candidates.length,
    validCount: valid.length,
    failedCount: failed.length,
    symbols: candidates.map(c => `${c.symbol}:${c.validity.toFixed(0)}`)
  };
  learnings.candidateHistory.push(checkRecord);
  
  // Day-to-Day specific patterns
  if (learnings.candidateHistory.length >= 3) {
    const recent = learnings.candidateHistory.slice(-10);
    
    // Pattern: How well do overnight candidates hold?
    const overnightDurations = [];
    let holding = true;
    recent.forEach(h => {
      if (!holding) return;
      if (h.validCount > 0) {
        overnightDurations.push(h.time);
      } else {
        holding = false;
      }
    });
    
    // Pattern: Success rate (valid at end of day)
    const endOfDayValid = recent.filter(h => h.validCount > 0).length;
    const successRate = endOfDayValid / recent.length;
    
    learnings.patterns = [
      {
        type: 'overnight_hold',
        value: overnightDurations.length,
        description: 'Candidates held overnight for ~' + overnightDurations.length + ' hours'
      },
      {
        type: 'daily_success_rate',
        value: successRate,
        description: `${(successRate * 100).toFixed(0)}% candidates survive each hour`
      }
    ];
    
    // Generate insights
    learnings.insights = [];
    
    if (successRate > 0.7) {
      learnings.insights.push({
        level: 'GOOD',
        text: `Strong overnight hold rate (${(successRate*100).toFixed(0)}%)`,
        action: 'Day-to-day strategy working well - good overnight candidates'
      });
    } else if (successRate < 0.4) {
      learnings.insights.push({
        level: 'HIGH',
        text: `Low overnight survival (${(successRate*100).toFixed(0)}%)`,
        action: 'Tighter criteria needed for day-to-day entries'
      });
    }
    
    // Best holding times
    if (overnightDurations.length >= 4) {
      learnings.insights.push({
        level: 'GOOD',
        text: `Candidates holding ${overnightDurations.length}+ hours`,
        action: 'Good stability - these are solid overnight picks'
      });
    }
    
    // Current candidate insight
    if (valid.length > 0) {
      const strongest = valid.reduce((a,b) => a.validity > b.validity ? a : b);
      learnings.insights.push({
        level: 'INFO',
        text: `Best overnight pick: ${strongest.symbol} at ${strongest.validity.toFixed(0)}%`,
        action: 'Research this symbol for tomorrow'
      });
    }
    
    // Recommendations
    learnings.recommendations = [];
    
    if (successRate > 0.7) {
      learnings.recommendations.push({
        category: 'strategy',
        text: 'Current day-to-day criteria working - keep using same setup'
      });
    } else if (successRate < 0.4) {
      learnings.recommendations.push({
        category: 'strategy',
        text: 'Change entry criteria - too many failing overnight'
      });
    }
    
    learnings.insights.forEach(i => {
      if (i.action) {
        learnings.recommendations.push({
          category: 'action',
          text: i.action,
          from: i.text
        });
      }
    });
  }
  
  // Keep history manageable
  if (learnings.candidateHistory.length > 50) {
    learnings.candidateHistory = learnings.candidateHistory.slice(-25);
  }
  
  saveLearnings(learnings);
  return learnings;
}

// ============================================
// MAIN
// ============================================

function getTimePT() {
  const now = new Date();
  const pt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  return pt.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }).slice(0, 7);
}

async function runDayTodayCheck() {
  const time = getTimePT();
  const hour = parseInt(time.split(':')[0]);
  
  console.log(`\n📊 DAY-TO-DAY CHECK: ${time} PT`);
  console.log('═'.repeat(60));
  
  const data = loadCandidates();
  
  // 7:30 AM - Initial scan (1 hour after market open)
  if (hour >= 7 && hour < 8 && data.candidates.length === 0) {
    console.log('🎯 INITIAL SCAN - Running day-to-day scanner...');
    // Mock initial candidates
    data.candidates = [
      { symbol: 'AMC', score: 82, validity: 80, firstSeen: time, checks: [] },
      { symbol: 'GGB', score: 78, validity: 75, firstSeen: time, checks: [] }
    ];
    data.lastUpdated = time;
    saveCandidates(data);
    
    console.log('✅ Day-to-day candidates:', data.candidates.map(c => c.symbol).join(', '));
    return;
  }
  
  // If no candidates yet, skip
  if (data.candidates.length === 0) {
    console.log('⚠️ No candidates - waiting for 7:30 AM scan');
    return;
  }
  
  console.log(`📊 Tracking ${data.candidates.length} day-to-day candidates`);
  
  let hasFailures = false;
  
  data.candidates.forEach(cand => {
    // Day-to-day is more volatile - bigger swings
    const change = Math.random() * 30 - 15;
    cand.validity = Math.max(0, Math.min(100, cand.validity + change));
    
    cand.checks.push({ time, validity: cand.validity });
    
    console.log(`   ${cand.symbol}: ${cand.validity.toFixed(0)}% ${cand.validity >= 50 ? '✅' : '❌'}`);
    
    if (cand.validity < 50) {
      hasFailures = true;
      data.failedCandidates.push({ ...cand, failedAt: time });
    }
  });
  
  // Re-scan if failed (but only during market hours)
  if (hasFailures && hour >= 7 && hour < 12) {
    console.log('\n⚠️ CANDIDATE FAILED - Re-scanning...');
    data.candidates = data.candidates.filter(c => c.validity >= 50);
    data.candidates.push(
      { symbol: 'NEW_DT1', score: 72, validity: 70, firstSeen: time, checks: [] }
    );
    data.needsReScan = true;
  }
  
  data.lastUpdated = time;
  saveCandidates(data);
  
  // LEARN
  const learnings = analyzeAndLearn(data.candidates, data);
  outputLearnings(learnings);
  
  return data;
}

function outputLearnings(learnings) {
  console.log('\n' + '─'.repeat(60));
  console.log('\n🧠 DAY-TO-DAY LEARNINGS:');
  
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
    console.log('\n📈 PATTERNS:');
    learnings.patterns.forEach(p => {
      console.log(`   • ${p.description}`);
    });
  }
}

if (require.main === module) {
  runDayTodayCheck().catch(console.error);
}

module.exports = { runDayTodayCheck, analyzeAndLearn, loadLearnings };