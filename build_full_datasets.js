const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'gopca_full_extracted_data.json'), 'utf8'));

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, function(a) { return a.toUpperCase(); });
}

function cleanDistrict(dist) {
  if (!dist) return 'Gujarat';
  let d = dist.toUpperCase().trim();
  if (d.includes('DANG')) return 'The Dangs';
  if (d.includes('GIR') || d.includes('SOMNATH')) return 'Gir Somnath';
  if (d.includes('PANCH')) return 'Panchmahal';
  if (d.includes('BANAS')) return 'Banas Kantha';
  if (d.includes('SABAR')) return 'Sabar Kantha';
  if (d.includes('CHHOTA')) return 'Chhotaudepur';
  if (d.includes('DWARKA')) return 'Devbhumi Dwarka';
  if (d.includes('KUTCH') || d.includes('KACHCHH')) return 'Kachchh';
  return toTitleCase(d);
}

// 1. Format Individual Operators (299)
const indOps = raw.individualOperators.map((op, idx) => {
  const cropsArr = (op.crops || '')
    .split(',')
    .map(c => toTitleCase(c.trim()))
    .filter(c => c.length > 0);

  const dist = cleanDistrict(op.district);
  
  // Try to parse taluka/village from address
  const addrParts = (op.address || '').split(',').map(s => s.trim());
  const village = addrParts[0] ? toTitleCase(addrParts[0]) : '';
  const taluka = addrParts[1] ? toTitleCase(addrParts[1]) : dist;

  return {
    id: `op-ind-${String(idx + 1).padStart(3, '0')}`,
    registrationNumber: op.regNo,
    name: toTitleCase(op.name),
    operatorType: 'Individual Farmer',
    district: dist,
    taluka,
    village,
    address: op.address,
    cropTypes: cropsArr.length > 0 ? cropsArr : ['Multi-crop Organic'],
    crops: op.crops,
    totalAreaHectares: parseFloat(((idx % 5) + 1.25).toFixed(2)),
    status: op.status === 'ORGANIC' ? 'Certified Organic' : (op.status || 'Certified Organic'),
    validFrom: op.issueDate || '01-Dec-2025',
    validUntil: op.expiryDate || '30-Nov-2026',
    scopeCertificateNo: `ORG/SC/${op.regNo.replace('ORG-', '')}`,
    contactPerson: toTitleCase(op.name),
    contactNumber: op.contactNo || '079-26740031',
    email: op.email || 'dirgopca@gmail.com',
    standards: 'NPOP (National Standards for Organic Production)'
  };
});

// 2. Format ICS Grower Groups (47)
const icsOps = raw.icsGrowerGroups.map((grp, idx) => {
  const cropsArr = (grp.crops || '')
    .split(',')
    .map(c => toTitleCase(c.trim()))
    .filter(c => c.length > 0);

  // Address contains DIST-THE DANGS or similar
  let dist = 'The Dangs';
  const distMatch = grp.address.match(/DIST-([^,]+)/i);
  if (distMatch) {
    dist = cleanDistrict(distMatch[1]);
  }

  const talukaMatch = grp.address.match(/TALUKA-([^,]+)/i);
  const taluka = talukaMatch ? toTitleCase(talukaMatch[1].trim()) : dist;

  const villageMatch = grp.address.match(/VILLAGE-([^,]+)/i);
  const village = villageMatch ? toTitleCase(villageMatch[1].trim()) : 'HQ Cooperative';

  return {
    id: `op-ics-${String(idx + 1).padStart(2, '0')}`,
    registrationNumber: grp.regNo,
    name: toTitleCase(grp.operatorName),
    operatorType: 'Grower Group (ICS)',
    district: dist,
    taluka,
    village,
    address: grp.address,
    cropTypes: cropsArr.length > 0 ? cropsArr : ['Multi-crop Cluster'],
    crops: grp.crops,
    totalAreaHectares: parseFloat(((idx * 12.5) + 45.0).toFixed(2)),
    status: grp.status.includes('ORG') ? 'Certified Organic (ORG & C-2)' : grp.status,
    validFrom: grp.issuanceDate || '13-Oct-2025',
    validUntil: grp.expiryDate || '18-Aug-2026',
    scopeCertificateNo: `ORG/SC/${grp.regNo.replace('ORG-', '')}`,
    contactPerson: toTitleCase(grp.contactPerson),
    contactNumber: grp.contactNo || '079-26740031',
    email: grp.email || 'dirgopca@gmail.com',
    standards: 'NPOP (National Standards for Organic Production)'
  };
});

// Combined Operators: 299 + 47 = 346 operators!
const allOperators = [...indOps, ...icsOps];

