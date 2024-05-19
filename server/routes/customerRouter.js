const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/customer/shop-items/filter", customerController.filterItems)

router.get("/customer/shop-items/search", customerController.searchItems)

router.post("/customer/cart", customerController.addItemsToCart)

router.post("/customer/checkout", customerController.checkoutAndOrder)

router.get("/customer/shop-items/:itemId", customerController.getItemById)
