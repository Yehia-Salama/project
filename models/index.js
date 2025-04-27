'use strict';

const sequelize = require('../db/database');

// Import models
const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Cart = require('./cart');
const CartItem = require('./cartitem');
const OrderItem = require('./orderitem');

/**
 * Define associations between models
 */

// --- User and Product ---
// A Product belongs to a User, so if a User is deleted, their Products are also deleted.
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// --- User and Cart ---
// A User has one Cart.
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// --- Cart and Product ---
// A Cart can contain many Products, and a Product can appear in many Carts.
// The join table is CartItem.
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// --- User and Order ---
// An Order belongs to a User; deleting the user cascades deletion of the order.
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Order);

// --- Order and Product ---
// An Order can contain many Products, and a Product can be part of many Orders.
// The join table is OrderItem.
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = { sequelize, User, Order, Product, Cart, CartItem, OrderItem };
