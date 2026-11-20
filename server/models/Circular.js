const mongoose = require('mongoose');

const CircularSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  referenceNo: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, default: 'General Notice' },
  summary: { type: String },
  isImportant: { type: Boolean, default: false },
  pdfUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Circular', CircularSchema);
