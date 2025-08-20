import React from "react";
export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded ${className || "bg-blue-600 text-white"}`}
    >
      {children}
    </button>
  );
}
