'use strict';

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db/database');
const Cart = require('./cart'); // Ensure this path is correct

// Use environment variable for salt rounds or default to 10
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username is required.' },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Must be a valid email address.' },
        notEmpty: { msg: 'Email is required.' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long.',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Customer', 'Supplier'),
      allowNull: false,
      defaultValue: 'Customer',
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    
  },
  {
    tableName: 'users',
    hooks: {
      // Hash password before creating a new user
      beforeCreate: async (user) => {
        if (user.password) {
          try {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          } catch (error) {
            throw new Error('Error hashing password before user creation.');
          }
        }
      },
      // Automatically create a cart for the new user after creation
      afterCreate: async (user) => {
        try {
          await Cart.create({ userId: user.id });
          console.log(`Cart created for user ID ${user.id}`);
        } catch (error) {
          console.error('Error creating cart for user:', error);
        }
      },
    },
    defaultScope: {
      // Exclude password from query results by default
      attributes: { exclude: ['password'] },
    },
    scopes: {
      // Include password when explicitly requested (e.g., for login)
      withPassword: {
        attributes: {},
      },
    },
  }
);

module.exports = User;
