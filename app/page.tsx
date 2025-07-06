import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to UpSkillFam</h1>
        <Link href="/login" className="text-blue-600 underline">
          Login / Register
        </Link>
      </div>
    </main>
  );
}
