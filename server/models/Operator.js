const mongoose = require('mongoose');

const OperatorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true },
  name: { type: String, required: true },
  operatorType: { type: String, required: true }, // 'Individual Farmer', 'Grower Group (ICS)'
  district: { type: String, required: true },
  taluka: { type: String },
  village: { type: String },
  cropTypes: [{ type: String }],
  totalAreaHectares: { type: Number, default: 0 },
  farmerCount: { type: Number },
  status: { type: String, default: 'Certified Organic' }, // 'Certified Organic', 'In-Conversion (C-1)', 'In-Conversion (C-2)', 'Suspended', 'Terminated'
  validFrom: { type: String },
  validUntil: { type: String },
  scopeCertificateNo: { type: String },
  traceNetUrl: { type: String },
  cbRemarks: { type: String },
  action: { type: String },
  actionFromDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Operator', OperatorSchema);
