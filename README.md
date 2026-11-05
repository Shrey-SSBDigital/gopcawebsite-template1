# Gujarat Organic Products Certification Agency (GOPCA) — MERN Web Platform & Dynamic CMS

An autonomous statutory certification body platform built for the **Gujarat Organic Products Certification Agency (GOPCA)** (`gopca.in`), functioning under the **Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat**, accredited under the **National Programme for Organic Production (NPOP, APEDA / Ministry of Commerce & Industry, Government of India)**, and conforming to **ISO/IEC 17065:2012**.

Designed with the minimalist, high-contrast, premium agricultural aesthetic of **[tasteoflapland.com](https://tasteoflapland.com)**—featuring deep forest greens, clean typography, refined alabaster surfaces, subtle gold accents, and dynamic table content management.

---

## 🏛️ Statutory Institutional Foundation

- **Agency Legal Status**: Autonomous statutory body established under the **Societies Registration Act, 1860** (Registration No. **Guj/14589**).
- **Administrative Parent**: Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat.
- **Accreditation Authority**: National Accreditation Body (NAB / APEDA, MoC&I, Govt. of India) — Accreditation No. **NAB-0012**.
- **Quality Benchmark**: Conformance to **ISO/IEC 17065:2012** for third-party product and process certification.
- **Jurisdiction**: Statewide statutory jurisdiction across all **33 districts of Gujarat**.

---

## 🎨 Design System: Taste of Lapland Aesthetic

The user interface implements the exact design principles, palette, and typography of `tasteoflapland.com`:

| Design Element | Specification & Values | Purpose |
| :--- | :--- | :--- |
| **Primary Brand Color** | Deep Forest Green (`#122A1E`, `#163323`, `#1F4531`) | Reflects organic soil vitality, government authority, and ecological purity |
| **Accent / Certification Gold** | Harvest Ochre (`#C78A31`, `#DDA853`, `#E8A94B`) | Used for NPOP badges, seals, statutory highlights, and key action buttons |
| **Surface Backgrounds** | Warm Alabaster / Crisp White (`#FBFBFA`, `#FFFFFF`, `#FAFBF9`) | Spacious, uncluttered canvas with generous whitespace and high contrast |
| **Neutral Subtlety** | Sage / Moss Tints (`#F4F6F3`, `#DFE6E1`, `#CFDCD3`) | Soft section dividers, table header backgrounds, and subtle borders |
| **Typography** | `Plus Jakarta Sans` & `Outfit` with Gujarati font support | High-legibility modern sans-serif with crisp letter-spacing and uppercase tracking |
| **Cards & Elevation** | `lapland-card` style with subtle borders and smooth hover-lift | Professional corporate B2B & public transparency feel |

---

## 🗺️ Routes & Complete Site Map

### 1. Header Branding Bar & Dedicated Navbar
- **Header Branding Bar**:
  - Agency Name: *Gujarat Organic Products Certification Agency (GOPCA) / ગુજરાત ઓર્ગેનિક પ્રમાણીકરણ એજન્સી*
  - Affiliation: *Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat*
  - Accreditations: *NPOP Accredited Body • Registration No. Guj/14589 (Societies Registration Act, 1860)*
  - Header Action Button: Dedicated **"Contact Us"** button linking directly to `/contact`.
- **Dedicated Navbar Row** (Positioned directly under Header Title, *excluding* Contact Us):
  - `Home` (`/`)
  - `About Us` (Dropdown: `/about`, `/governing-board`, `/personnel`, `/policy`, `/accreditation`)
  - `Certification` (`/certification`)
  - `Fee Schedule & QR` (`/fees-qr`)
  - `Our Standards` (`/standards`)
  - `Operator Registry` (Dropdown: `/operators/active`, `/operators/farmers`, `/operators/suspended`, `/operators/terminated`, `/operators/discontinued`)
  - `Downloads` (`/download`)
  - `Field Photos` (`/photos`)
  - `SOP Videos` (`/videos`)
  - `FAQ` (`/faq`)
  - `CMS Dynamic Studio` (`/cms`)

---

### 2. Detailed Page Directory

1. **Home Page (`/`)**:
   - Headline: *"From Gujarat's Soils to Certified Organic Integrity"*
   - Statistical impact metrics: 12,450+ Certified Farmers, 45,000+ Ha Audited, 84+ Active ICS Groups, 100% NPOP Compliance.
   - 4-Stage Sourcing & Certification overview (Phases 01 to 04).
   - Signature Certified Crops of Gujarat: Organic Psyllium Husk (Banaskantha), Gir Kesar Mango (Junagadh & Gir), Certified Spices (Patan, Mehsana), Bhalia Durum Wheat (Bhal Tract), Indigenous Kala Cotton (Kutch & Surendranagar), Approved Bio-Inputs.
   - Grower Group (ICS) & Smallholder Non-Profit Model.
   - Core Institutional Pillars from official portal.
   - Statutory Notifications Feed (Inspection Plan 2026, Circular for ICS, RTI Disclosures).

2. **About Us & Mandate (`/about`)**:
   - Sub-navigation tab bar linking across all 5 institutional pages.
   - Full statutory mandate under Societies Registration Act 1860, Vision, Mission, and 5 Core Institutional Pillars.

3. **Apex Governing Board (`/governing-board`)**:
   - Sub-navigation tab bar.
   - Interactive Governing Board table with **dedicated "Logo" column as Column 1**.
   - Lists all 9 statutory members: Chairman (ACS/PS Agri), Vice-Chairman (Sec Expenditure, Finance), Member Secretary (Director GOPCA), Ex-Officio Director of Agri, Ex-Officio Director of Horticulture, Institutional Member (VC AAU/SAUs), Statutory Member (APEDA GoI), Technical Expert (Senior Scientist), and Farmer Representative.

4. **Personnel & Auditors Cadre (`/personnel`)**:
   - Sub-navigation tab bar.
   - Interactive personnel roster with live search, Cadre classification, qualifications, and ISO 17065 lead auditor status.
   - **"+ Add Personnel" Form Modal** with full client-side persistence and **"Reset to Defaults"** action.

5. **Quality Policy & Impartiality (`/policy`)**:
   - Sub-navigation tab bar.
   - Governing Board Resolution Quote (Resolution No. 04/2014).
   - Sovereign Commitments to Impartiality: Impartiality & Independence, Non-Discrimination, Conflict of Interest Prohibition, and Confidentiality.

6. **NPOP & ISO/IEC 17065 Accreditation (`/accreditation`)**:
   - Sub-navigation tab bar.
   - National Accreditation Body certificate details (NAB-0012).
   - Accredited Scopes: Crop Production, Grower Groups (ICS), Organic Wild Harvest, and Approved Bio-Inputs.
   - International ISO/IEC 17065:2012 conformity.

7. **Certification Workflow (`/certification`)**:
   - **Strictly workflow-focused** (no fees, no QR codes, no download forms).
   - 6-Stage Statutory Pipeline (Days 1–7 to Days 56–60) with milestones, deliverables, and criteria.
   - Full Workflow Matrix Table.

8. **Fee Schedule & Bharat QR (`/fees-qr`)**:
   - **Strictly fee & digital payment focused**.
   - Official Bharat QR Code graphic with UPI scanning instructions (BHIM, Google Pay, PhonePe, Paytm).
   - State Bank of India (SBI) Bank Account Credentials (IFSC SBIN0011748, A/C 31245678901, Shyamal Branch).
   - Statutory Fee Schedule Table for all 6 applicant tiers.
   - **Interactive Fee Calculator Tool**: Select applicant category, adjust farm hectarage slider, and receive real-time calculations of Scrutiny Fee, Inspection Fee, Subtotal, 18% GST, and Total Payable.

9. **Our Standards & Technical Guidelines (`/standards`)**:
   - NPOP 8th Edition Standard, GOPCA Internal Field Inspection Standard, Permitted Organic Inputs List (Annexure 1 & 2), Prohibited Substances List, and Maximum Residue Limits (MRL) screening protocols.
   - Direct standard PDF download action cards.

10. **Operator Registry (`/operators/*`)**:
    - Dedicated sub-routes: `/operators/active`, `/operators/farmers`, `/operators/suspended`, `/operators/terminated`, `/operators/discontinued`.
    - Live search input matching Operator Name, Registration ID (`GOPCA-OG-2024-XXXX`), Crops, or Village.
    - **District filter dropdown with all 33 districts of Gujarat**.
    - Full registry table columns: Registration ID, Operator Name, Category/Scope, District & Village, Certified Crops, Hectarage, Status Badge, and Validity Date.

11. **Document Download Center (`/download`)**:
    - Application Forms (Form A, B, C, W, Inspection Agreement).
    - Statutory Directives & Plans (Circular for ICS, Annual Inspection Plan 2026, Approved Bio-Inputs List).
    - RTI Proactive Disclosures under Section 4(1)(b) of the RTI Act 2005.
    - Category filter pills, instant search, and simulated document downloads.

12. **Photo & Video Media (`/photos` and `/videos`)**:
    - Photographic archive covering Psyllium harvest, field audits, soil root sampling, ICS village assemblies, and Secretariat conclaves with a high-resolution modal lightbox.
    - Technical SOP Videos with bilingual Gujarati and English tracks, durations, and key module breakdowns.

13. **Frequently Asked Questions (`/faq`)**:
    - Smooth accordion answering conversion periods, ICS operations, Tracenet QR verification, approved bio-inputs, and annual renewal norms.

14. **Contact Secretariat & Head Office (`/contact`)**:
    - Beej Pramanan Bhavan, Shyamal Cross Road, Ahmedabad coordinates.
    - Interactive Certification Inquiry Form with district dropdown, entity category selector, and confirmation receipt.

15. **CMS Dynamic Studio (`/cms` or `/admin`)**:
    - Central administrative dashboard where **all tables** across the application are dynamically managed, edited, searched, exported to CSV, or restored to statutory defaults.

---

## ⚡ Dynamic Table CMS Engine

Every table in this platform is built on an extensible dynamic table architecture:

```javascript
// Reusable Table Schema Structure
{
  tableId: 'operators_active',
  title: 'Active ICS Operator Registry',
  columns: [
    { key: 'registrationId', label: 'Registration ID', type: 'text' },
    { key: 'name', label: 'Operator Name', type: 'text' },
    { key: 'category', label: 'Scope', type: 'badge' },
    { key: 'district', label: 'District', type: 'text' },
    { key: 'hectarage', label: 'Hectarage', type: 'number' },
    { key: 'validity', label: 'Validity Date', type: 'date' }
  ],
  data: [...]
}
```

### Key CMS Capabilities:
- **Full-Text Live Search**: Instant multi-column filtering.
- **District Filtration**: Native support for all 33 districts of Gujarat.
- **Dynamic Sorting**: Ascending / descending column sorting.
- **In-Place CRUD Modal**: Dynamically generates form inputs based on column definitions.
- **CSV Data Export**: One-click download of the currently filtered view.
- **Statutory Reset**: Immediate restoration to official Government baseline records.
- **Dual Persistence**: Automatic synchronization between browser `localStorage` and Express `/api/cms/tables` endpoints.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+ or v24+)
- npm (v9+)

### Installation
Dependencies are already installed in both `client/` and `server/`. To re-install if needed:
```bash
npm --prefix client install
npm --prefix server install
```

### Starting the Application

#### Option A: Full MERN Production Server (Backend + Frontend on single port 5000)
```bash
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

#### Option B: Vite Development Server (with Hot Module Replacement)
```bash
npm run client
```
Open [http://localhost:5173](http://localhost:5173) in your browser. (API requests are proxied automatically to port 5000).

#### Rebuilding Frontend Assets:
```bash
npm run build
```

---

## 🔒 Impartiality & Governance Statement
GOPCA adheres strictly to Section 4(1)(b) of the RTI Act 2005 and ISO/IEC 17065. All certification data, scope registrations, and sanction notices are maintained with complete statutory transparency.

