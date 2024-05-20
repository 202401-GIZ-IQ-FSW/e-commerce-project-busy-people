// middlewares/authMiddleware.js
const Customer = require('../models/customer');

const authMiddleware = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized: No session found');
    }

    try {
        const user = await Customer.findById(req.session.userId);
        if (!user) {
            return res.status(401).send('Unauthorized: User not found');
        }
        next();
        
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
};

module.exports = authMiddleware;
