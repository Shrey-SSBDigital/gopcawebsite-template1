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
} from "lucide-react";

export default function HomePage() {
  const fourPhases = [
    {
      num: "01",
      title: "Farmer Onboarding & Land Verification",
      desc: "Verification of official Revenue 7/12 & 8-A records, 3-year past chemical cropping history, and plot boundary demarcation.",
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
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Gir Kesar Mango",
      botanical: "Mangifera indica",
      region: "Gir Somnath & Junagadh",
      desc: "Geographical Indication (GI) certified royal fruit orchards under strict bio-dynamic and neem management.",
      tag: "GI & Organic Synergy",
      image:
        "https://images.unsplash.com/photo-1592417817098-8f3d6910214c?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Certified Spices & Botanicals",
      botanical: "Cumin, Turmeric, Coriander, Cardamom",
      region: "Patan, Mehsana, Saurashtra",
      desc: "Multi-residue screened seed spices harvested with zero chemical drift in certified organic clusters.",
      tag: "European Traceability",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Bhalia Durum Wheat",
      botanical: "Triticum durum",
      region: "Bhal Tract (Ahmedabad / Anand)",
      desc: "Naturally rainfed saline soil durum wheat with high protein content, produced with zero synthetic irrigation inputs.",
      tag: "Rainfed Native Heirloom",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Indigenous Organic Cotton",
      botanical: "Gossypium herbaceum (Kala Cotton)",
      region: "Kutch & Surendranagar",
      desc: "Drought-tolerant non-GMO desi cotton supporting ethical textile supply chains and native biodiversity.",
      tag: "Non-GMO Heritage",
      image:
        "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80",
    },
    {
      crop: "Approved Bio-Inputs",
      botanical: "Neem cake, Bio-fertilizers, Vermicompost",
      region: "GIDC / Statewide Units",
      desc: "Commercial soil amendments and botanical pest controls evaluated against NPOP Annexure 1 & 2 criteria.",
      tag: "NPOP Annexure Approved",
      image:
        "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    },
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
      {/* Hero Section — EXACT Taste of Lapland Screenshot 1 Match */}
      <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden">
        {/* Full-bleed authentic agricultural photo background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2400&q=85"
            alt="Organic farming in Gujarat"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay to match Taste of Lapland screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        </div>
      </section>

      {/* Section 2: Editorial 2-Column Layout (Matching Screenshot 2 & Screenshot 4) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Golden rule subtitle */}
        <div className="lapland-subtitle mb-6">Who We Are</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Big Editorial Serif Heading */}
          <div className="lg:col-span-6">
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#18221D] leading-[1.12]">
              A focused,
              <br />
              relationship-led
              <br />
              certification agency.
            </h2>
          </div>

          {/* Right Column: Clean descriptive paragraphs */}
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#4C5852] leading-relaxed tracking-wide">
            <p>
              Gujarat Organic Products Certification Agency (GOPCA) is a
              Government Certification Body of the Gujarat State that carries
              out impartial third party inspection & certification in organic
              production and handling. GOPCA works in accordance with the
              criteria laid down under the NPOP (National Program for Organic
              Production) 2005-Jun,2015. GOPCA is an autonomous body and is
              registered under Societies Registration Act, 1860. The Agency is
              non-profit certification program developed in response to the
              changing market requirements and regulatory nature of organic
              certification. The aim of GOPCA is to provide reliable and
              efficient inspection & certification services to the smallest of
              operators/farmers in a cost efficient way and thus promote
              certified organic farming in the state. The Agency is committed to
              inspecting and certifying environmentally sound production systems
              and the preservation of natural resources, improvement of the soil
              quality and health through organic and sustainable farming
              practices. According to GOPCA, organic certification will not be a
              declaration of the quality, food safety and absolute residue free
              guarantee for food and food products and will not provide
              guarantee for efficiency of agriculture inputs, but it will be a
              verification process of determining that the products, said to be
              organic, are in compliance with organic certification standards of
              NPOP.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
