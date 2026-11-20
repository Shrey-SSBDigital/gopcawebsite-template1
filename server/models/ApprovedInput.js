const mongoose = require('mongoose');

const ApprovedInputSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  srNo: { type: Number },
  producerName: { type: String, required: true },
  productName: { type: String, required: true },
  use: { type: String },
  validity: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ApprovedInput', ApprovedInputSchema);
