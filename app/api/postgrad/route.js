import fs from 'fs';
import path from 'path';

const filePath = path.resolve('postgrad_profiles.json');

export async function POST(req) {
  try {
    const body = await req.text();
    const data = JSON.parse(body);

    let profiles = [];
    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf8');
      profiles = JSON.parse(existing);
    }

    profiles.push({ ...data, submittedAt: new Date().toISOString() });

    fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const profiles = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return new Response(JSON.stringify(profiles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load profiles' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
