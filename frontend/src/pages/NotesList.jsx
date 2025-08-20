import React, { useState } from "react";
import Header from "../components/Layout/Header";
import NoteList from "../components/Notes/NoteList";
import { useNotes } from "../hooks/useNotes";
export default function NotesList() {
  const { notes, loading, fetchNotes, createNote } = useNotes();
  const [q, setQ] = useState("");
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="border rounded p-2"
            />
            <button
              onClick={() => fetchNotes(q)}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Search
            </button>
            <button
              onClick={createNote}
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              New
            </button>
          </div>
        </div>
        {loading ? <div>Loading…</div> : <NoteList notes={notes} />}
      </main>
    </div>
  );
}
