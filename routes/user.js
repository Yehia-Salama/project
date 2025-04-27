const express = require('express');
const {
  signup,
  login,
  profile,
  requestResetPassword,
  verifyResetToken,
  resetPassword
} = require('../controllers/user');

const {
  validateSignup,
  validateLogin,
  validateResetPassword,
  validateNewPassword
} = require('../middlewares/validators');

const handleValidation = require('../middlewares/handleValidation');
// This import is the key change - we need to import the specific function
const { authenticateUser } = require('../middlewares/auth'); 

const router = express.Router();

// POST Routes
router.post('/signup', validateSignup, handleValidation, signup);
router.post('/login', validateLogin, handleValidation, login);
router.post('/request-reset', validateResetPassword, handleValidation, requestResetPassword);
router.post('/reset-password/:token', validateNewPassword, handleValidation, resetPassword);

// GET Routes
router.get('/reset-password/:token', verifyResetToken); // validate token from email
// Use authenticateUser instead of authenticate
router.get('/profile', authenticateUser, profile); // must be logged in to access profile

module.exports = router;