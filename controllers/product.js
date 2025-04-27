'use strict';

const Product = require('../models/product');

/**
 * Retrieve all products.
 * GET /products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    return res.status(500).json({ error: 'Failed to retrieve products.' });
  }
};

/**
 * Retrieve a single product by its ID.
 * GET /products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    return res.json(product);
  } catch (error) {
    console.error('Error retrieving product:', error);
    return res.status(500).json({ error: 'Failed to retrieve product.' });
  }
};

/**
 * Create a new product.
 * POST /products
 */
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body, 
      UserId: req.user.id, // <-- Attach the logged-in user's ID here
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error);
    return res.status(500).json({ error: 'Failed to create product.' });
  }
};

/**
 * Update an existing product.
 * PUT /products/:id
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    const updatedProduct = await product.update(req.body);
    return res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Failed to update product.' });
  }
};

/**
 * Delete a product by its ID.
 * DELETE /products/:id
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    await product.destroy();
    return res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Failed to delete product.' });
  }
};
