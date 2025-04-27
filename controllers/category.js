'use strict';

const { Sequelize } = require('sequelize');
const Product = require('../models/product');
const sequelize = require('../db/database'); // Needed for sequelize.fn('DISTINCT', ...)

/**
 * Retrieve a distinct list of all product categories.
 * GET /categories
 */
exports.getAllCategories = async (req, res) => {
  try {
    // Retrieve distinct category values from the products table.
    const categories = await Product.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
    });

    // Map the results to an array of category names.
    const categoryList = categories.map((cat) => cat.get('category'));
    return res.json(categoryList);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    return res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
};

/**
 * Retrieve all products for a given category.
 * GET /categories/:category
 */
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({
      where: { category },
    });

    if (!products.length) {
      return res.status(404).json({ error: 'No products found in this category.' });
    }
    return res.json(products);
  } catch (error) {
    console.error('Error retrieving products by category:', error);
    return res.status(500).json({ error: 'Failed to retrieve products by category.' });
  }
};
