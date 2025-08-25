import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { APP_ORIGIN } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import errorHandler from './middleware/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// compute __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(helmet());
app.use(express.json({ limit: '5mb' })); // increase limit if needed
app.use(morgan('dev'));
// app.use(cors({ origin: APP_ORIGIN || true }));
app.use(cors({
  origin: APP_ORIGIN || "https://saumyaketu-notes-app.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// Serve uploaded files (public)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Upload route (mount)
import uploadRoutes from './routes/uploadRoutes.js';
app.use('/api/uploads', uploadRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler (last)
app.use(errorHandler);

export default app;
