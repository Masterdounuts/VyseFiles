#!/usr/bin/env node
const API_KEY = "ak_rqw4yFTcvTeLfd9TWpmn";

async function search(query) {
  const r = await fetch("https://backend.composio.dev/api/v3.1/tools/execute/NOTION_SEARCH_NOTION_PAGE", {
    method: "POST",
    headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ entity_id: "Vyse notion", text: query })
  });
  const d = await r.json();
  // Results are at data.results, not data.page_or_database.results
  return d.data?.results || [];
}

async function getPage(pageId) {
  const r = await fetch("https://backend.composio.dev/api/v3.1/tools/execute/NOTION_RETRIEVE_PAGE", {
    method: "POST",
    headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ entity_id: "Vyse notion", text: pageId })
  });
  const d = await r.json();
  return d.data;
}

const args = process.argv.slice(2);
const cmd = args[0];

(async () => {
  if (cmd === "search") {
    const results = await search(args.slice(1).join(" "));
    console.log("=== Found " + results.length + " pages ===");
    results.forEach(p => {
      const title = p.properties?.title?.title?.[0]?.plain_text || "Untitled";
      console.log("- " + title);
    });
  } else if (cmd === "get") {
    const page = await getPage(args[1]);
    console.log("Title:", page?.properties?.title?.title?.[0]?.plain_text);
    console.log("URL:", page?.url);
    console.log("Last edited:", page?.last_edited_time);
  } else {
    console.log("Usage: node notion-query.cjs search <query>|get <page_id>");
  }
})();
