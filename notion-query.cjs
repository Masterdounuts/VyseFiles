#!/usr/bin/env node
// Notion Query Layer - Hybrid approach (CLI-based)
// Writes to Notion + local files, queries local for speed

const { execSync } = require('child_process');
const CLI = '/home/openclaw/.composio/composio';
const BACKUP_DIR = './notion-backup';

// Page IDs - MATCHED with composio-notion.cjs
const PAGES = {
  'active': { id: '3614f051-c508-81f4-9dce-c34c35f2e128', file: 'active.json' },
  'positions': { id: '3614f051-c508-81a2-b92b-c3e2d486fb28', file: 'positions.json' },
  'decisions': { id: '3614f051-c508-818d-8e72-f60abf962929', file: 'decisions.json' },
  'errors': { id: '3614f051-c508-813f-b99a-c62d62516f6b', file: 'errors.json' },
  'knowledge': { id: '3614f051-c508-81fe-aadd-e1edcc4359b7', file: 'knowledge.json' },
  'preferences': { id: '3614f051-c508-812b-9717-c77a87f3a7c4', file: 'preferences.json' },
  'skills': { id: '3614f051-c508-8190-810e-ec627d9d7e51', file: 'skills.json' }
};

const fs = require('fs');
const path = require('path');

// Ensure backup dir exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function execute(toolSlug, params) {
  // Use CLI instead of direct API
  const dataStr = JSON.stringify(params).replace(/"/g, '\\"');
  const cmd = `${CLI} execute ${toolSlug} -d "${dataStr}"`;
  
  try {
    const output = execSync(cmd, { encoding: 'utf8' });
    const result = JSON.parse(output);
    if (!result.successful) throw new Error(result.error || 'Unknown error');
    return result.data;
  } catch (e) {
    throw new Error(e.message);
  }
}

class NotionQuery {
  // Log + backup - writes to Notion AND local file
  async log(pageKey, entry) {
    const page = PAGES[pageKey];
    if (!page) throw new Error('Unknown page: ' + pageKey);
    
    // 1. Write to Notion via CLI
    try {
      await execute('NOTION_ADD_PAGE_CONTENT', {
        parent_block_id: page.id,
        content_block: {
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: entry } }]
          }
        }
      });
    } catch (e) {
      console.log('Notion write failed, using local only:', e.message);
    }
    
    // 2. Backup to local file
    const filePath = path.join(BACKUP_DIR, page.file);
    let data = [];
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    data.push({ timestamp: new Date().toISOString(), entry });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return { notion: 'written', local: 'backed up' };
  }
  
  // Query local backup
  query(pageKey, search = '') {
    const page = PAGES[pageKey];
    if (!page) throw new Error('Unknown page: ' + pageKey);
    
    const filePath = path.join(BACKUP_DIR, page.file);
    if (!fs.existsSync(filePath)) {
      return { entries: [], message: 'No data yet' };
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let entries = data;
    
    if (search) {
      entries = data.filter(e => e.entry.toLowerCase().includes(search.toLowerCase()));
    }
    
    return { entries: entries.slice(-20).reverse() };
  }
  
  getUrl(pageKey) {
    const page = PAGES[pageKey];
    if (!page) return null;
    return `https://www.notion.so/${page.name.replace(/ /g, '-')}-${page.id}`;
  }
}

module.exports = { NotionQuery, PAGES };

// CLI handler
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const cn = new NotionQuery();
  
  (async () => {
    try {
      switch (cmd) {
        case 'query':
          const page = args[1];
          const search = args[2] || '';
          const result = cn.query(page, search);
          console.log(result.entries.map(e => e.entry).join('\n'));
          break;
          
        case 'active':
          const active = cn.query('active');
          console.log(active.entries.map(e => e.entry).join('\n'));
          break;
          
        case 'decisions':
          const limit = parseInt(args[1]) || 5;
          const decisions = cn.query('decisions');
          console.log(decisions.entries.slice(0, limit).map(e => e.entry).join('\n'));
          break;
          
        case 'errors':
          const errSearch = args[1] || '';
          const errors = cn.query('errors', errSearch);
          console.log('Errors:', errors.entries.length);
          console.log(errors.entries.map(e => e.entry).join('\n'));
          break;
          
        case 'knowledge':
          const knowSearch = args[1] || '';
          const knowledge = cn.query('knowledge', knowSearch);
          console.log(knowledge.entries.map(e => e.entry).join('\n'));
          break;
          
        case 'preferences':
          const prefSearch = args[1] || '';
          const prefs = cn.query('preferences', prefSearch);
          console.log(prefs.entries.map(e => e.entry).join('\n'));
          break;
          
        case 'positions':
          const positions = cn.query('positions');
          console.log(positions.entries.map(e => e.entry).join('\n'));
          break;
          
        case 'check':
          // Check if a fix exists in errors
          const fix = args[1];
          if (!fix) {
            console.log('Usage: check <fix-name>');
            break;
          }
          const errors2 = cn.query('errors', fix);
          if (errors2.entries.length > 0) {
            console.log('Found fix:', errors2.entries[0].entry);
          } else {
            console.log('No existing fix for:', fix);
          }
          break;
          
        case 'list':
        default:
          console.log('Commands:');
          console.log('  query <page> [search]  - Query a page');
          console.log('  active                  - Get current task');
          console.log('  errors [search]         - Check errors');
          console.log('  preferences [key]       - Get preferences');
          console.log('  decisions [limit]       - Recent decisions');
          console.log('  positions               - Get all positions');
          console.log('  check <fix>             - Check error before fixing');
          console.log('Pages:', Object.keys(PAGES).join(', '));
      }
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  })();
}