// Composio Notion helper - FIXED v2
// Usage: node composio-notion.cjs <command> [args]

const API_KEY = process.env.COMPOSIO_API_KEY || 'ak_F8bSxNXpHLEqCBPwbxH8';
const ENTITY_ID = 'Vyse notion';
const SANDBOX_ID = '8042f582-6c70-4384-b176-4d5750e04429'; // Vyse Agent Sandbox
const PARENT_PAGE_ID = '3614f051-c508-81f4-9dce-c34c35f2e128'; // Use active as parent (valid ID)
const fs = require('fs');
const path = require('path');

// Page IDs - using explicit IDs that work
const PAGES = {
  'sandbox': { id: SANDBOX_ID, name: 'Vyse Agent Sandbox' },
  'active': { id: '3614f051-c508-81f4-9dce-c34c35f2e128', name: 'Active Context' },
  'positions': { id: '3614f051-c508-81a2-b92b-c3e2d486fb28', name: 'Trading Positions' },
  'decisions': { id: '3614f051-c508-818d-8e72-f60abf962929', name: 'Decisions Log' },
  'errors': { id: '3614f051-c508-813f-b99a-c62d62516f6b', name: 'Errors & Fixes' },
  'knowledge': { id: '3614f051-c508-81fe-aadd-e1edcc4359b7', name: 'Knowledge Base' },
  'preferences': { id: '3614f051-c508-812b-9717-c77a87f3a7c4', name: 'User Preferences' },
  'skills': { id: '3614f051-c508-8190-810e-ec627d9d7e51', name: 'Skills Index' }
};

const { execSync } = require('child_process');
const CLI = '/home/openclaw/.composio/composio';

async function execute(toolSlug, params) {
  // Use CLI instead of direct API - it handles auth better
  // Write params to temp file to avoid shell escaping issues
  const dataStr = JSON.stringify(params);
  const tmpFile = '/tmp/composio-' + Date.now() + '.json';
  fs.writeFileSync(tmpFile, dataStr);
  
  const cmd = `${CLI} execute ${toolSlug} -d @${tmpFile}`;
  
  try {
    const output = execSync(cmd, { encoding: 'utf8' });
    fs.unlinkSync(tmpFile); // Clean up
    const result = JSON.parse(output);
    if (!result.successful) {
      throw new Error(result.error || 'Unknown error');
    }
    return result.data;
  } catch (e) {
    // Clean up temp file on error too
    try { fs.unlinkSync(tmpFile); } catch {}
    // Try to parse error as JSON
    try {
      const result = JSON.parse(e.message);
      throw new Error(result.error || e.message);
    } catch (inner) {
      throw new Error(e.message);
    }
  }
}

class ComposioNotion {
  // CREATE new page - FIXED to use JSON
  async createPage(title, content = '', icon = '📄') {
    return execute('NOTION_CREATE_NOTION_PAGE', {
      parent_id: PARENT_PAGE_ID,
      title: title,
      markdown: content || '',
      icon: icon
    });
  }
  
