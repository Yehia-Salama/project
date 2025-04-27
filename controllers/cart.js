'use strict';

const Cart = require('../models/cart');

/**
 * Retrieve a specific cart by its ID.
 * GET /carts/:id
 */
exports.getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }
    return res.json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return res.status(500).json({ error: 'Failed to retrieve cart.' });
  }
};

/**
 * Create a new cart.
 * POST /carts
 */
exports.createCart = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    return res.status(201).json(newCart);
  } catch (error) {
    console.error('Error creating cart:', error);
    return res.status(500).json({ error: 'Failed to create cart.' });
  }
};

/**
 * Update an existing cart (e.g., modify items).
 * PUT /carts/:id
 */
exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }
    const updatedCart = await cart.update(req.body);
    return res.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ error: 'Failed to update cart.' });
  }
};

/**
 * Delete a cart or clear its contents.
 * DELETE /carts/:id
 */
exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }
    await cart.destroy();
    return res.json({ message: 'Cart deleted successfully.' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    return res.status(500).json({ error: 'Failed to delete cart.' });
  }
};
