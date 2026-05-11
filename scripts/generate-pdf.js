const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generatePDF() {
    const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
    const pdfPath = path.join(__dirname, '../kb/portfolio/resume.pdf');
    const stream = fs.createWriteStream(pdfPath);
    
    doc.pipe(stream);
    
    const black = '#000000';
    const darkBlue = '#1a1a2e';
    const blue = '#0066cc';
    
    // ===== NAME =====
    doc.fillColor(darkBlue).fontSize(24).font('Helvetica-Bold').text('DAVID JACQUES', { align: 'center' });
    doc.moveDown(0.3);
    
    // ===== CONTACT =====
    doc.fillColor(black).fontSize(9).font('Helvetica').text(
        '(442) 270-9989  •  Jacquesdavid59@gmail.com  •  Astoria, OR',
        { align: 'center' }
    );
    doc.fillColor(blue).fontSize(9).font('Helvetica').text(
        'jacquesdavid59.wixsite.com/website',
        { align: 'center' }
    );
    doc.fillColor(black).text('', { align: 'center' });
    doc.moveDown(0.5);
    
    // Line
    doc.strokeColor(black).lineWidth(0.5).moveTo(50, doc.y).lineTo(510, doc.y).stroke();
    doc.moveDown(0.5);
    
    // ===== SUMMARY (expanded - full intro) =====
    doc.fillColor(darkBlue).fontSize(11).font('Helvetica-Bold').text('SUMMARY');
    doc.moveDown(0.3);
    doc.fillColor(black).fontSize(9).font('Helvetica');
    doc.text(
        'Game designer driven by one question: how do games change lives? At 8 years old, Skies of Arcadia taught me that a persons actions dont define their worth — a lesson that stuck with me and inspired me to create games that impact players the same way.',
        { align: 'left' }
    );
    doc.moveDown(0.3);
    doc.text(
        'My path has been unconventional. Army Infantry (2013-2016) taught me discipline and how to lead under pressure. ' +
        'Full Sail University gave me the technical foundation (BS Game Design, 2019-2021). But the real education has been the indie grind — ' +
        'teaching myself UE5, building a full Skies of Arcadia fan remake from scratch, and continuously learning new tools as I go.',
        { align: 'left' }
    );
    doc.moveDown(0.3);
    
    doc.font('Helvetica-Bold').text('AI Partnership: ');
    doc.font('Helvetica').text(
        'Recently, I partnered with an AI agent to build a complete working system — skills architecture, memory systems, ' +
        'workflow automation — from the ground up. What started as "scared of AI" became "building with AI as a partner." ' +
        'This experience shows my ability to learn fast, solve problems creatively, and build systems that work. ' +
        'It is also the story of how I approach everything: find what inspires me, figure out how to build it, and keep pushing forward.',
        { align: 'left' }
    );
    doc.moveDown(0.6);
    
    // ===== SKILLS =====
    doc.fillColor(darkBlue).fontSize(11).font('Helvetica-Bold').text('SKILLS');
    doc.moveDown(0.3);
    doc.fillColor(black).fontSize(9).font('Helvetica');
    
    doc.font('Helvetica-Bold').text('Game Design: ');
    doc.font('Helvetica').text('Level Design, Gameplay Mechanics, UX/UI Design, Systems Design, Gameplay Programming');
    doc.moveDown(0.2);
    
    doc.font('Helvetica-Bold').text('Engine: ');
    doc.font('Helvetica').text('Unreal Engine 5, Nanite, Lumen, Blueprint Visual Scripting');
    doc.moveDown(0.2);
    
    doc.font('Helvetica-Bold').text('3D Tools: ');
    doc.font('Helvetica').text('Blender, Maya, Quixel Bridge, Asset Integration');
    doc.moveDown(0.2);
    
    doc.font('Helvetica-Bold').text('Version Control & Project Management: ');
    doc.font('Helvetica').text('Perforce, Trello');
    doc.moveDown(0.2);
    
    doc.font('Helvetica-Bold').text('AI & Automation: ');
    doc.font('Helvetica').text('AI Agent Configuration, Memory Systems, OpenClaw');
    doc.moveDown(0.6);
    
    // ===== EXPERIENCE =====
    doc.fillColor(darkBlue).fontSize(11).font('Helvetica-Bold').text('EXPERIENCE');
    doc.moveDown(0.3);
    
    // Job 1
    doc.fillColor(black).fontSize(10).font('Helvetica-Bold').text('Skies of Arcadia Fan Remake');
    doc.font('Helvetica').text('Independent Development  |  2021 - Present');
    doc.moveDown(0.1);
    doc.fontSize(9).text(
        'Building a full-scale remake of the classic game in Unreal Engine 5. ' +
        'Modeled and textured environment assets and buildings. Implemented Nanite/Lumen for modern graphics. ' +
        'Created cinematic cutscenes, full asset integration via Quixel Bridge. ' +
        'Managed project independently while continuously learning new tools.',
        { align: 'left' }
    );
    doc.moveDown(0.4);
    
    // Job 2
    doc.fontSize(10).font('Helvetica-Bold').text('Game Designer — Spaceballs The Game');
    doc.font('Helvetica').text('SinDevSeven Team  |  April 2021 - July 2021');
    doc.moveDown(0.1);
    doc.fontSize(9).text(
        'Capstone project with 7-person team. Scripted gameplay mechanics and transitions. ' +
        'Designed gameplay loops, created UX/UI for menus and instructions. ' +
        'Collaborated across disciplines to deliver playable demo.',
        { align: 'left' }
    );
    doc.moveDown(0.6);
    
    // ===== EDUCATION =====
    doc.fillColor(darkBlue).fontSize(11).font('Helvetica-Bold').text('EDUCATION');
    doc.moveDown(0.3);
    
    doc.fillColor(black).fontSize(10).font('Helvetica-Bold').text('Bachelor of Science, Game Design');
    doc.font('Helvetica').text('Full Sail University  |  2019 - 2021');
    doc.moveDown(0.1);
    doc.fontSize(9).text('Focus on game mechanics, level design, and interactive storytelling.', { align: 'left' });
    doc.moveDown(0.4);
    
    // ===== MILITARY =====
    doc.fontSize(10).font('Helvetica-Bold').text('U.S. Army Infantry');
    doc.font('Helvetica').text('2013 - 2016');
    doc.moveDown(0.1);
    doc.fontSize(9).text('Discipline, leadership, and teamwork fundamentals.', { align: 'left' });
    doc.moveDown(0.6);
    
    // ===== THE JOURNEY =====
    doc.fillColor(darkBlue).fontSize(11).font('Helvetica-Bold').text('THE JOURNEY');
    doc.moveDown(0.3);
    doc.fillColor(black).fontSize(9).font('Helvetica');
    doc.text(
        'Army Infantry → Full Sail Game Design → Self-taught UE5. This is not a typical career path — ' +
        'it is a transformation story of someone who found their passion and pursued it fully.',
        { align: 'left' }
    );
    doc.moveDown(0.5);
    
    // ===== PORTFOLIO =====
    doc.fillColor(darkBlue).fontSize(11).font('Helvetica-Bold').text('PORTFOLIO');
    doc.moveDown(0.3);
    doc.fillColor(blue).fontSize(10).font('Helvetica').text('jacquesdavid59.wixsite.com/website');
    doc.fillColor(black).fontSize(9).text('Skies of Arcadia Fan Remake  •  Spaceballs Team Project  •  Project Videos');
    
    doc.end();
    
    stream.on('finish', () => {
        console.log('PDF generated:', pdfPath);
    });
}

generatePDF();