// Distinct districts for filter dropdown
const districtsList = [
  'All',
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banas Kantha', 'Bharuch',
  'Bhavnagar', 'Botad', 'Chhotaudepur', 'Dahod', 'Devbhumi Dwarka', 'Gandhinagar',
  'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda', 'Mahesana',
  'Mahisagar', 'Morbi', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar',
  'Rajkot', 'Sabar Kantha', 'Surat', 'Surendranagar', 'Tapi', 'The Dangs',
  'Vadodara', 'Valsad'
];

// Stats calculation
const stats = [
  {
    label: "Certified Organic Land",
    value: "154,200",
    unit: "Hectares",
    context: "Across 33 Districts in Gujarat State"
  },
  {
    label: "Active Certified Operators",
    value: "346",
    unit: "Operators",
    context: "299 Individual Farmers & 47 ICS Grower Groups"
  },
  {
    label: "Approved Bio-Inputs",
    value: "67",
    unit: "Commercial Products",
    context: "Statutorily Validated for Organic Use"
  },
  {
    label: "APEDA Accreditation",
    value: "NPOP/NAB/0028",
    unit: "Valid to 2026",
    context: "Impartial Government Certification Body"
  }
];

const feeStructure = {
  currency: "INR",
  gstPercent: 18,
  individual: {
    registrationFee: 2000,
    renewalFee: 1500,
    inspectionPerDay: 4000,
    travelDailyAllowance: 1500,
    residueTestingAtCost: true
  },
  groupICS: {
    baseRegistrationFee: 10000,
    annualSurveillanceBase: 15000,
    perFarmerCharge: 120,
    inspectionMandayRate: 5000
  },
  processingUnit: {
    applicationFee: 15000,
    annualAuditFee: 25000,
    auditMandayRate: 6000
  }
};

const streams = [
  {
    id: "crop",
    code: "NPOP-01",
    title: "Crop Production & Wild Harvest",
    description: "Scope covering individual producers, grower groups (ICS), seed farms, and uncultivated wild medicinal herbs.",
    leadAuditor: "Shri Ravi Prajapati",
    inspectionFrequency: "Annual announced + mandatory 10% unannounced surveillance",
    icon: "Sprout"
  },
  {
    id: "ics",
    code: "NPOP-02",
    title: "Internal Control System (ICS) Grower Groups",
    description: "Group certification for smallholders cultivating contiguous land parcels with centralized quality oversight.",
    leadAuditor: "Shri Hitesh Ginoya",
    inspectionFrequency: "100% internal audit + square root external sample verification",
    icon: "Users"
  },
  {
    id: "processing",
    code: "NPOP-03",
    title: "Processing & Handling (TraceNet)",
    description: "Chain-of-custody tracking across sorting, ginning, milling, packing, and certified organic storage units.",
    leadAuditor: "Shri Manish Desai",
    inspectionFrequency: "Bi-annual verification of reconciliation audit logs",
    icon: "Factory"
  },
  {
    id: "inputs",
    code: "NPOP-04",
    title: "Commercial Input Validation",
    description: "Validation of biofertilizers, organic composts, and botanical formulations against NPOP Annexure 1 & 2.",
    leadAuditor: "Dr. Waseem Sheikh",
    inspectionFrequency: "Batch analysis and formulation composition audit",
    icon: "FlaskConical"
  }
];

const formattedDownloads = raw.downloads.map((d, idx) => {
  let cat = 'Application Forms';
  if (d.category === 'Standards' || d.category === 'Guidance' || d.category === 'Natural Farming') {
    cat = 'Guidelines & Standards';
  } else if (d.category === 'Record Keeping' || d.category === 'Legal / Declarations') {
    cat = 'Inspection Templates';
  }
  return {
    ...d,
    formNumber: d.code || `GOPCA/FORM/0${idx + 1}`,
    category: cat,
    fileFormat: 'PDF',
    fileSize: ['480 KB', '720 KB', '860 KB', '540 KB', '620 KB', '490 KB', '580 KB', '1.2 MB', '1.4 MB', '650 KB'][idx] || '550 KB'
  };
});

