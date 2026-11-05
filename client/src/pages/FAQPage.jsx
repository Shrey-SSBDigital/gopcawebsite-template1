import React, { useState } from 'react';
import { FAQS } from '../data/defaultData';
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQPage() {
  const [openId, setOpenId] = useState('faq-1');

  const toggleAccordion = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Clear Guidance & Standards</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Statutory guidance on conversion timelines, grower group mechanisms, lab multi-residue checks, and APEDA Tracenet verification.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-[3px] border border-[#EAE6DE] shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-editorial text-xl text-[#C49A5A] font-normal flex-shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#18221D] leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-1 rounded text-[#7A8680] flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#C49A5A]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4E5B53] leading-relaxed border-t border-[#EAE6DE] bg-[#FAF8F5]">
                    <p className="pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-full border border-[#EAE6DE] bg-[#FAF8F5] text-[#1B3E2B] flex items-center justify-center mx-auto">
            <MessageCircle className="w-5 h-5 text-[#C49A5A]" />
          </div>
          <h3 className="font-editorial text-2xl text-[#18221D]">
            Have a specific technical or legal inquiry?
          </h3>
          <p className="text-xs sm:text-sm text-[#5B6760] max-w-xl mx-auto">
            Our technical scrutiny officers and auditor cadre are stationed at Beej Pramanan Bhavan, Ahmedabad to assist farmers, FPO federations, and exporters.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="btn-lapland"
            >
              <span>Contact Secretariat Directly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
