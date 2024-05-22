const jwt = require('jsonwebtoken');
const CustomerModel = require('../models/customer'); // Import your Customer model

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. Token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Change 'your_secret_key' to your actual JWT secret key
        const customer = await CustomerModel.findOne({ email: decoded.email });

        if (!customer) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        req.customer = customer;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
