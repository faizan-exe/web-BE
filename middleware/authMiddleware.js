const jwt = require('jsonwebtoken');
const roles = require('../utils/roles');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, "somesecret123");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const authorize = (action) => (req, res, next) => {
    const { role } = req.user;
    if (roles[role] && roles[role].includes(action)) {
        return next();
    }
    res.status(403).json({ message: 'Forbidden' });
};

module.exports = { authenticate, authorize };