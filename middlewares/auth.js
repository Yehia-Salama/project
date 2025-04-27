'use strict';

const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate the user using a JWT token.
 * Expects the token in the Authorization header as "Bearer <TOKEN>".
 */
exports.authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Remove "Bearer " prefix if present, then verify the token.
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains payload: { id, role, iat, exp }
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

/**
 * Middleware to authorize the user based on allowed roles.
 * Pass the allowed roles as parameters.
 * Example: authorizeRoles('Admin', 'Supplier')
 */
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden. You do not have access.' });
    }
    next();
  };
};
