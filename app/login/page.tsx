'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/${isRegister ? 'register' : 'login'}`, {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/forum');
    else alert('Failed');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <h2 className="text-xl font-bold">{isRegister ? 'Register' : 'Login'}</h2>
        <input placeholder="Username" className="border p-2 w-full" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Password" type="password" className="border p-2 w-full" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isRegister ? 'Register' : 'Login'}</button>
        <p className="text-sm cursor-pointer text-blue-600" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account?' : 'Create an account'}
        </p>
      </form>
    </div>
  );
}
