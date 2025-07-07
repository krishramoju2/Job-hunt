'use client';

import { useState, useEffect } from 'react';

const fontOptions = [
  { label: 'All Fonts', value: '' },
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
  const [contacts, setContacts] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  const [blogFontFilter, setBlogFontFilter] = useState('');
  const [blogKeyword, setBlogKeyword] = useState('');
  const [jobKeyword, setJobKeyword] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [quotes, setQuotes] = useState([]);

useEffect(() => {
  fetch('/api/quotes')
    .then((res) => res.json())
    .then(setQuotes);
}, []);


  useEffect(() => {
    fetch('/api/hackathons').then(res => res.json()).then(setHackathons);
    fetch('/api/hrcontacts').then(res => res.json()).then(setContacts);
  }, []);

  useEffect(() => {
    const queryForum = new URLSearchParams();
    if (blogFontFilter) queryForum.set('font', blogFontFilter);
    if (blogKeyword) queryForum.set('keyword', blogKeyword);

    fetch(`/api/forum?${queryForum}`).then(res => res.json()).then(setThoughts);

    const queryJobs = new URLSearchParams();
    if (jobKeyword) queryJobs.set('keyword', jobKeyword);
    if (jobCompany) queryJobs.set('company', jobCompany);

    fetch(`/api/jobs?${queryJobs}`).then(res => res.json()).then(setJobs);
    fetch('/api/interns').then(res => res.json()).then(data => setInterns(data.count));
  }, [blogFontFilter, blogKeyword, jobKeyword, jobCompany]);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/forum', {
      method: 'POST',
      body: JSON.stringify({ text, font }),
    });
    setText('');
    setFont('--font-dancing');
    setBlogFontFilter('');
    setBlogKeyword('');
  }

  async function handleGotInterned() {
    await fetch('/api/interns', { method: 'POST' });
    const res = await fetch('/api/interns');
    const data = await res.json();
    setInterns(data.count);
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">💡 Inspirational Sayings from Tech Leaders</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {quotes.map((q, i) => (
      <div
        key={i}
        className="bg-glass p-6 rounded-2xl shadow-magic backdrop-blur-lg border border-white/20 animate-float hover-bubble"
      >
        <p className="text-lg italic font-pacifico text-gray-900">“{q.quote}”</p>
        <p className="mt-2 text-right font-semibold text-sm text-gray-700">— {q.author}</p>
      </div>
    ))}
  </div>
</div>

    <div className="p-10 bg-gray-50 min-h-screen relative overflow-hidden">
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div className="blob bg-pink-400 w-96 h-96 top-10 left-10"></div>
        <div className="blob bg-blue-400 w-72 h-72 top-60 left-40"></div>
      </div>

      <h1 className="text-4xl bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text font-bold text-center mb-8">
        UpSkillFam Community Forum
      </h1>

      <div className="mb-8 text-center">
        <p className="text-lg text-gray-700">
          🎉 <span className="font-bold">{interns}</span> people got internships through UpSkillFam!
        </p>
        <button
          onClick={handleGotInterned}
          className="mt-2 px-5 py-2 bg-black text-white font-bold rounded-full border-2 border-lime-400 shadow-lg shadow-lime-400/50 hover:scale-105 transition-all"
        >
          I Got Interned!
        </button>
      </div>

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
            {fontOptions.slice(1).map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
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

      <div className="max-w-2xl mx-auto mb-6 space-y-2">
        <h2 className="text-xl font-bold">Filter Blog Posts</h2>
        <select
          className="w-full p-2 border rounded"
          value={blogFontFilter}
          onChange={(e) => setBlogFontFilter(e.target.value)}
        >
          {fontOptions.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search keyword in posts..."
          value={blogKeyword}
          onChange={(e) => setBlogKeyword(e.target.value)}
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Shared Thoughts</h2>
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

      <div className="mt-12 max-w-2xl mx-auto space-y-2">
        <h2 className="text-xl font-bold">Filter Jobs</h2>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Keyword (e.g., SDE, intern)..."
          value={jobKeyword}
          onChange={(e) => setJobKeyword(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Company (e.g., Google)..."
          value={jobCompany}
          onChange={(e) => setJobCompany(e.target.value)}
        />
      </div>

      <div className="mt-8">
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
                className="link-rainbow text-sm"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Give Us Feedback</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const feedback = form.feedback.value;
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

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🚀 Upcoming Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hackathons.map((h, i) => (
            <div key={i} className="bg-yellow-50 p-4 rounded-xl shadow border border-yellow-200">
              <p className="text-lg font-semibold text-gray-900">{h.name}</p>
              <p className="text-sm text-gray-600 mb-1">{h.date}</p>
              <p className="text-sm text-gray-500">{h.location}</p>
              <a
                href={h.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-sm underline"
              >
                View Event
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">SDE HR Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((c, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow border">
              <p className="text-lg font-semibold text-gray-900">{c.name}</p>
              <p className="text-sm text-gray-700">{c.title}</p>
              <p className="text-sm text-gray-600">{c.company}</p>
              {c.email && (
                <a href={`mailto:${c.email}`} className="text-blue-700 text-sm underline">
                  {c.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
