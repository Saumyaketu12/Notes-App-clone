import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/env.js';

const router = express.Router();

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

router.post('/', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Use a direct configuration to ensure the keys are used correctly
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });

  const stream = cloudinary.uploader.upload_stream(
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