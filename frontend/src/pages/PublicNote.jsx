import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as notesService from "../services/notesService";
import ReactMarkdown from "react-markdown";
export default function PublicNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  useEffect(() => {
    notesService.getPublicNote(shareId).then((r) => setNote(r));
  }, [shareId]);
  if (!note) return <div className="p-6">Loading…</div>;
  if (note.error) return <div className="p-6 text-red-600">{note.error}</div>;
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <article className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <div className="prose">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
