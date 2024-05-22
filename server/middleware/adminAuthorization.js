const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const authorizeAdmin = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.userId);

        if (!admin || !admin.isAdmin) {
            return res.status(403).json({ error: 'Access denied, admin privileges required' });
        }

        // Attach the admin to the request object
        req.admin = admin;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authorizeAdmin;
