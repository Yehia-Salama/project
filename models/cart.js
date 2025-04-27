'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Set to false if every cart must have an owner
    },
    // Add other cart fields if needed
  },
  {
    tableName: 'carts',
  }
);

module.exports = Cart;
