const User = require('../models/User');
const Ads = require('../models/Ads');
exports.getWomen = async (req, res) => {
    try {
        const women = await User.find({ role: 'woman' });
        res.status(200).json(women);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getMentorAds 

exports.createAds = async (req, res) => {
  try {
    // Extract user info from the request (e.g., from a middleware that adds the user to req.user)
    const userId = req.user.id;

    // Find the user and verify their role is 'mentor'
    const user = await User.findById(userId);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Only mentors can create ads.' });
    }

    // Get ad details from the request body
    const {
      mentorName,
      contactEmail,
      contactPhone,
      services,
      description,
      image,
      experience,
      location,
      availableSlots,
      priceRange,
    } = req.body;

    // Validate required fields
    if (!services || !description || !location || !priceRange) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    // Create a new ad
    const newAd = new Ads({
      mentor: userId, // Associate the ad with the mentor's user ID
      mentorName: user.name, // Optionally include the mentor's name
      services,
      contactEmail,
      contactPhone,
      description,
      image,
      experience,
      location,
      availableSlots,
      priceRange,
    });

    // Save the ad to the database
    const savedAd = await newAd.save();

    // Respond with the created ad
    res.status(201).json({ message: 'Ad created successfully', ad: savedAd });
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
