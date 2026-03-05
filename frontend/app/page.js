'use client';

import Link from 'next/link';
import { useAuth } from './hooks/useAuth';
import Button from './components/Button';
import Card from './components/Card';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            TaskApp
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Organize, prioritize, and accomplish your goals with ease
          </p>
          <p className="text-gray-500 mb-8 text-lg">
            A modern task management application designed for teams and individuals
          </p>
          <div className="flex gap-4 justify-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="primary">
                  📊 Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="lg" variant="primary">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card variant="elevated">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Intuitive interface designed for quick task creation and management
            </p>
          </Card>
          <Card variant="elevated">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Fast & Responsive</h3>
            <p className="text-gray-600">
              Built with modern technologies for lightning-fast performance
            </p>
          </Card>
          <Card variant="elevated">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Secure</h3>
            <p className="text-gray-600">
              Your data is protected with secure authentication and encryption
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of users who are already managing their tasks efficiently
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}