const express = require('express');
const router = express.Router();
const { register, login, getUser, updateUserProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, getUser);
router.put('/user', authenticate, updateUserProfile);

module.exports = router;