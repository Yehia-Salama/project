'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authenticateUser, authorizeRoles } = require('../middlewares/auth');

/**
 * GET /products
 * Retrieve a list of all products.
 */
router.get('/', productController.getAllProducts);

/**
 * GET /products/:id
 * Retrieve a single product by its ID.
 */
router.get('/:id', productController.getProductById);

/**
 * POST /products
 * Create a new product.
 */
router.post('/', authenticateUser, authorizeRoles('Admin', 'Supplier'), productController.createProduct);

/**
 * PUT /products/:id
 * Update an existing product.
 */
router.put('/:id' ,authenticateUser, authorizeRoles('Admin', 'Supplier'), productController.updateProduct);

/**
 * DELETE /products/:id
 * Delete a product by its ID.
 */
router.delete('/:id', authenticateUser, authorizeRoles('Admin', 'Supplier') , productController.deleteProduct);

module.exports = router;
