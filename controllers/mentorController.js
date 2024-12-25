const User = require('../models/User');

exports.getWomen = async (req, res) => {
    try {
        const women = await User.find({ role: 'woman' });
        res.status(200).json(women);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};