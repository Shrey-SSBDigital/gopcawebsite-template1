const mongoose = require('mongoose');

const GrowerFarmerSchema = new mongoose.Schema({
  srNo: { type: Number, required: true },
  farmerName: { type: String, required: true },
  fatherHusbandName: { type: String },
  growerGroup: { type: String, required: true },
  groupRegNo: { type: String },
  village: { type: String },
  taluka: { type: String },
  district: { type: String },
  majorCrops: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('GrowerFarmer', GrowerFarmerSchema);
