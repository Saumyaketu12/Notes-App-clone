// src/routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists on the filesystem (server startup will create it if needed)
import fs from 'fs';
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.png';
    const name = Date.now() + '-' + Math.random().toString(36).slice(2,9) + ext;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    // basic mime-type check: allow images
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image uploads are allowed'), false);
  }
});

// POST /api/uploads
// field name: file
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // APP_ORIGIN should be set in env (e.g. http://localhost:5173)
  const APP_ORIGIN = process.env.APP_ORIGIN || 'http://localhost:5173';
  const url = `${APP_ORIGIN.replace(/\/$/, '')}/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
