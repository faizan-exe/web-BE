const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Job name
  description: { type: String, required: true },  // Job description
  price: { type: Number, required: true },  // Price
  stockQuantity: { type: Number, required: true },  // Stock quantity
  category: { type: String, required: true },  // Category (e.g., Skincare, Healthcare, etc.)
  sku: { type: String, required: true },  // SKU (Stock Keeping Unit)
  tags: { type: [String], required: false },  // Tags for the product (optional)
  discount: { type: Number, required: false },  // Discount percentage (optional)
  launchDate: { type: Date, required: false },  // Launch date (optional)
  warrantyInfo: { type: String, required: false,  },  // Warranty information (optional)
  image: { type: String, required: false },  // Image URL (optional, can be added later)
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User reference (who posted the job)
  createdAt: { type: Date, default: Date.now }  // Creation date
});

// Creating and exporting the Job model
module.exports = mongoose.model('Job', JobSchema);
