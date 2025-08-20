import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { APP_ORIGIN } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(cors({ origin: APP_ORIGIN || true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler (last)
app.use(errorHandler);

export default app;
