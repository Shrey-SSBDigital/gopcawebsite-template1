import React from 'react';
import { Link } from 'react-router-dom';
import AboutSubNav from '../components/AboutSubNav';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Building2, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Scale, 
  ArrowRight
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
              <span>Statutory Establishment & Governance</span>
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

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
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
              </div>
            </div>

            {/* Emblem Card */}
            <div className="lg:col-span-4 bg-[#FAF8F5] p-7 rounded-[3px] border border-[#EAE6DE] text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full border border-[#1B3E2B] flex items-center justify-center text-[#1B3E2B]">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-xl text-[#18221D]">
                Autonomous Body of Gujarat
              </h3>
              <p className="text-xs text-[#525E57] leading-relaxed">
                Registered under Societies Registration Act 1860. Conforming to APEDA NPOP statutory guidelines.
              </p>
              <div className="pt-2">
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
          <div className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="lapland-subtitle">
                Our Vision
              </div>
              <p className="text-sm text-[#48564E] leading-relaxed">
                To be the Agency that best understands and satisfies the organic inspection & certification service and fulfills needs of organic operators - nationally.
              </p>
            </div>
            
          </div>

          {/* Mission */}
          <div className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="lapland-subtitle">
               Our Mission
              </div>
              <p className="text-sm text-[#48564E] leading-relaxed">
                It is the Mission GOPCA to provide farmers and operators with the organic certification related services that are fulfilled at the right price. Our friendly, knowledgeable and professional staff will render best of services to our farmers & operators which will be a true value addition to their products.
              </p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
