import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-weird-gradient text-white px-4">
      <div className="text-center max-w-xl bg-glass p-10 rounded-2xl shadow-magic backdrop-blur-md border border-white/20">
        <h1 className="text-5xl font-bold mb-6 animate-float">🚀 Welcome to UpSkillFam</h1>
        <p className="text-lg mb-6">Build your future with internships, resumes, forums, and more!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/login" className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition hover:shadow-md">
            Login / Register
          </Link>
          <Link href="/forum" className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition hover:shadow-md">
            Community Forum
          </Link>
          <Link href="/resume" className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition hover:shadow-md">
            Resume Builder
          </Link>
          <Link href="/postgrad" className="bg-white text-pink-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition hover:shadow-md">
            Postgrad Profile Builder
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/70">Explore job boards, hackathons, HR contacts and more inside!</p>
      </div>
    </main>
  );
}
