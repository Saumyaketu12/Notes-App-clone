import app from './app.js';
import { connect } from './config/db.js';
import { PORT } from './config/env.js';

async function start() {
  try {
    await connect();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
