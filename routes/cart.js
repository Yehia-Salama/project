'use strict';

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { authenticateUser,authorizeRoles } = require('../middlewares/auth');


/**
 * GET /carts/:id
 * Retrieve a specific cart by its ID.
 */
router.get('/:id', authenticateUser, cartController.getCartById);

/**
 * POST /carts
 * Create a new cart.
 */
router.post('/',  cartController.createCart);

/**
 * PUT /carts/:id
 * Update an existing cart (e.g., add or remove items).
 */
router.put('/:id', authenticateUser, cartController.updateCart);

/**
 * DELETE /carts/:id
 * Delete a cart or clear its contents.
 */
router.delete('/:id', authenticateUser, cartController.deleteCart);

module.exports = router;
