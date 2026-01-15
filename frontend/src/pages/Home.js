import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">💰 Expense Splitter</h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90">
            Manage and split your expenses with ease
          </p>
          <div className="flex gap-4 justify-center">
            {token ? (
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 border border-white"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
              <p className="text-gray-600">
                Easily track all your expenses with detailed categories and dates
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and secure with JWT authentication
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">
                View detailed statistics and breakdowns of your spending
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
