// src/components/Notes/NoteCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const NoteCard = React.memo(({ note = {} }) => {
  if (!note) return null;

  const title = note.title || 'Untitled';
  const content = note.content || '';
  const tags = Array.isArray(note.tags)? note.tags : [];

  return (
    <article
      className={clsx(
        'bg-card rounded-2xl shadow-soft p-4 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]',
        'border border-transparent hover:border-border-card',
        'bg-[var(--color-bg-card)]'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        {note.isPublic && (
          <div className="text-xs text-note-badge-text bg-note-badge-bg px-2 py-1 rounded">
            Public
          </div>
        )}
      </div>

      <p className="text-sm text-muted mt-3 line-clamp-4">{content}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
          {tags.slice(0, 3).map((t, i) => (
            <span
              key={t?? `tag-${i}`}
              className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Link to={`/notes/${note._id}`} className="text-sm text-link hover:underline">
            Open →
          </Link>
        </div>
      </div>
    </article>
  );
});

export default NoteCard;