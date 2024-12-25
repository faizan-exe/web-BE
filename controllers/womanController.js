const User = require('../models/User');
const Job = require('../models/Job');

exports.getMentors = async (req, res) => {
    try {
        const mentors = await User.find({ role: 'mentor' });
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};