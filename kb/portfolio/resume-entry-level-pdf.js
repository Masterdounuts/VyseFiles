const PdfPrinter = require('pdfkit');
const fs = require('fs');

const doc = new PdfPrinter();
const stream = fs.createWriteStream('/home/openclaw/.openclaw/workspace-vyse/kb/portfolio/resume-entry-level.pdf');
doc.pipe(stream);

const margin = 50;
let y = 50;

// Header
doc.font('Helvetica-Bold').fontSize(18).text('David Jacques', margin, y);
y += 24;
doc.font('Helvetica').fontSize(10).text('Phone: (442)270-9989  |  Email: Jacquesdavid59@gmail.com  |  Location: Astoria, OR', margin, y);
y += 40;

// Objective
doc.font('Helvetica-Bold').fontSize(11).text('Objective', margin, y);
y += 12;
doc.font('Helvetica').fontSize(10).text('Motivated and reliable individual seeking a gas station attendant position. Committed to providing exceptional customer service, maintaining a clean and organized work environment, and being a dependable team member. Eager to learn new skills and contribute to a fast-paced retail operation.', margin, y, { width: 495 });
y += 40;

// Work Experience
doc.font('Helvetica-Bold').fontSize(11).text('Work Experience', margin, y);
y += 12;

// Domino's
doc.font('Helvetica-Bold').fontSize(10).text('Domino\'s Delivery Driver | 2024 - 2026', margin, y);
y += 12;
doc.font('Helvetica').fontSize(9).text('• Delivered food to customers in a timely and professional manner', margin, y);
y += 12;
doc.text('• Handled cash and credit card transactions accurately', margin, y);
y += 12;
doc.text('• Maintained excellent customer service standards', margin, y);
y += 12;
doc.text('• Managed delivery schedule and routes efficiently', margin, y);
y += 12;

// Game Developer
doc.font('Helvetica-Bold').fontSize(10).text('Independent Game Developer | 2018 - 2024', margin, y);
y += 12;
doc.font('Helvetica').fontSize(9).text('• Self-directed project development and time management', margin, y);
y += 12;
doc.text('• Strong problem-solving and computer skills', margin, y);
y += 12;
doc.text('• Managed personal projects while pursuing career goals', margin, y);
y += 12;

// Army
doc.font('Helvetica-Bold').fontSize(10).text('U.S. Army Infantry | 2013 - 2016', margin, y);
y += 12;
doc.font('Helvetica').fontSize(9).text('• Demonstrated discipline, accountability, and reliability', margin, y);
y += 12;
doc.text('• Thrived in team-oriented environments', margin, y);
y += 12;
doc.text('• Managed stress effectively under pressure', margin, y);
y += 12;

// Security
doc.font('Helvetica-Bold').fontSize(10).text('Boyd and Associates Security | 2012 - 2013', margin, y);
y += 12;
doc.font('Helvetica').fontSize(9).text('• Handled conflict resolution professionally', margin, y);
y += 12;
doc.text('• Communicated effectively face-to-face with clients', margin, y);
y += 12;
doc.text('• Maintained security and safety of premises', margin, y);
y += 12;

// Slipcovers
doc.font('Helvetica-Bold').fontSize(10).text('Omega\'s Custom Slipcovers | 2011 - 2012', margin, y);
y += 12;
doc.font('Helvetica').fontSize(9).text('• Provided customer service and assistance', margin, y);
y += 12;
doc.text('• Handled phone communications', margin, y);
y += 12;
doc.text('• Proficient with computer systems', margin, y);
y += 12;

// Jewelry
doc.font('Helvetica-Bold').fontSize(10).text('L And R Jewelry Craftier | 2011 - 2012', margin, y);
y += 12;
doc.font('Helvetica').fontSize(9).text('• Maintained crafting tools and equipment', margin, y);
y += 12;
doc.text('• Stocked materials and supplies', margin, y);
y += 12;
doc.text('• Organized workshop operations', margin, y);
y += 12;

// Education
doc.font('Helvetica-Bold').fontSize(11).text('Education', margin, y);
y += 12;

doc.font('Helvetica-Bold').fontSize(9).text('Full Sail University', margin, y);
doc.font('Helvetica').fontSize(9).text('BS, Computer Science (Game Design) | 2016 - 2018', margin + 180, y);
y += 13;

doc.font('Helvetica-Bold').fontSize(9).text('Gilbert High School', margin, y);
doc.font('Helvetica').fontSize(9).text('High School Diploma | 2012', margin + 180, y);
y += 13;

doc.font('Helvetica-Bold').fontSize(9).text('AKI Security Training Center', margin, y);
doc.font('Helvetica').fontSize(9).text('Guard Card Certification | 2012', margin + 180, y);
y += 13;

doc.font('Helvetica-Bold').fontSize(9).text('U.S. Army Infantry School', margin, y);
doc.font('Helvetica').fontSize(9).text('Infantry Certificate | 2013', margin + 180, y);
y += 12;

// Skills
doc.font('Helvetica-Bold').fontSize(11).text('Skills', margin, y);
y += 12;

const skills = [
  'Customer Service & Communication',
  'Cash Handling & Transactions',
  'Conflict Resolution',
  'Inventory Management & Stocking',
  'Time Management',
  'Cleaning & Maintenance',
  'Computer Proficient',
  'Reliable & Punctual',
  'Team Player',
  'Strong Work Ethic'
];

doc.font('Helvetica').fontSize(9);
for (let i = 0; i < skills.length; i++) {
  doc.text('• ' + skills[i], margin, y, { width: 230 });
  y += 10;
}

// Footer
doc.font('Helvetica').fontSize(8).text('Last updated: 2026-05-10', margin, y + 10);

doc.end();
stream.on('finish', () => console.log('PDF generated successfully'));