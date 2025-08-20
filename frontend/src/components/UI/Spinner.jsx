import React from 'react';

/**
 * size: 'sm' | 'md' | 'lg' or number (px)
 */
export default function Spinner({ size = 'md', className = '' }) {
  const px = typeof size === 'number' ? size : (size === 'sm' ? 14 : size === 'lg' ? 28 : 20);
  return (
    <svg
      className={`animate-spin ${className}`}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.12)" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
