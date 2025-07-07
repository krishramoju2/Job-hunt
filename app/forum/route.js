import fs from 'fs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const font = searchParams.get('font');
  const keyword = searchParams.get('keyword')?.toLowerCase();

  const posts = JSON.parse(fs.readFileSync('forum.json', 'utf8'));

  const filtered = posts.filter((post) => {
    const matchesFont = font ? post.font === font : true;
    const matchesKeyword = keyword ? post.text.toLowerCase().includes(keyword) : true;
    return matchesFont && matchesKeyword;
  });

  return Response.json(filtered);
}

export async function POST(req) {
  const { text, font } = await req.json();
  const posts = JSON.parse(fs.readFileSync('forum.json', 'utf8'));
  posts.push({ text, font });
  fs.writeFileSync('forum.json', JSON.stringify(posts));
  return new Response('Posted');
}