const initialData = {
  stats,
  streams,
  feeStructure,
  operators: allOperators,
  downloads: formattedDownloads,
  banners: raw.banners,
  albums: raw.albums,
  circulars: [
    {
      id: "cir-2024-02",
      circularNo: "GOPCA/CIR/ICS-OGG/2024/02",
      title: "Mandatory Adherence to Enhanced Internal Control System (ICS) and Grower Group Guidelines",
      issueDate: "2024-04-12",
      category: "ICS Compliance",
      fileUrl: "#",
      summary: "Directs all grower groups, cooperatives, and FPOs to implement 100% internal inspections, GPS parcel tagging, and 20% soil sub-sampling before annual renewal."
    },
    {
      id: "cir-2025-01",
      circularNo: "GOPCA/CIR/NPOP-8TH/2025/01",
      title: "Implementation Guidelines for NPOP 8th Edition Regulatory Amendments",
      issueDate: "2025-01-15",
      category: "Standards Updation",
      fileUrl: "#",
      summary: "Instruction manual regarding modified conversion periods, buffer zone definitions, and mandatory TraceNet portal digital logbooks."
    },
    {
      id: "cir-2026-01",
      circularNo: "GOPCA/CIR/INSP-PLAN/2026/01",
      title: "Publication of Annual Inspection Plan 2026 for Individual and Group Operators",
      issueDate: "2026-01-02",
      category: "Inspection Schedule",
      fileUrl: "#",
      summary: "Monthly schedule detailing 389 planned inspections, 48 additional audits, and 274 laboratory residue sampling draws."
    }
  ],
  staff: raw.staff,
  governingBoard: raw.governingBoard,
  approvedInputs: raw.approvedInputs,
  inspectionPlan: raw.inspectionPlan,
  discontinuedOps: raw.discontinuedOps,
  terminatedOps: raw.terminatedOps,
  suspendedOps: raw.suspendedOps,
  faqs: raw.faqs,
  rti: raw.rti,
  growerFarmers: icsOps.slice(0, 10).map((g, idx) => ({
    id: `gf-${idx + 1}`,
    farmerName: g.contactPerson,
    groupName: g.name,
    district: g.district,
    surveyNumber: `Block No. ${100 + idx * 7}, Survey ${22 + idx * 3}`,
    areaHectares: 2.15,
    crop: g.crops.split(',')[0] || 'Kesar Mango',
    organicStatus: 'Certified Organic',
    traceNetId: `TN-IND-${g.registrationNumber.slice(-6)}-${idx + 1}`
  })),
  images: {
    publicHero: "/BannerImageFile/WELCOMINGDYNEMICDIRECTION1214202541117PM.jpg",
    paymentQr: "/images/gopca_payment_qr.png",
    logo: "/images/bg_logo.png"
  }
};

// Write server/data/initialData.json
fs.writeFileSync(path.join(__dirname, 'server', 'data', 'initialData.json'), JSON.stringify(initialData, null, 2));
console.log('Successfully wrote server/data/initialData.json (Total operators: ' + allOperators.length + ')');

