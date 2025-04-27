'use strict';

const { Op } = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendPasswordResetEmail } = require('../utils/mailer');
const User = require('../models/user');

/**
 * POST /users/signup
 */
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const newUser = await User.create({ username, email, password, role });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

/**
 * POST /users/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateToken();
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * POST /users/reset-password-request
 */
exports.requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const token = crypto.randomBytes(32).toString('hex');
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'No account with that email found.' });
    }

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    await sendPasswordResetEmail(email, token);

    return res.json({ message: 'Password reset link sent to email.' });
  } catch (err) {
    console.error('Reset request error:', err);
    return res.status(500).json({ error: 'Could not send reset email' });
  }
};

/**
 * GET /users/reset-password/:token
 */
exports.verifyResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    return res.json({ message: 'Token is valid', userId: user.id, token });
  } catch (error) {
    console.error('Token verify error:', error);
    return res.status(500).json({ error: 'Token verification failed' });
  }
};

/**
 * POST /users/reset-password/:token
 */
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ error: 'Could not reset password' });
  }
};

/**
 * GET /users/profile
 */
exports.profile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};
