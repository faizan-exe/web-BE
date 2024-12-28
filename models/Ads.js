const mongoose = require('mongoose');

const AdsSchema = new mongoose.Schema({
  mentorName: { type: String, required: false },
  services: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true, match: /.+\@.+\..+/ }, // Valid email format
  contactPhone: { type: String, required: true },
  image: { type: String, required: true }, // URL of the mentor's image
  experience: { type: Number, required: true, min: 0 }, // Experience in years
  location: { type: String, required: true },
  availableSlots: { type: String, required: true },
  priceRange: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Optional: Track when the mentor profile was created
});

module.exports = mongoose.model('Ad', AdsSchema);
