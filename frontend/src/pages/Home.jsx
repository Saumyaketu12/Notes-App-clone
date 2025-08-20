import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';

export default function Home() {
  const { token, user } = useAuth() || {};
  const { notes, fetchNotes } = useNotes() || {};
  const navigate = useNavigate();
  // token = true; // For testing purposes, assume user is always authenticated
  useEffect(() => {
    // If user signed in, load notes and optionally navigate to / (notes list)
    if (token) {
      fetchNotes();
    }
  }, [token, fetchNotes]);

  // If user fully signed in, show dashboard-like layout with sidebar and recent notes.
  if (token) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto flex gap-6 px-4 py-8">
          <Sidebar />
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Welcome back{user ? `, ${user.name}` : ''}.</h1>
              <div className="flex items-center gap-3">
                <Link to="/create" className="px-3 py-2 bg-blue-600 text-white rounded">New Note</Link>
                <Link to="/" className="px-3 py-2 bg-white border rounded">All Notes</Link>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Recent notes</h2>
              {notes && notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {notes.slice(0, 6).map(n => (
                    <article key={n._id} className="bg-white p-4 rounded shadow">
                      <h3 className="font-medium text-lg truncate">{n.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mt-2">{n.content}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <div>{n.isPublic ? 'Public' : 'Private'}</div>
                        <Link to={`/notes/${n._id}`} className="text-blue-600">Open</Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">You don't have notes yet — create your first note!</div>
              )}
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Tips</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Use Markdown to write rich notes.</li>
                <li>Toggle public sharing on a note to create a permalink.</li>
                <li>Use search to find notes quickly.</li>
              </ul>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    );
  }

  // Public landing page when not authenticated.
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">Simple notes. Private by default.</h1>
              <p className="text-gray-700 mb-6">
                Capture ideas, store docs, and share what you want with a single click. Works great for personal notes or small teams.
              </p>

              <div className="flex gap-3">
                <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded">Get started — it's free</Link>
                <Link to="/login" className="px-4 py-2 bg-white border rounded">Sign in</Link>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-500 mb-2">Preview</div>
              <div className="bg-white p-3 rounded border">
                <h3 className="font-medium text-sm"># Meeting notes</h3>
                <p className="text-xs text-gray-600 line-clamp-3 mt-2">- Roadmap review{'\n'}- Assign owners{'\n'}- Follow-ups</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
