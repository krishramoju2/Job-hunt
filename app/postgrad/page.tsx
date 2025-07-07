'use client';

import { useState } from 'react';

export default function PostgradProfileBuilder() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    undergrad: '',
    cgpa: '',
    gre: '',
    toefl: '',
    sop: '',
    projects: '',
    publications: '',
    targetCountries: '',
    targetPrograms: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/postgrad', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🎓 Postgrad Profile Builder
      </h1>

      {submitted ? (
        <p className="text-green-600 text-center text-lg">
          ✅ Profile submitted successfully! We'll review and provide suggestions shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Undergraduate Institution</label>
            <input
              name="undergrad"
              type="text"
              value={form.undergrad}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">CGPA</label>
              <input
                name="cgpa"
                type="text"
                value={form.cgpa}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">GRE Score</label>
              <input
                name="gre"
                type="text"
                value={form.gre}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">TOEFL/IELTS Score</label>
              <input
                name="toefl"
                type="text"
                value={form.toefl}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Projects</label>
            <textarea
              name="projects"
              value={form.projects}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              placeholder="List your notable academic/tech projects"
            />
          </div>

          <div>
            <label className="block font-medium">Publications (if any)</label>
            <textarea
              name="publications"
              value={form.publications}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              placeholder="Mention any journals, conferences, etc."
            />
          </div>

          <div>
            <label className="block font-medium">Statement of Purpose (SOP)</label>
            <textarea
              name="sop"
              value={form.sop}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              placeholder="Paste or write your SOP here"
            />
          </div>

          <div>
            <label className="block font-medium">Target Countries</label>
            <input
              name="targetCountries"
              type="text"
              value={form.targetCountries}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., USA, Canada, Germany"
            />
          </div>

          <div>
            <label className="block font-medium">Target Programs</label>
            <input
              name="targetPrograms"
              type="text"
              value={form.targetPrograms}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., MS CS, MBA, PhD AI"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Submit Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
