export default function errorHandler(err, req, res, next) {
  // keep default Express signature to catch errors
  // eslint-disable-next-line no-console
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
}