  // APPEND to existing page - using proper JSON format
  async appendToPage(pageKey, content) {
    const page = PAGES[pageKey];
    if (!page) throw new Error(`Unknown page: ${pageKey}. Use: active, positions, decisions`);
    
    // Use proper JSON schema format for CLI
    return execute('NOTION_ADD_PAGE_CONTENT', {
      parent_block_id: page.id,
      content_block: {
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: content } }]
        }
      }
    });
  }
  
  // Set active context
  async setActive(task, goal = '') {
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const content = ts + ' PT | ' + task + (goal ? ' | Goal: ' + goal : '');
    return this.appendToPage('active', content);
  }
  
  // Log decision
  async logDecision(decision, why) {
    // Validation: reject test data
    const testPatterns = ['test', 'xxxx', 'yyyy', 'fake', 'dummy'];
    const isTest = testPatterns.some(p => 
      decision.toLowerCase().includes(p) || 
      why.toLowerCase().includes(p)
    );
    if (isTest) {
      console.log('⚠️ Rejected test decision. Use real decisions only.');
      return { error: 'Test data not allowed' };
    }
    if (decision.length < 3 || why.length < 3) {
      console.log('⚠️ Decision and why must be at least 3 characters.');
      return { error: 'Too short' };
    }
    const ts = new Date().toISOString().split('T')[0];
    const content = ts + ' | ' + decision + ' | ' + why;
    return this.appendToPage('decisions', content);
  }
  
  // Log trade
  async logTrade(symbol, action, shares, price, note = '') {
    const ts = new Date().toISOString().split('T')[0];
    const content = ts + ' | ' + action + ' ' + shares + ' ' + symbol + ' @ ' + price + (note ? ' - ' + note : '');
    return this.appendToPage('positions', content);
  }
  
  // Log error + fix
  async logError(error, fix) {
    const ts = new Date().toISOString().split('T')[0];
    const content = ts + ' | Error: ' + error + ' | Fix: ' + fix;
    return this.appendToPage('errors', content);
  }
  
  // Log knowledge
  async logKnowledge(topic, insight, applyWhen) {
    const ts = new Date().toISOString().split('T')[0];
    const content = ts + ' | ' + topic + ' | ' + insight + ' | ' + (applyWhen || 'TBD');
    return this.appendToPage('knowledge', content);
  }
  
  // Set preference
  async setPreference(key, value) {
    const content = key + ': ' + value;
    return this.appendToPage('preferences', content);
  }
  
  // Log skill usage
  async logSkill(skill, usedFor) {
    const ts = new Date().toISOString().split('T')[0];
    const content = ts + ' | ' + skill + ' | Used for: ' + usedFor;
    return this.appendToPage('skills', content);
  }
  
  // READ page content - THE NEW KEY FEATURE!
  async getPageContent(pageKey) {
    const page = PAGES[pageKey];
    if (!page) throw new Error(`Unknown page: ${pageKey}`);
    
    const response = await fetch('https://backend.composio.dev/api/v3.1/tools/execute/NOTION_FETCH_BLOCK_CONTENTS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entity_id: ENTITY_ID,
        arguments: { block_id: page.id }
      })
    });
    
    const result = await response.json();
    if (!result.successful) {
      throw new Error(result.error?.message || JSON.stringify(result.error));
    }
    
    // Parse blocks to extract text
    const blocks = result.data?.results || [];
    return blocks.map(block => {
      const type = block.type;
      let text = '';
      
      if (type === 'paragraph') {
        text = block.paragraph?.rich_text?.map(t => t.plain_text).join('') || '';
      } else if (type === 'heading_1') {
        text = '## ' + (block.heading_1?.rich_text?.map(t => t.plain_text).join('') || '');
      } else if (type === 'heading_2') {
        text = '### ' + (block.heading_2?.rich_text?.map(t => t.plain_text).join('') || '');
      } else if (type === 'heading_3') {
        text = '#### ' + (block.heading_3?.rich_text?.map(t => t.plain_text).join('') || '');
      } else if (type === 'to_do') {
        const checked = block.to_do?.checked ? '☑' : '☐';
        text = checked + ' ' + (block.to_do?.rich_text?.map(t => t.plain_text).join('') || '');
      } else if (type === 'callout') {
        text = '💬 ' + (block.callout?.rich_text?.map(t => t.plain_text).join('') || '');
      }
      
      return { type, text };
    }).filter(b => b.text);
  }
  
  getUrl(pageKey) {
    const page = PAGES[pageKey];
    if (!page) return null;
    return `https://www.notion.so/${page.name.replace(/ /g, '-')}-${page.id}`;
  }
}


