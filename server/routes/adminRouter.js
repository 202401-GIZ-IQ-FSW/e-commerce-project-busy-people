const express = require('express');
const router = express.Router();
const ShopItem = require('../models/shopItem');
const authorizeAdmin = require('../middleware/adminAuthorization');

// Add new shop item
router.post('/add',authorizeAdmin, async (req, res) => {
  try {
    const newItem = new ShopItem(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update shop item
router.put('/update/:id',authorizeAdmin, async (req, res) => {
  try {
    const updatedItem = await ShopItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.send(updatedItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete shop item(s)
router.delete('/delete/:id', authorizeAdmin, async (req, res) => {
  try {
    const itemId = req.params.id; // Get the item ID from the URL parameter
    const deletedItem = await ShopItem.findByIdAndDelete(itemId);
    
    if (!deletedItem) {
      return res.status(404).send({ error: 'Item not found' });
    }

    res.status(200).send({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Search shop items
router.get('/search',authorizeAdmin, async (req, res) => {
  try {
    const query = req.query;
    const items = await ShopItem.find(query);
    res.send(items);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
