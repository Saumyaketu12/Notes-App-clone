// src/components/Nptes/ShareModal.jsx

import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function ShareModal({ shareUrl, onCreate }) {
  const { theme } = useTheme();

  return (
    <div className="p-4 rounded shadow transition-colors duration-300 bg-[var(--color-bg-card)] text-[var(--color-text-primary)]">
      <h4 className="font-semibold mb-2">Share link</h4>
      {shareUrl ? (
        <div className="flex gap-2">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 border p-2 rounded bg-[var(--color-bg-input)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="px-3 py-2 bg-[var(--color-accent-blue)] text-white rounded hover:opacity-90 transition-colors"
          >
            Copy
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <button
            onClick={onCreate}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Create public link
          </button>
          <div className="text-sm text-gray-500">
            Make this note public to generate a permalink.
          </div>
        </div>
      )}
    </div>
  );
}
