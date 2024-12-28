const User = require('../models/User');
const Ads = require('../models/Ads');
const axios = require('axios');
const FormData = require('form-data');

exports.getWomen = async (req, res) => {
    try {
        const women = await User.find({ role: 'woman' });
        res.status(200).json(women);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getMentorAds = async (req, res) => {
  try {
    // Extract user info from the request (e.g., from a middleware that adds the user to req.user)
    const userId = req.user.id;

    // Find the mentor ads associated with the userId
    const ads = await Ads.find({ mentor: userId });

    if (!ads || ads.length === 0) {
      return res.status(404).json({ message: 'No ads found for this mentor.' });
    }

    // Respond with the list of ads
    res.status(200).json({ ads });
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createAds = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(req.body);
     

    const {
      mentorName,
      contactEmail,
      contactPhone,
      services,
      description,
      experience,
      location,
      availableSlots,
      priceRange,
      image,
    } = req.body;

    if (!services || !description || !location || !priceRange) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newAd = new Ads({
      mentor: userId,
      mentorName,
      services,
      contactEmail,
      contactPhone,
      description,
      image, // Save the image URL sent from the frontend
      experience,
      location,
      availableSlots,
      priceRange,
    });

    const savedAd = await newAd.save();
    res.status(201).json({ message: 'Ad created successfully', ad: savedAd });
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.editAds = async (req, res) => {
  try {
    const userId = req.user.id;
    const adId = req.params.id;  // Assuming the ad ID is passed as a URL parameter

    // Find the ad by its ID
    const ad = await Ads.findById(adId);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found.' });
    }

    // Ensure the user is the mentor who created the ad
    if (ad.mentor.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this ad.' });
    }

    // Update the ad with the new details from the request body
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

    // Update the ad fields
    ad.services = services || ad.services;
    ad.contactEmail = contactEmail || ad.contactEmail;
    ad.contactPhone = contactPhone || ad.contactPhone;
    ad.mentorName = mentorName || ad.mentorName;
    ad.description = description || ad.description;
    ad.image = image || ad.image;
    ad.experience = experience || ad.experience;
    ad.location = location || ad.location;
    ad.availableSlots = availableSlots || ad.availableSlots;
    ad.priceRange = priceRange || ad.priceRange;

    // Save the updated ad
    const updatedAd = await ad.save();

    // Respond with the updated ad
    res.status(200).json({ message: 'Ad updated successfully', ad: updatedAd });
  } catch (error) {
    console.error('Error updating ad:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
