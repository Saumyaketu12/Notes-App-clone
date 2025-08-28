import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

let storage;
try{
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'notes-app', // This is the folder name in your Cloudinary account
      format: async (req, file) => 'png',
      public_id: (req, file) => `drawing-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    },
  });
} catch (err) {
  // If Cloudinary setup fails, log the error and use a dummy storage
  console.error('Cloudinary configuration failed:', err);
  storage = multer.memoryStorage(); // Fallback to in-memory storage, will fail on save
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image uploads are allowed'), false);
  }
});

// POST /api/uploads
router.post('/', upload.single('file'), (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  if(req.file.path) {
    // Multer-storage-cloudinary returns the public URL in `req.file.path`
    return res.json({ url: req.file.path });
  } else {
    // This case will be hit if the Cloudinary upload failed and memoryStorage was used
    return res.status(500).json({ error: 'Upload failed: Cloudinary configuration is missing or invalid' });
  }
});

export default router;
