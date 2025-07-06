import fs from 'fs';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();
  const db = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  const match = await bcrypt.compare(password, db[username] || '');
  return new Response(match ? 'OK' : 'NO', { status: match ? 200 : 401 });
}
