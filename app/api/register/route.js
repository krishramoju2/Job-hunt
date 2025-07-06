import fs from 'fs';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();
  const db = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  if (db[username]) return new Response('Exists', { status: 400 });

  db[username] = await bcrypt.hash(password, 10);
  fs.writeFileSync('users.json', JSON.stringify(db));
  return new Response('OK');
}
