const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/authenticAndAuthorized/adminController');
const adminAuth = require('../controllers/authenticAndAuthorized/adminAuth');
const { isAdmin } = require('../middleware/adminAuthorization');

// Admin signin endpoint
adminRouter.post('/signin', adminAuth.signin);

// Admin signup endpoint
adminRouter.post('/signup', adminAuth.signup);

// Admin signout endpoint
adminRouter.post('/signout', isAdmin, adminAuth.signout);

// Fetching the orders
adminRouter.get('/orders', isAdmin, adminController.getAllOrders);

// Fetching the customers
adminRouter.get('/customers', isAdmin, adminController.getAllCustomers);

// Creating a new admin
adminRouter.post('/new-admin', isAdmin, adminController.createAdminAccount);

module.exports = adminRouter;
