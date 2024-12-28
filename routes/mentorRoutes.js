const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getWomen, createAds, getMentorAds } = require('../controllers/mentorController');

router.get('/women', authenticate, authorize('seeWomen'), getWomen);
router.post('/ads', authenticate, createAds);
router.get('/ads', authenticate, getMentorAds);
module.exports = router;