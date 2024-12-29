const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getWomen, createAds, getMentorAds, editAds, getAllAds, deleteAds } = require('../controllers/mentorController');
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.get('/women', authenticate, authorize('seeWomen'), getWomen);
router.post('/ads', authenticate, createAds);
router.get('/ads', authenticate, getMentorAds);
router.put('/ads/:id', authenticate, editAds);
router.get('/allAds', getAllAds);
router.delete('/ads/:id', authenticate, deleteAds);
module.exports = router;