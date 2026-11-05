import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, CheckCircle2, CreditCard } from 'lucide-react';

export default function PreFooter() {
  return (
    <section className="w-full bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#23503B]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Text Callout */}
          <div className="max-w-2xl text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>National Programme for Organic Production</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
              Ready to certify your organic farm<br className="hidden sm:inline" /> or grower group?
            </h2>

            <p className="text-xs sm:text-sm text-[#D2E2D8] leading-relaxed max-w-xl">
              Partner with Gujarat’s apex statutory organic certification agency. We offer transparent 6-stage audit pipelines, subsidised non-profit tariffs for smallholders, and globally recognized Tracenet Scope Certificates.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/certification"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C49A5A] hover:bg-[#B58C4E] text-[#12261D] font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-[2px] transition-all shadow-md"
            >
              <span>Explore 6-Stage Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/fees-qr"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1B3E2B] hover:bg-[#143122] text-white font-medium text-xs tracking-wider uppercase px-6 py-3.5 rounded-[2px] border border-[#3A6B50] transition-all"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#C49A5A]" />
              <span>Fee Schedule & QR</span>
            </Link>

            <a
              href="tel:07926740031"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wider uppercase px-5 py-3.5 rounded-[2px] border border-white/20 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D8B57E]" />
              <span>079-26740031</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
