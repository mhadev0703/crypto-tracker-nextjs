'use client';

import { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string) => Promise<void>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err: any) {
      setError(err.message || 'Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">{type === 'login' ? 'Login' : 'Register'}</h2>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-200">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? 'Processing...' : (type === 'login' ? 'Login' : 'Register')}
      </button>
    </form>
  );
}
