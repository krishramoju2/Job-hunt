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

  useEffect(() => {
    fetch('/api/forum').then((res) => res.json()).then(setThoughts);
    fetch('/api/jobs').then((res) => res.json()).then(setJobs);
  }, []);

  async function handleSubmit(e) {
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

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded"
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
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Post
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-2">Posts</h2>
      {thoughts.map((t, i) => (
        <div
          key={i}
          className={`bg-white p-4 my-2 rounded shadow`}
          style={{ fontFamily: `var(${t.font})` }}
        >
          {t.text}
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6 mb-2">Live Jobs</h2>
      {jobs.map((job, i) => (
        <div key={i} className="bg-green-100 p-3 my-2 rounded">
          <p className="font-semibold">{job.title}</p>
          <p className="text-sm">{job.company}</p>
          <a
            href={job.link}
            target="_blank"
            className="text-blue-700 underline"
            rel="noopener noreferrer"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
}
