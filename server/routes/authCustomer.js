const express = require('express');
const customerRouter = express.Router();
const customerAuth = require('../controllers/authenticAndAuthorized/cutomerAuth');
const customerControl = require('../controllers/authenticAndAuthorized/customerController');
const authMiddleware = require('../middleware/customerAuth');

// signup the customer 
customerRouter.post('/customer/signup', customerAuth.signup);

// sign in the customer 
customerRouter.post('/customer/singin',authMiddleware, customerAuth.signin);

// sign out the customer
customerRouter.post('/customer/singout',authMiddleware, customerAuth.signout);

//get all order
customerRouter.get('customer/orders', authMiddleware, customerControl.getAllOrders);

//get and update profile
customerRouter.get('customer/profile', authMiddleware, customerControl.getProfile);
customerRouter.put('customer/profile', authMiddleware, customerControl.updateProfile);

//update the cart
customerRouter.put('customer/cart', authMiddleware, customerControl.updateCart);



module.exports = customerRouter;
