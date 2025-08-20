import { verifyToken } from '../utils/token.js';

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = verifyToken(token);
    if (!payload || !payload.userId) return res.status(401).json({ error: 'Invalid token' });
    req.user = { userId: payload.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
