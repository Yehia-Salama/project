'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const OrderItem = sequelize.define(
  'OrderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true, // Adjust if required; set to false if quantity must be provided
    },
  },
  {
    tableName: 'order_items', // Use explicit table name for consistency
  }
);

module.exports = OrderItem;
