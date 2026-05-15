#!/usr/bin/env node
// Memory-to-Notion Sync Script
// Usage: node sync-memory-to-notion.js [days-ago]

const { ComposioNotion } = require('/home/openclaw/.openclaw/workspace-vyse/composio-notion.cjs');
const sqlite3 = require('sqlite3');

const DB_PATH = '/home/openclaw/.openclaw/lcm-db/messages.db';
const PARENT_PAGE_ID = '3614f051-c508-8064-b995-cd38be6f896c';

function formatDate(iso) {
  const d = new Date(iso);
  const pt = d.toLocaleString('en-US', { 
    timeZone: 'America/Los_Angeles',
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  }) + ' PT';
  return pt;
}

async function syncToNotion(daysAgo = 7) {
  const db = new sqlite3.Database(DB_PATH);
  
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysAgo);
  const cutoffStr = cutoff.toISOString();
  
  console.log(`Syncing memory from last ${daysAgo} days...`);
  
  // Get conversations
  const conversations = await new Promise((resolve, reject) => {
    db.all("SELECT id, started_at, last_message_at, message_count FROM conversations WHERE last_message_at > ? ORDER BY last_message_at DESC", 
      [cutoffStr], (err, rows) => err ? reject(err) : resolve(rows));
  });
  
  console.log(`Found ${conversations.length} conversations`);
  
  const cn = new ComposioNotion();
  let content = `# Vyse Memory Sync\n\n`;
  content += `*Synced: ${new Date().toISOString()}*\n\n`;
  content += `---\n\n`;
  
  for (const conv of conversations) {
    const messages = await new Promise((resolve, reject) => {
      db.all("SELECT role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY seq",
        [conv.id], (err, rows) => err ? reject(err) : resolve(rows));
    });
    
    if (messages.length === 0) continue;
    
    // Skip heartbeat-only conversations
    const userMsgs = messages.filter(m => m.role === 'user');
    const hasRealWork = userMsgs.some(m => !m.content.includes('heartbeat'));
    if (!hasRealWork && userMsgs.length > 0) continue;
    
    content += `## Session: ${conv.id.slice(0, 8)}...\n`;
    content += `**Started:** ${formatDate(conv.started_at)}\n`;
    content += `**Messages:** ${conv.message_count}\n\n`;
    
    for (const msg of messages.slice(-20)) {
      if (msg.content.includes('heartbeat') || msg.content.includes('Rehydrate')) continue;
      
      const role = msg.role === 'user' ? '👤 User' : '🤖 Vyse';
      const preview = msg.content.slice(0, 200).replace(/\n/g, ' ');
      content += `### ${role} (${formatDate(msg.created_at)})\n${preview}${msg.content.length > 200 ? '...' : ''}\n\n`;
    }
    
    content += `---\n\n`;
  }
  
  db.close();
  
  // Create Notion page
  console.log('Creating Notion page...');
  const title = `Memory Sync - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  
  const result = await cn.createPage(title, content);
  console.log('✅ Created:', result.url);
  return result;
}

const days = parseInt(process.argv[2]) || 7;
syncToNotion(days).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});