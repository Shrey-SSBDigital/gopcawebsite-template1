import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  ShieldCheck,
  Users,
  Award,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const AboutSubViews = ({ view, onNavigate, onOpenApply }) => {
  const { staff, governingBoard } = useCMS();

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C6D37] uppercase tracking-widest font-semibold mb-4">
          <button onClick={() => onNavigate('home')} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <span>GOPCA Directorate</span>
          <span>/</span>
          <span className="text-[#18231C] capitalize">{view.replace('-', ' ')}</span>
        </div>

        {/* View 1: About Agency Profile */}
        {view === 'about' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-4">
                About GOPCA
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Gujarat Organic Products Certification Agency (GOPCA) — Autonomous State Government Certification Body under the Department of Agriculture, Farmers Welfare & Co-operation, Government of Gujarat.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                Establishment & Statutory Scope
              </h2>
              <p className="text-sm text-[#4E5C52] leading-relaxed">
                GOPCA is Gujarat state run an organic certification body, applied to accreditation as per National Programme for Organic Production (NPOP), Govt. of India and as per EN 45011/ISO 65, to carry out inspections and issue certificates for organic production systems. GOPCA offers certification for the domestic market. The inspection and certification is based on the National Standards for Organic Production.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#8C6D37] font-bold block">
                    Statutory Direction
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3826]">
                    Our Vision
                  </h3>
                  <p className="text-sm text-[#526055] leading-relaxed">
                    To be the Agency that best understands and satisfies the organic inspection & certification service and fulfills needs of organic operators - nationally.
                  </p>
                </div>

                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#8C6D37] font-bold block">
                    Commitment to Farmers
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3826]">
                    Our Mission
                  </h3>
                  <p className="text-sm text-[#526055] leading-relaxed">
                    It is the Mission GOPCA to provide farmers and operators with the organic certification related services that are fulfilled at the right price. Our friendly, knowledgeable and professional staff will render best of services to our farmers & operators which will be a true value addition to their products.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenApply}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-sm"
                >
                  <span>Apply for Organic Certification</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                </button>
                <button
                  onClick={() => onNavigate('governing-board')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#1B3826] bg-[#FAF8F5] border border-[#D5CEBF] rounded-xl hover:bg-[#EFE9DC] transition-colors"
                >
                  <span>View Governing Board</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Governing Board */}
        {view === 'governing-board' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Governing Board of Gujarat
              </h1>
              <p className="text-sm sm:text-base text-[#46544A] leading-relaxed">
                The apex policymaking authority of GOPCA, composed of senior administrative leadership from the Government of Gujarat.
              </p>
            </div>

            {/* Official Table Layout */}
            <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[650px]">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                      <th className="py-3.5 px-4">Photo</th>
                      <th className="py-3.5 px-4">Name & Address</th>
                      <th className="py-3.5 px-4">Designation / Role</th>
                      <th className="py-3.5 px-4">Contact Number</th>
                      <th className="py-3.5 px-4">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE7DC]">
                    {governingBoard.map((m, idx) => (
                      <tr key={m.id || idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#E7E0D2] border border-[#D5CEBE] shrink-0">
                            {m.photo ? (
                              <img
                                src={m.photo}
                                alt={m.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#8C6D37]">
                                <UserCheck className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-sm text-[#18231C]">
                            {m.name}
                          </div>
                          <div className="text-[11px] text-[#6F7D73] mt-0.5 max-w-sm">
                            {m.address || m.rawName}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${
                              m.role === 'Chairman'
                                ? 'bg-[#1B3826] text-white'
                                : m.role === 'Member Secretary'
                                ? 'bg-[#8C6D37] text-white'
                                : 'bg-[#EBF2ED] text-[#1B3826]'
                            }`}
                          >
                            {m.role || m.designation}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-[#38463D]">
                          {m.contactNumber || '—'}
                        </td>
                        <td className="py-4 px-4 text-xs text-[#38463D]">
                          {m.email ? (
                            <a href={`mailto:${m.email}`} className="text-[#1B3826] hover:underline">
                              {m.email}
                            </a>
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Personnel & Staff Directory (Table Only) */}
        {view === 'staff' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Personnel & Staff Directory
              </h1>
              <p className="text-sm sm:text-base text-[#46544A] leading-relaxed">
                Directory of executive leadership, quality managers, technical evaluators, and certified organic field inspectors stationed across Gujarat headquarters.
              </p>
            </div>

            {/* Official Staff Table Layout */}
            <div className="bg-white rounded-3xl border border-[#D5CEBF] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-[#6A796F] font-semibold">
                      <th className="py-3.5 px-4">Photo</th>
                      <th className="py-3.5 px-4">Name & Headquarter</th>
                      <th className="py-3.5 px-4">Designation</th>
                      <th className="py-3.5 px-4">Contact Number</th>
                      <th className="py-3.5 px-4">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE7DC]">
                    {staff.map((member, idx) => (
                      <tr key={member.id || idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#E8E2D5] border border-[#D5CEBE] shrink-0">
                            {member.photo ? (
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#8C6D37]">
                                <UserCheck className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-sm text-[#18231C]">
                            {member.name}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-[#6F7D73] mt-0.5">
                            <MapPin className="w-3 h-3 text-[#8C6D37] shrink-0" />
                            <span>HQ: {member.headquarter || 'Ahmedabad'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-[#FAF8F5] text-[#1B3826] border border-[#DFD8CC]">
                            {member.designation}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-[#38463D]">
                          {member.contactNumber ? (
                            <a href={`tel:${member.contactNumber}`} className="hover:text-[#1B3826] flex items-center gap-1">
                              <Phone className="w-3 h-3 text-[#8C6D37]" />
                              <span>{member.contactNumber}</span>
                            </a>
                          ) : '—'}
                        </td>
                        <td className="py-4 px-4 text-xs text-[#38463D]">
                          {member.email ? (
                            <a href={`mailto:${member.email}`} className="text-[#1B3826] hover:underline flex items-center gap-1 truncate max-w-xs">
                              <Mail className="w-3 h-3 text-[#8C6D37] shrink-0" />
                              <span className="truncate">{member.email}</span>
                            </a>
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* View 4: Statutory Services */}
        {view === 'services' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-4">
                Statutory Certification Services
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Comprehensive auditing, verification, and accreditation services offered across the organic agricultural supply chain in Gujarat.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
              <div className="border-b border-[#EDE7DC] pb-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#8C6D37] font-bold block mb-1">
                  Active Operational Scope
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                  Inspection & Certification
                </h2>
                <p className="text-sm text-[#4E5C52] mt-2">
                  At present the following certification activity is undertaken:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    title: '1. Organic Agricultural Production',
                    items: [
                      'Crop production (Individual and Grower Group Certification / ICS)',
                      'Wild Harvest collection and forest produce validation'
                    ],
                    desc: 'Comprehensive field audits, soil quality sampling, and crop tissue gas-chromatography testing for farms growing cotton, groundnut, kesar mango, cumin, wheat, and pulses.'
                  },
                  {
                    title: '2. Organic Grower Groups (ICS)',
                    items: [
                      'Group certification for small & marginal farmers',
                      'Internal Control System (ICS) manual audits & square-root sampling'
                    ],
                    desc: 'Cost-effective certification for organized farmer mandalis and cooperatives under a shared internal quality management system.'
                  },
                  {
                    title: '3. Commercial Bio-Input Approvals',
                    items: [
                      'Validation against NPOP Appendix 1 & 2',
                      'Verification of bio-fertilizers, bio-pesticides, and botanicals'
                    ],
                    desc: 'Rigorous laboratory analysis and formulation evaluation for commercial organic inputs marketed across Gujarat.'
                  },
                  {
                    title: '4. TraceNet Scope Certificate Issuance',
                    items: [
                      'Direct synchronization with APEDA TraceNet portal',
                      'Tamper-proof digital scope certificate with verifiable QR code'
                    ],
                    desc: 'Authoritative national scope documentation recognized for domestic and institutional certified organic trade.'
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] rounded-2xl border border-[#D5CEBF] p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#18231C]">{s.title}</h3>
                    <ul className="space-y-1 text-xs text-[#2A372E]">
                      {s.items.map((it, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B3826] shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#5D6D61] leading-relaxed pt-2 border-t border-[#DFD8CC]">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 5: Quality & Impartiality Policy */}
        {view === 'policy' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-4">
                Quality & Impartiality Policy
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Statutory commitment to independent, objective, and conflict-free organic certification operations.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
              {/* Authentic Quality Policy Quote */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#1B3826] border-y border-r border-[#DFD8CC] space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#8C6D37] font-bold block">
                  Official Quality Policy Declaration
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#18231C] italic leading-relaxed">
                  "We are committed to being aggressive in our attitude towards quality and customer service, primarily since we want to be ranked as the 'best' in our business. Quality is not just another goal, it is our basic strategy for survival and future growth."
                </p>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#18231C] pt-2">
                ISO/IEC 17065 & NPOP Impartiality Charter
              </h2>
              <p className="text-sm text-[#4E5C52] leading-relaxed">
                GOPCA understands the vital importance of impartiality in executing third-party organic certification activities. Our structure enforces strict operational mechanisms to manage conflict of interest and safeguard complete objectivity.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  'Zero Commercial Conflict: GOPCA does not provide consultancy, commercial farming, or input distribution services to operators.',
                  'Separation of Evaluation & Decision: Organic inspectors conducting field visits cannot serve on the Certification Committee deciding the certification grant.',
                  'Annual Neutrality Declarations: All staff, evaluators, and board members execute mandatory annual neutrality and financial disclosure undertakings.',
                  'Independent Impartiality Oversight: An independent governance structure including farmer representatives, consumer advocates, and agricultural scientists oversees agency neutrality.'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-[#2A372E] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#1B3826] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 6: Accreditation */}
        {view === 'accreditation' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-4">
                APEDA Accreditation
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Official accreditation granted by the National Accreditation Body (NAB) under APEDA, Government of India.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDE7DC] pb-4">
                <div>
                  <div className="text-[10px] font-mono text-[#8C6D37] uppercase font-bold">
                    Accreditation Number
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#18231C]">
                    NPOP / NAB / 0028
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded bg-[#EAF2ED] text-[#1B3826] font-semibold text-xs border border-[#CCE0D3]">
                    Accreditation valid up to 19/06/2026
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#4E5C52] leading-relaxed">
                Under Section 3 of the National Programme for Organic Production (NPOP), the National Accreditation Body (NAB) under the Agricultural and Processed Food Products Export Development Authority (APEDA), Ministry of Commerce and Industry, Government of India, has granted accreditation to Gujarat Organic Products Certification Agency (GOPCA) as an authorized Certification Body.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DFD8CC]">
                  <span className="text-[#78887D] block mb-1">Accredited Scopes:</span>
                  <strong className="text-[#18231C]">Crops, Grower Groups (ICS), Processing & Input Approvals</strong>
                </div>
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DFD8CC]">
                  <span className="text-[#78887D] block mb-1">National Registry:</span>
                  <strong className="text-[#18231C]">APEDA TraceNet System Integrated</strong>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
