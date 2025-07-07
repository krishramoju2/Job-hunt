'use client';

import { useState, useEffect } from 'react';

const fontOptions = [
  { label: 'Dancing Script', value: '--font-dancing' },
  { label: 'Lobster', value: '--font-lobster' },
  { label: 'Pacifico', value: '--font-pacifico' },
];

export default function Forum() {
  const [text, setText] = useState('');
  const [font, setFont] = useState('--font-dancing');
  const [thoughts, setThoughts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [interns, setInterns] = useState(0);

  useEffect(() => {
    fetch('/api/forum').then((res) => res.json()).then(setThoughts);
    fetch('/api/jobs').then((res) => res.json()).then(setJobs);
    fetch('/api/interns').then((res) => res.json()).then((data) => setInterns(data.count));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/forum', {
      method: 'POST',
      body: JSON.stringify({ text, font }),
    });
    const res = await fetch('/api/forum');
    const data = await res.json();
    setThoughts(data);
    setText('');
    setFont('--font-dancing');
  }

  async function handleGotInterned() {
    await fetch('/api/interns', { method: 'POST' });
    const res = await fetch('/api/interns');
    const data = await res.json();
    setInterns(data.count);
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">UpSkillFam Community Forum</h1>

      {/* Intern Counter */}
      <div className="mb-8 text-center">
        <p className="text-lg text-gray-700">🎉 <span className="font-bold">{interns}</span> people got internships through UpSkillFam!</p>
        <button
          onClick={handleGotInterned}
          className="mt-2 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          I Got Interned!
        </button>
      </div>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="mb-8 max-w-2xl mx-auto space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded shadow-sm"
          placeholder="Share your thoughts on becoming a great SDE..."
        />
        <div>
          <label className="block mb-1 text-sm font-medium">Choose Font Style:</label>
          <select
            className="p-2 border rounded w-full"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            {fontOptions.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>

      {/* Forum Posts */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">Shared Thoughts</h2>
        {thoughts.map((t, i) => (
          <div
            key={i}
            className="bg-white p-4 my-3 rounded-xl shadow-md border border-gray-200"
            style={{ fontFamily: `var(${t.font})` }}
          >
            {t.text}
          </div>
        ))}
      </div>

      {/* Job Bubbles */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Job Opportunities</h2>
        <div className="flex flex-wrap gap-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full shadow-md hover:scale-105 transition w-fit max-w-sm"
            >
              <p className="text-lg font-semibold text-gray-800">{job.title}</p>
              <p className="text-sm text-gray-600 mb-1">{job.company}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 text-sm underline"
              >
                View Job
              </a>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="mt-12 max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Give Us Feedback</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const feedback = (form.elements.namedItem('feedback') as HTMLTextAreaElement).value;
              await fetch('/api/feedback', {
                method: 'POST',
                body: JSON.stringify({ feedback }),
              });
              form.reset();
              alert('Thank you for your feedback!');
            }}
          >
            <textarea
              name="feedback"
              required
              className="w-full p-3 border rounded mb-3"
              placeholder="Your thoughts, ideas, or issues..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
