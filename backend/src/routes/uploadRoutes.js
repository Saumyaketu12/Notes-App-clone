import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Configure multer to use memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image uploads are allowed'), false);
    }
  },
});

// POST /api/uploads
router.post('/', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  let stream = cloudinary.uploader.upload_stream(
    { folder: 'notes-app' },
    (error, result) => {
      if (result) {
        res.json({ url: result.secure_url });
      } else {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ error: 'Cloudinary upload failed' });
      }
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

export default router;