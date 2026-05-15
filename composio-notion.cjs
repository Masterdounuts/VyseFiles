// Composio Notion helper - FIXED v2
// Usage: node composio-notion.cjs <command> [args]

const API_KEY = process.env.COMPOSIO_API_KEY || 'ak_rqw4yFTcvTeLfd9TWpmn';
const ENTITY_ID = 'Vyse notion';
const PARENT_PAGE_ID = '3614f051-c508-8064-b995-cd38be6f896c';

// Page IDs - using explicit IDs that work
const PAGES = {
  'active': { id: '3614f051-c508-81f4-9dce-c34c35f2e128', name: 'Active Context' },
  'positions': { id: '3614f051-c508-81a2-b92b-c3e2d486fb28', name: 'Trading Positions' },
  'decisions': { id: '3614f051-c508-8174-837e-d441600c77b2', name: 'Decisions Log' },
  'errors': { id: '3614f051-c508-813f-b99a-c62d62516f6b', name: 'Errors & Fixes' },
  'knowledge': { id: '3614f051-c508-81fe-aadd-e1edcc4359b7', name: 'Knowledge Base' }
};

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
  if (!result.successful) {
    throw new Error(result.error || result.data?.message);
  }
  return result.data;
}

class ComposioNotion {
  // CREATE new page
  async createPage(title, content = '') {
    return execute('NOTION_CREATE_NOTION_PAGE', 
      `create a page titled "${title}" under the page with ID ${PARENT_PAGE_ID} with content: ${content}`
    );
  }
  
  // APPEND to existing page (using explicit ID in prompt - THIS IS THE KEY FIX)
  async appendToPage(pageKey, content) {
    const page = PAGES[pageKey];
    if (!page) throw new Error(`Unknown page: ${pageKey}. Use: active, positions, decisions`);
    
    // Using explicit page ID in prompt - this works!
    return execute('NOTION_ADD_PAGE_CONTENT',
      `add the following new section to the page with ID ${page.id}: ${content}`
    );
  }
  
  // Set active context
  async setActive(task, goal = '') {
    const ts = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const content = ts + ' PT | ' + task + (goal ? ' | Goal: ' + goal : '');
    return this.appendToPage('active', content);
  }
  
  // Log decision
  async logDecision(decision, why) {
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
    const content = `**${ts}**\n\n**Topic:** ${topic}\n\n**Insight:** ${insight}\n\n**Apply When:** ${applyWhen || 'TBD'}`;
    return this.appendToPage('knowledge', content);
  }
  
  getUrl(pageKey) {
    const page = PAGES[pageKey];
    if (!page) return null;
    return `https://www.notion.so/${page.name.replace(/ /g, '-')}-${page.id}`;
  }
}

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