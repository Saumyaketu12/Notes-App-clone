// src/components/UI/Button.jsx

import React from "react";

export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded transition-transform transform hover:scale-105 ${className || "bg-[var(--color-accent-blue)] text-white"}`}
    >
      {children}
    </button>
  );
}