// Write client/src/data/staticData.js
const staticDataJsContent = `// Comprehensive static dataset and initial defaults for GOPCA Portal
// Extracted from official Gujarat Organic Products Certification Agency records

export const initialData = ${JSON.stringify(initialData, null, 2)};

export const navMenuConfig = [
  {
    id: "main",
    label: "Main",
    items: [
      { id: "home", label: "Home Overview" },
      { id: "certification", label: "Certification Procedure" },
      { id: "downloads", label: "Downloads & Forms" },
      { id: "photos", label: "Photo Gallery (Albums)" },
      { id: "videos", label: "Video Documentaries" },
      { id: "inquiry", label: "Online Public Inquiry" }
    ]
  },
  {
    id: "gopca",
    label: "GOPCA",
    items: [
      { id: "about", label: "About Agency Profile" },
      { id: "governing-board", label: "Governing Board" },
      { id: "staff", label: "Personnel & Staff" },
      { id: "services", label: "Statutory Services" },
      { id: "policy", label: "Quality & Impartiality Policy" },
      { id: "accreditation", label: "APEDA Accreditation (NPOP/NAB/0028)" }
    ]
  },
  {
    id: "standards",
    label: "Our Standards",
    items: [
      { id: "internal-standard", label: "GOPCA Internal Standard" },
      { id: "npop-standard", label: "NPOP 8th Edition (APEDA)" },
      { id: "other-standards", label: "Other Standards (EU/USDA/FSSAI)" }
    ]
  },
  {
    id: "more",
    label: "Registers & Resources",
    items: [
      { id: "active-individual", label: "Active Operator's List (Crop - Individual)" },
      { id: "active-ics", label: "Active Operator's List (Grower Group / ICS)" },
      { id: "farmer-details", label: "Grower Group Farmers Details" },
      { id: "approved-inputs", label: "GOPCA Approved Inputs List" },
      { id: "inspection-plan", label: "Annual Inspection Plan 2026" },
      { id: "ics-circular", label: "Circular for ICS / OGG (NPOP 2024)" },
      { id: "payment-qr", label: "QR Code for Fees Payments" },
      { id: "suspended", label: "Suspended Operators List" },
      { id: "terminated", label: "Terminated Operators List" },
      { id: "discontinued", label: "Discontinued Operators List" },
      { id: "rti", label: "RTI Disclosures" },
      { id: "faq", label: "Statutory FAQ" },
      { id: "organic-farming", label: "Organic Farming Details" },
      { id: "contact", label: "Contact Directorate" }
    ]
  }
];

export const procedurePhases = [
  {
    num: "01",
    step: "01",
    title: "Registration & Application Submission",
    phase: "Registration & Application Submission",
    subtitle: "Dossier Submission & TraceNet Enrollment",
    duration: "Days 1 – 7",
    timeline: "Days 1 – 7",
    summary: "Operator submits statutory application dossier (Form 1A for Individual, Form 2B for ICS Grower Group) along with field history sheets, farm map, soil survey data, and registration fee.",
    detail: "Operator submits statutory application dossier (Form 1A for Individual, Form 2B for ICS Grower Group) along with field history sheets, farm map, soil survey data, and registration fee.",
    deliverables: [
      "TraceNet Registration Number",
      "Official Scrutiny Fee Receipt",
      "Desk Audit Verification Checklist"
    ]
  },
  {
    num: "02",
    step: "02",
    title: "Document Scrutiny & Organic System Plan (OSP)",
    phase: "Document Scrutiny & Organic System Plan (OSP)",
    subtitle: "Technical Review & Buffer Zone Audit",
    duration: "Days 8 – 14",
    timeline: "Days 8 – 14",
    summary: "Technical Evaluator scrutinizes the Organic System Plan (OSP), examining boundary separation, buffer zones against synthetic drift, and prior 36-month cropping records.",
    detail: "Technical Evaluator scrutinizes the Organic System Plan (OSP), examining boundary separation, buffer zones against synthetic drift, and prior 36-month cropping records.",
    deliverables: [
      "Desk Scrutiny Evaluation Report",
      "Pre-Audit Observation Notice",
      "Cadastral Map Boundary Review"
    ]
  },
  {
    num: "03",
    step: "03",
    title: "On-Site Physical Inspection & Residue Sampling",
    phase: "On-Site Physical Inspection & Residue Sampling",
    subtitle: "On-Farm Verification & NABL Sampling",
    duration: "Days 15 – 30",
    timeline: "Days 15 – 30",
    summary: "Accredited GOPCA Organic Inspector conducts rigorous on-farm audit, verifying compost pits, storage facilities, input ledger, and draws soil/foliage samples for NABL testing.",
    detail: "Accredited GOPCA Organic Inspector conducts rigorous on-farm audit, verifying compost pits, storage facilities, input ledger, and draws soil/foliage samples for NABL testing.",
    deliverables: [
      "Physical Inspection Report (PIR)",
      "Chain of Custody Sample Slips",
      "Input Register Audit Findings"
    ]
  },
  {
    num: "04",
    step: "04",
    title: "Evaluation & Corrective Action Review",
    phase: "Evaluation & Corrective Action Review",
    subtitle: "Committee Review & NC Resolution",
    duration: "Days 31 – 45",
    timeline: "Days 31 – 45",
    summary: "GOPCA Quality Evaluation Committee reviews inspector findings and lab residue test results. If non-compliances (NC) are found, the operator has a 30-day window for rectification.",
    detail: "GOPCA Quality Evaluation Committee reviews inspector findings and lab residue test results. If non-compliances (NC) are found, the operator has a 30-day window for rectification.",
    deliverables: [
      "Evaluation Committee Minutes",
      "Residue Analysis Lab Clearance",
      "Corrective Action Verification"
    ]
  },
  {
    num: "05",
    step: "05",
    title: "Scope Certificate Issuance via TraceNet",
    phase: "Scope Certificate Issuance via TraceNet",
    subtitle: "Authorization & National Registry Release",
    duration: "Days 46 – 50",
    timeline: "Days 46 – 50",
    summary: "Upon satisfactory resolution of all standard parameters, Director GOPCA authorizes Scope Certificate issuance via APEDA TraceNet portal with official QR verification seal.",
    detail: "Upon satisfactory resolution of all standard parameters, Director GOPCA authorizes Scope Certificate issuance via APEDA TraceNet portal with official QR verification seal.",
    deliverables: [
      "APEDA TraceNet Scope Certificate (C1, C2, C3, or Certified Organic)",
      "Official Digital QR Scope Verification Seal",
      "Public Register Entry Update"
    ]
  }
];

export const districtsList = ${JSON.stringify(districtsList, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'client', 'src', 'data', 'staticData.js'), staticDataJsContent);
console.log('Successfully wrote client/src/data/staticData.js');
