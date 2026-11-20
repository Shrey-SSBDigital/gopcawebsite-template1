const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  contact: { type: String, required: true },
  address: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);
