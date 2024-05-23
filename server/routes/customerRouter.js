const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/customerAuth");

const customerController = require("../controllers/customerController/customerController");

router.get("/shop-items/filter", authMiddleware, customerController.filterItems)

router.get("/shop-items/search", authMiddleware, customerController.searchItems)

router.post("/cart/add", authMiddleware, customerController.addItemsToCart)
router.patch("/cart/:itemId", authMiddleware, customerController.updateCartItem)
router.delete("/cart/:itemId", authMiddleware, customerController.deleteCartItem)

router.post("/checkout", authMiddleware, customerController.checkoutAndOrder)

router.get("/shop-items/:itemId", authMiddleware, customerController.getItemById)

module.exports = router;