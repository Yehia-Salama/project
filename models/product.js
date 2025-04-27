'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the product',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Price of the product',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Detailed product description',
    },
    category: {
      type: DataTypes.ENUM('Snacks', 'Basic Groceries', 'Bakeries and Pastries', 'Diaries','Canned Foods'),
      allowNull: false,
      comment: 'Product category',
    }
  },
  {
    tableName: 'products', // Explicit table name for consistency
  }
);

module.exports = Product;
