import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import NoteEditor from "../components/Notes/NoteEditor";
import ShareModal from "../components/Notes/ShareModal";
import * as notesService from "../services/notesService";
import { useAuth } from "../hooks/useAuth";
import useDebounce from "../hooks/useDebounce";

export default function NoteDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
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
        isPublic: !v.isPublic,
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        {!note ? (
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
                <div className="text-sm text-gray-500">
                  {saving ? "Saving…" : "Saved"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={togglePublic}
                  className="px-3 py-2 bg-yellow-400 rounded"
                >
                  {note.isPublic ? "Make Private" : "Make Public"}
                </button>
                <button
                  onClick={() => {}}
                  className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                  Share
                </button>
                <button
                  onClick={remove}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <Link to="/" className="px-3 py-2 bg-gray-200 rounded">
                  Back
                </Link>
              </div>
            </div>
            <NoteEditor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
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
