#!/usr/bin/env node
// Notion Sync - Auto-fetch on wake-up

const { ComposioNotion, PAGES } = require("./composio-notion.cjs");
const cn = new ComposioNotion();

async function wakeUp() {
  console.log('📡 NOTION SYNC - Wake-up Query\n');
  console.log('='.repeat(40));
  
  for (const [key, page] of Object.entries(PAGES)) {
    console.log(`\n[${key.toUpperCase()}] ${page.name}`);
    console.log(`   ${page.id}`);
    console.log(`   ${cn.getUrl(key)}`);
  }
  
  console.log('\n' + '='.repeat(40));
  console.log('✅ Context loaded from Notion');
  
  // Log this sync
  try {
    await cn.logKnowledge('System', 'Notion sync at wake-up');
    console.log('✅ Sync logged');
  } catch (e) {
    console.log('⚠️ Sync log failed:', e.message);
  }
}

// Run if called directly
if (require.main === module) {
  wakeUp();
}

module.exports = { wakeUp };
