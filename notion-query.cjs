#!/usr/bin/env node
// Notion Query Layer - Hybrid approach
// Writes to Notion + local files, queries local for speed

const API_KEY = process.env.COMPOSIO_API_KEY || 'ak_rqw4yFTcvTeLfd9TWpmn';
const ENTITY_ID = 'Vyse notion';
const BACKUP_DIR = './notion-backup';

// Page IDs
const PAGES = {
  'active': { id: '3614f051-c508-81f4-9dce-c34c35f2e128', file: 'active.json' },
  'positions': { id: '3614f051-c508-81a2-b92b-c3e2d486fb28', file: 'positions.json' },
  'decisions': { id: '3614f051-c508-8174-837e-d441600c77b2', file: 'decisions.json' },
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

async function execute(toolSlug, text) {
  const response = await fetch(`https://backend.composio.dev/api/v3.1/tools/execute/${toolSlug}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, entity_id: ENTITY_ID })
  });
  const result = await response.json();
  if (!result.successful) throw new Error(result.error);
  return result.data;
}

class NotionQuery {
  // Log + backup - writes to Notion AND local file
  async log(pageKey, entry) {
    const page = PAGES[pageKey];
    if (!page) throw new Error('Unknown page: ' + pageKey);
    
    // 1. Write to Notion
    try {
      await execute('NOTION_ADD_PAGE_CONTENT',
        `add to page ${page.id}: ${entry}`
      );
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
    
    if (!search) return { entries: data, count: data.length };
    
    // Filter by search term
    const matches = data.filter(d => 
      d.entry.toLowerCase().includes(search.toLowerCase())
    );
    
    return { entries: matches, count: matches.length, total: data.length };
  }
  
  // Get all entries from a page
  all(pageKey) {
    return this.query(pageKey);
  }
  
  // Check errors before fixing
  checkError(fixType) {
    const errors = this.query('errors', fixType);
    return errors;
  }
  
  // Get preferences
  getPreference(key) {
    const prefs = this.query('preferences', key);
    return prefs.entries[0]?.entry || null;
  }
  
  // Get recent decisions
  recentDecisions(limit = 5) {
    const all = this.query('decisions');
    return all.entries.slice(-limit).reverse();
  }
  
  // Get active task
  getActive() {
    const active = this.query('active');
    return active.entries[active.entries.length - 1] || null;
  }
  
  // Get positions
  getPositions() {
    return this.query('positions');
  }
}

module.exports = { NotionQuery, PAGES };

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const nq = new NotionQuery();
  
  const pageKeys = Object.keys(PAGES);
  
  (async () => {
    try {
      switch (cmd) {
        case 'query':
          // node query.cjs query <page> [search]
          const page = args[1];
          const search = args.slice(2).join(' ');
          const result = nq.query(page, search);
          console.log(`Found ${result.count} of ${result.total || result.count} entries:`);
          result.entries.forEach(e => console.log('-', e.entry));
          break;
          
        case 'active':
          console.log(nq.getActive()?.entry || 'No active task');
          break;
          
        case 'errors':
          const errCheck = args[1] ? nq.checkError(args[1]) : nq.all('errors');
          console.log('Errors:', errCheck.entries.length);
          errCheck.entries.slice(-3).forEach(e => console.log('-', e.entry));
          break;
          
        case 'prefs':
        case 'preferences':
          const key = args[1];
          if (key) {
            console.log(nq.getPreference(key));
          } else {
            const all = nq.all('preferences');
            all.entries.forEach(e => console.log(e.entry));
          }
          break;
          
        case 'decisions':
          const decisions = nq.recentDecisions(parseInt(args[1]) || 5);
          decisions.forEach(d => console.log(d.entry));
          break;
          
        case 'positions':
          const positions = nq.getPositions();
          positions.entries.forEach(e => console.log(e.entry));
          break;
          
        case 'check':
          // Before any fix: check if error exists
          const fix = args.slice(1).join(' ');
          const existing = nq.checkError(fix);
          if (existing.count > 0) {
            console.log('⚠️ Found', existing.count, 'prior errors with similar fix:');
            existing.entries.forEach(e => console.log(' ', e.entry));
          } else {
            console.log('✅ No prior errors for:', fix);
          }
          break;
          
        default:
          console.log('Commands:');
          console.log('  query <page> [search]  - Query a page');
          console.log('  active                  - Get current task');
          console.log('  errors [search]         - Check errors');
          console.log('  preferences [key]       - Get preferences');
          console.log('  decisions [limit]       - Recent decisions');
          console.log('  positions               - Get all positions');
          console.log('  check <fix>             - Check error before fixing');
          console.log('  Pages:', pageKeys.join(', '));
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
  })();
}
