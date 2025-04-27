'use strict';

module.exports = (error, req, res, next) => {
  console.error('Global error handler:', error);

  // Set default status code and message if not provided
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const data = error.data || null;

  res.status(status).json({ message, data });
};
