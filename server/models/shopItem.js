// shopItem model
const mongoose = require('mongoose');

// Define Shop Item Schema
const shopItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  availableCount: { type: Number, required: true },
  category: { type: String, required: true },
});

// Create Shop Item Model
const ShopItem = mongoose.model('ShopItem', shopItemSchema);

module.exports = ShopItem;
