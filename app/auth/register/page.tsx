'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/app/components/AuthForm';

export default function RegisterPage() {  
  const router = useRouter();

  // Handle register
  const handleRegister = async (email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    alert('Registration successful! Please login.');
    // Redirect to login page
    router.push('/auth/login');
  };
  // Render register form
  return <AuthForm type="register" onSubmit={handleRegister} />;
}
