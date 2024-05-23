const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.customer = decodedToken; // Attach decoded token directly to the request
        next();
    } catch (error) {
        console.error(error.message); // Log the error for debugging
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
