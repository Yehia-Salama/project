'use strict';

require('dotenv').config(); // Load environment variables from .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name from .env
  process.env.DB_USER,    // Username from .env
  process.env.DB_PASS,    // Password from .env
  {
    host: process.env.DB_HOST,      // Host from .env
    dialect: process.env.DB_DIALECT,  // Dialect from .env (e.g., mysql)
    logging: false,                   // Disable SQL query logging (set to console.log to enable)
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
