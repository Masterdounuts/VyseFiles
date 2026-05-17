#!/usr/bin/env node
// GitHub commits via Composio CLI
// Usage: node github-commits.js [owner/repo] [per_page]

const { execSync } = require('child_process');
const CLI = '/home/openclaw/.composio/composio';

const args = process.argv.slice(2);
const repo = args[0] || "Masterdounuts/VyseFiles";
const perPage = args[1] || 5;

const [owner, repoName] = repo.split('/');

try {
  const output = execSync(`${CLI} execute GITHUB_LIST_COMMITS -d '{"owner": "${owner}", "repo": "${repoName}", "per_page": ${perPage}}'`, {
    encoding: 'utf8'
  });
  
  const result = JSON.parse(output);
  
  if (!result.successful) {
    console.error('Error:', result.error);
    process.exit(1);
  }
  
  const commits = result.data?.commits || [];
  
  console.log(`=== Recent Commits (${repo}) ===`);
  commits.forEach(c => {
    const msg = c.commit.message.split("\n")[0].substring(0,60);
    console.log(msg);
  });
} catch (e) {
  console.error('Failed:', e.message);
  process.exit(1);
}