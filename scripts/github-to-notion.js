#!/usr/bin/env node
// GitHub to Notion - Auto-log commits
// Usage: node github-to-notion.js [recent|log]

const API_KEY = process.env.COMPOSIO_API_KEY || 'ak_rqw4yFTcvTeLfd9TWpmn';

async function getRecentCommits(repo = 'Masterdounuts/VyseFiles', limit = 5) {
  const response = await fetch('https://backend.composio.dev/api/v3.1/tools/execute/GITHUB_LIST_COMMITS', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      entity_id: 'Vyse Github',
      text: repo
    })
  });
  
  const result = await response.json();
  return result.data?.commits?.slice(0, limit) || [];
}

async function logToNotion(message) {
  const ts = new Date().toISOString().split('T')[0];
  const response = await fetch('https://backend.composio.dev/api/v3.1/tools/execute/NOTION_ADD_PAGE_CONTENT', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      entity_id: 'Vyse notion',
      text: 'add to page 3614f051-c508-81b2-8cbb-6dd65e0f9c30: ' + ts + ' | GitHub | ' + message
    })
  });
  return response.ok;
}

const args = process.argv.slice(2);
const cmd = args[0];

(async () => {
  if (cmd === 'recent') {
    const commits = await getRecentCommits();
    console.log('=== Recent Commits ===');
    commits.forEach(c => {
      const msg = c.commit.message.split('\n')[0].substring(0, 60);
      const date = c.commit.author.date.substring(0, 10);
      console.log(date + ' | ' + msg);
    });
  } else if (cmd === 'log') {
    const msg = args.slice(1).join(' ') || 'Manual commit';
    await logToNotion(msg);
    console.log('✅ Logged to Notion:', msg);
  } else {
    console.log('Usage: node github-to-notion.js [recent|log <message>]');
  }
})();