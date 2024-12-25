const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getWomen } = require('../controllers/mentorController');

router.get('/women', authenticate, authorize('seeWomen'), getWomen);

module.exports = router;