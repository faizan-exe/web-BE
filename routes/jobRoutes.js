const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { createJob, getJobs, deleteJob } = require('../controllers/jobController');

router.post('/', authenticate, authorize('putUpJobs'), createJob);
router.get('/', authenticate, authorize('seeJobs'),getJobs);
router.delete('/:id', authenticate, authorize('putUpJobs'), deleteJob);
module.exports = router;
