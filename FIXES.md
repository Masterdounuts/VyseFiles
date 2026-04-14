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
