'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const CartItem = sequelize.define(
  'CartItem',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true, // Adjust if you want to require quantity
    },
  },
  {
    tableName: 'cart_items', // Using snake_case plural form for consistency
  }
);

module.exports = CartItem;