// BACKUP: Also write to local files for query capability
const BACKUP_DIR = './notion-backup';

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function backup(pageKey, entry) {
  ensureBackupDir();
  const fileMap = {
    'active': 'active.json', 'positions': 'positions.json', 
    'decisions': 'decisions.json', 'errors': 'errors.json',
    'knowledge': 'knowledge.json', 'preferences': 'preferences.json',
    'skills': 'skills.json'
  };
  const file = fileMap[pageKey];
  if (!file) return;
  
  const filePath = path.join(BACKUP_DIR, file);
  let data = [];
  if (fs.existsSync(filePath)) {
    try { data = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch(e) {}
  }
  data.push({ timestamp: new Date().toISOString(), entry });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Patch each log method to also backup
const originalSetActive = ComposioNotion.prototype.setActive;
ComposioNotion.prototype.setActive = async function(task, goal) {
  const result = await originalSetActive.call(this, task, goal);
  backup('active', new Date().toLocaleString('en-US', {timeZone:'America/Los_Angeles', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'}) + ' PT | Task: ' + task + (goal ? ' | Goal: ' + goal : ''));
  return result;
};

const originalLogDecision = ComposioNotion.prototype.logDecision;
ComposioNotion.prototype.logDecision = async function(decision, why) {
  const result = await originalLogDecision.call(this, decision, why);
  backup('decisions', new Date().toISOString().split('T')[0] + ' | Decision: ' + decision + ' | Why: ' + why);
  return result;
};

const originalLogTrade = ComposioNotion.prototype.logTrade;
ComposioNotion.prototype.logTrade = async function(symbol, action, shares, price, note) {
  const result = await originalLogTrade.call(this, symbol, action, shares, price, note);
  backup('positions', new Date().toISOString().split('T')[0] + ' | ' + action + ' ' + shares + ' ' + symbol + ' @ $' + price + (note ? ' - ' + note : ''));
  return result;
};

const originalLogError = ComposioNotion.prototype.logError;
ComposioNotion.prototype.logError = async function(error, fix) {
  const result = await originalLogError.call(this, error, fix);
  backup('errors', new Date().toISOString().split('T')[0] + ' | Error: ' + error + ' | Fix: ' + fix);
  return result;
};

const originalLogKnowledge = ComposioNotion.prototype.logKnowledge;
ComposioNotion.prototype.logKnowledge = async function(topic, insight) {
  const result = await originalLogKnowledge.call(this, topic, insight);
  backup('knowledge', new Date().toISOString().split('T')[0] + ' | ' + topic + ': ' + insight);
  return result;
};

const originalSetPreference = ComposioNotion.prototype.setPreference;
ComposioNotion.prototype.setPreference = async function(key, value) {
  const result = await originalSetPreference.call(this, key, value);
  backup('preferences', key + ': ' + value);
  return result;
};

const originalLogSkill = ComposioNotion.prototype.logSkill;
ComposioNotion.prototype.logSkill = async function(skill, usedFor) {
  const result = await originalLogSkill.call(this, skill, usedFor);
  backup('skills', new Date().toISOString().split('T')[0] + ' | ' + skill + ' | Used for: ' + usedFor);
  return result;
};


module.exports = { ComposioNotion, PAGES };

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const cn = new ComposioNotion();
  
  (async () => {
    try {
      switch (cmd) {
        case 'active':
          console.log(cn.getUrl('active'));
          break;
          
        case 'set-active':
          // Format: set-active <task> [--goal]
          const taskText = args.slice(1).join(' ');
          const [task, goalPart] = taskText.split('--');
          const goal = goalPart ? goalPart.trim() : '';
          await cn.setActive(task.trim(), goal);
          console.log('✅ Active updated');
          break;
          
        case 'decisions':
          console.log(cn.getUrl('decisions'));
          break;

        case 'positions':
          console.log(cn.getUrl('positions'));
          break;
          
        case 'trade':
          // Format: trade BUY AMC 17 1.44
          const action = args[1] || 'BUY';
          const symbol = args[2] || '?';
          const shares = args[3] || '0';
          const price = args[4] || '0';
          await cn.logTrade(symbol, action, shares, price);
          console.log('✅ Trade logged');
          break;
          
        case 'log-decision':
          // Format: log-decision <what> [--why]
          const decText = args.slice(1).join(' ');
          const [decision, whyPart] = decText.split('--');
          const why = whyPart ? whyPart.trim() : 'TBD';
          await cn.logDecision(decision.trim(), why);
          console.log('✅ Decision logged');
          break;
          
        case 'preference':
          // Format: preference <key> <value>
          const prefKey = args.slice(1, -1).join(' ');
          const prefValue = args.slice(2).join(' ');
          await cn.setPreference(prefKey, prefValue);
          console.log('Preference saved');
          break;
          
        case 'create':
          const title = args[1] || 'Test';
          const content = args.slice(2).join(' ') || '';
          const page = await cn.createPage(title, content);
          console.log('Created:', page.url);
          break;
          
        case 'errors':
          console.log(cn.getUrl('errors'));
          break;
          
        case 'log-error':
          const errText = args.slice(1).join(' ').split('--')[0].trim() || 'TBD';
          const errFix = args.join(' ').split('--')[1]?.trim() || 'TBD';
          await cn.logError(errText, errFix);
          console.log('✅ Error logged');
          break;
          
        case 'knowledge':
          console.log(cn.getUrl('knowledge'));
          break;
          
        case 'log-knowledge':
          const knowText = args.slice(1).join(' ').split('--')[0].trim() || 'TBD';
          const knowRest = args.join(' ').split('--')[1] || 'TBD';
          const [knowInsight, knowApply] = knowRest.split('|');
          await cn.logKnowledge(knowText, knowInsight.trim(), knowApply?.trim());
          console.log('✅ Knowledge logged');
          break;
          
        case 'preferences':
          console.log(cn.getUrl('preferences'));
          break;
          
        case 'skills':
          console.log(cn.getUrl('skills'));
          break;
          
        case 'log-skill':
          const skillName = args.slice(1).join(' ').split('--')[0].trim() || 'TBD';
          const skillUse = args.join(' ').split('--')[1]?.trim() || 'TBD';
          await cn.logSkill(skillName, skillUse);
          console.log('Skill logged');
          break;
          
        case 'fix':
          const fixIssue = args[1] || 'Unknown';
          const fixApply = args.slice(2).join(' ') || 'Applied';
          await cn.logError(fixIssue, fixApply);
          await cn.logKnowledge(fixIssue, 'Fixed: ' + fixApply);
          console.log('Error + Knowledge logged');
          break;
          
        case 'log-project':
          const projName = args[1] || 'unknown';
          const projAction = args.slice(2).join(' ') || 'worked on';
          await cn.logKnowledge(projName, projAction);
          console.log('Project logged');
          break;
          
        case 'list':
          const all = await execute('NOTION_SEARCH_NOTION_PAGE', 'list all pages');
          all.results?.forEach(p => {
            console.log(`- ${p.properties?.title?.title?.[0]?.plain_text || 'Untitled'}`);
          });
          break;
          
        default:
          console.log('Commands:');
          console.log('  active                  - Get URL');
          console.log('  set-active <task> [--goal]');
          console.log('  positions               - Get URL');
          console.log('  trade <BUY/SELL> <sym> <shares> <price>');
          console.log('  log-decision <what> [--why]');
          console.log('  errors                  - Get URL');
          console.log('  log-error <error> --<fix>');
          console.log('  knowledge               - Get URL');
          console.log('  log-knowledge <topic> --<insight>|<applyWhen>');
          console.log('  create <title> [content]');
          console.log('  list                    - List all');
      }
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  })();
}