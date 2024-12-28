const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getWomen, createAds } = require('../controllers/mentorController');

router.get('/women', authenticate, authorize('seeWomen'), getWomen);
router.post('/ads', authenticate, createAds);
module.exports = router;