// middlewares/validators.js
const { body } = require('express-validator');

exports.validateSignup = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.validateResetPassword = [
  body('email').isEmail().withMessage('Valid email is required')
];

exports.validateNewPassword = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
