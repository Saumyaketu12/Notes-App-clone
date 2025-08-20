import Note from '../models/Note.js';
import generateShareId from '../utils/generateShareId.js';
import sanitizeHtml from 'sanitize-html';
import { APP_ORIGIN } from '../config/env.js';

// Helper: check access
function canAccess(note, userId) {
  if (!note) return false;
  if (note.isPublic) return true;
  if (note.owner && note.owner.toString() === userId.toString()) return true;
  if (note.collaborators && note.collaborators.some(c => c.toString() === userId.toString())) return true;
  return false;
}

// GET /api/notes?q=...
export async function listNotes(req, res) {
  const userId = req.user.userId;
  const q = (req.query.q || '').trim();

  try {
    if (q) {
      const results = await Note.find(
        { owner: userId, $text: { $search: q } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(100);
      return res.json({ notes: results });
    } else {
      const notes = await Note.find({ owner: userId }).sort({ updatedAt: -1 }).limit(500);
      return res.json({ notes });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// POST /api/notes
export async function createNote(req, res) {
  try {
    const userId = req.user.userId;
    const { title = '', content = '' } = req.body || {};
    const note = new Note({ owner: userId, title, content });
    await note.save();
    return res.json(note);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// GET /api/notes/:id
export async function getNote(req, res) {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    if (!canAccess(note, userId)) return res.status(403).json({ error: 'Forbidden' });

    return res.json(note);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// PUT /api/notes/:id
export async function updateNote(req, res) {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const patch = req.body || {};

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    if (note.owner.toString() !== userId.toString() && !(note.collaborators || []).some(c => c.toString() === userId.toString())) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Save version snapshot
    note.versions = note.versions || [];
    note.versions.push({
      title: note.title,
      content: note.content,
      savedAt: new Date(),
      savedBy: userId
    });
    if (note.versions.length > 50) note.versions = note.versions.slice(-50);

    // Update fields
    if (typeof patch.title !== 'undefined') note.title = patch.title;
    if (typeof patch.content !== 'undefined') note.content = patch.content;
    if (typeof patch.isPublic !== 'undefined') {
      note.isPublic = !!patch.isPublic;
      if (note.isPublic && !note.shareId) {
        note.shareId = generateShareId();
      }
    }

    await note.save();
    return res.json({ _id: note._id, shareId: note.shareId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// DELETE /api/notes/:id
export async function deleteNote(req, res) {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.owner.toString() !== userId.toString()) return res.status(403).json({ error: 'Forbidden' });

    await Note.deleteOne({ _id: id });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// POST /api/notes/:id/share
export async function createShare(req, res) {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.owner.toString() !== userId.toString()) return res.status(403).json({ error: 'Forbidden' });

    note.isPublic = true;
    if (!note.shareId) note.shareId = generateShareId();
    await note.save();
    const shareUrl = `${APP_ORIGIN}/s/${note.shareId}`;
    return res.json({ shareUrl, shareId: note.shareId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// GET /api/notes/public/:shareId
export async function getPublicByShareId(req, res) {
  try {
    const shareId = req.params.shareId;
    const note = await Note.findOne({ shareId, isPublic: true });
    if (!note) return res.status(404).json({ error: 'Not found' });

    const safe = {
      _id: note._id,
      title: note.title,
      content: note.content,
      isPublic: note.isPublic,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    };

    // Optionally sanitize content before returning (server-side safety)
    safe.content = sanitizeHtml(safe.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h1', 'h2' ]),
      allowedAttributes: false
    });

    return res.json(safe);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
