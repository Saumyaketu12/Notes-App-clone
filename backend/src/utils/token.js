import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

if (!JWT_SECRET) {
  // warn at runtime; don't throw here so app can be tested in some contexts
  console.warn('Warning: JWT_SECRET is not set.');
}

export function signToken(payload, opts = {}) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not set');
  const defaultOpts = { expiresIn: '7d' };
  return jwt.sign(payload, JWT_SECRET, { ...defaultOpts, ...opts });
}

export function verifyToken(token) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.verify(token, JWT_SECRET);
}
