import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function NoteCard({ note }) {
  return (
    <article className={clsx(
      'bg-card dark:bg-[#071126] rounded-2xl shadow-soft p-4 hover:shadow-lg transition-shadow transform hover:-translate-y-1',
      'border border-transparent'
    )}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-lg truncate">{note.title || 'Untitled'}</h3>
        {note.isPublic && <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Public</div>}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-4">{note.content}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
          {(note.tags || []).slice(0,3).map(t => <span key={t} className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">{t}</span>)}
        </div>
        <div className="flex gap-2 items-center">
          <Link to={`/notes/${note._id}`} className="text-sm text-primary-500 hover:underline">Open →</Link>
        </div>
      </div>
    </article>
  );
}
