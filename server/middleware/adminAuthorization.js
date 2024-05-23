const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err.message); // Log the error for debugging
                return res.status(401).json({ error: 'Unauthorized' }); // Send an unauthorized response
            } else {
                req.user = decodedToken; // Attach decoded token to the request for further processing
                next(); // Call next middleware or route handler
            }
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized' }); // Send an unauthorized response if there's no token
    }
};

module.exports = authMiddleware;
