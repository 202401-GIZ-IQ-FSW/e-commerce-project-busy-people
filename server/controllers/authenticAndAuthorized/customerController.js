// customerController.js

const Order = require('../../models/order');
const Customer = require('../../models/customer');
const bcrypt = require('bcrypt');

// Fetch all previous orders information for a customer
async function getAllOrders(req, res) {
    customerId = req.customer.userId.userId;
    try {
        const orders = await Order.find({ customerId: customerId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fetch customer profile information
async function getProfile(req, res) {
    const customerId = req.customer.userId;
    try {
        const customer = await Customer.findById(customerId.userId);
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update customer profile information
async function updateProfile(req, res) {
    const customerId = req.customer.userId;
    const { email, password } = req.body;

    try {
        // Retrieve the existing customer document
        let customer = await Customer.findById(customerId.userId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Update email if provided
        if (email) {
            customer.email = email;
        }

        // Update password if provided
        if (password) {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            customer.password = hashedPassword;
        }

        // Save the updated customer document
        const updatedCustomer = await customer.save();
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
