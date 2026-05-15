// Composio Notion helper - WORKING with READ/WRITE
// Usage: node composio-notion.cjs <command> [args]

const API_KEY = process.env.COMPOSIO_API_KEY || 'ak_rqw4yFTcvTeLfd9TWpmn';
const ENTITY_ID = 'Vyse notion';
const PARENT_PAGE_ID = '3614f051-c508-8064-b995-cd38be6f896c';

const TOOLS = {
  createPage: 'NOTION_CREATE_NOTION_PAGE',
  searchPages: 'NOTION_SEARCH_NOTION_PAGE',
  addContent: 'NOTION_ADD_PAGE_CONTENT'
};

const PAGE_IDS = {
  'vyse-brain': '3614f051-c508-8110-bcf1da45b7684b10',
  'active-context': '3614f051-c508-81f4-9dce-c34c35f2e128',
  'positions': '3614f051-c508-81a2-b92bc3e2d486fb28',
  'decisions': '3614f051-c508-818d-8e72f60abf962929'
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
  async createPage(title, content = '') {
    const text = content 
      ? `create a page titled "${title}" under the page with ID ${PARENT_PAGE_ID} with content: ${content}`
      : `create a page titled "${title}" under the page with ID ${PARENT_PAGE_ID}`;
    return execute(TOOLS.createPage, text);
  }
  
  async searchPages(query = '') {
    const text = query 
      ? `search for pages matching "${query}"`
      : 'list all pages in my workspace';
    return execute(TOOLS.searchPages, text);
  }
  
  async updatePage(pageKey, newContent) {
    // Add content to existing page
    return execute(TOOLS.addContent,
      `replace the content of the page with ID ${PAGE_IDS[pageKey]} with: ${newContent}`);
  }
  
  async addToPage(pageKey, content) {
    return execute(TOOLS.addContent,
      `add the following to the page with ID ${PAGE_IDS[pageKey]}: ${content}`);
  }
  
  // QUICK: Get active context (1 sentence)
  async getActive() {
    const result = await this.searchPages('Active Context');
    return result.results?.[0] || null;
  }
  
  // QUICK: Get positions
  async getPositions() {
    const result = await this.searchPages('Trading Positions');
    return result.results?.[0] || null;
  }
  
  // QUICK: Log decision
  async logDecision(decision, why) {
    const entry = `\n### ${new Date().toISOString().split('T')[0]}\n**Decision:** ${decision}\n**Why:** ${why}`;
    return this.addToPage('decisions', entry);
  }
  
  // QUICK: Update active context
  async setActive(task, goal = '') {
    const content = `# Active Context\n\n*Last updated: ${new Date().toISOString()}*\n\n## Current Task\n${task}\n\n## Goal\n${goal || '_TBD_'}\n`;
    return this.updatePage('active-context', content);
  }
  
  // QUICK: Update positions
  async setPositions(positions) {
    let table = '\n| Symbol | Shares | Entry | Target | Stop | Status |\n|--------|--------|-------|--------|------|--------|\n';
    for (const p of positions) {
      table += `| ${p.symbol} | ${p.shares} | ${p.entry} | ${p.target || '-'} | ${p.stop || '-'} | ${p.status} |\n`;
    }
    const content = `# Trading Positions\n\n*Last updated: ${new Date().toISOString()}*\n\n## Current Holdings${table}\n`;
    return this.updatePage('positions', content);
  }
}

module.exports = { ComposioNotion, PAGE_IDS, TOOLS };

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  
  const cn = new ComposioNotion();
  
  (async () => {
    try {
      switch (cmd) {
        case 'active':
          // Get active context
          const active = await cn.getActive();
          console.log('Active Context:', active?.url || 'Not found');
          break;
          
        case 'set-active':
          // node composio-notion.cjs set-active "Working on X" "Goal: Y"
          const task = args[1] || 'Nothing specific';
          const goal = args[2] || '';
          await cn.setActive(task, goal);
          console.log('✅ Active context updated');
          break;
          
        case 'positions':
          const pos = await cn.getPositions();
          console.log('Positions:', pos?.url || 'Not found');
          break;
          
        case 'set-positions':
          // Simplified: just update with text
          const posText = args.slice(1).join(' ') || 'Updated';
          await cn.updatePage('positions', posText);
          console.log('✅ Positions updated');
          break;
          
        case 'log-decision':
          // node composio-notion.cjs log-decision "Decision" "Why"
          const decision = args[1] || 'TBD';
          const why = args[2] || 'TBD';
          await cn.logDecision(decision, why);
          console.log('✅ Decision logged');
          break;
          
        case 'create':
          const title = args[1] || 'Test Page';
          const content = args.slice(2).join(' ') || '';
          const page = await cn.createPage(title, content);
          console.log('Created:', page.url);
          break;
          
        case 'list':
          const all = await cn.searchPages('');
          all.results?.forEach(p => {
            console.log(`- ${p.properties?.title?.title?.[0]?.plain_text || 'Untitled'} (${p.id})`);
          });
          break;
          
        default:
          console.log('Usage: node composio-notion.cjs <command> [args]');
          console.log('Commands:');
          console.log('  active                    - Get active context URL');
          console.log('  set-active <task> [goal]  - Update active context');
          console.log('  positions                 - Get positions URL');
          console.log('  set-positions <text>     - Update positions');
          console.log('  log-decision <what> <why>- Log a decision');
          console.log('  create <title> [content] - Create new page');
          console.log('  list                     - List all pages');
      }
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  })();
}