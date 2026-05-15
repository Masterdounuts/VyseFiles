#!/usr/bin/env node
const API_KEY = "ak_rqw4yFTcvTeLfd9TWpmn";
const repo = process.argv[2] || "Masterdounuts/VyseFiles";

(async () => {
  const response = await fetch("https://backend.composio.dev/api/v3.1/tools/execute/GITHUB_LIST_COMMITS", {
    method: "POST",
    headers: { 
      "Authorization": "Bearer " + API_KEY, 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ 
      entity_id: "Vyse Github", 
      text: repo 
    })
  });
  
  const data = await response.json();
  const commits = data.data?.commits || [];
  
  console.log("=== Recent Commits ===");
  commits.forEach(c => {
    const msg = c.commit.message.split("\n")[0].substring(0,60);
    console.log(msg);
  });
})();