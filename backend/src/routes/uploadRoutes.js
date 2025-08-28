// src/routes/uploadRoutes.js

import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

//  Multer setup with in-memory storage, size limit & image filter
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

//  Helper function: async upload to Cloudinary with Promise wrapper
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'notes-app' }, // optional: organize uploads in a folder
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

//  Upload route
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file received.');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', req.file.originalname, req.file.mimetype);

    const result = await streamUpload(req.file.buffer);

    if (result?.secure_url) {
      console.log('Cloudinary upload successful:', result.secure_url);
      return res.status(200).json({
        message: 'File uploaded successfully',
        url: result.secure_url,
      });
    } else {
      console.error('Cloudinary upload failed:', result);
      return res.status(500).json({ error: 'Upload failed, no secure_url returned' });
    }
  } catch (error) {
    console.error('Error during upload:', error);
    return res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
});

export default router;