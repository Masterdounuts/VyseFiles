# PDF Creation & Generation Skill

*Create, format, and generate PDFs - resumes, reports, documents*

---

## What This Skill Does

Handles all document operations:
- Write/edit documents (markdown, text, code)
- Convert to PDF
- Format and structure
- Generate from templates

---

## Common Tasks

### 1. Create/Edit Markdown
```bash
# Use write tool to create new file
write path: "folder/document.md" content: "# Title\n\nContent..."

# Use edit tool to modify existing
edit path: "folder/document.md" edits: [{oldText: "...", newText: "..."}]
```

### 2. Generate PDF from Markdown

**Method A: Custom PDF Script**
```javascript
// Create a .js file using pdfkit
const PdfPrinter = require('pdfkit');
const fs = require('fs');

const doc = new PdfPrinter();
const stream = fs.createWriteStream('output.pdf');
doc.pipe(stream);

// Add content
doc.font('Helvetica-Bold').fontSize(18).text('Title', 50, 50);
doc.font('Helvetica').fontSize(12).text('Body text...', 50, 80);

doc.end();
stream.on('finish', () => console.log('PDF generated'));
```

**Method B: Use browser print**
```javascript
// Create HTML, then use browser to print to PDF
```

### 3. Audit Documents

When reviewing a PDF:
```javascript
// Use pdf tool to extract and review
pdf prompt: "Extract all text and review for errors" pdf: "path/to/file.pdf"
```

### 4. Resume Best Practices

| Element | Rule |
|---------|------|
| Dates | Use past tense, no future dates |
| Sections | Objective → Experience → Education → Skills |
| Action verbs | Start each bullet with strong verb |
| Quantify | Add numbers where possible |
| Length | 1 page for entry-level |

---

## Files in This Skill

- `resume-entry-level.md` - Template markdown
- `resume-entry-level-pdf.js` - PDF generator script
- `resume-entry-level.pdf` - Generated output

---

## Quick Reference

| Task | Tool |
|------|------|
| Create new doc | `write` |
| Edit existing | `edit` |
| Convert to PDF | Run custom `.js` script |
| Review PDF | `pdf` tool |
| Convert HTML to PDF | Browser + print |

---

*Skill created: 2026-05-11*