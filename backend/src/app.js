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
  origin: [
    'http://localhost:5173',  // vite dev
    'https://saumyaketu-notes-app.onrender.com', // deployed frontend
  ],
  credentials: true,
}));



// Serve uploaded files (public) - This might not be needed if all uploads are external
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
