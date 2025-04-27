'use strict';

require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const categoryRoutes = require('./routes/category');

const app = express();

// Parse JSON request bodies (replaces body-parser.json())
app.use(express.json());

// Mount routes (using plural paths is often recommended, but optional)
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);
app.use('/categories', categoryRoutes);

// Handle 404 for unknown routes (optional)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error-handling middleware (must be after all routes)
app.use(errorHandler);

// Sync database (for dev only; use migrations in production)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = app;
