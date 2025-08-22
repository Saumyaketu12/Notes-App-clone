// src/pages/NoteDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import NoteEditor from "../components/Notes/NoteEditor";
import ShareModal from "../components/Notes/ShareModal";
import * as notesService from "../services/notesService";
import { useAuth } from "../hooks/useAuth";
import useDebounce from "../hooks/useDebounce";
import toast from 'react-hot-toast';

export default function NoteDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState("");


  async function handleSaveNote({ title: newTitle, content: newContent }) {
    try {
      // if you already have note id => update, otherwise create
      if (id) {
        // your notesService.updateNote signature earlier is (token, id, patch)
        await notesService.updateNote(token, id, { title: newTitle, content: newContent });
        setTitle(newTitle);
        setContent(newContent);
        return true;
      } else {
        // if creating a new note (no id yet)
        const created = await notesService.createNote(token, { title: newTitle, content: newContent });
        // if your createNote returns created note with id, you might want to navigate to it:
        if (created && created._id) {
          navigate(`/notes/${created._id}`);
        }
        return true;
      }
    } catch (err) {
      console.error('save note failed', err);
      throw err;
    }
  }


  useEffect(() => {
    let mounted = true;
    notesService.getNote(token, id).then((r) => {
      if (!mounted) return;
      if (r._id) {
        setNote(r);
        setTitle(r.title || "");
        setContent(r.content || "");
        if (r.isPublic && r.shareId)
          setShareUrl(`${window.location.origin}/s/${r.shareId}`);
      } else {
        alert(r.error || "Not found");
        navigate("/");
      }
    });
    return () => (mounted = false);
  }, [id, token]);

  useDebounce(
    async () => {
      if (!note) return;
      setSaving(true);
      const res = await notesService.updateNote(token, id, { title, content });
      setSaving(false);
      if (res.error) console.error(res.error);
    },
    1500,
    [title, content]
  );

  const remove = async () => {
    if (!confirm("Delete?")) return;
    await notesService.deleteNote(token, id);
    navigate("/");
  };

  const togglePublic = async () => {
    const res = await notesService.updateNote(token, id, {
      isPublic: !note.isPublic,
    });
    if (!res.error) {
      setNote((v) => ({
      ...v,
        isPublic:!v.isPublic,
        shareId: res.shareId || v.shareId,
      }));
      if (!note.isPublic && res.shareId)
        setShareUrl(`${window.location.origin}/s/${res.shareId}`);
      if (note.isPublic) setShareUrl("");
    }
  };

  const createShare = async () => {
    const res = await notesService.createShare(token, id);
    if (res.shareUrl) setShareUrl(res.shareUrl);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      <main className="p-6">
        {!note? (
          <div>Loading…</div>
        ) : (
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-semibold w-full bg-transparent border-b p-1"
                  placeholder="Title"
                />
                <div className="text-sm text-muted">
                  {saving? "Saving…" : "Saved"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={togglePublic}
                  className="px-3 py-2 rounded transition-transform transform hover:scale-105"
                  style={{ backgroundColor: `var(--color-accent-yellow)`}}
                >
                  {note.isPublic? "Make Private" : "Make Public"}
                </button>
                <button
                  onClick={() => {}}
                  className="px-3 py-2 bg-[var(--color-accent-blue)] text-white rounded transition-transform transform hover:scale-105"
                >
                  Share
                </button>
                <button
                  onClick={remove}
                  className="px-3 py-2 bg-[var(--color-accent-red)] text-white rounded transition-transform transform hover:scale-105"
                >
                  Delete
                </button>
                <Link to="/" className="px-3 py-2 bg-gray-200 rounded transition-transform transform hover:scale-105">
                  Back
                </Link>
              </div>
            </div>

            <NoteEditor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              onSave={handleSaveNote}
            />
            <div className="mt-4">
              <ShareModal shareUrl={shareUrl} onCreate={createShare} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}