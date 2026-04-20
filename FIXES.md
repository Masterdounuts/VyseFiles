[[index|Home]] • [[[[INTERRUPT_RECOVERY]]|Interrupt Recovery]]


# FIXES & SOLUTIONS LOG

A running record of problems we've solved so we don't fix them twice.

---

## Web Search Not Working
- **Date:** April 13, 2026
- **Problem:** web_search returned no results
- **Root Cause:** duckduckgo plugin not enabled in config
- **Fix:** Add `"duckduckgo": {"enabled": true}` to `plugins.entries` in openclaw.json, then restart gateway
- **Status:** ✅ Stable

---

## Dream Jobs Failing
- **Date:** April 14, 2026
- **Problem:** Dream cron jobs failed reading memory/dream files
- **Root Cause:** Wrong file paths or file not existing at runtime
- **Fix:** Updated dream job messages to handle missing files gracefully
- **Status:** ✅ Stable

---

## PDF Formatting Not Applying
- **Date:** April 14, 2026
- **Problem:** HTML centering tags (<div align="center">) didn't translate to PDF
- **Root Cause:** HTML doesn't work in pandoc PDF conversion
- **Fix:** Use LaTeX formatting in YAML header:
```yaml
---
geometry: margin=1in
---

\begin{center}
{\Huge TITLE}
{\Large Subtitle}
\end{center}
```
- **Status:** ✅ Fixed

---

## Gateway Restart Resetting Plugins
- **Date:** April 14, 2026
- **Problem:** memory-core (dreaming) and duckduckgo plugins disabled after gateway restart
- **Fix:** Re-enabled in config + added note to check plugins after restart
- **Status:** ✅ Monitor

---

*Last updated: April 14, 2026*
---

## PDF Document Formatting Lessons
- **Date:** April 14, 2026

### Always Verify Final Product
- Check the actual PDF, not just the markdown source
- HTML/markdown formatting tags often don't translate to PDF
- LaTeX formatting is more reliable for PDF output

### Use LaTeX for PDF Formatting
- HTML tags like `<div align="center">` don't work in pandoc PDFs
- Use LaTeX commands instead: `\begin{center}`, `{\Huge title}`, `\section*`
- Test changes by regenerating PDF before pushing

### Check for Stray Commands
- LaTeX commands like `\end{document}` can leak into output
- Always scroll through PDF to check for errors

### Visual Polish Matters
- Input boxes > underscores (looks professional)
- Bold section headers with consistent spacing
- Remove template watermarks/footer dates
- Make fill-in lines clear with underlines

---

*Added: April 14, 2026 - After completing FinalAffidavit.pdf*

---

## Web Search Usage Guidelines (April 14, 2026)

- **DuckDuckGo**: Unlimited - use freely, humanize calls with 1-2s delays
- **Brave**: Emergency backup only (limited to 1,000/month)
- Retry up to 3x if needed, but don't spam
- If blocked, wait and retry later


---
## GGB Stock Price Fetch Fix
- **Date:** April 14, 2026
- **Problem:** GGB price couldn't be fetched via web search or page fetches (blocked, required JS)
- **Fix:** Use CNBC quotes page directly: `https://www.cnc.com/quotes/GGB`
- **Works for:** Both TSLA and GGB use CNBC format: `/quotes/{TICKER}`
- **Status:** Fixed - price $4.29 captured

---
## Cron Job Telegram Delivery Fix
- **Date:** April 16, 2026
- **Problem:** Vyse-Readiness-Check (5 errors) + GGB-price-watch (1 error) failing on Telegram delivery
- **Root Cause:** Jobs configured with @username (@VyseAgent_bot) instead of numeric chat ID, or missing delivery.to
- **Fix:** Updated delivery.to to numeric ID 8742211590
- **Status:** ✅ FIXED (23:11 UTC)

---
## Gateway Watch Cron Path Bug
- **Date:** April 17, 2026
- **Problem:** gateway-watch cron failing with ENOENT on script path
- **Root Cause:** Cron triggers `/root/.openclaw/workspace/scripts/gateway_watch. sh` (space before .sh), actual file is `/home/openclaw/.openclaw/workspace/scripts/gateway_watch.sh`
- **Fix:** Script path corrected - now points to correct location `/root/.openclaw/workspace/scripts/gateway_watch.sh`
- **Status:** ✅ FIXED (verified Apr 20, 2026) - cron runs successfully with 0 errors
