const express = require("express");
const customerRouter = express.Router();
const customerAuth = require("../controllers/authenticAndAuthorized/cutomerAuth");
const customerControl = require("../controllers/authenticAndAuthorized/customerController");
const authMiddleware = require("../middleware/customerAuth");

// signup the customer
customerRouter.post("/signup", customerAuth.signup);

// sign in the customer
customerRouter.post("/signin", customerAuth.signin);

// sign out the customer
customerRouter.post("/signout", authMiddleware, customerAuth.signout);

//get all order
customerRouter.get("/orders", authMiddleware, customerControl.getAllOrders);

//get and update profile
customerRouter.get("/profile", authMiddleware, customerControl.getProfile);
customerRouter.put("/profile", authMiddleware, customerControl.updateProfile);

//update the cart
customerRouter.put("/cart", authMiddleware, customerControl.updateCart);

module.exports = customerRouter;
