const shopItemModel = require("../../models/shopItem");
const cartModel = require("../../models/cart");
const orderModel = require("../../models/order");

//Added comments for more clarity:

// Filter items based on category and price range
const filterItems = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  try {
    // Build the query object
    let query = {}
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice) // Price greater than or equal to minPrice
      if (maxPrice) query.price.$lte = Number(maxPrice) // Price less than or equal to maxPrice
    }

    // Find items that match the query and return the filtered items
    const shopItems = await shopItemModel.find(query);
    res.json(shopItems);
  } catch (err) {
    res.status(500).json({ message: `Error filtering items: ${err.message}` });
  }
}

// Search for items by query string in title, description, or category
const searchItems = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query)
      return res.status(400).json({ message: "Search Query is required" });

    // Create a case-insensitive regular expression from the query string
    const regex = new RegExp(query, "i");

    // Build the search query object
    const searchQuery = {
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    }

    // Find items that match the search query and return the results
    const shopItems = await shopItemModel.find(searchQuery);
    res.json(shopItems);
  } catch (err) {
    res.status(500).json({ message: `Error searching items: ${err.message}` });
  }
}


// Add items to the customer's cart
const addItemsToCart = async (req, res) => {
  const { customerId, itemId, quantity } = req.body;

  // Validate that quantity is a positive integer
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a positive integer" });
  }

  try {
    // Find the item by ID
    const item = await shopItemModel.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    // Check if there are enough items in stock
    if (item.availableCount < quantity)
      return res.status(400).json({ message: "Not enough items available" });

    // Find the customer's cart
    let cart = await cartModel.findOne({ customerId });
    if (!cart) cart = new cartModel({ customerId, items: [] });

    // Check if the item is already in the cart
    const cartItem = cart.items.find(
      (item) => item.shopItemId.toString() === itemId
    );

    // Update quantity if item is already in cart, if not, push new item to cart
    if (cartItem) cartItem.quantity += quantity;
    else cart.items.push({ shopItemId: itemId, quantity });

    // Save the cart and update the item's available count
    await cart.save();
    item.availableCount -= quantity;
    await item.save();

    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error adding items to cart: ${err.message}` });
  }
}


// Checkout and create an order
const checkoutAndOrder = async (req, res) => {
  const { customerId } = req.body;

  try {
    // Find the cart and populate the shopItemId field
    const cart = await cartModel
      .findOne({ customerId })
      .populate("items.shopItemId");
    if (!cart || cart.items.length === 0)
      return res.status(404).json({ message: "Cart is empty" });

     // Calculate the total bill and prepare order items
    let totalBill = 0;
    const orderItems = cart.items.map((cartItem) => {
      const { shopItemId, quantity } = cartItem;
      const total = shopItemId.price * quantity; // Calculate total for this item
      totalBill += total; // Add to the total bill

      return {
        shopItemId: shopItemId._id,
        title: shopItemId.title,
        quantity,
        price: shopItemId.price,
        total,
      };
    });

    // Create a new order with the order items and total bill
    const order = new orderModel({
      customerId,
      items: orderItems,
      totalAmount: totalBill,
    });

    // Save the order and clear the customer's cart
    await order.save();

    cart.items = [];
    await cart.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: `Error during checkout: ${err.message}` });
  }
};

// Get information of a single item by its ID
const getItemById = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the item by ID
    const item = await shopItemModel.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item); // Return the item details
  } catch (err) {
    res.status(500).json({ message: `Error retrieving item: ${err.message}` });
  }
};

module.exports = {
  filterItems,
  searchItems,
  addItemsToCart,
  checkoutAndOrder,
  getItemById,
};
