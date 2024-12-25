const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getMentors, getJobs} = require('../controllers/womanController');

router.get('/mentors', authenticate, getMentors);
router.get('/jobs', authenticate, getJobs);


module.exports = router;
