import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Download,
  MapPin,
  Calendar,
  Layers,
  Award,
  Users,
  Building2,
  Scale,
  FileCheck2,
  ExternalLink,
  Sprout
} from "lucide-react";
import PreFooter from "../components/PreFooter";

export default function HomePage() {
  const fourPhases = [
    {
      num: "01",
      title: "Farmer Onboarding & Land Verification",
      desc: "Verification of official Revenue 7/12 & 8-A records, 3-year past chemical cropping history, and GPS plot boundary demarcation.",
      deliverable: "Dossier Registration & Farm ID",
    },
    {
      num: "02",
      title: "Protocol & ICS Audit Scrutiny",
      desc: "Technical review of internal control manuals, member registers, buffer zone distances (3m minimum), and non-compliance risk ranking.",
      deliverable: "Approved Audit Plan & Lead Inspector Assign",
    },
    {
      num: "03",
      title: "On-Site Physical Audit & Lab Sampling",
      desc: "Rigorous unannounced farm inspections, compost yard checks, and multi-residue pesticide soil/produce testing at NABL accredited labs.",
      deliverable: "GC-MS Residue Analysis Reports",
    },
    {
      num: "04",
      title: "Evaluation & Scope Certification",
      desc: "Autonomous Statutory Certification Committee review and real-time Scope Certificate generation on APEDA national Tracenet portal.",
      deliverable: "Statutory NPOP Scope Certificate",
    },
  ];

  const signatureCrops = [
    {
      crop: "Organic Psyllium Husk",
      botanical: "Plantago ovata",
      region: "North Gujarat / Banaskantha",
      desc: "Export-grade Isabgol renowned for ultra-high mucilage purity and pesticide-free dryland cultivation.",
      tag: "Global Export Leader",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Gir Kesar Mango",
      botanical: "Mangifera indica",
      region: "Gir Somnath & Junagadh",
      desc: "Geographical Indication (GI) certified royal fruit orchards under strict bio-dynamic and neem management.",
      tag: "GI & Organic Synergy",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6910214c?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Certified Spices & Botanicals",
      botanical: "Cumin, Turmeric, Coriander, Cardamom",
      region: "Patan, Mehsana, Saurashtra",
      desc: "Multi-residue screened seed spices harvested with zero chemical drift in certified organic clusters.",
      tag: "European Traceability",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Bhalia Durum Wheat",
      botanical: "Triticum durum",
      region: "Bhal Tract (Ahmedabad / Anand)",
      desc: "Naturally rainfed saline soil durum wheat with high protein content, produced with zero synthetic irrigation inputs.",
      tag: "Rainfed Native Heirloom",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Indigenous Organic Cotton",
      botanical: "Gossypium herbaceum (Kala Cotton)",
      region: "Kutch & Surendranagar",
      desc: "Drought-tolerant non-GMO desi cotton supporting ethical textile supply chains and native biodiversity.",
      tag: "Non-GMO Heritage",
      image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Approved Bio-Inputs",
      botanical: "Neem cake, Bio-fertilizers, Vermicompost",
      region: "GIDC / Statewide Units",
      desc: "Commercial soil amendments and botanical pest controls evaluated against NPOP Annexure 1 & 2 criteria.",
      tag: "NPOP Annexure Approved",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const pillars = [
    {
      title: 'Autonomous Public Agency',
      desc: 'Constituted under the Societies Registration Act, 1860 (Reg No. Guj/14589) with independent statutory decision-making powers.',
      icon: Building2
    },
    {
      title: 'NPOP Accredited (NAB / APEDA)',
      desc: 'Officially accredited by the National Accreditation Body under the Ministry of Commerce & Industry, Govt. of India (NAB-0012).',
      icon: ShieldCheck
    },
    {
      title: 'ISO/IEC 17065 Conformance',
      desc: 'Operating strictly under international benchmarks for bodies operating certification systems of agricultural products.',
      icon: Award
    },
    {
      title: 'Non-Profit Smallholder Tariffs',
      desc: 'Calibrated fee schedules designed to prevent commercial exploitation and enable smallholders to enter global certified markets.',
      icon: Scale
    },
    {
      title: 'Statewide Jurisdiction (33 Districts)',
      desc: 'Comprehensive coverage from Banaskantha in the north to the Dangs in the south, and Kutch in the west to Dahod in the east.',
      icon: MapPin
    }
  ];

  const notifications = [
    {
      date: "March 2026",
      badge: "Operational Directive",
      title: "Annual Statewide Inspection Plan 2026 Finalized",
      summary:
        "Auditors deployed across Kharif and Rabi clusters in Banaskantha, Kutch, and Saurashtra zones.",
      link: "/download",
    },
    {
      date: "February 2026",
      badge: "ICS Circular",
      title: "Circular for ICS & OGG Operator Governance 2024-26",
      summary:
        "Updated guidelines for Farmer Producer Organizations regarding internal inspector qualifications and farm diary digital sync.",
      link: "/download",
    },
    {
      date: "January 2026",
      badge: "Public Disclosure",
      title: "Proactive Disclosures under RTI Act Section 4(1)(b)",
      summary:
        "Updated transparency dockets, technical cadre roster, and fee ledgers published for public inspection.",
      link: "/download",
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* 1. HERO SECTION WITH AUTHENTIC USER PHOTO BACKGROUND */}
      <section className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] flex items-center overflow-hidden">
        {/* Authentic agricultural background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/gujarat-farmer-field.jpg"
            alt="Organic farming in Gujarat"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Gradients for high contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-white">
          <div className="max-w-3xl space-y-6">
            
            {/* Government Authority Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-white/10 backdrop-blur-md border border-[#D8B57E]/50 text-[#D8B57E] text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-[#C49A5A]"></span>
              <span>Govt. of Gujarat • NPOP Accredited (NAB-0012)</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-2">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08] tracking-tight">
                From Gujarat’s living soils to certified organic integrity.
              </h1>
              <p className="text-sm sm:text-base font-light text-[#D8B57E] tracking-wider">
                ગુજરાત ઓર્ગેનિક ઉત્પાદન પ્રમાણીકરણ એજન્સી
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#D5E2D9] leading-relaxed max-w-2xl font-light">
              Gujarat Organic Products Certification Agency (GOPCA) is an autonomous statutory certification body under the Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat. Providing impartial third-party inspection, scientific audit scrutiny, and APEDA Tracenet scope certificates across all 33 districts.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/certification"
                className="btn-lapland text-xs uppercase tracking-wider px-6 py-3.5 inline-flex items-center gap-2"
              >
                <span>Explore Certification Workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/operators/active"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium text-xs tracking-wider uppercase px-5 py-3.5 rounded-[2px] border border-white/30 backdrop-blur-sm transition-all"
              >
                <Users className="w-3.5 h-3.5 text-[#D8B57E]" />
                <span>Search Operator Registry</span>
              </Link>

              <Link
                to="/fees-qr"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase px-5 py-3.5 rounded-[2px] border border-white/20 transition-all"
              >
                <span>Fee Schedule & QR</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Stats Strip along bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-md border-t border-white/15 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-center sm:text-left">
            <div>
              <p className="font-editorial text-2xl sm:text-3xl text-[#D8B57E]">12,450+</p>
              <p className="text-[11px] text-[#C0CEC5] uppercase tracking-wider">Certified Farmers</p>
            </div>
            <div>
              <p className="font-editorial text-2xl sm:text-3xl text-[#D8B57E]">45,000+ Ha</p>
              <p className="text-[11px] text-[#C0CEC5] uppercase tracking-wider">Audited Statewide</p>
            </div>
            <div>
              <p className="font-editorial text-2xl sm:text-3xl text-[#D8B57E]">84+ Groups</p>
              <p className="text-[11px] text-[#C0CEC5] uppercase tracking-wider">Active ICS Operators</p>
            </div>
            <div>
              <p className="font-editorial text-2xl sm:text-3xl text-[#D8B57E]">33 Districts</p>
              <p className="text-[11px] text-[#C0CEC5] uppercase tracking-wider">100% NPOP Conformance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 2: WHO WE ARE & ECOLOGICAL MANDATE (FEATURING SEEDLING SOIL IMAGE) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="lapland-subtitle mb-6">Who We Are & Statutory Mandate</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Authentic Soil Sprout Photo Card */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#18221D] leading-[1.12]">
              A focused,
              <br />
              relationship-led
              <br />
              certification agency.
            </h2>

            {/* User Uploaded Soil Sprout Photo */}
            <div className="rounded-[3px] overflow-hidden border border-[#EAE6DE] shadow-sm bg-white p-2">
              <div className="h-64 sm:h-72 overflow-hidden rounded-[2px]">
                <img
                  src="/images/seedling-soil.jpg"
                  alt="Living organic soil and seedling sprout in farmer hands"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-[2px] mt-2 border border-[#EAE6DE]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3E2B]">
                  <Sprout className="w-4 h-4 text-[#C49A5A]" />
                  <span>Preserving Living Soil Vitality</span>
                </div>
                <p className="text-[11px] text-[#55635B] mt-1 leading-snug">
                  Hands cradling organic soil with healthy biological roots — verifying zero synthetic pesticide drift across Gujarat’s farming belts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Descriptive Official Text */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#4C5852] leading-relaxed tracking-wide">
            <p className="font-medium text-[#18221D] text-base sm:text-lg leading-relaxed">
              Gujarat Organic Products Certification Agency (GOPCA) is a Government Certification Body of Gujarat State that carries out impartial third-party inspection & certification in organic production and handling.
            </p>
            <p>
              GOPCA works in strict accordance with the statutory criteria laid down under the <strong>National Programme for Organic Production (NPOP)</strong>. GOPCA is an autonomous body registered under the <strong>Societies Registration Act, 1860</strong> (Registration No. Guj/14589), functioning under the administrative oversight of the <strong>Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat</strong>.
            </p>
            <p>
              The Agency is a non-profit certification program developed in response to changing market requirements and regulatory norms. The primary aim of GOPCA is to provide reliable, scientific, and efficient inspection & certification services to the smallest of operators/farmers in a cost-efficient way and thus promote certified organic farming in the state.
            </p>
            <p>
              The Agency is committed to inspecting and certifying environmentally sound production systems and the preservation of natural resources, improvement of soil quality and health through organic and sustainable farming practices.
            </p>

            <div className="p-4 bg-[#F6F3EC] border-l-4 border-[#C49A5A] rounded-[2px] text-xs sm:text-sm text-[#3E4A43] italic">
              "According to GOPCA, organic certification will not be a declaration of food safety or absolute residue-free guarantee, but an impartial statutory verification process determining that products said to be organic comply strictly with the organic certification standards of NPOP."
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1B3E2B] hover:text-[#C49A5A] transition-colors"
              >
                <span>Read Full Statutory Mandate & Vision</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 3: 4-STAGE STATUTORY CERTIFICATION WORKFLOW (FEATURING FIELD INSPECTION IMAGE) */}
      <section className="py-20 bg-white border-y border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="lapland-subtitle">Certification Pipeline</div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
                Rigorous 4-phase statutory scrutiny.
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6760]">
                From revenue land record verification to unannounced physical audits and real-time APEDA Tracenet scope certificate generation.
              </p>
            </div>

            <Link
              to="/certification"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1B3E2B] hover:text-[#C49A5A] whitespace-nowrap"
            >
              <span>View Full 6-Stage Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* The 4 Phases Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fourPhases.map((phase) => (
                <div
                  key={phase.num}
                  className="bg-[#FAF8F5] p-6 rounded-[3px] border border-[#EAE6DE] hover:border-[#D5D0C6] transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="font-editorial text-3xl text-[#C49A5A]">
                      {phase.num}
                    </span>
                    <h3 className="font-editorial text-lg text-[#18221D] leading-tight">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-[#525E57] leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE6DE] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C744F] uppercase tracking-wider font-semibold">Deliverable</span>
                    <span className="font-medium text-[#1B3E2B]">{phase.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: User Uploaded Field Inspection Photo */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-3 rounded-[3px] border border-[#EAE6DE] shadow-sm">
              <div className="h-80 sm:h-96 overflow-hidden rounded-[2px] relative">
                <img
                  src="/images/field-inspection.jpg"
                  alt="GOPCA lead auditors conducting on-site crop health inspection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#1B3E2B]/90 backdrop-blur-sm text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-[2px]">
                  Physical Audit & Scrutiny
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-editorial text-lg text-[#18221D]">
                  On-Site Agricultural Scrutiny
                </h4>
                <p className="text-xs text-[#55635B] leading-relaxed">
                  Accredited lead inspectors in white coats verify 3-meter buffer boundaries, organic manure pits, and collect tamper-evident soil & leaf samples for GC-MS laboratory testing.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-[#1B3E2B] font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A]" />
                    <span>NABL Lab Tested</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A]" />
                    <span>ISO 17065 Conformance</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SECTION 4: GROWER GROUP (ICS) & COMMUNITY ASSEMBLIES (FEATURING ICS MEETING IMAGE) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: User Uploaded ICS Community Assembly Photo */}
          <div className="lg:col-span-6 bg-white p-3 rounded-[3px] border border-[#EAE6DE] shadow-sm">
            <div className="h-80 sm:h-96 overflow-hidden rounded-[2px] relative">
              <img
                src="/images/ics-farmer-meeting.jpg"
                alt="Grower Group ICS farmer assembly under banyan tree"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#C49A5A] text-[#12261D] text-[10px] uppercase font-bold px-2.5 py-1 rounded-[2px]">
                Grower Group (ICS) Model
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8C744F]">
                Community Governance
              </p>
              <h4 className="font-editorial text-xl text-[#18221D]">
                Participatory Village Assemblies under Tree Shade
              </h4>
              <p className="text-xs text-[#55635B] leading-relaxed">
                Extension officers and farmer members convene for peer evaluations, organic diary audits, and collective quality management without exorbitant commercial costs.
              </p>
            </div>
          </div>

          {/* Right: Text and Key Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="lapland-subtitle">Inclusive Smallholder Model</div>
            
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D] leading-tight">
              Affordable collective certification for small & marginal farmers.
            </h2>

            <p className="text-sm text-[#4E5C54] leading-relaxed">
              Under APEDA NPOP statutory guidelines, individual organic certification can be cost-prohibitive for smallholders holding under 4 hectares. GOPCA implements the sovereign <strong>Internal Control System (ICS) Grower Group</strong> model across Gujarat.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 bg-white p-4 rounded-[2px] border border-[#EAE6DE]">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5D0C6] flex items-center justify-center flex-shrink-0 text-[#1B3E2B]">
                  <Scale className="w-4 h-4 text-[#C49A5A]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D]">
                    Subsidized Non-Profit Tariffs
                  </h4>
                  <p className="text-xs text-[#525E57] mt-0.5">
                    Calibrated fee matrix allowing Farmer Producer Organizations (FPOs) and cooperatives to certify hundreds of members under a shared group scope.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-[2px] border border-[#EAE6DE]">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5D0C6] flex items-center justify-center flex-shrink-0 text-[#1B3E2B]">
                  <FileCheck2 className="w-4 h-4 text-[#C49A5A]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D]">
                    Internal Inspector Training & Peer Vigilance
                  </h4>
                  <p className="text-xs text-[#525E57] mt-0.5">
                    Local agricultural graduates and village youth trained as internal inspectors, verifying farm books and preventing chemical contamination.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-[2px] border border-[#EAE6DE]">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D5D0C6] flex items-center justify-center flex-shrink-0 text-[#1B3E2B]">
                  <ShieldCheck className="w-4 h-4 text-[#C49A5A]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#18221D]">
                    Real-Time Tracenet Sync
                  </h4>
                  <p className="text-xs text-[#525E57] mt-0.5">
                    Every member farmer gets an individual statutory identification code linked to APEDA national Tracenet for export transparency.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/operators/farmers"
                className="btn-lapland text-xs py-3 px-5 inline-flex items-center gap-2"
              >
                <span>Browse Certified Member Farmers Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION 5: SIGNATURE CERTIFIED CROPS OF GUJARAT */}
      <section className="py-20 bg-white border-y border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="lapland-subtitle">Statewide Agro-Climatic Diversity</div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
                Signature certified organic produce of Gujarat.
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6760]">
                High-value agricultural commodities audited across Gujarat's 33 districts for domestic and international export markets.
              </p>
            </div>

            <Link
              to="/standards"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1B3E2B] hover:text-[#C49A5A]"
            >
              <span>Our Organic Standards</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureCrops.map((c) => (
              <div
                key={c.crop}
                className="bg-[#FAF8F5] rounded-[3px] overflow-hidden border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={c.image}
                      alt={c.crop}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#1B3E2B]/90 backdrop-blur-sm text-white text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-[2px]">
                      {c.tag}
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#8C744F] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{c.region}</span>
                    </div>

                    <h3 className="font-editorial text-xl text-[#18221D]">
                      {c.crop}
                    </h3>
                    <p className="text-xs text-[#8C744F] italic">
                      {c.botanical}
                    </p>
                    <p className="text-xs text-[#525E57] leading-relaxed pt-1">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-[#EAE6DE] flex items-center justify-between text-xs text-[#1B3E2B] font-medium">
                    <span>NPOP Verified</span>
                    <span className="text-[#8C744F]">Audited Scope</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SECTION 6: CORE INSTITUTIONAL PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="lapland-subtitle inline-block">Statutory Hallmarks</div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
            Institutional pillars of public trust.
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6760] leading-relaxed">
            Founded on transparency, legal impartiality, and non-commercial service to the farming community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white p-7 rounded-[3px] border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE] flex items-center justify-center text-[#1B3E2B]">
                  <Icon className="w-6 h-6 text-[#C49A5A]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C744F]">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-editorial text-lg text-[#18221D]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#525E57] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Direct link to Apex Board */}
          <div className="bg-[#1B3E2B] text-white p-7 rounded-[3px] border border-[#23503B] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D8B57E]">
                Governance Council
              </span>
              <h3 className="font-editorial text-xl text-white">
                Apex Statutory Governing Board
              </h3>
              <p className="text-xs text-[#D0E2D7] leading-relaxed">
                Led by the Additional Chief Secretary / Principal Secretary of Agriculture, ensuring sovereign policy alignment and anti-corruption safeguards.
              </p>
            </div>

            <Link
              to="/governing-board"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D8B57E] hover:text-white transition-colors"
            >
              <span>View Governing Board Members</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SECTION 7: STATUTORY CIRCULARS & NOTIFICATIONS */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="lapland-subtitle">Statutory Transparency & Notices</div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
                Official directives & public disclosures.
              </h2>
            </div>

            <Link
              to="/download"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1B3E2B] hover:text-[#C49A5A]"
            >
              <span>Browse All Downloads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notifications.map((n) => (
              <div
                key={n.title}
                className="bg-white p-6 rounded-[3px] border border-[#EAE6DE] shadow-sm hover:border-[#D5D0C6] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#8C744F] uppercase tracking-wider">{n.badge}</span>
                    <span className="text-[#8C9892]">{n.date}</span>
                  </div>
                  <h3 className="font-editorial text-lg text-[#18221D] leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-xs text-[#525E57] leading-relaxed">
                    {n.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE6DE]">
                  <Link
                    to={n.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3E2B] hover:text-[#C49A5A]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Statutory Circular</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. PRE-FOOTER CTA SECTION */}
      <PreFooter />

    </div>
  );
}
