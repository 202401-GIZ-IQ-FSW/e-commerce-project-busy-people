const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController/customerController");

router.get("/shop-items/filter", customerController.filterItems)

router.get("shop-items/search", customerController.searchItems)

router.post("/cart", customerController.addItemsToCart)

router.post("/checkout", customerController.checkoutAndOrder)

router.get("/shop-items/:itemId", customerController.getItemById)

module.exports = router;