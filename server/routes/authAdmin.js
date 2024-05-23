const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/authenticAndAuthorized/adminController');
const adminAuth = require('../controllers/authenticAndAuthorized/adminAuth');
const authMiddleware = require('../middleware/adminAuthorization');

// Admin signin endpoint
adminRouter.post('/signin', adminAuth.signin);

// Admin signup endpoint
adminRouter.post('/signup', adminAuth.signup);

// Admin signout endpoint
adminRouter.post('/signout', authMiddleware, adminAuth.signout);

// Fetching the orders
adminRouter.get('/orders', authMiddleware, adminController.getAllOrders);

// Fetching the customers
adminRouter.get('/customers', authMiddleware, adminController.getAllCustomers);

// Creating a new admin
adminRouter.post('/new-admin', authMiddleware, adminController.createAdminAccount);

module.exports = adminRouter;
