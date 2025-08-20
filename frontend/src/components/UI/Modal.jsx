import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Spinner from './Spinner';

/**
 * Props:
 * - open (bool)
 * - onClose (fn)
 * - title (string)
 * - children
 * - onSubmit (fn) optional
 * - submitLabel (string) optional
 * - submitting (bool) optional
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Save',
  submitting = false,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="p-5">
            {children}
          </div>

          <div className="px-5 py-3 bg-gray-50 flex items-center justify-end gap-3">
            <button onClick={onClose} className="px-3 py-2 rounded bg-white border text-sm">Cancel</button>
            <Button onClick={onSubmit} className="px-3 py-2">
              {submitting ? <div className="flex items-center gap-2"><Spinner size="sm" /> Saving...</div> : submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
