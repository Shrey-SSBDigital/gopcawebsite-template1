import React from 'react';
import { Link } from 'react-router-dom';
import AboutSubNav from '../components/AboutSubNav';
import PreFooter from '../components/PreFooter';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Building2, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Scale, 
  ArrowRight,
  Sprout,
  Users,
  Microscope,
  FileCheck,
  CalendarCheck
} from 'lucide-react';

export default function AboutPage() {
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

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      {/* Sub-Navigation Tab Bar */}
      <AboutSubNav />

      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Statutory Establishment & Public Mandate</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              About us & statutory mandate.
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Gujarat Organic Products Certification Agency (GOPCA) is an autonomous statutory certification body under the Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Showcase Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="rounded-[3px] overflow-hidden border border-[#EAE6DE] bg-white shadow-sm group">
            <div className="h-48 overflow-hidden">
              <img
                src="/images/gujarat-farmer-field.jpg"
                alt="Gujarat organic farmer at dawn"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 text-[11px] text-[#4F5D54]">
              <strong className="text-[#18221D] block">Statewide Organic Farmers</strong>
              12,450+ farmers across 33 districts
            </div>
          </div>

          <div className="rounded-[3px] overflow-hidden border border-[#EAE6DE] bg-white shadow-sm group">
            <div className="h-48 overflow-hidden">
              <img
                src="/images/seedling-soil.jpg"
                alt="Living soil with seedling sprout"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 text-[11px] text-[#4F5D54]">
              <strong className="text-[#18221D] block">Living Soil Vitality</strong>
              Microbial purity & zero chemical drift
            </div>
          </div>

          <div className="rounded-[3px] overflow-hidden border border-[#EAE6DE] bg-white shadow-sm group">
            <div className="h-48 overflow-hidden">
              <img
                src="/images/field-inspection.jpg"
                alt="GOPCA auditors in field"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 text-[11px] text-[#4F5D54]">
              <strong className="text-[#18221D] block">Lead Auditor Scrutiny</strong>
              ISO 17065 & GC-MS residue testing
            </div>
          </div>

          <div className="rounded-[3px] overflow-hidden border border-[#EAE6DE] bg-white shadow-sm group">
            <div className="h-48 overflow-hidden">
              <img
                src="/images/ics-farmer-meeting.jpg"
                alt="ICS farmer community assembly"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 text-[11px] text-[#4F5D54]">
              <strong className="text-[#18221D] block">Democratic ICS Model</strong>
              84+ Grower collectives empowered
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* Statutory Mandate Overview */}
        <section className="bg-white rounded-[3px] p-8 sm:p-10 border border-[#EAE6DE] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="lapland-subtitle">
                Institutional Mandate
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
                Statutory foundation & public authority.
              </h2>
              <div className="space-y-3.5 text-sm text-[#48564E] leading-relaxed">
                <p>
                  Established by the Government of Gujarat under the <strong>Societies Registration Act, 1860</strong> (Registration No. <strong>Guj/14589</strong>), GOPCA operates as an autonomous legal entity functioning under the administrative oversight of the <strong>Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat</strong>.
                </p>
                <p>
                  GOPCA’s core statutory mandate is to serve as an <strong>impartial, accredited third-party inspection and certification agency</strong> under the <strong>National Programme for Organic Production (NPOP)</strong>, executed by the Agricultural and Processed Food Products Export Development Authority (APEDA), Ministry of Commerce & Industry, Government of India.
                </p>
                <p>
                  We ensure strict adherence to national and international organic standards, providing credible verification that products labeled as "Organic" have been grown, harvested, processed, and handled according to verified ecological principles without synthetic agrochemicals.
                </p>
                <p>
                  The Agency is committed to inspecting and certifying environmentally sound production systems, the preservation of natural resources, and the improvement of soil quality and microbial health through organic and sustainable farming practices.
                </p>
              </div>

              {/* Fast Facts Badge Group */}
              <div className="pt-2 flex flex-wrap gap-2.5 text-xs">
                <span className="bg-[#FAF8F5] text-[#1B3E2B] border border-[#D5D0C6] px-3 py-1 rounded-[2px] font-medium">
                  Registration No: Guj/14589
                </span>
                <span className="bg-[#FAF8F5] text-[#1B3E2B] border border-[#D5D0C6] px-3 py-1 rounded-[2px] font-medium">
                  NPOP Accreditation: NAB-0012
                </span>
                <span className="bg-[#FAF8F5] text-[#1B3E2B] border border-[#D5D0C6] px-3 py-1 rounded-[2px] font-medium">
                  Standard Conformance: ISO/IEC 17065:2012
                </span>
                <span className="bg-[#FAF8F5] text-[#1B3E2B] border border-[#D5D0C6] px-3 py-1 rounded-[2px] font-medium">
                  Jurisdiction: 33 Districts of Gujarat
                </span>
              </div>
            </div>

            {/* Emblem Card */}
            <div className="lg:col-span-4 bg-[#FAF8F5] p-7 rounded-[3px] border border-[#EAE6DE] text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#D5D0C6] flex items-center justify-center p-2 shadow-sm">
                <img src="/logo.png" alt="GOPCA Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-editorial text-xl text-[#18221D]">
                Autonomous Body of Gujarat
              </h3>
              <p className="text-xs text-[#525E57] leading-relaxed">
                Registered under Societies Registration Act 1860. Conforming to APEDA NPOP statutory guidelines and ISO/IEC 17065 benchmarks.
              </p>
              <div className="pt-2 border-t border-[#EAE6DE]">
                <Link
                  to="/governing-board"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1B3E2B] hover:text-[#C49A5A]"
                >
                  <span>Apex Governing Board</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Vision & Mission Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE] flex items-center justify-center text-[#1B3E2B]">
                <Compass className="w-5 h-5 text-[#C49A5A]" />
              </div>
              <div className="lapland-subtitle">
                Our Vision
              </div>
              <h3 className="font-editorial text-2xl text-[#18221D]">
                National Excellence in Organic Certification
              </h3>
              <p className="text-sm text-[#48564E] leading-relaxed">
                To be the Agency that best understands and satisfies the organic inspection & certification service and fulfills the needs of organic operators - nationally.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EAE6DE] text-xs text-[#8C744F] font-semibold uppercase tracking-wider">
              Statutory Benchmark • NPOP National Alignment
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE] flex items-center justify-center text-[#1B3E2B]">
                <Target className="w-5 h-5 text-[#C49A5A]" />
              </div>
              <div className="lapland-subtitle">
               Our Mission
              </div>
              <h3 className="font-editorial text-2xl text-[#18221D]">
                Value Addition at Fair, Right Price
              </h3>
              <p className="text-sm text-[#48564E] leading-relaxed">
                It is the Mission of GOPCA to provide farmers and operators with the organic certification related services that are fulfilled at the right price. Our friendly, knowledgeable and professional staff will render best of services to our farmers & operators which will be a true value addition to their products.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EAE6DE] text-xs text-[#8C744F] font-semibold uppercase tracking-wider">
              Non-Profit Tariffs • Farmer Empowerment
            </div>
          </div>

        </section>

        {/* 5 Core Institutional Pillars */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="lapland-subtitle inline-block">Institutional Foundation</div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
              Five core pillars of GOPCA governance.
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6760] leading-relaxed">
              Every audit decision, standard evaluation, and scope certificate is governed by five immutable statutory principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      Statutory Principle 0{idx + 1}
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

            {/* 6th Card: Impartiality Resolution */}
            <div className="bg-[#1B3E2B] text-white p-7 rounded-[3px] border border-[#23503B] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D8B57E]">
                  Statutory Resolution 04/2014
                </span>
                <h3 className="font-editorial text-xl text-white">
                  Solemn Commitment to Impartiality
                </h3>
                <p className="text-xs text-[#D0E2D7] leading-relaxed">
                  GOPCA operates completely free from commercial, financial, and political pressure, ensuring third-party objectivity across all audit outcomes.
                </p>
              </div>

              <Link
                to="/policy"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D8B57E] hover:text-white transition-colors"
              >
                <span>Read Full Quality & Impartiality Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Scientific Scrutiny Section (Featuring Field Inspection Image) */}
        <section className="bg-white rounded-[3px] p-8 sm:p-10 border border-[#EAE6DE] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="lapland-subtitle">Scientific Audit Rigor</div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
                On-site physical audits & laboratory screening.
              </h2>
              <p className="text-sm text-[#4E5C54] leading-relaxed">
                Certification at GOPCA is an evidence-based physical verification process. Our qualified lead auditors conduct unannounced on-site farm inspections to evaluate conversion history, buffer zone compliance, crop rotations, and organic manure maturation.
              </p>
              <div className="space-y-2 text-xs text-[#525E57]">
                <div className="flex items-center gap-2 font-medium text-[#18221D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A5A]" />
                  <span>Tamper-evident chain of custody for soil core and leaf tissue sampling.</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[#18221D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A5A]" />
                  <span>Gas Chromatography Mass Spectrometry (GC-MS/MS) screening for multi-residue pesticides.</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-[#18221D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A5A]" />
                  <span>Verification of minimum 3-meter physical buffer zones to prevent chemical drift.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/personnel"
                  className="btn-lapland text-xs py-2.5 px-4 inline-flex items-center gap-2"
                >
                  <span>Meet Official Auditors Cadre</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-[3px] overflow-hidden border border-[#EAE6DE] shadow-sm">
              <img
                src="/images/field-inspection.jpg"
                alt="GOPCA agricultural officers on crop audit"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE6DE] text-xs text-[#525E57]">
                Official GOPCA technical officers performing multi-point field scrutiny in Saurashtra certified grower collective.
              </div>
            </div>

          </div>
        </section>

        {/* Sub-Pages Quick Navigation Bar */}
        <section className="bg-[#FAF8F5] p-8 rounded-[3px] border border-[#EAE6DE] space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-editorial text-2xl text-[#18221D]">
              Explore GOPCA Statutory Structure
            </h3>
            <p className="text-xs text-[#6F7C75]">
              Public disclosures, regulatory council rosters, and accredited scopes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/governing-board"
              className="bg-white p-5 rounded-[2px] border border-[#D5D0C6] hover:border-[#1B3E2B] transition-all group"
            >
              <h4 className="font-editorial text-base text-[#18221D] group-hover:text-[#C49A5A]">
                Governing Board →
              </h4>
              <p className="text-xs text-[#525E57] mt-1">
                9 Apex council members representing state ministries, SAUs, APEDA, and farmers.
              </p>
            </Link>

            <Link
              to="/personnel"
              className="bg-white p-5 rounded-[2px] border border-[#D5D0C6] hover:border-[#1B3E2B] transition-all group"
            >
              <h4 className="font-editorial text-base text-[#18221D] group-hover:text-[#C49A5A]">
                Personnel Roster →
              </h4>
              <p className="text-xs text-[#525E57] mt-1">
                Searchable directory of ISO 17065 lead auditors and technical officers.
              </p>
            </Link>

            <Link
              to="/policy"
              className="bg-white p-5 rounded-[2px] border border-[#D5D0C6] hover:border-[#1B3E2B] transition-all group"
            >
              <h4 className="font-editorial text-base text-[#18221D] group-hover:text-[#C49A5A]">
                Quality Policy →
              </h4>
              <p className="text-xs text-[#525E57] mt-1">
                Governing Board Resolution 04/2014 on sovereign impartiality and anti-corruption.
              </p>
            </Link>

            <Link
              to="/accreditation"
              className="bg-white p-5 rounded-[2px] border border-[#D5D0C6] hover:border-[#1B3E2B] transition-all group"
            >
              <h4 className="font-editorial text-base text-[#18221D] group-hover:text-[#C49A5A]">
                Accreditation →
              </h4>
              <p className="text-xs text-[#525E57] mt-1">
                APEDA NPOP NAB-0012 certificate scope details and ISO/IEC 17065 conformity.
              </p>
            </Link>
          </div>
        </section>

      </div>

      {/* PreFooter Callout */}
      <PreFooter />

    </div>
  );
}
