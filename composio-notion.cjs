// Composio Notion helper - WORKING
// Usage: node composio-notion.cjs <command> [args]

const API_KEY = process.env.COMPOSIO_API_KEY || 'ak_rqw4yFTcvTeLfd9TWpmn';
const ENTITY_ID = 'Vyse notion';
const PARENT_PAGE_ID = '3614f051-c508-8064-b995-cd38be6f896c'; // Welcome to Notion

const TOOLS = {
  createPage: 'NOTION_CREATE_NOTION_PAGE',
  searchPages: 'NOTION_SEARCH_NOTION_PAGE',
  addContent: 'NOTION_ADD_PAGE_CONTENT',
  createDatabase: 'NOTION_CREATE_DATABASE',
  insertRow: 'NOTION_INSERT_ROW_DATABASE',
  queryDatabase: 'NOTION_QUERY_DATABASE',
  createComment: 'NOTION_CREATE_COMMENT'
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
  
  async addContent(pageTitle, content) {
    return execute(TOOLS.addContent, 
      `add "${content}" to the page titled "${pageTitle}"`);
  }
  
  async addContentById(pageId, content) {
    return execute(TOOLS.addContent,
      `add the following content to the page with ID ${pageId}: ${content}`);
  }
}

module.exports = { ComposioNotion, TOOLS, execute };

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  
  const cn = new ComposioNotion();
  
  (async () => {
    try {
      switch (cmd) {
        case 'create':
          const title = args[1] || 'Test Page';
          const content = args[2] || '';
          console.log(`Creating page: ${title}`);
          const page = await cn.createPage(title, content);
          console.log('Created:', page.url);
          break;
          
        case 'search':
          const query = args[1] || '';
          console.log(`Searching: ${query || 'all pages'}`);
          const results = await cn.searchPages(query);
          console.log(`Found ${results.results?.length || 0} pages`);
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
          console.log('  create <title> [content]  - Create a new page');
          console.log('  search [query]            - Search pages');
          console.log('  list                      - List all pages');
      }
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  })();
}