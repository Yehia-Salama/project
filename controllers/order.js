'use strict';

const Order = require('../models/order');

/**
 * Retrieve all orders filtered by user ID provided as a query parameter.
 * Example: GET /orders?userId=123
 */
exports.getAllOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to filter orders.' });
    }

    const orders = await Order.findAll({
      where: { userId } // Filters orders by the provided userId
    });

    return res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ error: 'Failed to retrieve orders.' });
  }
};

/**
 * Retrieve a specific order by its ID.
 * Example: GET /orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    return res.json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    return res.status(500).json({ error: 'Failed to retrieve order.' });
  }
};

/**
 * Create a new order.
 * Example: POST /orders
 */
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order.' });
  }
};

/**
 * Update an existing order.
 * Example: PUT /orders/:id
 */
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    const updatedOrder = await order.update(req.body);
    return res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ error: 'Failed to update order.' });
  }
};

/**
 * Delete (or cancel) an order.
 * Example: DELETE /orders/:id
 */
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    await order.destroy();
    return res.json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ error: 'Failed to delete order.' });
  }
};
