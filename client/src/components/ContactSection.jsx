import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const { addInquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.message) return;

    addInquiry(formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      contact: '',
      address: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold mb-2">
            Citizen Contact & Grievance Redressal
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#17221A] leading-tight mb-4">
            Directorate Contact & Inquiries
          </h2>
          <p className="text-sm sm:text-base text-[#47544B] leading-relaxed">
            Reach out to our certification officers, technical evaluators, or public grievance redressal cell for guidance on certification dossiers, soil testing, or inspection schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Office Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D37] font-semibold mb-1">
                State Headquarters
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#18231C]">
                Beej Pramanan Bhavan
              </h3>
              <p className="text-xs text-[#5C6B61] mt-1 leading-relaxed">
                Opp. Gokul Row Houses, Shyamal Cross Road, Near Food Corporation of India (FCI), Satellite, Ahmedabad – 380015, Gujarat, India.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#EDE7DC] text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF2ED] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#1B3826]" />
                </div>
                <div>
                  <div className="text-[11px] text-[#78887D] font-medium">Statutory Telephone / Fax</div>
                  <a href="tel:07926740031" className="font-semibold text-[#18231C] text-sm hover:underline">
                    079-26740031
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF2ED] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#1B3826]" />
                </div>
                <div>
                  <div className="text-[11px] text-[#78887D] font-medium">Official Directorate Email</div>
                  <a href="mailto:dirgopca@gmail.com" className="font-semibold text-[#18231C] text-sm hover:underline">
                    dirgopca@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF2ED] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#1B3826]" />
                </div>
                <div>
                  <div className="text-[11px] text-[#78887D] font-medium">Public Office Timings</div>
                  <div className="text-xs text-[#18231C] font-medium">
                    10:30 AM to 06:10 PM
                  </div>
                  <div className="text-[10px] text-[#78887D]">
                    Closed on 2nd & 4th Saturdays, Sundays & Gazetted Holidays
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#DFD8CC] text-xs text-[#526055] space-y-1">
              <div className="font-semibold text-[#1B3826] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8C6D37]" />
                <span>Geographic Navigation Reference</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Located near Shyamal Cross Road in Satellite area, accessible via 132 Feet Ring Road, Ahmedabad.
              </p>
            </div>
          </div>

          {/* Right: Public Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D5CEBF] p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#18231C] mb-1">
              Online Citizen & Farmer Inquiry
            </h3>
            <p className="text-xs text-[#526055] mb-6">
              Submit your inquiry directly to the Directorate. A designated certification officer will respond within standard SLA.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#EAF2ED] rounded-2xl border border-[#CDE0D3] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#1B3826] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#1B3826]">
                  Inquiry Successfully Registered
                </h4>
                <p className="text-xs text-[#3E5545] max-w-md mx-auto leading-relaxed">
                  Thank you. Your inquiry has been routed to the GOPCA Citizen Support & Certification Desk. We will get in touch with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-lg hover:bg-[#132A1C] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#38463D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#38463D] mb-1">
                      Contact Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. 9825012345"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#38463D] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh.patel@gmail.com"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#38463D] mb-1">
                      Village / Taluka / District
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Taluka Veraval, Gir Somnath"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#38463D] mb-1">
                    Inquiry / Grievance Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your farm parcels, crops, grower group formation, or certification inquiry..."
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DFD8CC] rounded-xl text-xs text-[#18231C] focus:outline-none focus:border-[#1B3826]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B3826] rounded-xl hover:bg-[#132A1C] transition-colors shadow-xs"
                >
                  <span>Submit Public Inquiry</span>
                  <Send className="w-3.5 h-3.5 text-[#D4A373]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
