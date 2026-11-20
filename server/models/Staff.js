const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  role: { type: String },
  office: { type: String },
  contactNumber: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema);
