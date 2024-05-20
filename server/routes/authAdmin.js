const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/authenticAndAuthorized/adminController');
const adminAuth = require('../controllers/authenticAndAuthorized/adminAuth');
const adminAuthorization = require('../middleware/adminAuthorization');

// Admin signin endpoint
adminRouter.post('/admin/signin', adminAuth.signin);
// Admin signup endpoint
adminRouter.post('/admin/signup',adminAuthorization, adminAuth.signup);

// Admin signout endpoint
adminRouter.post('/admin/signout', adminAuthorization, adminAuth.signout);

// Fetching the orders 
adminRouter.get('/admin/orders', adminAuthorization, adminController.getAllOrders);
// Fetching the customers
adminRouter.get('/admin/customers', adminAuthorization, adminController.getAllCustomers);
// Creating a new admin
adminRouter.post('/admin/new-admin', adminAuthorization, adminController.createAdminAccount);

 
module.exports = adminRouter;
