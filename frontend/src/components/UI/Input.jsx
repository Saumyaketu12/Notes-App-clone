import React from 'react';

/**
 * Props:
 * - label (string)
 * - value
 * - onChange
 * - placeholder
 * - type (text|password|email)
 * - className (additional classes)
 * - textarea (boolean) -> renders a textarea when true
 * - rows (for textarea)
 */
export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  textarea = false,
  rows = 4,
  id,
  ...rest
}) {
  const base = 'w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300';
  return (
    <div className={className}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`${base} resize-vertical`}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={base}
          {...rest}
        />
      )}
    </div>
  );
}
