const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/authenticAndAuthorized/adminController');
const adminAuth = require('../controllers/authenticAndAuthorized/adminAuth');
const authorizeAdmin = require('../middleware/adminAuthorization');

// Admin signin endpoint
adminRouter.post('/signin',authorizeAdmin, adminAuth.signin);

// Admin signup endpoint
adminRouter.post('/signup', adminAuth.signup);

// Admin signout endpoint
adminRouter.post('/signout', authorizeAdmin, adminAuth.signout);

// Fetching the orders
adminRouter.get('/orders', authorizeAdmin, adminController.getAllOrders);

// Fetching the customers
adminRouter.get('/customers', authorizeAdmin, adminController.getAllCustomers);

// Creating a new admin
adminRouter.post('/new-admin', authorizeAdmin, adminController.createAdminAccount);

module.exports = adminRouter;
