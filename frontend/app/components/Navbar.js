'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
          📋 TaskApp
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-200 transition font-medium">
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-blue-200">{user.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white border-white hover:bg-blue-700"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
