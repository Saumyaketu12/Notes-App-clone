// src/components/Notes/NoteEditor.jsx

import 'highlight.js/styles/github.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { FiBold, FiItalic, FiCode } from 'react-icons/fi';
import useDebounce from '../../hooks/useDebounce';
import DrawingCanvas from './DrawingCanvas';
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
  const [showDrawing, setShowDrawing] = useState(false);

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
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [title, content, onSave]);

  // inside NoteEditor component (replace existing handleInsertDrawing)
  async function handleInsertDrawing(urlOrData) {
    // Insert image markdown at cursor
    const ta = taRef.current;
    if (!ta) return;

    // New logic: Only proceed if a valid URL is returned
    if(urlOrData && urlOrData.startsWith('http')){
      const markdown = `![](${urlOrData})`;
      const start = ta.selectionStart || 0;
      const end = ta.selectionEnd || 0;
      const val = ta.value || '';
      const newVal = val.slice(0, start) + markdown + val.slice(end);

      // update textarea and local state
      ta.value = newVal;
      if (typeof setContent === 'function') setContent(newVal);

      // move caret and focus
      const pos = start + markdown.length;
      ta.selectionStart = ta.selectionEnd = pos;
      ta.focus();

      // Persist the note immediately (so share will include the image)
      if (typeof onSave === 'function') {
        try {
          // Call onSave with latest title + content and wait for it (onSave should call notesService.updateNote)
          await onSave({ title, content: newVal });
          toast?.success?.('Drawing inserted and note saved');
        } catch (err) {
          console.error('Failed to save note after inserting drawing', err);
          toast?.error?.('Inserted drawing but failed to save note');
          // still close the modal — content updated locally
        }
      } else {
        // No onSave provided — just give user feedback (note is updated in state)
        toast?.success?.('Drawing inserted (not auto-saved)');
      }
    }else{
      // If the upload failed, the urlOrData would be a data url.
      // Instead of inserting it, we just show an error.
      toast?.error?.('Failed to insert drawing. Please try again.');
    }
    setShowDrawing(false);
  }


  return (
    <div className="space-y-3">
      <div className="p-3 border rounded">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => wrapSelection(taRef.current, '**', '**')} className="px-3 py-1 hover:bg-gray-100 rounded"><FiBold /></button>
          <button onClick={() => wrapSelection(taRef.current, '_', '_')} className="px-3 py-1 hover:bg-gray-100 rounded"><FiItalic /></button>
          <button onClick={() => wrapSelection(taRef.current, '`', '`')} className="px-3 py-1 hover:bg-gray-100 rounded"><FiCode /></button>

          <button className="px-3 py-1 mr-2 bg-indigo-600 text-white rounded hover:opacity-90 transition-colors" onClick={() => setShowDrawing(true)}>Open Drawing Editor</button>

          <div className="flex-1" />
          <div className="text-xs text-muted">Markdown enabled — press <kbd className="px-1 border rounded">Ctrl</kbd> + <kbd className="px-1 border rounded">S</kbd> to save</div>
        </div>

        <div className="md:flex">
          <textarea
            ref={taRef}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="# Write markdown..."
            className={`w-full md:w-1/2 h-[60vh] p-4 bg-transparent resize-none border-r`}
            style={{ minHeight: 300 }}
          />

          {preview && (
            <div className="md:w-1/2 p-4 overflow-auto prose max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {content || '*Nothing to preview*'}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {showDrawing && <DrawingCanvas onInsert={handleInsertDrawing} onClose={() => setShowDrawing(false)} />}
    </div>
  );
}
