// src/components/Layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext'; // <- updated path
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth() || {};

  return (
    <header className="bg-white dark:bg-card shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary-50 to-accent p-2 rounded-2xl shadow-soft">
            <svg className="w-6 h-6 text-primary-500" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>

        <div className="flex-1 max-w-lg ml-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border bg-gray-50 dark:bg-[#071129] focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 dark:text-gray-300">{user.name}</div>
              <button onClick={logout} className="px-3 py-1 rounded-md bg-red-50 text-red-600 text-sm">Sign out</button>
            </div>
          ) : (
            <Link to="/login" className="px-3 py-2 bg-blue-600 text-white rounded-md">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
