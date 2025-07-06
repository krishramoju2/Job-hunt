import fs from 'fs';

export async function GET() {
  const posts = JSON.parse(fs.readFileSync('forum.json', 'utf8'));
  return Response.json(posts);
}

export async function POST(req) {
  const { text } = await req.json();
  const posts = JSON.parse(fs.readFileSync('forum.json', 'utf8'));
  posts.push({ text });
  fs.writeFileSync('forum.json', JSON.stringify(posts));
  return new Response('Posted');
}
