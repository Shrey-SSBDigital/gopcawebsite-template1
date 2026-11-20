const fs = require('fs');
const path = require('path');

const dumpDir = path.join(__dirname, 'gopca_dump');

function parseTableRows(html) {
  const rows = [];
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  while ((trMatch = trRegex.exec(html)) !== null) {
    const cells = [];
    const cellRegex = /<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
    let cMatch;
    while ((cMatch = cellRegex.exec(trMatch[1])) !== null) {
      const raw = cMatch[1];
      const imgMatch = raw.match(/src=["']([^"']+)["']/i);
      const clean = raw.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
      cells.push({
        text: clean,
        img: imgMatch ? imgMatch[1].replace(/^\.\.\//, '').replace(/^\.\//, '') : null
      });
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

// 1. Governing Board
const gbHtml = fs.readFileSync(path.join(dumpDir, 'Governing_Board.aspx.html'), 'utf8');
const gbRawRows = parseTableRows(gbHtml).slice(1);
const governingBoard = gbRawRows.map((r, idx) => {
  const col0 = r[0] ? r[0].text : '';
  const col1 = r[1] ? r[1].text : '';
  const col2 = r[2] ? r[2].text : '';
  const col3 = r[3] ? r[3].text : '';
  const img = r[1] && r[1].img ? '/' + r[1].img : (r[0] && r[0].img ? '/' + r[0].img : null);

  // Split name and address if combined
  let name = col0;
  let address = '';
  if (col0.includes('Principle Secretory')) {
    name = 'Principal Secretary (Agriculture)';
    address = 'Agricultural & Co-Op Department, Block No.5, First Floor, Sachivalaya, Gandhinagar';
  } else if (col0.startsWith('FA FA') || col0.includes('Financial Advisor')) {
    name = 'Financial Advisor (FA)';
    address = 'Agricultural & Co-Op Department, Block No.5, First Floor, Gandhinagar';
  } else if (col0.startsWith('Director of Agriculture')) {
    name = 'Director of Agriculture';
    address = 'Department of Agriculture, Krishi Bhavan, Gandhinagar';
  } else if (col0.startsWith('Director of Horticulture')) {
    name = 'Director of Horticulture';
    address = 'Department of Agriculture, Krishi Bhavan, Gandhinagar';
  } else if (col0.startsWith('Director of Research')) {
    name = 'Director of Research';
    address = 'Anand Agricultural University (AAU), Anand';
  } else if (col0.startsWith('Director, Animal Husbandry')) {
    name = 'Director of Animal Husbandry';
    address = 'Krishi Bhavan, Gandhinagar';
  } else if (col0.startsWith('Director, GOPCA')) {
    name = 'Director, GOPCA';
    address = 'GOPCA Directorate, Beej Pramanan Bhavan, Shyamal Cross Road, Satellite, Ahmedabad';
  }

  return {
    id: `gb-${idx + 1}`,
    name,
    rawName: col0,
    role: col1 || (idx === 0 ? 'Chairman' : idx === 6 ? 'Member Secretary' : 'Member'),
    designation: col1,
    address,
    contactNumber: col2,
    email: col3,
    photo: img
  };
});

// 2. Staff
const staffHtml = fs.readFileSync(path.join(dumpDir, 'Staff.aspx.html'), 'utf8');
const staffRawRows = parseTableRows(staffHtml).slice(1);
const staff = staffRawRows.map((r, idx) => {
  const col0 = r[0] ? r[0].text : '';
  const col1 = r[1] ? r[1].text : '';
  const col2 = r[2] ? r[2].text : '';
  const col3 = r[3] ? r[3].text : '';
  const img = r[1] && r[1].img ? '/' + r[1].img : (r[0] && r[0].img ? '/' + r[0].img : null);

  // Extract Clean Name and HQ
  let name = col0;
  let hq = 'Ahmedabad (Head Office)';
  if (col0.includes('Head Quarter:')) {
    const parts = col0.split('Head Quarter:');
    name = parts[0].replace('GOPCA, Ahmedabad', '').trim();
    hq = parts[1].trim();
  } else {
    name = col0.replace('GUJARAT ORGANIC PRODUCTS CERTIFICATION AGENCY, AHMEDABAD', '').replace('GOPCA, Ahmedabad', '').trim();
  }

  return {
    id: `st-${String(idx + 1).padStart(2, '0')}`,
    name,
    designation: col1,
    photo: img,
    contactNumber: col2,
    email: col3,
    headquarter: hq,
    rawTitle: col0
  };
});

// 3. Banner Slides (22 official slides)
const banners = [
  {
    id: 1,
    image: '/BannerImageFile/WELCOMINGDYNEMICDIRECTION1214202541117PM.jpg',
    title: 'Welcoming Dynamic Leadership & Direction',
    subtitle: 'Strengthening Organic Certification Governance across Gujarat',
    tag: 'Leadership'
  },
  {
    id: 2,
    image: '/BannerImageFile/PRAKRUTIKDANGICSCERTIFICATION762022124731PM.jpg',
    title: 'Prakrutik Dang ICS Certification Milestone',
    subtitle: 'Empowering tribal organic farming groups in the Dang district',
    tag: 'Prakrutik Kheti'
  },
  {
    id: 3,
    image: '/BannerImageFile/GOVERNINGBOARDMEETING2726202163026PM.jpeg',
    title: 'GOPCA Governing Board Meeting',
    subtitle: 'Strategic state-level policy formulation and operational oversight',
    tag: 'Governance'
  },
  {
    id: 4,
    image: '/BannerImageFile/ADVISORYCOMMITTEEMEET20251214202543038PM.jpeg',
    title: 'Advisory Committee Meet 2025-2026',
    subtitle: 'Aligning certification standards with international benchmarks',
    tag: 'Advisory'
  },
  {
    id: 5,
    image: '/BannerImageFile/REPRESENTATIONGOPCABIOFACH20251214202541055PM.jpg',
    title: 'GOPCA Representation at Biofach 2025',
    subtitle: 'Showcasing Gujarat certified organic commodities at premier trade forums',
    tag: 'Biofach 2025'
  },
  {
    id: 6,
    image: '/BannerImageFile/GOPCASTAFFTRAINING942023112328AM.jpg',
    title: 'GOPCA Technical Staff Training Session',
    subtitle: 'Continuous capacity building for lead evaluators and inspectors',
    tag: 'Capacity Building'
  },
  {
    id: 7,
    image: '/BannerImageFile/APEDATrainingDec20231230202355940PM.jpeg',
    title: 'APEDA Technical Accreditation Training',
    subtitle: 'Rigorous auditor competency enhancement under NPOP standards',
    tag: 'APEDA Training'
  },
  {
    id: 8,
    image: '/BannerImageFile/APEDATRAINING726202163310PM.jpeg',
    title: 'APEDA Lead Auditor Certification Program',
    subtitle: 'Standardizing organic evaluation protocols nationwide',
    tag: 'NPOP Compliance'
  },
  {
    id: 9,
    image: '/BannerImageFile/APEDAAUDITORREVIEWERTRAININGDEC20231230202362624PM.jpeg',
    title: 'Auditor & Reviewer Advanced Training Workshop',
    subtitle: 'TraceNet documentation and multi-tier verification workflows',
    tag: 'TraceNet Workshop'
  },
  {
    id: 10,
    image: '/BannerImageFile/ICSMANGROLVISIT,DIRECTORGOPCA942023103059AM.jpeg',
    title: 'Director GOPCA Inspection Visit to ICS Mangrol',
    subtitle: 'Direct field surveillance and grower group verification in Saurashtra',
    tag: 'Field Inspection'
  },
  {
    id: 11,
    image: '/BannerImageFile/FIELDVISIT,EVALUATIONCOMMITTEEAPEDA942023112527AM.jpg',
    title: 'APEDA Evaluation Committee On-Site Field Visit',
    subtitle: 'Rigorous peer inspection of GOPCA certified organic agricultural plots',
    tag: 'APEDA Audit'
  },
  {
    id: 12,
    image: '/BannerImageFile/TRAININGONPROCESSING&HANDLLING1214202534919PM.jpg',
    title: 'Training on Processing & Post-Harvest Handling',
    subtitle: 'Maintaining organic chain of custody from farm to packaged consumer unit',
    tag: 'Processing'
  },
  {
    id: 13,
    image: '/BannerImageFile/OGGFARMERSVERIFICATIOPN1214202565921PM.jpg',
    title: 'Organic Grower Group (OGG) Farmer Verification',
    subtitle: 'Transparent on-farm verification and internal control system reviews',
    tag: 'Farmer Verification'
  },
  {
    id: 14,
    image: '/BannerImageFile/NPOP8thEDITIONTRAININGtoASOCA1214202535744PM.jpg',
    title: 'NPOP 8th Edition Implementation Training',
    subtitle: 'Institutional orientation to updated national organic standards',
    tag: 'NPOP 8th Edition'
  },
  {
    id: 15,
    image: '/BannerImageFile/FARMERSUPDATIONtowardsNPOP8thEDITION1214202541550PM.jpg',
    title: 'Grassroots Farmers Updation on NPOP 8th Edition',
    subtitle: 'Demystifying conversion timelines, buffer zones, and record maintenance',
    tag: 'Grassroots Outreach'
  },
  {
    id: 16,
    image: '/BannerImageFile/ORGANICGROWERSINTERACTION94202394314AM.jpeg',
    title: 'Organic Growers Interactive Consultation',
    subtitle: 'Direct dialogue with certified farmers addressing certification challenges',
    tag: 'Growers Forum'
  },
  {
    id: 17,
    image: '/BannerImageFile/DANGFARMERS942023111213AM.jpg',
    title: 'Dang Organic Farmers Congregation',
    subtitle: 'Celebrating 100% natural and organic agricultural practices in Dang',
    tag: 'Dang Kheti'
  },
  {
    id: 18,
    image: '/BannerImageFile/PrakrutikDangDeclarationCeremony318202455804PM.jpeg',
    title: 'Prakrutik Dang Official Certification Ceremony',
    subtitle: 'State-wide recognition of organic grower group accomplishments',
    tag: 'Declaration Ceremony'
  },
  {
    id: 19,
    image: '/BannerImageFile/AMULVISIT,DIRECTOR,APEDA942023105832AM.jpg',
    title: 'Joint Visit with Director APEDA to Amul Facilities',
    subtitle: 'Exploring large-scale organic dairy and value-chain certification synergies',
    tag: 'Organic Dairy'
  },
  {
    id: 20,
    image: '/BannerImageFile/APEDATRAINING2726202163354PM.jpeg',
    title: 'GOPCA Core Team APEDA Refresher Sessions',
    subtitle: 'Stringent standard operating procedures for pesticide residue testing',
    tag: 'Quality Assurance'
  },
  {
    id: 21,
    image: '/BannerImageFile/GIRCOW-THEPRIDEOFGUJARAT628202473332PM.jpg',
    title: 'Gir Cow - The Pride of Gujarat & Ecological Farming',
    subtitle: 'Indigenous cattle-based formulations as the cornerstone of natural farming',
    tag: 'Indigenous Breeds'
  },
  {
    id: 22,
    image: '/BannerImageFile/ICSTrainigatUTTARAKHAND942023102407AM.jpeg',
    title: 'Inter-State Knowledge Exchange: ICS Training in Uttarakhand',
    subtitle: 'Fostering best practices in mountain and hill organic farming ecosystems',
    tag: 'Interstate Exchange'
  }
];

// 4. Photo Albums and Photos
const albums = [
  {
    id: 'alb-1',
    title: 'APEDA Auditor & Personnel Training',
    coverImage: '/AlbumImages/ApedaTraining628202421538PM.jpeg',
    category: 'Accreditation & Training',
    description: 'National Programme for Organic Production auditor and reviewer training sessions conducted in New Delhi and Ahmedabad.',
    photos: [
      { id: 'p-1', src: '/PhotoImages/NPOPTRAININGatAPEDA726202154529PM.jpeg', caption: 'NPOP Auditor Training at APEDA Headquarters' },
      { id: 'p-2', src: '/PhotoImages/NPOPTRAININGAPEDA726202154636PM.jpeg', caption: 'APEDA Technical Assessment Committee in Session' },
      { id: 'p-3', src: '/PhotoImages/NPOPTRAININGAPEDANEWDELHI726202154740PM.jpeg', caption: 'Lead Reviewer Deliberation at APEDA New Delhi' },
      { id: 'p-4', src: '/PhotoImages/NPOPTRAININGatAPEDADelhi726202154808PM.jpeg', caption: 'Certification Body Evaluation Panel Briefing' },
      { id: 'p-5', src: '/PhotoImages/1528201312719PM.jpg', caption: 'Field Sample Protocol Hands-on Demonstration' },
      { id: 'p-6', src: '/PhotoImages/2528201313151PM.jpg', caption: 'Chemical Residue Prevention and Buffer Zone Inspection' },
      { id: 'p-7', src: '/PhotoImages/3528201313449PM.jpg', caption: 'Technical Evaluators Field Audit Verification' }
    ]
  },
  {
    id: 'alb-2',
    title: 'AAU Academic & Research Capacity Training',
    coverImage: '/AlbumImages/TRAINING219202141722PM.jpeg',
    category: 'Institutional Training',
    description: 'Joint orientation and technical workshops held at Anand Agricultural University (AAU) for organic inspectors.',
    photos: [
      { id: 'p-8', src: '/PhotoImages/AAU222202130213PM.jpg', caption: 'Anand Agricultural University (AAU) Organic Research Center Session' }
    ]
  },
  {
    id: 'alb-3',
    title: 'On-Site ICS Grower Group Verification',
    coverImage: '/AlbumImages/ONSITETRAINING219202141817PM.jpeg',
    category: 'Field Surveillance',
    description: 'Field-level internal control system verification and farmer record maintenance training in Gujarat districts.',
    photos: [
      { id: 'p-9', src: '/PhotoImages/ICSTRAINING227202293515AM.jpg', caption: 'Village Level Internal Control System (ICS) Lead Inspector Training' }
    ]
  }
];

// 5. Official Downloads
const downloads = [
  {
    id: 'dl-1',
    title: 'Organic Grower Groups (Farmers Details) Master Roster',
    category: 'Grower Groups',
    code: 'GOPCA/OGG/01',
    description: 'Official master roster format for Internal Control System (ICS) farmer list submission and TraceNet upload.',
    file: '/Download.aspx.html',
    fileType: 'XLSX / Form'
  },
  {
    id: 'dl-2',
    title: 'Natural Farming Certification System (NFCS) Guidelines',
    category: 'Natural Farming',
    code: 'GOPCA/NFCS/2026',
    description: 'Complete statutory guidelines, non-synthetic protocol, and validation norms for Prakrutik Kheti operators.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-3',
    title: 'Organic Grower Group Organic System Plan (OSP 2.0)',
    category: 'Application Forms',
    code: 'GOPCA/OSP/2.0',
    description: 'Revised Organic System Plan version 2.0 covering ICS manual, risk assessment, buffer zones, and internal inspection routines.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-4',
    title: 'Field History Sheet - Individual Producer',
    category: 'Record Keeping',
    code: 'GOPCA/FHS/IND-04',
    description: 'Mandatory 3-year prior crop history, input application log, and land holding survey numbers format.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-5',
    title: 'Farm Map Template - Individual Producer',
    category: 'Record Keeping',
    code: 'GOPCA/MAP/IND-05',
    description: 'Standard farm layout schematic sheet detailing buffer boundaries, neighboring conventional farms, and water sources.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-6',
    title: 'Sammati Patra (Consent Letter) - Gujarati Format',
    category: 'Legal / Declarations',
    code: 'GOPCA/SAMMATI/GUJ-06',
    description: 'Statutory declaration of compliance with NPOP standards executed by the producer in Gujarati.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-7',
    title: 'Farm Diary - Individual Operator Record Keeping',
    category: 'Record Keeping',
    code: 'GOPCA/DIARY/IND-07',
    description: 'Daily agricultural activity logbook for sowing, weeding, on-farm composting, harvesting, and yield accounting.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-8',
    title: 'GOPCA Organic Standards Gujarati Handbook',
    category: 'Standards',
    code: 'GOPCA/STD/GUJ-08',
    description: 'Comprehensive organic production and ICS standards published in Gujarati for farmers and societies.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-9',
    title: 'GOPCA Organic Standards & Guidelines (NPOP / NSOP Aligned)',
    category: 'Standards',
    code: 'GOPCA/STD/ENG-09',
    description: 'Full statutory handbook covering conversion requirements, fertility, pest management, and post-harvest segregation.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  },
  {
    id: 'dl-10',
    title: 'Process for Organic Certification (Individual Flowchart - English)',
    category: 'Guidance',
    code: 'GOPCA/PROC/ENG-10',
    description: 'Step-by-step visual roadmap from registration to inspection, evaluation committee review, and scope certificate issuance.',
    file: '/Download.aspx.html',
    fileType: 'PDF Document'
  }
];

// 6. Annual Inspection Plan 2026
const ipHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspxc8b3.html'), 'utf8');
const ipRawRows = parseTableRows(ipHtml).slice(1);
const inspectionPlan = ipRawRows.map(r => ({
  month: r[0] ? r[0].text : '',
  operators: r[1] ? r[1].text : '',
  announced: r[2] ? r[2].text : '',
  additional: r[3] ? r[3].text : '',
  unannounced: r[4] ? r[4].text : '',
  samples: r[5] ? r[5].text : ''
}));

// 7. Terminated Operators
const termHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspxd5a5.html'), 'utf8');
const termRawRows = parseTableRows(termHtml).slice(3); // skip title and headers
const terminatedOps = termRawRows.map(r => ({
  srNo: r[0] ? r[0].text : '',
  regNo: r[1] ? r[1].text : '',
  operatorName: r[2] ? r[2].text : '',
  operatorType: r[3] ? r[3].text : 'INDIVIDUAL PRODUCER',
  scopeCertNo: r[4] ? r[4].text : '',
  action: r[5] ? r[5].text : 'Terminated',
  actionFromDate: r[6] ? r[6].text : '',
  remarks: r[7] ? r[7].text : ''
})).filter(o => o.regNo.startsWith('ORG-'));

// 8. Suspended Operators
const suspHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspx88f9.html'), 'utf8');
const suspRawRows = parseTableRows(suspHtml).slice(1);
const suspendedOps = suspRawRows.map(r => ({
  srNo: r[0] ? r[0].text : '',
  regNo: r[1] ? r[1].text : '',
  operatorName: r[2] ? r[2].text : '',
  address: r[3] ? r[3].text : '',
  state: r[4] ? r[4].text : 'Gujarat',
  district: r[5] ? r[5].text : '',
  operatorType: r[6] ? r[6].text : 'INDIVIDUAL PRODUCER',
  scopeCertNo: r[7] ? r[7].text : '',
  validityStart: r[8] ? r[8].text : '',
  validityEnd: r[9] ? r[9].text : '',
  action: r[10] ? r[10].text : 'Suspended',
  actionFromDate: r[11] ? r[11].text : '',
  actionToDate: r[12] ? r[12].text : ''
})).filter(o => o.regNo.startsWith('ORG-'));

// 9. Approved Inputs (67 records)
const inpHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link78db.aspx'), 'utf8');
const inpRawRows = parseTableRows(inpHtml).slice(1);
let currentProducer = '';
const approvedInputs = [];
inpRawRows.forEach((r, idx) => {
  // If row has 5 cells: [sr, producer, product, use, validity]
  // If row has 3 cells (merged producer): [product, use, validity]
  if (r.length >= 5) {
    if (r[1].text) currentProducer = r[1].text;
    approvedInputs.push({
      id: `inp-${approvedInputs.length + 1}`,
      producer: currentProducer,
      productName: r[2] ? r[2].text : '',
      use: r[3] ? r[3].text : '',
      validity: r[4] ? r[4].text : ''
    });
  } else if (r.length === 3) {
    approvedInputs.push({
      id: `inp-${approvedInputs.length + 1}`,
      producer: currentProducer,
      productName: r[0] ? r[0].text : '',
      use: r[1] ? r[1].text : '',
      validity: r[2] ? r[2].text : ''
    });
  } else if (r.length === 4) {
    if (r[0].text && isNaN(Number(r[0].text))) currentProducer = r[0].text;
    approvedInputs.push({
      id: `inp-${approvedInputs.length + 1}`,
      producer: currentProducer,
      productName: r[1] ? r[1].text : '',
      use: r[2] ? r[2].text : '',
      validity: r[3] ? r[3].text : ''
    });
  }
});

// 10. Active ICS Grower Groups (47 records)
const icsHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspx7e33.html'), 'utf8');
const icsRawRows = parseTableRows(icsHtml).slice(1);
const icsGrowerGroups = icsRawRows.map((r, idx) => ({
  id: `ics-${idx + 1}`,
  srNo: r[0] ? r[0].text : '',
  regNo: r[1] ? r[1].text : '',
  operatorName: r[2] ? r[2].text : '',
  operatorType: r[3] ? r[3].text : 'ICS',
  issuanceDate: r[4] ? r[4].text : '',
  expiryDate: r[5] ? r[5].text : '',
  address: r[6] ? r[6].text : '',
  status: r[7] ? r[7].text : 'ORG & C-2',
  contactPerson: r[8] ? r[8].text : '',
  email: r[9] ? r[9].text : '',
  contactNo: r[10] ? r[10].text : '',
  crops: r[11] ? r[11].text : ''
})).filter(g => g.regNo && g.regNo.startsWith('ORG-'));

// 11. Active Individual Operators (299 records)
const indHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link5e53.aspx'), 'utf8');
const indRawRows = parseTableRows(indHtml).slice(1);
const individualOperators = indRawRows.map((r, idx) => {
  // Let's see cell mapping:
  // sr, regNo, name, type, address parts..., contactPerson, phone, email, issueDate, expiryDate, status, crops
  const regNo = r[1] ? r[1].text : '';
  const name = r[2] ? r[2].text : '';
  const type = r[3] ? r[3].text : 'INDIVIDUAL';
  
  // Find crops: typically last element
  const crops = r[r.length - 1] ? r[r.length - 1].text : '';
  const status = r[r.length - 2] ? r[r.length - 2].text : 'ORGANIC';
  const expiry = r[r.length - 3] ? r[r.length - 3].text : '';
  const issue = r[r.length - 4] ? r[r.length - 4].text : '';
  
  // District/Taluka
  let district = '';
  let address = '';
  if (r.length >= 12) {
    address = r.slice(4, r.length - 6).map(c => c.text).filter(Boolean).join(', ');
    district = r[6] ? r[6].text : (r[5] ? r[5].text : '');
  }

  const phoneMatch = r.find(c => /^\d{10}$/.test(c.text.trim()));
  const emailMatch = r.find(c => /@.+\..+/.test(c.text.trim()));

  return {
    id: `ind-${idx + 1}`,
    srNo: r[0] ? r[0].text : String(idx + 1),
    regNo,
    name,
    type,
    address,
    district,
    contactNo: phoneMatch ? phoneMatch.text : '',
    email: emailMatch ? emailMatch.text : '',
    issueDate: issue,
    expiryDate: expiry,
    status,
    crops
  };
}).filter(o => o.regNo && o.regNo.startsWith('ORG-'));

// 12. Discontinued Operators (440 records)
const discHtml = fs.readFileSync(path.join(dumpDir, 'Side_Link.aspxa166.html'), 'utf8');
const discRawRows = parseTableRows(discHtml).slice(1);
const discontinuedOps = discRawRows.map((r, idx) => ({
  id: `disc-${idx + 1}`,
  srNo: r[0] ? r[0].text : String(idx + 1),
  regNo: r[1] ? r[1].text : '',
  name: r[2] ? r[2].text : '',
  type: r[3] ? r[3].text : 'INDIVIDUAL PRODUCER',
  scopeCertNo: r[4] ? r[4].text : '',
  action: 'Discontinued',
  date: r[5] ? r[5].text : '',
  reason: r[6] ? r[6].text : 'Discontinued voluntarily or non-renewal under NPOP regulations'
})).filter(o => o.regNo && o.regNo.startsWith('ORG-'));

// 13. RTI Officers
const rti = {
  title: 'Right to Information (RTI) Statutory Disclosures',
  mandate: 'In compliance with Section 4(1)(b) of the Right to Information Act, 2005, GOPCA maintains proactive statutory disclosure.',
  appellateAuthority: {
    title: 'Appellate Authority',
    officer: 'Shri Anil Patel',
    designation: 'Director, GOPCA',
    contact: '(079) 26740031 / +91 98984 20421',
    email: 'dirgopca@gmail.com',
    office: 'GOPCA Directorate, Beej Pramanan Bhavan, Satellite, Ahmedabad - 380015'
  },
  publicInformationOfficer: {
    title: 'Public Information Officer (PIO)',
    officer: 'Shri R. D. Prajapati',
    designation: 'Quality Manager, GOPCA',
    contact: '(079) 26740031 / +91 99092 28399',
    email: 'gopca.quality@gmail.com',
    office: 'GOPCA Quality Wing, Ahmedabad'
  },
  assistantPIO: {
    title: 'Assistant Public Information Officer (APIO)',
    officer: 'Ms. P. K. Bhabhor',
    designation: 'Evaluator / Inspector, GOPCA',
    contact: '(079) 26740031 / +91 95747 44954',
    email: 'gopca.sauthcentral@gmail.com',
    office: 'GOPCA Evaluation Wing, Ahmedabad'
  }
};

// 14. Statutory FAQs
const faqs = [
  {
    q: 'What is Organic Certification?',
    a: 'Organic certification is an official certification process for producers of organic food and other organic agricultural products. In general, any business directly involved in food production can be certified, including seed suppliers, farmers, food processors, retailers, and restaurants. "Certified Organic" assures that products were produced and/or processed under strict conditions required by National Standards (NPOP) and international standards for Organic Production.'
  },
  {
    q: 'How long will it take for my agricultural land to be certified organic?',
    a: 'Conversion duration depends on the cropping history of your operation and your current compliance with certification standards and regulations. Under NPOP standards, it takes two years of managed conversion for annual crops and three years for perennial crops before products can achieve full Organic status.'
  },
  {
    q: 'Is it possible to certify only part of the farm holding (Split / Parallel Production)?',
    a: 'Yes. GOPCA supports part certification of a farm holding, provided there is a clear, time-bound conversion plan for the remaining area. Stringent physical buffer zones and distinct recordkeeping must prevent any co-mingling. Simultaneous production of identical conventional and organic varieties that cannot be visually distinguished is strictly prohibited.'
  },
  {
    q: 'What are the main stages in the GOPCA certification process?',
    a: 'The certification cycle comprises: 1) Application submission with Farm Map, Field History, and Organic System Plan (OSP); 2) Document verification and fee assessment; 3) On-site announced or unannounced physical inspection by accredited GOPCA inspectors; 4) Mandatory soil, leaf, and produce residue sampling; 5) Non-compliance closure by operator; 6) Review by the GOPCA Evaluation Committee; and 7) Scope Certificate issuance via APEDA TraceNet.'
  },
  {
    q: 'What inputs are permitted during conversion and organic maintenance?',
    a: 'Only bio-fertilizers, organic manures, bio-pesticides, and commercial inputs certified and listed on the GOPCA Approved Inputs List or complying with NPOP Appendix 1 and 2 are permissible. All chemical fertilizers (Urea, DAP, etc.), synthetic pesticides, herbicides, GMO seeds, and sewage sludge are categorically prohibited.'
  },
  {
    q: 'How does GOPCA certify Organic Grower Groups under the Internal Control System (ICS)?',
    a: 'Grower Groups comprise smallholder farmers in geographical proximity operating an Internal Control System (ICS). The group must maintain 100% internal inspections of all member plots annually. GOPCA conducts external surveillance audits, inspecting the mandated square-root percentage of members, testing soil and crop samples, and auditing warehouse and handling records.'
  },
  {
    q: 'How do operators submit certification fees to GOPCA?',
    a: 'Operators can deposit inspection and certification fees directly using the official GOPCA Bharat QR / UPI Code or through RTGS/NEFT to GOPCA bank accounts. The transaction reference number and counterfoil must be uploaded with the application dossier for receipt generation.'
  }
];

// Summary report
console.log('--- Extracted Data Counts ---');
console.log('Governing Board Members:', governingBoard.length);
console.log('Staff Members:', staff.length);
console.log('Banner Slides:', banners.length);
console.log('Photo Albums:', albums.length);
console.log('Downloads:', downloads.length);
console.log('Inspection Plan Rows:', inspectionPlan.length);
console.log('Terminated Operators:', terminatedOps.length);
console.log('Suspended Operators:', suspendedOps.length);
console.log('Approved Inputs:', approvedInputs.length);
console.log('ICS Grower Groups:', icsGrowerGroups.length);
console.log('Individual Operators:', individualOperators.length);
console.log('Discontinued Operators:', discontinuedOps.length);

const outPath = path.join(__dirname, 'gopca_full_extracted_data.json');
fs.writeFileSync(outPath, JSON.stringify({
  governingBoard,
  staff,
  banners,
  albums,
  downloads,
  inspectionPlan,
  terminatedOps,
  suspendedOps,
  approvedInputs,
  icsGrowerGroups,
  individualOperators,
  discontinuedOps,
  rti,
  faqs
}, null, 2));
console.log('Saved full extracted data to:', outPath);
