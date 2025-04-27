'use strict';

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

/**
 * GET /categories
 * Retrieve a distinct list of all product categories.
 */
router.get('/', categoryController.getAllCategories);

/**
 * GET /categories/:category
 * Retrieve all products that belong to the specified category.
 */
router.get('/:category', categoryController.getProductsByCategory);

module.exports = router;
