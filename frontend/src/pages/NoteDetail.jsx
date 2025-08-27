import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotesContext } from '../contexts/NotesContext';
import { AuthContext } from '../contexts/AuthContext';
import NoteEditor from '../components/Notes/NoteEditor';
import NoteHeader from '../components/Notes/NoteHeader';
import Modal from '../components/UI/Modal';
import Spinner from '../components/UI/Spinner';
import { updateNote, getNote, shareNote } from '../services/notesService';
import { useDebounce } from '../hooks/useDebounce';
import { toast } from 'react-toastify';
import ShareModal from '../components/Notes/ShareModal';
import apiClient from '../services/apiClient';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, setNotes } = useContext(NotesContext);
  const { user } = useContext(AuthContext);

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const debouncedContent = useDebounce(note?.content, 1000);
  const debouncedTitle = useDebounce(note?.title, 1000);

  useEffect(() => {
    // This effect runs only when the component mounts or id changes
    const fetchNote = async () => {
      try {
        setLoading(true);
        const fetchedNote = await getNote(id);
        setNote(fetchedNote);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch note');
        setNote(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  useEffect(() => {
    // This effect handles the debounced auto-save logic
    if (note && !loading) {
      handleUpdateNote();
    }
  }, [debouncedContent, debouncedTitle]);


  const uploadImageToCloudinary = async (base64Data) => {
    try {
      // Use the apiClient to post the image
      const response = await apiClient.post('/uploads', { file: base64Data }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.url;
    } catch (err) {
      console.error('Error uploading to Cloudinary:', err);
      toast.error('Failed to upload image. Please try again.');
      throw new Error('Image upload failed');
    }
  };

  const handleUpdateNote = async () => {
    if (!note) return;

    // Check for base64 image data in the content
    const base64Regex = /!\[.*?\]\((data:image\/[a-zA-Z0-9+./;=]+)\)/g;
    let newContent = note.content;
    let match;

    try {
      while ((match = base64Regex.exec(note.content)) !== null) {
        const base64Data = match[1];
        const newUrl = await uploadImageToCloudinary(base64Data);
        newContent = newContent.replace(base64Data, newUrl);
      }

      const updatedNoteData = {
        title: note.title,
        content: newContent,
      };

      // Proceed with the note update using the new, clean content
      const updatedNote = await updateNote(id, updatedNoteData);
      setNote(updatedNote);
      toast.success('Note saved!');

      // Update the notes context to reflect the change
      setNotes(prevNotes => 
        prevNotes.map(n => n._id === updatedNote._id ? updatedNote : n)
      );

    } catch (err) {
      console.error('Failed to save note:', err);
      toast.error('Failed to save note. Please check the console for more details.');
    }
  };

  const handleTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setNote({ ...note, content: newContent });
  };
  
  const handleShare = async () => {
    try {
      const { shareUrl } = await shareNote(id);
      setShareUrl(shareUrl);
      setShareModalOpen(true);
    } catch (err) {
      toast.error('Failed to share note.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <NoteHeader
        title={note?.title}
        onTitleChange={handleTitleChange}
        onShare={handleShare}
      />
      <div className="flex-grow p-4 md:p-8 overflow-y-auto">
        <NoteEditor
          content={note?.content}
          onChange={handleContentChange}
        />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold">Share Note</h2>
        <p>This is where share options will go.</p>
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </Modal>
      {shareModalOpen && (
        <ShareModal
          shareUrl={shareUrl}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </div>
  );
};

export default NoteDetail;
