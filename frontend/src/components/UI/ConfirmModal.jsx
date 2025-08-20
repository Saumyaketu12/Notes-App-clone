import React from 'react';
import ReactDOM from 'react-dom';

export default function ConfirmModal({ open, title='Confirm', message, onCancel, onConfirm }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="bg-card dark:bg-[#071126] rounded-2xl p-6 z-10 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded bg-white border">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded bg-red-600 text-white">Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
