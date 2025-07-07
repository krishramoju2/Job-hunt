import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  role: string;
  company: string;
  year: string;
  details: string;
}

interface Project {
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}

export async function generateResumePDF(data: ResumeData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
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

  const writeSection = (title: string, lines: string[]) => {
    if (y < 100) {
      pdfDoc.addPage();
    }
    page.drawText(title, { x: 50, y, size: 14, font, color: rgb(0, 0, 0.8) });
    y -= 20;
    lines.forEach((line) => {
      page.drawText(line, { x: 60, y, size: fontSize, font });
      y -= 18;
    });
    drawLine();
  };

  // Header
  page.drawText(data.name, { x: 50, y, size: 18, font, color: rgb(0.2, 0.2, 0.2) });
  y -= 25;
  page.drawText(`${data.email} | ${data.phone}`, { x: 50, y, size: fontSize, font });
  drawLine();

  // Sections
  writeSection('Education', data.education.map(e => `${e.degree} - ${e.institution} (${e.year})`));
  writeSection('Experience', data.experience.map(e => `${e.role} at ${e.company} (${e.year}) - ${e.details}`));
  writeSection('Projects', data.projects.map(p => `${p.title}: ${p.description}`));
  writeSection('Skills', data.skills.map(s => `• ${s}`));

  return pdfDoc.save();
}
