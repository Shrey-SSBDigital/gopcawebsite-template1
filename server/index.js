import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const INITIAL_DATA_FILE = path.join(DATA_DIR, 'initialData.json');

// Ensure db.json exists, otherwise copy from initialData.json
function loadDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } else if (fs.existsSync(INITIAL_DATA_FILE)) {
      const content = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
      fs.writeFileSync(DB_FILE, content, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  return {
    governingBoard: [],
    personnel: [],
    operators: [],
    downloads: [],
    photos: [],
    videos: [],
    feeSchedule: [],
    inquiries: []
  };
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

let db = loadDatabase();

// Dynamic Table Schema Registry for CMS
const CMS_TABLE_SCHEMAS = {
  governing_board: {
    id: 'governing_board',
    name: 'Apex Governing Board',
    key: 'governingBoard',
    description: 'Statutory governing council members of GOPCA with logo, roles, and functions',
    columns: [
      { key: 'logo', label: 'Logo', type: 'logo' },
      { key: 'role', label: 'Governance Role', type: 'badge' },
      { key: 'designation', label: 'Designation', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'location', label: 'Jurisdiction / Location', type: 'text' },
      { key: 'function', label: 'Statutory Governance Function', type: 'text' }
    ]
  },
  personnel: {
    id: 'personnel',
    name: 'Personnel & Auditors Cadre',
    key: 'personnel',
    description: 'ISO/IEC 17065 accredited lead auditors, technical officers, and inspectors',
    columns: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'designation', label: 'Designation', type: 'text' },
      { key: 'cadre', label: 'Cadre', type: 'badge', options: ['Field Inspection & Audit', 'Technical Scrutiny', 'Administration'] },
      { key: 'qualification', label: 'Qualification', type: 'text' },
      { key: 'responsibilities', label: 'Responsibilities', type: 'text' },
      { key: 'status', label: 'Status', type: 'badge', options: ['Permanent', 'Deputation'] }
    ]
  },
  operators_active: {
    id: 'operators_active',
    name: 'Active ICS Operator Registry',
    key: 'operators',
    filter: (item) => item.type === 'active',
    defaultType: 'active',
    description: 'Accredited Grower Groups (ICS), individual estates, and bio-input producers',
    columns: [
      { key: 'registrationId', label: 'Registration ID', type: 'text' },
      { key: 'name', label: 'Operator / Organization Name', type: 'text' },
      { key: 'category', label: 'Category / Scope', type: 'badge' },
      { key: 'district', label: 'District', type: 'text' },
      { key: 'village', label: 'Village / Cluster', type: 'text' },
      { key: 'crops', label: 'Certified Crops', type: 'text' },
      { key: 'hectarage', label: 'Hectarage (Ha)', type: 'number' },
      { key: 'status', label: 'Status', type: 'badge' },
      { key: 'validity', label: 'Validity Date', type: 'date' }
    ]
  },
  operators_farmers: {
    id: 'operators_farmers',
    name: 'Grower Group Member Farmers',
    key: 'operators',
    filter: (item) => item.type === 'farmers',
    defaultType: 'farmers',
    description: 'Individual smallholder member farmers certified under Group ICS scopes',
    columns: [
      { key: 'registrationId', label: 'Member ID', type: 'text' },
      { key: 'name', label: 'Farmer Name', type: 'text' },
      { key: 'groupName', label: 'Parent FPO / Grower Group', type: 'text' },
      { key: 'district', label: 'District', type: 'text' },
      { key: 'village', label: 'Village & Survey 7/12', type: 'text' },
      { key: 'crops', label: 'Crop Scope', type: 'text' },
      { key: 'hectarage', label: 'Plot Area (Ha)', type: 'number' },
      { key: 'status', label: 'Conversion Status', type: 'badge' },
      { key: 'validity', label: 'Validity', type: 'date' }
    ]
  },
  operators_suspended: {
    id: 'operators_suspended',
    name: 'Suspended Operators Registry',
    key: 'operators',
    filter: (item) => item.type === 'suspended',
    defaultType: 'suspended',
    description: 'Operators under statutory sanction with pending corrective actions',
    columns: [
      { key: 'registrationId', label: 'Registration ID', type: 'text' },
      { key: 'name', label: 'Operator Name', type: 'text' },
      { key: 'category', label: 'Category', type: 'badge' },
      { key: 'district', label: 'District', type: 'text' },
      { key: 'status', label: 'Status', type: 'badge' },
      { key: 'validity', label: 'Notice Date', type: 'text' },
      { key: 'reason', label: 'Statutory Reason for Suspension', type: 'text' }
    ]
  },
  operators_terminated: {
    id: 'operators_terminated',
    name: 'Terminated Operators Registry',
    key: 'operators',
    filter: (item) => item.type === 'terminated',
    defaultType: 'terminated',
    description: 'De-registered entities permanently prohibited under NPOP criteria',
    columns: [
      { key: 'registrationId', label: 'Registration ID', type: 'text' },
      { key: 'name', label: 'Operator Name', type: 'text' },
      { key: 'category', label: 'Category', type: 'badge' },
      { key: 'district', label: 'District', type: 'text' },
      { key: 'status', label: 'Status', type: 'badge' },
      { key: 'validity', label: 'De-registration Date', type: 'text' },
      { key: 'reason', label: 'Statutory Termination Cause & APEDA Intimation', type: 'text' }
    ]
  },
  operators_discontinued: {
    id: 'operators_discontinued',
    name: 'Discontinued Operators Registry',
    key: 'operators',
    filter: (item) => item.type === 'discontinued',
    defaultType: 'discontinued',
    description: 'Voluntary cessations or operators who transitioned out of organic certification',
    columns: [
      { key: 'registrationId', label: 'Registration ID', type: 'text' },
      { key: 'name', label: 'Operator Name', type: 'text' },
      { key: 'category', label: 'Category', type: 'badge' },
      { key: 'district', label: 'District', type: 'text' },
      { key: 'status', label: 'Status', type: 'badge' },
      { key: 'validity', label: 'Discontinuation Date', type: 'text' },
      { key: 'reason', label: 'Reason for Discontinuation', type: 'text' }
    ]
  },
  downloads: {
    id: 'downloads',
    name: 'Document Download Center',
    key: 'downloads',
    description: 'Application forms, circulars, inspection schedules, and RTI disclosures',
    columns: [
      { key: 'code', label: 'File Code', type: 'text' },
      { key: 'title', label: 'Document Title', type: 'text' },
      { key: 'category', label: 'Category', type: 'badge' },
      { key: 'format', label: 'Format', type: 'badge' },
      { key: 'size', label: 'Size', type: 'text' },
      { key: 'issuingWing', label: 'Issuing Wing', type: 'text' },
      { key: 'description', label: 'Description', type: 'text' }
    ]
  },
  fee_schedule: {
    id: 'fee_schedule',
    name: 'Fee Schedule & Tariffs',
    key: 'feeSchedule',
    description: 'Official statutory fee structure for individual farmers, ICS, packhouses, and inputs',
    columns: [
      { key: 'category', label: 'Category / Land Holding', type: 'text' },
      { key: 'scrutinyFee', label: 'Scrutiny Fee (₹)', type: 'number' },
      { key: 'inspectionFee', label: 'Inspection Fee (₹)', type: 'number' },
      { key: 'gstRate', label: 'GST Rate (%)', type: 'number' },
      { key: 'applicability', label: 'Applicability Criteria', type: 'text' }
    ]
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    agency: 'Gujarat Organic Products Certification Agency (GOPCA)',
    framework: 'MERN Stack + Dynamic CMS Engine',
    timestamp: new Date().toISOString()
  });
});

