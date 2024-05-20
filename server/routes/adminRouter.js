const express = require('express');
const router = express.Router();
const ShopItem = require('../models/shopItemSchema');

// Add new shop item
router.post('/add', async (req, res) => {
  try {
    const newItem = new ShopItem(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update shop item
router.put('/update/:id', async (req, res) => {
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
router.delete('/delete', async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of IDs
    await ShopItem.deleteMany({ _id: { $in: ids } });
    res.status(200).send({ message: 'Items deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Search shop items
router.get('/search', async (req, res) => {
  try {
    const query = req.query;
    const items = await ShopItem.find(query);
    res.send(items);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
