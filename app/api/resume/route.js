import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, education, experience, skills, projects } = body;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  let y = height - 50;

  const drawLine = () => {
    y -= 10;
    page.drawLine({
      start: { x: 50, y },
      end: { x: width - 50, y },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    y -= 20;
  };

  const writeSection = (title, lines) => {
    page.drawText(title, { x: 50, y, size: 14, font, color: rgb(0, 0, 0.8) });
    y -= 20;
    lines.forEach((line) => {
      page.drawText(line, { x: 60, y, size: fontSize, font });
      y -= 18;
    });
    drawLine();
  };

  page.drawText(name || '', { x: 50, y, size: 18, font, color: rgb(0.2, 0.2, 0.2) });
  y -= 25;
  page.drawText(`${email} | ${phone}`, { x: 50, y, size: fontSize, font });
  drawLine();

  writeSection('Education', education.map((e) => `${e.degree} - ${e.institution} (${e.year})`));
  writeSection('Experience', experience.map((e) => `${e.role} at ${e.company} (${e.year}) - ${e.details}`));
  writeSection('Projects', projects.map((p) => `${p.title}: ${p.description}`));
  writeSection('Skills', skills.map((s) => `• ${s}`));

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
    },
  });
}
