import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

export async function connect() {
  if (!MONGO_URI) throw new Error('MONGO_URI not set in env');
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
}
