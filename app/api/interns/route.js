import fs from 'fs';

const filePath = 'interns.json';

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Response.json({ count: data.count || 0 });
}

export async function POST() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.count = (data.count || 0) + 1;
  fs.writeFileSync(filePath, JSON.stringify(data));
  return new Response('Updated', { status: 200 });
}
