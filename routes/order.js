'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { authenticateUser } = require('../middlewares/auth');


/**
 * GET /orders
 * Retrieve all orders.
 */
router.get('/',authenticateUser, orderController.getAllOrders);

/**
 * GET /orders/:id
 * Retrieve a specific order by its ID.
 */
router.get('/:id', authenticateUser, orderController.getOrderById);

/**
 * POST /orders
 * Create a new order.
 */
router.post('/', authenticateUser, orderController.createOrder);

/**
 * PUT /orders/:id
 * Update an existing order (if allowed).
 */
router.put('/:id', authenticateUser, orderController.updateOrder);

/**
 * DELETE /orders/:id
 * Delete or cancel an order.
 */
router.delete('/:id', authenticateUser, orderController.deleteOrder);

module.exports = router;
