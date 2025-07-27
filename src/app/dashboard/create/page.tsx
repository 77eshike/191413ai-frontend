'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AxiosError } from 'axios';
import axios from 'axios';

export default function CreateProjectPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await axios.post('/api/projects/create', { name, description });
      router.push('/dashboard');
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      setErrorMsg(err.response?.data?.message || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">创建新项目</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="project-name" className="block mb-1 font-medium">
            项目名称
          </label>
          <input
            id="project-name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="project-description" className="block mb-1 font-medium">
            项目描述
          </label>
          <textarea
            id="project-description"
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? '创建中...' : '创建项目'}
        </button>
      </form>
    </div>
  );
}
