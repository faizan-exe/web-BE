const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getWomen, createAds, getMentorAds, editAds } = require('../controllers/mentorController');
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.get('/women', authenticate, authorize('seeWomen'), getWomen);
router.post('/ads', authenticate, createAds);
router.get('/ads', authenticate, getMentorAds);
router.put('/ads/:id', authenticate, editAds);
module.exports = router;