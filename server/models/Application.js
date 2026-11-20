const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  applicationNo: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Field Inspection Scheduled', 'Approved', 'Rejected'],
    default: 'Submitted'
  },
  formData: {
    scope: { type: String, default: 'crop-individual' },
    fullName: { type: String, required: true },
    entityName: { type: String },
    mobile: { type: String, required: true },
    email: { type: String },
    aadhaarOrGst: { type: String },
    district: { type: String, required: true },
    taluka: { type: String },
    village: { type: String },
    surveyNumbers: { type: String },
    areaAcres: { type: Number, default: 0 },
    primaryCrops: { type: String },
    yearsOrganic: { type: Number, default: 1 },
    previousChemicals: { type: String },
    hasBufferZones: { type: Boolean, default: true },
    hasFarmDiary: { type: Boolean, default: true },
    agreedToTerms: { type: Boolean, default: true }
  },
  feeSummary: {
    applicationFee: { type: Number, default: 0 },
    inspectionFees: { type: Number, default: 0 },
    scrutinyFee: { type: Number, default: 0 },
    labTestingFee: { type: Number, default: 0 },
    travelPerDiem: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    gst18: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    advancePayable: { type: Number, default: 0 }
  },
  totalFeeCalculated: { type: Number, default: 0 },
  officerRemarks: { type: String, default: '' },
  assignedOfficer: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
