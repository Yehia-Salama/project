'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Unique order identifier',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Total amount for the order',
    },
  },
  {
    tableName: 'orders', // Explicit table name for consistency
  }
);

module.exports = Order;
