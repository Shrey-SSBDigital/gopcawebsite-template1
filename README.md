# Gujarat Organic Products Certification Agency (GOPCA) Portal

Official MERN Stack implementation replicating and extending the portal at [gopcaa.ai.studio](https://gopcaa.ai.studio/).

Built with a refined Nordic-artisanal aesthetic tailored for Gujarat Organic Agriculture, honoring the Government of Gujarat's statutory mandate under the **Societies Registration Act, 1860** and APEDA Accreditation **NPOP/NAB/0028**.

---

## 🛠️ Tech Stack (MERN)

- **MongoDB & Mongoose**: Full schema models for `Operator`, `Application`, `Inquiry`, `Circular`, `ApprovedInput`, `Staff`, and `GrowerFarmer`. Supports MongoDB connection via `MONGO_URI` with an automatic, resilient zero-configuration JSON store fallback if MongoDB is not locally running.
- **Express.js & Node.js**: Modular REST API with full CORS, logging (`morgan`), error handling, and statutory calculation endpoints.
- **React 18 & Vite**: Fast SPA with modular component hierarchy, responsive navigation with mobile drawer, and print stylesheet.
- **Tailwind CSS**: Artisanal color palette (`#FAF8F5`, `#1B3826`, `#D4A373`), Cormorant Garamond serif headings, Plus Jakarta Sans body, and JetBrains Mono code styling.
- **Lucide Icons**: Comprehensive iconography for agricultural, compliance, and government status indicators.

---

## 🚀 Quick Start

### 1. Install Dependencies
Dependencies are already installed in `./server` and `./client`. If starting fresh:
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 2. Run Both Services Concurrently
From the root directory:
```bash
node start.js
```
Or run separately:
- **Backend API**: `npm run server` (runs on `http://localhost:5000`)
- **Frontend App**: `npm run client` (runs on `http://localhost:5173`)

### 3. Production Build
```bash
npm run build
```
Creates an optimized static bundle in `client/dist`.

---

## 🔑 Officer CMS Login Credentials

The portal features an integrated **Officer Content Management System (CMS Workspace)** for Directorate staff:

- **Access Link**: Click **"Admin CMS"** in the top navigation header.
- **Default Security PIN**: `1860` *(Commemorating the Societies Registration Act, 1860)*
- **Officer Accounts Available**:
  - `Shri Anil Patel` — Director (Executive Decision Maker)
  - `Shri Ravi Prajapati` — Quality Manager & Public Information Officer (PIO)
  - `Shri Ankur Patel` — Lead Certification Evaluator
  - `Smt. Meenaben Joshi` — TraceNet Registry Administrator

---

## 🏛️ Website Features & Page Routes

### 1. Main Navigation
- **Home Overview (`home`)**:
  - Top Gazette & Accreditation Announcement Bar (NPOP/NAB/0028, TraceNet, contact numbers).
  - Hero section with statutory taglines, CTA buttons, and Gujarat farmland photography.
  - Live Statistics Banner (154,200 Ha organic land, 52,480+ farmers, 148 grower groups).
  - Four-Phase Certification Workflow (interactive step-by-step audit protocol).
  - Statutory Certification Scopes (Individual, ICS Grower Groups, Processing, Inputs).
  - Live Operator Registry preview with district filters and search.
  - Interactive Statutory NPOP Tariff Calculator with advance/balance breakdown.
  - Downloads & Prescribed Forms section.
  - Gazette Circulars & Notifications.
  - Directorate Contact & Citizen Grievance Redressal Desk.

### 2. Certification & Scopes
- **Certification Procedure (`certification`)**: Comprehensive guide for Individual Farmers, Grower Groups (ICS), and Processing Units with 24–36 month conversion rules.
- **Downloads & Forms (`downloads`)**: Form GOPCA/CR-01, ICS-02, PR-03, IN-04, NPOP 8th Edition guidelines, and annual tariff schedule.

### 3. Statutory GOPCA Directorate
- **About Agency Profile (`about`)**: History, vision, and mission under the Societies Registration Act, 1860.
- **Governing Board (`governing-board`)**: Principal Secretary of Agriculture (Chairman), Financial Advisor, and Board of Directors.
- **Personnel Directory (`staff`)**: Complete directory of executive officers and technical evaluators.
- **Statutory Services (`services`)**: Overview of testing, audits, input approvals, and TraceNet TC issuance.
- **Quality & Impartiality Policy (`policy`)**: ISO/IEC 17065 impartiality declarations and conflict-of-interest charter.
- **APEDA Accreditation (`accreditation`)**: Recognition criteria under NPOP/NAB/0028.

### 4. Standards
- **GOPCA Internal Standard (`internal-standard`)**: Soil fertility, buffer zones, and pest management.
- **NPOP 8th Edition (`npop-standard`)**: National benchmark organic production criteria.
- **International Equivalencies (`other-standards`)**: EU, USDA NOP, and FSSAI Jaivik Bharat regulations.

### 5. Registers & Resources
- **Active Operators (Individual) (`active-individual`)**: Searchable registry by name, crop, and district.
- **Active Operator's List (ICS) (`active-ics`)**: Grower group cooperatives with member counts.
- **Grower Group Farmers Details (`farmer-details`)**: Member farmers registry under ICS groups.
- **Approved Inputs List (`approved-inputs`)**: Catalog of bio-fertilizers and bio-pesticides.
- **Annual Inspection Plan 2026 (`inspection-plan`)**: Monthly audit targets and sample quotas.
- **ICS Circular 2024 (`ics-circular`)**: Mandatory ICS and OGG directives under NPOP 2024.
- **Fee Payment & QR Code (`payment-qr`)**: SBI / Bank of Baroda coordinates and UPI QR code.
- **Suspended Operators (`suspended`)**: Operators with temporary suspensions and CB remarks.
- **Terminated Operators (`terminated`)**: Operators terminated for chemical residue findings.
- **Discontinued Operators (`discontinued`)**: Historical operators list.
- **Organic Farming Insights (`organic-farming`)**: Principles of health, ecology, fairness, and care.
- **RTI Disclosures (`rti`)**: PIO and Appellate Authority contact information.
- **Frequently Asked Questions (`faq`)**: Interactive accordion for common questions.

### 6. Media Gallery
- **Photo Albums (`photos`)**: Soil sampling audits, farmer workshops, and committee sessions.
- **Video Documentaries (`videos`)**: NPOP procedure and organic farming educational guides.

### 7. Interactive Modals
- **APEDA TraceNet Scope Certificate Modal**: Displays official bilingual certificate with print/download option.
- **Online Application Modal**: 3-step application form with auto-calculated statutory fees and instant tracking number generation.
- **Officer Login Modal**: Secure PIN-based login for Directorate staff.

### 8. Officer CMS Workspace
- **Overview**: Real-time counters and recent activity.
- **Operators Management**: Add, update status, edit, and delete operators.
- **Applications Review**: Scrutiny console to advance workflow status (`Submitted` ➔ `Under Review` ➔ `Field Inspection Scheduled` ➔ `Approved`).
- **ICS Member Farmers**: Add and manage smallholder member records.
- **Approved Inputs**: Publish and maintain approved bio-formulations.
- **Gazette Circulars**: Publish and manage statutory directives.
- **Inquiries Desk**: Track and resolve citizen inquiries.
- **Settings & Backups**: JSON database export, import, and factory reset to defaults.

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Check API and database health |
| `/api/stats` | GET | System counts and key metrics |
| `/api/auth/login` | POST | Authenticate officer with 4-digit PIN |
| `/api/auth/officers` | GET | List available officer profiles |
| `/api/operators` | GET, POST | List with filters (`q`, `district`, `status`) or create operator |
| `/api/operators/:id` | PUT, DELETE | Update operator details / status or delete |
| `/api/applications` | GET, POST | List applications or submit new dossier |
| `/api/applications/:id` | PUT, DELETE | Update status/remarks or delete |
| `/api/inquiries` | GET, POST | List public inquiries or submit new |
| `/api/inquiries/:id` | PUT, DELETE | Update status or delete |
| `/api/inputs` | GET, POST, PUT, DELETE | CRUD for GOPCA approved bio-inputs |
| `/api/circulars` | GET, POST, DELETE | CRUD for official gazette circulars |
| `/api/downloads` | GET, POST, DELETE | CRUD for public downloadable forms |
| `/api/farmers` | GET, POST, DELETE | CRUD for grower group member farmers |
| `/api/backup` | GET, POST | Export or restore database JSON state |
| `/api/reset` | POST | Reset data to statutory GOPCA baseline |

---

## 🏛️ Directorate Contact Information

- **Address**: Gujarat Organic Products Certification Agency (GOPCA), "Beej Pramanan Bhavan", Opp. Gokul Row Houses, Shyamal Cross Road, Near Food Corporation of India (FCI), Satellite, Ahmedabad – 380015, Gujarat, India.
- **Phone / Fax**: 079-26740031
- **Email**: dirgopca@gmail.com
- **Accreditation**: NPOP/NAB/0028 (APEDA, Government of India)
