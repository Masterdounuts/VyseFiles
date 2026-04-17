#!/usr/bin/env bash
# Verify that the default web‑search provider works.
# If DuckDuckGo fails, fall back to Brave (if key present).

if curl -s "https://duckduckgo.com/?q=test" | grep -q "DuckDuckGo"; then
  echo "Web search OK (DuckDuckGo)"
else
  echo "DuckDuckGo failed – switching to Brave"
  # Update config (this is a stub; actual command uses openclaw config patch)
  # openclaw config patch '{"tools.web.search.provider":"brave"}'
fi