// Admin Authentication (1 ID & Password for CMS Management)
app.post('/api/auth/login', (req, res) => {
  const { id, password } = req.body || {};
  const validId = 'admin';
  const validPasswords = ['admin', 'admin123', 'admin@gopca', 'gopca2026'];

  if (
    id && 
    id.trim().toLowerCase() === validId && 
    password && 
    validPasswords.includes(password.trim())
  ) {
    return res.json({
      success: true,
      user: {
        id: 'admin',
        role: 'Super Administrator',
        agency: 'GOPCA Gujarat'
      },
      token: `gopca-jwt-${Date.now()}`
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid Administrator ID or Password'
  });
});

// CMS Dynamic Table Schemas List
app.get('/api/cms/tables', (req, res) => {
  const tables = Object.keys(CMS_TABLE_SCHEMAS).map(id => {
    const s = CMS_TABLE_SCHEMAS[id];
    let count = 0;
    if (s.filter && db[s.key]) {
      count = db[s.key].filter(s.filter).length;
    } else if (db[s.key]) {
      count = db[s.key].length;
    }
    return {
      id: s.id,
      name: s.name,
      description: s.description,
      columnsCount: s.columns.length,
      rowCount: count,
      key: s.key
    };
  });
  res.json({ success: true, tables });
});

// Get Specific Dynamic Table
app.get('/api/cms/tables/:tableId', (req, res) => {
  const schema = CMS_TABLE_SCHEMAS[req.params.tableId];
  if (!schema) {
    return res.status(404).json({ success: false, error: 'Table schema not found' });
  }

  let rows = db[schema.key] || [];
  if (schema.filter) {
    rows = rows.filter(schema.filter);
  }

  res.json({
    success: true,
    schema: {
      id: schema.id,
      name: schema.name,
      description: schema.description,
      columns: schema.columns
    },
    rows
  });
});

// Add Row to CMS Dynamic Table
app.post('/api/cms/tables/:tableId/rows', (req, res) => {
  const schema = CMS_TABLE_SCHEMAS[req.params.tableId];
  if (!schema) {
    return res.status(404).json({ success: false, error: 'Table schema not found' });
  }

  const newRow = {
    id: `row-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...req.body
  };

  if (schema.defaultType && !newRow.type) {
    newRow.type = schema.defaultType;
  }

  if (!db[schema.key]) {
    db[schema.key] = [];
  }

  db[schema.key].unshift(newRow);
  saveDatabase(db);

  res.status(201).json({ success: true, row: newRow });
});

// Update Row in Dynamic Table
app.put('/api/cms/tables/:tableId/rows/:id', (req, res) => {
  const schema = CMS_TABLE_SCHEMAS[req.params.tableId];
  if (!schema) {
    return res.status(404).json({ success: false, error: 'Table schema not found' });
  }

  const rowId = req.params.id;
  const list = db[schema.key] || [];
  const index = list.findIndex(r => String(r.id) === String(rowId));

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Record not found' });
  }

  db[schema.key][index] = { ...db[schema.key][index], ...req.body, id: rowId };
  saveDatabase(db);

  res.json({ success: true, row: db[schema.key][index] });
});

// Delete Row from Dynamic Table
app.delete('/api/cms/tables/:tableId/rows/:id', (req, res) => {
  const schema = CMS_TABLE_SCHEMAS[req.params.tableId];
  if (!schema) {
    return res.status(404).json({ success: false, error: 'Table schema not found' });
  }

  const rowId = req.params.id;
  const list = db[schema.key] || [];
  const initialLength = list.length;
  db[schema.key] = list.filter(r => String(r.id) !== String(rowId));

  if (db[schema.key].length === initialLength) {
    return res.status(404).json({ success: false, error: 'Record not found to delete' });
  }

  saveDatabase(db);
  res.json({ success: true, message: 'Record deleted successfully' });
});

// Reset Specific Dynamic Table to Statutory Initial Data
app.post('/api/cms/tables/:tableId/reset', (req, res) => {
  try {
    const raw = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    const defaults = JSON.parse(raw);
    const schema = CMS_TABLE_SCHEMAS[req.params.tableId];
    if (!schema) {
      return res.status(404).json({ success: false, error: 'Table schema not found' });
    }

    if (schema.defaultType) {
      // Reset only that type in operators
      const otherOperators = (db.operators || []).filter(o => o.type !== schema.defaultType);
      const defaultForType = (defaults.operators || []).filter(o => o.type === schema.defaultType);
      db.operators = [...otherOperators, ...defaultForType];
    } else if (defaults[schema.key]) {
      db[schema.key] = defaults[schema.key];
    }

    saveDatabase(db);
    res.json({ success: true, message: `Table ${schema.name} reset to defaults successfully` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Direct Dedicated REST Endpoints
app.get('/api/governing-board', (req, res) => {
  res.json({ success: true, data: db.governingBoard || [] });
});

app.get('/api/personnel', (req, res) => {
  res.json({ success: true, data: db.personnel || [] });
});

app.post('/api/personnel', (req, res) => {
  const newPerson = {
    id: `p-${Date.now()}`,
    ...req.body
  };
  if (!db.personnel) db.personnel = [];
  db.personnel.unshift(newPerson);
  saveDatabase(db);
  res.status(201).json({ success: true, data: newPerson });
});

app.delete('/api/personnel/:id', (req, res) => {
  const id = req.params.id;
  if (!db.personnel) db.personnel = [];
  db.personnel = db.personnel.filter(p => String(p.id) !== String(id));
  saveDatabase(db);
  res.json({ success: true, message: 'Personnel deleted successfully' });
});

app.post('/api/personnel/reset', (req, res) => {
  try {
    const raw = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
    const defaults = JSON.parse(raw);
    db.personnel = defaults.personnel || [];
    saveDatabase(db);
    res.json({ success: true, data: db.personnel });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Operators API with query parameters (type, search, district)
app.get('/api/operators', (req, res) => {
  const { type, district, search } = req.query;
  let result = db.operators || [];

  if (type) {
    result = result.filter(o => o.type === type);
  }
  if (district && district !== 'All') {
    result = result.filter(o => o.district && o.district.toLowerCase() === district.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(o => 
      (o.name && o.name.toLowerCase().includes(q)) ||
      (o.registrationId && o.registrationId.toLowerCase().includes(q)) ||
      (o.crops && o.crops.toLowerCase().includes(q)) ||
      (o.village && o.village.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

app.get('/api/downloads', (req, res) => {
  const { category, search } = req.query;
  let result = db.downloads || [];

  if (category && category !== 'All') {
    result = result.filter(d => d.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d => 
      (d.title && d.title.toLowerCase().includes(q)) ||
      (d.code && d.code.toLowerCase().includes(q)) ||
      (d.description && d.description.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, data: result });
});

app.get('/api/photos', (req, res) => {
  res.json({ success: true, data: db.photos || [] });
});

app.get('/api/videos', (req, res) => {
  res.json({ success: true, data: db.videos || [] });
});

app.get('/api/fees', (req, res) => {
  res.json({ success: true, data: db.feeSchedule || [] });
});

// Contact Inquiry Submission
app.post('/api/inquiries', (req, res) => {
  const inquiry = {
    id: `inq-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(inquiry);
  saveDatabase(db);
  res.status(201).json({
    success: true,
    message: 'Your inquiry has been logged with GOPCA Secretariat. Registration acknowledgment token generated.',
    inquiryId: inquiry.id
  });
});

// Serve client static build in production
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Start Express Server (only when run directly, not in Vercel Serverless)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`GOPCA MERN Backend & Dynamic CMS running on port ${PORT}`);
  });
}

export default app;
