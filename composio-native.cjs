#!/usr/bin/env node
// Composio Native Integration via `composio run`
// This gives TRUE native integration - execute() and search() are available directly

const { execSync } = require('child_process');
const CLI = '/home/openclaw/.composio/composio';

/**
 * Run JavaScript with Composio helpers injected natively
 * This is the proper integration - not CLI parsing
 */
function run(code) {
  const tmpFile = '/tmp/composio-native-' + Date.now() + '.mjs';
  require('fs').writeFileSync(tmpFile, code);
  try {
    const output = execSync(`${CLI} run -f ${tmpFile}`, { 
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024 
    });
    // Extract JSON from output (skip logs)
    const lines = output.split('\n');
    let jsonStart = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith('{') || lines[i].trim().startsWith('[')) {
        jsonStart = i;
        break;
      }
    }
    if (jsonStart >= 0) {
      const jsonStr = lines.slice(jsonStart).join('\n');
      try {
        return JSON.parse(jsonStr);
      } catch {
        return { raw: output };
      }
    }
    return { raw: output };
  } catch (e) {
    // Try to extract error
    const match = e.message.match(/{[^}]*"error":\s*"([^"]+)"[^}]*}/);
    if (match) {
      throw new Error(match[1]);
    }
    throw e;
  }
}

// CLI handler
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];
  
  if (cmd === 'test') {
    // Test native integration
    const result = run(`
      const gh = await execute("GITHUB_LIST_COMMITS", { owner: "Masterdounuts", repo: "VyseFiles", per_page: 2 });
      const notion = await execute("NOTION_SEARCH_NOTION_PAGE", { query: "" });
      ({ github: gh.successful, notion: notion.successful, pages: notion.data.results?.length || 0 });
    `);
    console.log(JSON.stringify(result, null, 2));
  } else if (cmd === 'execute' || cmd === 'e') {
    const slug = args[1];
    const params = args[2] ? JSON.parse(args[2]) : {};
    const result = run(`
      const r = await execute("${slug}", ${JSON.stringify(params)});
      r;
    `);
    console.log(JSON.stringify(result, null, 2));
  } else if (cmd === 'search' || cmd === 's') {
    const query = args.slice(1).join(' ');
    const result = run(`
      const r = await search("${query}", { limit: 5 });
      r;
    `);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('Usage:');
    console.log('  composio-native.cjs test           - Test native integration');
    console.log('  composio-native.cjs e <slug> <json> - Execute a tool');
    console.log('  composio-native.cjs s <query>       - Search for tools');
  }
}

module.exports = { run };