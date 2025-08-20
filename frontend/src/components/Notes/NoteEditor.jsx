import 'highlight.js/styles/github.css';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { FiBold, FiItalic, FiCode, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useDebounce from '../../hooks/useDebounce';
import toast from 'react-hot-toast';

function wrapSelection(textarea, before, after) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const val = textarea.value;
  const selected = val.slice(start, end) || 'text';
  const newVal = val.slice(0, start) + before + selected + after + val.slice(end);
  textarea.value = newVal;
  textarea.selectionStart = start + before.length;
  textarea.selectionEnd = start + before.length + selected.length;
  textarea.focus();
  const event = new Event('input', { bubbles: true });
  textarea.dispatchEvent(event);
}

export default function NoteEditor({ title, setTitle, content, setContent, onSave }) {
  const [preview, setPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const taRef = useRef();
  const editorRef = taRef;

  // autosave via prop callback onSave (if provided)
  useDebounce(async () => {
    if (!onSave) return;
    setSaving(true);
    try {
      await onSave({ title, content });
      setSaving(false);
      toast.success('Saved');
    } catch {
      setSaving(false);
      toast.error('Save failed');
    }
  }, 2000, [title, content]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        onSave?.({ title, content });
        toast.success('Saved');
      }
      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        // handled by app-level shortcut to create a note
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [title, content, onSave]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="text-2xl font-semibold w-full bg-transparent border-b pb-2" />

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div>{saving ? 'Saving…' : 'Saved'}</div>
          <button onClick={() => setPreview(p => !p)} className="px-3 py-1 border rounded">{preview ? 'Edit' : 'Preview'}</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#041023] border rounded-2xl shadow-soft overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b">
          <button onClick={() => wrapSelection(taRef.current, '**', '**')} title="Bold" className="p-2 hover:bg-gray-100 rounded"><FiBold /></button>
          <button onClick={() => wrapSelection(taRef.current, '_', '_')} title="Italic" className="p-2 hover:bg-gray-100 rounded"><FiItalic /></button>
          <button onClick={() => wrapSelection(taRef.current, '`', '`')} title="Code" className="p-2 hover:bg-gray-100 rounded"><FiCode /></button>
          <div className="flex-1" />
          <div className="text-xs text-gray-500">Markdown enabled • <kbd className="px-1 border rounded">Ctrl/Cmd</kbd> + <kbd className="px-1 border rounded">S</kbd> to save</div>
        </div>

        <div className="md:flex">
          <textarea
            ref={taRef}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="# Write markdown..."
            className={`w-full md:w-1/2 h-[60vh] p-4 bg-transparent resize-none border-r dark:border-white/5`}
            style={{ minHeight: 300 }}
          />

          {preview && (
            <div className="md:w-1/2 p-4 overflow-auto prose max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content || '*Nothing to preview*'}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

