import React from "react";
export default function ShareModal({ shareUrl, onCreate }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">Share link</h4>
      {shareUrl ? (
        <div className="flex gap-2">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Copy
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <button
            onClick={onCreate}
            className="px-3 py-2 bg-green-600 text-white rounded"
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
