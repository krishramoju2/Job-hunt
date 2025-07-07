'use client';

import { useState } from 'react';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ role: '', company: '', duration: '', details: '' }],
    skills: '',
    projects: [{ name: '', description: '', tech: '' }],
  });

  const handleChange = (section, index, field, value) => {
    if (index !== null) {
      const newArray = [...formData[section]];
      newArray[index][field] = value;
      setFormData({ ...formData, [section]: newArray });
    } else {
      setFormData({ ...formData, [section]: value });
    }
  };

  const addEntry = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/resume', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    a.click();
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📄 Resume Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Full Name" className="p-2 border rounded" value={formData.fullName} onChange={e => handleChange('fullName', null, null, e.target.value)} />
          <input placeholder="Email" className="p-2 border rounded" value={formData.email} onChange={e => handleChange('email', null, null, e.target.value)} />
          <input placeholder="Phone" className="p-2 border rounded" value={formData.phone} onChange={e => handleChange('phone', null, null, e.target.value)} />
        </div>

        <textarea placeholder="Professional Summary" className="w-full p-2 border rounded" value={formData.summary} onChange={e => handleChange('summary', null, null, e.target.value)} />

        <div>
          <h2 className="font-bold mb-2">🎓 Education</h2>
          {formData.education.map((ed, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input placeholder="Degree" className="p-2 border rounded" value={ed.degree} onChange={e => handleChange('education', i, 'degree', e.target.value)} />
              <input placeholder="Institution" className="p-2 border rounded" value={ed.institution} onChange={e => handleChange('education', i, 'institution', e.target.value)} />
              <input placeholder="Year" className="p-2 border rounded" value={ed.year} onChange={e => handleChange('education', i, 'year', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={() => addEntry('education', { degree: '', institution: '', year: '' })} className="text-sm text-blue-600">+ Add Education</button>
        </div>

        <div>
          <h2 className="font-bold mb-2">💼 Experience</h2>
          {formData.experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 mb-2">
              <input placeholder="Role" className="p-2 border rounded" value={exp.role} onChange={e => handleChange('experience', i, 'role', e.target.value)} />
              <input placeholder="Company" className="p-2 border rounded" value={exp.company} onChange={e => handleChange('experience', i, 'company', e.target.value)} />
              <input placeholder="Duration" className="p-2 border rounded" value={exp.duration} onChange={e => handleChange('experience', i, 'duration', e.target.value)} />
              <input placeholder="Details" className="p-2 border rounded" value={exp.details} onChange={e => handleChange('experience', i, 'details', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={() => addEntry('experience', { role: '', company: '', duration: '', details: '' })} className="text-sm text-blue-600">+ Add Experience</button>
        </div>

        <textarea placeholder="Skills (comma separated)" className="w-full p-2 border rounded" value={formData.skills} onChange={e => handleChange('skills', null, null, e.target.value)} />

        <div>
          <h2 className="font-bold mb-2">🛠 Projects</h2>
          {formData.projects.map((proj, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input placeholder="Name" className="p-2 border rounded" value={proj.name} onChange={e => handleChange('projects', i, 'name', e.target.value)} />
              <input placeholder="Description" className="p-2 border rounded" value={proj.description} onChange={e => handleChange('projects', i, 'description', e.target.value)} />
              <input placeholder="Tech Used" className="p-2 border rounded" value={proj.tech} onChange={e => handleChange('projects', i, 'tech', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={() => addEntry('projects', { name: '', description: '', tech: '' })} className="text-sm text-blue-600">+ Add Project</button>
        </div>

        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Download PDF</button>
      </form>
    </div>
  );
}
