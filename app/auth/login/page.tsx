'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/app/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    // Set token in local storage
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    // Redirect to home page
    router.push('/');
  };

  // Render login form
  return <AuthForm type="login" onSubmit={handleLogin} />;
}
