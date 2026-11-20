const express = require('express');
const router = express.Router();
const { isMongoConnected, getStore, saveStore, resetStore } = require('../db');
const Operator = require('../models/Operator');
const Application = require('../models/Application');
const Inquiry = require('../models/Inquiry');
const Circular = require('../models/Circular');
const ApprovedInput = require('../models/ApprovedInput');
const Staff = require('../models/Staff');
const GrowerFarmer = require('../models/GrowerFarmer');

// Helper to get collection either from DB or Store
const getCollection = (name) => {
  const store = getStore();
  if (!store[name]) {
    store[name] = [];
  }
  return store[name];
};

// ================= HEALTH & STATS =================
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: isMongoConnected() ? 'MongoDB' : 'Resilient JSON Store',
    version: '1.0.0'
  });
});

router.get('/stats', async (req, res) => {
  try {
    const store = getStore();
    const operators = getCollection('operators');
    const applications = getCollection('applications');
    const inputs = getCollection('approvedInputs');
    const farmers = getCollection('growerFarmers');

    const totalLand = operators.reduce((acc, curr) => acc + (Number(curr.totalAreaHectares) || 0), 0);
    const individualCount = operators.filter(o => o.operatorType === 'Individual Farmer').length;
    const icsCount = operators.filter(o => o.operatorType === 'Grower Group (ICS)').length;

    res.json({
      success: true,
      stats: store.stats || [],
      counts: {
        totalOperators: operators.length,
        individualFarmers: individualCount,
        growerGroups: icsCount,
        totalLandHectares: Math.round(totalLand),
        approvedInputs: inputs.length,
        pendingApplications: applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length,
        totalApplications: applications.length,
        memberFarmersCount: farmers.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= AUTH & OFFICERS =================
router.get('/auth/officers', (req, res) => {
  const officers = getCollection('officers');
  // Return officer info without sensitive PINs
  const safeOfficers = officers.map(o => ({
    id: o.id,
    username: o.username,
    name: o.name,
    role: o.role,
    email: o.email,
    badge: o.badge,
    division: o.division
  }));
  res.json({ success: true, officers: safeOfficers });
});

router.post('/auth/login', (req, res) => {
  const { officerId, pin } = req.body;
  const officers = getCollection('officers');
  
  const officer = officers.find(o => o.id === officerId || o.username === officerId);
  if (!officer) {
    return res.status(404).json({ success: false, message: 'Officer record not found in GOPCA roster.' });
  }

  // Official PIN is 1860 (from Societies Registration Act 1860) or custom per officer
  const validPin = officer.pin || '1860';
  if (String(pin).trim() !== String(validPin).trim()) {
    return res.status(401).json({ success: false, message: 'Invalid 4-digit Officer PIN.' });
  }

  res.json({
    success: true,
    message: 'Authentication successful. Officer session initiated.',
    officer: {
      id: officer.id,
      username: officer.username,
      name: officer.name,
      role: officer.role,
      email: officer.email,
      badge: officer.badge,
      division: officer.division
    },
    token: `gopca-jwt-${Date.now()}`
  });
});

// ================= OPERATORS =================
router.get('/operators', (req, res) => {
  const { q, district, status, type } = req.query;
  let operators = getCollection('operators');

  if (q) {
    const term = q.toLowerCase();
    operators = operators.filter(o => 
      o.name?.toLowerCase().includes(term) ||
      o.registrationNumber?.toLowerCase().includes(term) ||
      o.village?.toLowerCase().includes(term) ||
      o.taluka?.toLowerCase().includes(term) ||
      o.district?.toLowerCase().includes(term) ||
      (o.cropTypes && o.cropTypes.some(c => c.toLowerCase().includes(term)))
    );
  }

  if (district && district !== 'All') {
    operators = operators.filter(o => o.district === district);
  }

  if (status && status !== 'All') {
    operators = operators.filter(o => o.status === status);
  }

  if (type && type !== 'All') {
    operators = operators.filter(o => o.operatorType === type);
  }

  res.json({ success: true, count: operators.length, operators });
});

router.post('/operators', (req, res) => {
  const store = getStore();
  const operators = getCollection('operators');

  const newOp = {
    id: `op-${Date.now()}`,
    registrationNumber: req.body.registrationNumber || `ORG-${new Date().getFullYear().toString().slice(-2)}${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100000 + Math.random() * 900000)}`,
    name: req.body.name,
    operatorType: req.body.operatorType || 'Individual Farmer',
    district: req.body.district || 'Ahmedabad',
    taluka: req.body.taluka || '',
    village: req.body.village || '',
    cropTypes: Array.isArray(req.body.cropTypes) ? req.body.cropTypes : (req.body.cropTypes ? req.body.cropTypes.split(',').map(s => s.trim()) : ['Cotton', 'Wheat']),
    totalAreaHectares: Number(req.body.totalAreaHectares) || 1.5,
    farmerCount: req.body.farmerCount ? Number(req.body.farmerCount) : undefined,
    status: req.body.status || 'Certified Organic',
    validFrom: req.body.validFrom || new Date().toISOString().slice(0, 10),
    validUntil: req.body.validUntil || new Date(Date.now() + 365*24*60*60*1000).toISOString().slice(0, 10),
    scopeCertificateNo: req.body.scopeCertificateNo || `ORG/SC/${Date.now().toString().slice(-4)}/${Math.floor(100000 + Math.random() * 900000)}`,
    cbRemarks: req.body.cbRemarks || ''
  };

  operators.unshift(newOp);
  saveStore();
  res.status(201).json({ success: true, operator: newOp });
});

router.put('/operators/:id', (req, res) => {
  const operators = getCollection('operators');
  const index = operators.findIndex(o => o.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Operator not found' });
  }

  operators[index] = { ...operators[index], ...req.body };
  saveStore();
  res.json({ success: true, operator: operators[index] });
});

router.delete('/operators/:id', (req, res) => {
  const store = getStore();
  store.operators = getCollection('operators').filter(o => o.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Operator deleted successfully' });
});

// ================= GROWER FARMERS =================
router.get('/farmers', (req, res) => {
  const { q, district, group } = req.query;
  let farmers = getCollection('growerFarmers');

  if (q) {
    const term = q.toLowerCase();
    farmers = farmers.filter(f =>
      f.farmerName?.toLowerCase().includes(term) ||
      f.growerGroup?.toLowerCase().includes(term) ||
      f.groupRegNo?.toLowerCase().includes(term) ||
      f.village?.toLowerCase().includes(term) ||
      f.district?.toLowerCase().includes(term)
    );
  }

  if (district && district !== 'All') {
    farmers = farmers.filter(f => f.district === district);
  }

  if (group) {
    farmers = farmers.filter(f => f.growerGroup === group || f.groupRegNo === group);
  }

  res.json({ success: true, count: farmers.length, farmers });
});

router.post('/farmers', (req, res) => {
  const farmers = getCollection('growerFarmers');
  const maxSr = farmers.length > 0 ? Math.max(...farmers.map(f => Number(f.srNo) || 0)) : 0;

  const newFarmer = {
    srNo: maxSr + 1,
    farmerName: req.body.farmerName,
    fatherHusbandName: req.body.fatherHusbandName || '',
    growerGroup: req.body.growerGroup || 'Gujarat Organic Growers Collective',
    groupRegNo: req.body.groupRegNo || 'ORG-2202-000684',
    village: req.body.village || '',
    taluka: req.body.taluka || '',
    district: req.body.district || 'Ahmedabad',
    majorCrops: req.body.majorCrops || 'Groundnut, Wheat'
  };

  farmers.push(newFarmer);
  saveStore();
  res.status(201).json({ success: true, farmer: newFarmer });
});

router.delete('/farmers/:srNo', (req, res) => {
  const store = getStore();
  store.growerFarmers = getCollection('growerFarmers').filter(f => f.srNo != req.params.srNo);
  saveStore();
  res.json({ success: true, message: 'Farmer removed from group' });
});

// ================= APPROVED INPUTS =================
router.get('/inputs', (req, res) => {
  const { q } = req.query;
  let inputs = getCollection('approvedInputs');

  if (q) {
    const term = q.toLowerCase();
    inputs = inputs.filter(i =>
      i.productName?.toLowerCase().includes(term) ||
      i.producerName?.toLowerCase().includes(term) ||
      i.use?.toLowerCase().includes(term)
    );
  }

  res.json({ success: true, count: inputs.length, inputs });
});

router.post('/inputs', (req, res) => {
  const inputs = getCollection('approvedInputs');
  const maxSr = inputs.length > 0 ? Math.max(...inputs.map(i => Number(i.srNo) || 0)) : 0;

  const newInput = {
    id: `inp-${Date.now()}`,
    srNo: maxSr + 1,
    producerName: req.body.producerName,
    productName: req.body.productName,
    use: req.body.use || 'Bio-fertilizer / Organic Input',
    validity: req.body.validity || new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-GB')
  };

  inputs.unshift(newInput);
  saveStore();
  res.status(201).json({ success: true, input: newInput });
});

router.put('/inputs/:id', (req, res) => {
  const inputs = getCollection('approvedInputs');
  const idx = inputs.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Input not found' });

  inputs[idx] = { ...inputs[idx], ...req.body };
  saveStore();
  res.json({ success: true, input: inputs[idx] });
});

router.delete('/inputs/:id', (req, res) => {
  const store = getStore();
  store.approvedInputs = getCollection('approvedInputs').filter(i => i.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Approved input deleted' });
});

// ================= CIRCULARS =================
router.get('/circulars', (req, res) => {
  const circulars = getCollection('circulars');
  res.json({ success: true, count: circulars.length, circulars });
});

router.post('/circulars', (req, res) => {
  const circulars = getCollection('circulars');
  const newCirc = {
    id: `circ-${Date.now()}`,
    referenceNo: req.body.referenceNo || `GOPCA/CIR/${new Date().getFullYear()}/${Math.floor(10 + Math.random() * 90)}`,
    title: req.body.title,
    category: req.body.category || 'General Notice',
    summary: req.body.summary || '',
    date: req.body.date || new Date().toISOString().slice(0, 10),
    isImportant: Boolean(req.body.isImportant)
  };

  circulars.unshift(newCirc);
  saveStore();
  res.status(201).json({ success: true, circular: newCirc });
});

router.delete('/circulars/:id', (req, res) => {
  const store = getStore();
  store.circulars = getCollection('circulars').filter(c => c.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Circular deleted' });
});

// ================= DOWNLOADS =================
router.get('/downloads', (req, res) => {
  const downloads = getCollection('downloads');
  res.json({ success: true, count: downloads.length, downloads });
});

router.post('/downloads', (req, res) => {
  const downloads = getCollection('downloads');
  const newDl = {
    id: `dl-${Date.now()}`,
    formNumber: req.body.formNumber || `Form GOPCA/GEN-${Math.floor(10 + Math.random() * 90)}`,
    title: req.body.title,
    category: req.body.category || 'Application Forms',
    fileFormat: 'PDF',
    fileSize: req.body.fileSize || '520 KB',
    description: req.body.description || ''
  };

  downloads.unshift(newDl);
  saveStore();
  res.status(201).json({ success: true, download: newDl });
});

router.delete('/downloads/:id', (req, res) => {
  const store = getStore();
  store.downloads = getCollection('downloads').filter(d => d.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Download form removed' });
});

// ================= APPLICATIONS =================
router.get('/applications', (req, res) => {
  const applications = getCollection('applications');
  res.json({ success: true, count: applications.length, applications });
});

router.post('/applications', (req, res) => {
  const applications = getCollection('applications');
  const year = new Date().getFullYear();
  const serial = Math.floor(100 + Math.random() * 900);
  const applicationNo = `GOPCA/APP/${year}/0${serial}`;

  const newApp = {
    id: `app-${Date.now()}`,
    applicationNo,
    status: 'Submitted',
    createdAt: new Date().toISOString(),
    formData: req.body.formData || req.body,
    feeSummary: req.body.feeSummary || {},
    totalFeeCalculated: req.body.totalFeeCalculated || 0,
    officerRemarks: 'Application received online. Scheduled for document scrutiny.'
  };

  applications.unshift(newApp);
  saveStore();
  res.status(201).json({
    success: true,
    message: 'Application submitted successfully. Keep your Application Number for tracking.',
    application: newApp
  });
});

router.put('/applications/:id', (req, res) => {
  const applications = getCollection('applications');
  const idx = applications.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Application not found' });

  applications[idx] = { ...applications[idx], ...req.body };
  saveStore();
  res.json({ success: true, application: applications[idx] });
});

router.delete('/applications/:id', (req, res) => {
  const store = getStore();
  store.applications = getCollection('applications').filter(a => a.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Application archived' });
});

// ================= INQUIRIES =================
router.get('/inquiries', (req, res) => {
  const inquiries = getCollection('inquiries');
  res.json({ success: true, count: inquiries.length, inquiries });
});

router.post('/inquiries', (req, res) => {
  const inquiries = getCollection('inquiries');
  const newInq = {
    id: `inq-${Date.now()}`,
    name: req.body.name,
    email: req.body.email || '',
    contact: req.body.contact,
    address: req.body.address || '',
    message: req.body.message,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  inquiries.unshift(newInq);
  saveStore();
  res.status(201).json({ success: true, message: 'Inquiry registered with GOPCA citizen cell.', inquiry: newInq });
});

router.put('/inquiries/:id', (req, res) => {
  const inquiries = getCollection('inquiries');
  const idx = inquiries.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Inquiry not found' });

  inquiries[idx] = { ...inquiries[idx], ...req.body };
  saveStore();
  res.json({ success: true, inquiry: inquiries[idx] });
});

router.delete('/inquiries/:id', (req, res) => {
  const store = getStore();
  store.inquiries = getCollection('inquiries').filter(i => i.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Inquiry deleted' });
});

// ================= STAFF & GOVERNING BOARD =================
router.get('/staff', (req, res) => {
  const staff = getCollection('staff');
  const governingBoard = getCollection('governingBoard');
  res.json({ success: true, staff, governingBoard });
});

router.post('/staff', (req, res) => {
  const staff = getCollection('staff');
  const newStaff = {
    id: `st-${Date.now()}`,
    name: req.body.name,
    designation: req.body.designation,
    role: req.body.role || '',
    office: req.body.office || 'GOPCA Head Office, Ahmedabad',
    contactNumber: req.body.contactNumber || '07926740031',
    email: req.body.email || 'dirgopca@gmail.com'
  };

  staff.push(newStaff);
  saveStore();
  res.status(201).json({ success: true, staff: newStaff });
});

// ================= BACKUP & RESET =================
router.get('/backup', (req, res) => {
  res.json({ success: true, data: getStore() });
});

router.post('/backup', (req, res) => {
  if (req.body.data && typeof req.body.data === 'object') {
    const store = getStore();
    Object.assign(store, req.body.data);
    saveStore();
    return res.json({ success: true, message: 'Database state imported successfully.' });
  }
  res.status(400).json({ success: false, message: 'Invalid backup structure' });
});

router.post('/reset', (req, res) => {
  const fresh = resetStore();
  res.json({ success: true, message: 'Reset to statutory GOPCA baseline records.', data: fresh });
});

module.exports = router;
