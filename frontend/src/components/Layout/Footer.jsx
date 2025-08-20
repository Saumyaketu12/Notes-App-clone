import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Notes</span>
          <span className="text-sm text-gray-500">— simple, private notes</span>
        </div>

        <nav className="flex gap-4 text-sm text-gray-600">
          <Link to="/terms" className="hover:text-gray-900">Terms</Link>
          <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
          <Link to="/about" className="hover:text-gray-900">About</Link>
        </nav>

        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Notes — Built with ❤️
        </div>
      </div>
    </footer>
  );
}
