import mongoose from 'mongoose';
import { MONGO_URI } from './config/env.js';
import User from './models/User.js';
import Note from './models/Note.js';
import { hashPassword } from './utils/hashPassword.js';

async function run() {
  if (!MONGO_URI) throw new Error('MONGO_URI missing');
  await mongoose.connect(MONGO_URI);
  console.log('connected to', MONGO_URI);

  // remove old demo
  await User.deleteMany({ email: /demo@/i });
  await Note.deleteMany({ title: /Demo note/i });

  const pw = await hashPassword('password123');
  const user = await User.create({ email: 'demo@local', passwordHash: pw, name: 'Demo User' });

  await Note.create([
    { owner: user._id, title: 'Demo note 1', content: '# Demo 1\nThis is a demo note.', isPublic: true, shareId: 'DEMO12345' },
    { owner: user._id, title: 'Demo note 2', content: 'Private demo note content', isPublic: false },
  ]);

  console.log('seed done. demo user: demo@local / password123');
  await mongoose.disconnect();
}
run().catch(err => { console.error(err); process.exit(1); });
