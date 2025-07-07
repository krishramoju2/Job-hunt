import fs from 'fs';

const filePath = 'feedback.json';

export async function POST(req) {
  const body = await req.text();
  const { feedback } = JSON.parse(body);
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

  const newFeedback = {
    feedback,
    time: new Date().toISOString(),
  };

  existing.push(newFeedback);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  return new Response('Saved', { status: 200 });
}

export async function GET() {
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];
  return Response.json(data);
}
