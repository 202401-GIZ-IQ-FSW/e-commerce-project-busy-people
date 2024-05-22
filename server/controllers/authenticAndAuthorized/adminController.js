const Item = require('../../models/shopItem');
const Customer = require('../../models/customer');
const Order = require('../../models/order')
const Admin = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





exports.getAllOrders = async(req, res) => {

    try{
        const orders = await Order.find({});
        if(!orders){
            return res.status(500).json({message: 'Inernal server error' });
        }
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        if (!customers || customers.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.createAdminAccount = async (req, res) => {
    try {
        // Extract necessary information from the request body
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create the new admin account
        const newAdmin = new Admin({
            email: email,
            password: hashedPassword,
            isAdmin: true
        });

        // Save the new admin account to the database
        await newAdmin.save();

        // Generate JWT token for the new admin
        const token = jwt.sign({ adminId: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.status(201).json({ message: 'New admin account created successfully', token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}