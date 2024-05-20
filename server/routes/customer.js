// // routes/customer.js
// const express = require("express");
// const router = express.Router();
// const ShopItem = require("../models/shopItem")
// const Cart = require("../models/cart");
// const Order = require("../models/order");

// // Getting shop items
// router.get("/items", async (req, res) => {
//   try {
//     const items = await ShopItem.find(req.query);
//     res.json(items);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Getting single shop items
// router.get("/items/:id", async (req, res) => {
//   try {
//     const item = await ShopItem.findById(req.params.id);
//     res.json(item);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });




// module.exports = router;
