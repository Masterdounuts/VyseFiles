#!/usr/bin/env node
// TRADE LEARNER - Learn from every trade and improve predictions
// Tracks win/loss, patterns, and optimizes strategy over time

const fs = require('fs');
const path = require('path');

const TRADE_LOG = path.join(__dirname, '..', 'kb', 'stocks', 'trade-log.md');
const LEARNINGS = path.join(__dirname, '..', 'memory', 'trade-learnings.json');

// Load or initialize learnings
function loadLearnings() {
  try {
    if (fs.existsSync(LEARNINGS)) {
      return JSON.parse(fs.readFileSync(LEARNINGS, 'utf8'));
    }
  } catch(e) {}
  return {
    wins: 0,
    losses: 0,
    totalProfit: 0,
    totalLoss: 0,
    byPattern: {},     // pattern -> win rate
    byIndicator: {},  // indicator signal -> win rate
    lessons: [],
    bestSetup: null,
    worstSetup: null
  };
}

function saveLearnings(data) {
  fs.writeFileSync(LEARNINGS, JSON.stringify(data, null, 2));
}

// Record a trade outcome
function recordTrade(symbol, setup, indicators, result, profit) {
  const data = loadLearnings();
  
  // Update win/loss
  if (result === 'win') {
    data.wins++;
    data.totalProfit += profit;
  } else {
    data.losses++;
    data.totalLoss += Math.abs(profit);
  }
  
  // Track by pattern
  if (!data.byPattern[setup]) data.byPattern[setup] = { wins: 0, losses: 0 };
  if (result === 'win') data.byPattern[setup].wins++;
  else data.byPattern[setup].losses++;
  
  // Track by indicator
  indicators.forEach(ind => {
    if (!data.byIndicator[ind]) data.byIndicator[ind] = { wins: 0, losses: 0 };
    if (result === 'win') data.byIndicator[ind].wins++;
    else data.byIndicator[ind].losses++;
  });
  
  // Update best/worst setup
  const patternWinRate = data.byPattern[setup].wins / (data.byPattern[setup].wins + data.byPattern[setup].losses) * 100;
  if (!data.bestSetup || patternWinRate > data.bestSetup.winRate) {
    data.bestSetup = { setup, winRate: patternWinRate, wins: data.byPattern[setup].wins, losses: data.byPattern[setup].losses };
  }
  if (!data.worstSetup || patternWinRate < data.worstSetup.winRate) {
    data.worstSetup = { setup, winRate: patternWinRate, wins: data.byPattern[setup].wins, losses: data.byPattern[setup].losses };
  }
  
  saveLearnings(data);
  console.log(`📚 Trade recorded: ${result.toUpperCase()} - ${setup}`);
}

// Add a lesson
function addLesson(lesson) {
  const data = loadLearnings();
  data.lessons.push({
    date: new Date().toISOString().split('T')[0],
    lesson
  });
  // Keep only last 20 lessons
  if (data.lessons.length > 20) data.lessons = data.lessons.slice(-20);
  saveLearnings(data);
}

// Show stats
function showStats() {
  const data = loadLearnings();
  
  console.log('\n📊 TRADE LEARNING STATS\n');
  console.log('='.repeat(40));
  
  // Overall
  const total = data.wins + data.losses;
  const winRate = total > 0 ? (data.wins / total * 100).toFixed(1) : 0;
  console.log(`\nOverall: ${data.wins}W / ${data.losses}L | ${winRate}% win rate`);
  console.log(`Profit: $${data.totalProfit.toFixed(2)} | Loss: $${data.totalLoss.toFixed(2)}`);
  
  // Best/Worst setup
  if (data.bestSetup) {
    console.log(`\n✅ BEST SETUP: ${data.bestSetup.setup} (${data.bestSetup.winRate.toFixed(0)}% win rate)`);
  }
  if (data.worstSetup) {
    console.log(`❌ WORST SETUP: ${data.worstSetup.setup} (${data.worstSetup.winRate.toFixed(0)}% win rate)`);
  }
  
  // By indicator
  console.log('\n📈 BY INDICATOR:');
  Object.entries(data.byIndicator).forEach(([ind, stats]) => {
    const wr = (stats.wins / (stats.wins + stats.losses) * 100).toFixed(0);
    console.log(`  ${ind}: ${stats.wins}W / ${stats.losses}L (${wr}%)`);
  });
  
  // Recent lessons
  if (data.lessons.length > 0) {
    console.log('\n💡 RECENT LESSONS:');
    data.lessons.slice(-5).forEach(l => {
      console.log(`  [${l.date}] ${l.lesson}`);
    });
  }
  
  console.log('\n' + '='.repeat(40));
}

// Commands
const cmd = process.argv[2];

if (cmd === 'stats') {
  showStats();
} else if (cmd === 'record') {
  const [symbol, setup, result, profit] = process.argv.slice(3);
  if (!symbol || !setup || !result) {
    console.log('Usage: node trade-learner.js record <symbol> <setup> <win|loss> <profit>');
    process.exit(1);
  }
  recordTrade(symbol, setup, [], result, parseFloat(profit));
} else if (cmd === 'lesson') {
  const lesson = process.argv.slice(3).join(' ');
  if (!lesson) {
    console.log('Usage: node trade-learner.js lesson "<lesson text>"');
    process.exit(1);
  }
  addLesson(lesson);
  console.log('✅ Lesson added');
} else {
  console.log(`
🎓 TRADE LEARNER - Learning system for trading

Usage:
  node trade-learner.js stats          - Show all stats
  node trade-learner.js record <sym> <setup> <win|loss> <profit> - Record a trade
  node trade-learner.js lesson "<text>" - Add a lesson

Examples:
  node trade-learner.js record AMC accumulation win 2.89
  node trade-learner.js record RIVN bottom-fish loss -1.05
  node trade-learner.js lesson "Never chase stocks down"
  node trade-learner.js stats
`);
}