'use client';

import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';

export default function UserMenu() {
  // Get user and logout function
  const { user, logout } = useAuth();

  // Render login/register links if user is not logged in
  if (!user) {
    return (
      <div className="flex gap-4">
        <Link href="/auth/login" className="text-blue-500 hover:underline">Login</Link>
        <Link href="/auth/register" className="text-blue-500 hover:underline">Register</Link>
      </div>
    );
  }

  // Render user menu if user is logged in
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 dark:text-gray-200">{user.email}</span>
      <button onClick={logout} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">
        Logout
      </button>
    </div>
  );
}
