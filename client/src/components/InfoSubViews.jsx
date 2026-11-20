import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ContactSection } from './ContactSection';
import { QrCode, HelpCircle, FileText, CheckCircle2, ChevronDown, ChevronUp, Download, ShieldCheck, Building2 } from 'lucide-react';

export const InfoSubViews = ({ pageType, onNavigate, onOpenApply }) => {
  const { faqs } = useCMS();
  const [openFaq, setOpenFaq] = useState('faq-01');

  if (pageType === 'inquiry') {
    return <ContactSection />;
  }

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8C6D37] uppercase tracking-widest font-semibold mb-3">
          <button onClick={() => onNavigate('home')} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <span>More About GOPCA</span>
          <span>/</span>
          <span className="text-[#18231C] capitalize">{pageType.replace('-', ' ')}</span>
        </div>

        {/* View 1: Payment QR Code & Bank Accounts */}
        {pageType === 'payment-qr' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Fee Payment Mode & Official QR Code
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Direct statutory fee deposit details for certification, dossier scrutiny, and inspection charges payable in favour of GOPCA.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Bank Accounts */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 space-y-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#18231C]">
                  Official Banking Coordinates
                </h2>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#1B3826] font-semibold text-sm">
                    <Building2 className="w-4 h-4 text-[#8C6D37]" />
                    <span>State Bank of India (SBI)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div>
                      <span className="text-[#78887D] block">Account Name:</span>
                      <strong className="text-[#18231C]">Gujarat Organic Products Certification Agency</strong>
                    </div>
                    <div>
                      <span className="text-[#78887D] block">Account Number:</span>
                      <strong className="font-mono text-[#18231C]">30987654321</strong>
                    </div>
                    <div>
                      <span className="text-[#78887D] block">IFSC Code:</span>
                      <strong className="font-mono text-[#18231C]">SBIN0003055</strong>
                    </div>
                    <div>
                      <span className="text-[#78887D] block">Branch:</span>
                      <span className="text-[#18231C]">Satellite Branch, Ahmedabad</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#526055] leading-relaxed">
                  <h4 className="font-semibold text-[#18231C] text-sm">Mandatory Payment Instructions:</h4>
                  <p>1. Payments can be submitted via RTGS / NEFT / IMPS / UPI or Demand Draft.</p>
                  <p>2. Demand Drafts must be drawn in favour of <strong>"M/s. GOPCA"</strong> payable at Ahmedabad.</p>
                  <p>3. After remitting payment, email the UTR transaction slip with your Farm / Application tracking number to <strong>dirgopca@gmail.com</strong>.</p>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2ED] text-[#1B3826] flex items-center justify-center mx-auto">
                  <QrCode className="w-6 h-6 text-[#1B3826]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#18231C]">
                  UPI Instant Fee Payment
                </h3>
                <p className="text-xs text-[#6A786F]">
                  Scan using BHIM, Google Pay, PhonePe, or any authorized UPI mobile application.
                </p>

                {/* Styled QR Visual */}
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] inline-block shadow-inner">
                  <div className="w-56 h-56 bg-white border border-[#DCD5C5] rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
                    <img
                      src="/images/gopca_payment_qr.png"
                      alt="GOPCA Official Bharat QR Code for Fees Payment"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-xs font-mono font-semibold text-[#1B3826]">
                  GOPCA Bharat QR / UPI Code
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: ICS Circular 2024 */}
        {pageType === 'ics-circular' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Circular for ICS / OGG as per NPOP 2024
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Ref: GOPCA/CIR/ICS-OGG/2024/02 · Issued by the Directorate for Organic Grower Groups across Gujarat.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6 text-xs text-[#38463D] leading-relaxed">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DFD8CC] font-mono text-[11px] text-[#1B3826]">
                SUBJECT: Mandatory adherence to enhanced Internal Control System (ICS) and Organic Grower Group (OGG) guidelines under NPOP 2024 amendments.
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-[#4A574E]">
                <p>
                  In compliance with directives issued by the National Accreditation Body (APEDA) under NPOP 2024, all registered grower groups, farmer cooperatives, and FPOs certified under GOPCA are hereby instructed to execute the following operational mandates:
                </p>

                <h3 className="font-serif text-xl font-bold text-[#18231C]">
                  1. Internal Quality System Audits
                </h3>
                <p>
                  No grower group application or annual scope renewal will be cleared by GOPCA until the appointed Internal Quality Manager (IQM) submits 100% completed internal inspection records for every registered smallholder member.
                </p>

                <h3 className="font-serif text-xl font-bold text-[#18231C]">
                  2. GPS Farm Parcel Tagging
                </h3>
                <p>
                  Each member plot must be geotagged with 4-corner coordinates and uploaded to the digital group register. Buffer zone violations or synthetic drift incidents will lead to immediate group sanction under NPOP Clause 5.4.
                </p>

                <h3 className="font-serif text-xl font-bold text-[#18231C]">
                  3. Sub-Sampling Ratios
                </h3>
                <p>
                  External audits by GOPCA will mandate unannounced soil sampling across a minimum of 20% of the sample parcels, with testing executed exclusively in ISO 17025 accredited laboratories.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Organic Farming Insights */}
        {pageType === 'organic-farming' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Organic Farming Principles & Guidelines
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Foundational principles of natural soil regeneration, biodiversity preservation, and sustainable crop cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: '1. Principle of Health',
                  desc: 'Organic agriculture sustains and enhances the health of soil, plant, animal, human, and planet as one and indivisible. It avoids fertilizers, pesticides, animal drugs, and food additives that may have adverse health effects.'
                },
                {
                  title: '2. Principle of Ecology',
                  desc: 'Rooted in living ecological systems and cycles, organic production emulates ecological balance. In Gujarat, this involves water conservation, indigenous seed preservation, and bio-fences supporting pollinator bees.'
                },
                {
                  title: '3. Principle of Fairness',
                  desc: 'Built upon relationships that ensure fairness regarding common environment and life opportunities. Growers and farm workers are safeguarded against hazardous agrochemicals while commanding ethical market prices.'
                },
                {
                  title: '4. Principle of Care',
                  desc: 'Precaution and responsibility are the key concerns in management, development, and technology choices in organic agriculture to protect future generations.'
                }
              ].map((p, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[#D5CEBF] p-6 shadow-sm space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#18231C]">{p.title}</h3>
                  <p className="text-xs text-[#526055] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 4: RTI Disclosures */}
        {pageType === 'rti' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Right to Information (RTI) Disclosures
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Statutory disclosures under Section 4(1)(b) of the Right to Information Act, 2005.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-10 shadow-sm space-y-6 text-xs text-[#38463D]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] font-semibold">
                    Appellate Authority
                  </span>
                  <div className="font-serif text-xl font-bold text-[#18231C]">
                    Shri Anil Patel
                  </div>
                  <div className="text-xs text-[#526055]">
                    DIRECTOR, GOPCA
                  </div>
                  <div className="pt-2 text-xs text-[#445248] space-y-1">
                    <div>Contact: (079) 26740031 / 9898420421</div>
                    <div>Email: dirgopca@gmail.com</div>
                    <div className="text-[11px] text-[#718075]">Beej Pramanan Bhavan, Satellite, Ahmedabad</div>
                  </div>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] font-semibold">
                    Public Information Officer (PIO)
                  </span>
                  <div className="font-serif text-xl font-bold text-[#18231C]">
                    Shri R. D. Prajapati
                  </div>
                  <div className="text-xs text-[#526055]">
                    Quality Manager, GOPCA
                  </div>
                  <div className="pt-2 text-xs text-[#445248] space-y-1">
                    <div>Contact: (079) 26740031 / 9909228399</div>
                    <div>Email: gopca.quality@gmail.com</div>
                    <div className="text-[11px] text-[#718075]">Quality Wing, GOPCA Directorate</div>
                  </div>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] font-semibold">
                    Assistant PIO (APIO)
                  </span>
                  <div className="font-serif text-xl font-bold text-[#18231C]">
                    Ms. P. K. Bhabhor
                  </div>
                  <div className="text-xs text-[#526055]">
                    Evaluator / Inspector, GOPCA
                  </div>
                  <div className="pt-2 text-xs text-[#445248] space-y-1">
                    <div>Contact: (079) 26740031 / 9574744954</div>
                    <div>Email: gopca.sauthcentral@gmail.com</div>
                    <div className="text-[11px] text-[#718075]">Evaluation Cell, GOPCA Directorate</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DFD8CC] leading-relaxed text-xs">
                <strong>Proactive Statutory Disclosure:</strong> Citizens can obtain copies of statutory public documents in accordance with the Right to Information Act, 2005. Standard Indian Postal Order (IPO) or Court Fee Stamp of ₹20/- drawn in favour of "Director, GOPCA, Ahmedabad" payable at Ahmedabad, or submitted online via Gujarat RTI Portal.
              </div>
            </div>
          </div>
        )}

        {/* View 5: FAQs */}
        {pageType === 'faq' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#17221A] leading-tight mb-2">
                Frequently Asked Questions
              </h1>
              <p className="text-base text-[#46544A] leading-relaxed">
                Official statutory guidance on organic certification procedures, validity, inspection timelines, conversion norms, and fee payments.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const qNum = faq.questionNumber || idx + 1;
                const questionText = faq.question || faq.q;
                const answerText = faq.answer || faq.a;
                const faqId = faq.id || `faq-${qNum}`;
                const isOpen = openFaq === faqId;
                return (
                  <div
                    key={faqId}
                    className="bg-white rounded-2xl border border-[#D5CEBF] overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faqId)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#18231C] hover:bg-[#FAF8F5]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EBF2ED] text-[#1B3826]">
                          Q{qNum}
                        </span>
                        <span>{questionText}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#8C6D37] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C6D37] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-[#4F5E53] leading-relaxed border-t border-[#EDE7DC] bg-[#FAF8F5]/50 whitespace-pre-line">
                        {answerText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
