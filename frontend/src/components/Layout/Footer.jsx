// src/components/Layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-card)] border-t mt-8 text-[var(--color-text-primary)]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Notes</span>
          <span className="text-sm text-[var(--color-text-muted)]">
            — simple, private notes
          </span>
        </div>

        <nav className="flex gap-4 text-sm text-[var(--color-text-muted)]">
          <Link to="/terms" className="hover:text-[var(--color-text-primary)]">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-[var(--color-text-primary)]">
            Privacy
          </Link>
          <Link to="/about" className="hover:text-[var(--color-text-primary)]">
            About
          </Link>
        </nav>

        <div className="text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Notes — Built with ❤️
        </div>
      </div>
    </footer>
  );
}