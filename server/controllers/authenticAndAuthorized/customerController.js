// customerController.js

const Order = require('../../models/orderSchema');
const Customer = require('../../models/customerSchema');

// Fetch all previous orders information for a customer
async function getAllOrders(req, res) {
    try {
        const orders = await Order.find({ customerId: req.customerId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fetch customer profile information
async function getProfile(req, res) {
    try {
        const customer = await Customer.findById(req.customerId);
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update customer profile information
async function updateProfile(req, res) {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.customerId, req.body, { new: true });
        res.json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update customer's cart
async function updateCart(req, res) {
    try {
        const customer = await Customer.findById(req.customerId);
        customer.cart = req.body.cart;
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllOrders,
    getProfile,
    updateProfile,
    updateCart
};
