import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { GUJARAT_DISTRICTS } from '../data/defaultData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export default function ContactPage() {
  const { submitInquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: '',
    category: 'Individual Farmer',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitInquiry(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Agency Secretariat & Head Office</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Contact Secretariat & Head Office
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Reach the Directorate of Organic Certification at Beej Pramanan Bhavan, Ahmedabad for application filings, grievance appeals, or technical guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Secretariat Coordinates Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-white rounded-[3px] p-7 sm:p-8 border border-[#EAE6DE] shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#EAE6DE]">
                <div className="w-11 h-11 rounded-full border border-[#C49A5A]/50 bg-[#FAF8F5] flex items-center justify-center text-[#1B3E2B]">
                  <Building2 className="w-5 h-5 text-[#C49A5A]" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl text-[#18221D]">
                    GOPCA Secretariat
                  </h3>
                  <p className="text-xs text-[#5C6A62]">
                    Government of Gujarat Statutory Body
                  </p>
                </div>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4 text-xs sm:text-sm text-[#4E5B53]">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18221D] block mb-0.5 font-medium">Physical Postal Address:</strong>
                    <p className="leading-relaxed">
                      Gujarat Organic Products Certification Agency (GOPCA),<br />
                      <strong>"Beej Pramanan Bhavan"</strong>,<br />
                      Opp. Gokul Row Houses, Shyamal Cross Road, Satellite,<br />
                      Ahmedabad - 380015, Gujarat, India.
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 pt-3 border-t border-[#EAE6DE]">
                  <Phone className="w-4 h-4 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18221D] block mb-0.5 font-medium">Telephone & Inquiries:</strong>
                    <a href="tel:07926740031" className="hover:text-[#1B3E2B] font-semibold block text-[#18221D]">
                      079-26740031
                    </a>
                    <span className="text-xs text-[#6E7B74]">
                      Emergency Helpline: <strong>+91 79 2325 3855</strong>
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 pt-3 border-t border-[#EAE6DE]">
                  <Mail className="w-4 h-4 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18221D] block mb-0.5 font-medium">Official Secretariat Email:</strong>
                    <a href="mailto:dirgopca@gmail.com" className="hover:text-[#18221D] font-medium text-[#8C6221]">
                      dirgopca@gmail.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 pt-3 border-t border-[#EAE6DE]">
                  <Clock className="w-4 h-4 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#18221D] block mb-0.5 font-medium">Office Timings:</strong>
                    <p className="text-xs text-[#525E57] leading-relaxed">
                      Monday to Saturday: <strong>10:30 AM to 6:10 PM</strong><br />
                      <span className="text-red-800">Closed on 2nd & 4th Saturdays and Public Holidays.</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Grievance note */}
            <div className="bg-white p-5 rounded-[3px] border border-[#EAE6DE] text-xs text-[#525E57] space-y-1.5">
              <span className="font-semibold text-[#18221D] uppercase tracking-wider text-[11px] block">
                Statutory Public Grievance Officer:
              </span>
              <p>
                Under NPOP Clause 4.8 and ISO/IEC 17065 Clause 7.13, any appeal or non-compliance dispute must be lodged within 30 days of committee resolution to the Director & Member Secretary.
              </p>
            </div>

          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-[3px] p-7 sm:p-10 border border-[#EAE6DE] shadow-sm">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#18221D] mb-1">
              Start a conversation.
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6760] mb-6">
              Submit your certification inquiry directly to the registration cell.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF8F5] rounded-[3px] border border-[#D5D0C6] space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#1B3E2B] mx-auto" />
                <h4 className="font-editorial text-xl text-[#18221D]">
                  Inquiry registered successfully.
                </h4>
                <p className="text-xs sm:text-sm text-[#525E57] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been registered in the GOPCA Secretariat system. Our inspection cell will contact you at <strong>{formData.phone}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        district: '',
                        category: 'Individual Farmer',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="btn-lapland text-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                
                <div>
                  <label className="block font-medium text-[#18221D] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Shri Rajeshbhai K. Patel"
                    className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#18221D] mb-1">
                      Contact Phone (Mobile) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., +91 98250 XXXXX"
                      className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#18221D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., farmer@domain.com"
                      className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#18221D] mb-1">
                      District in Gujarat *
                    </label>
                    <select
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white cursor-pointer"
                    >
                      <option value="">Select District (All 33)</option>
                      {GUJARAT_DISTRICTS.filter(d => d !== 'All').map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#18221D] mb-1">
                      Operator Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white cursor-pointer"
                    >
                      <option value="Individual Farmer">Individual Farmer (≤10 Ha)</option>
                      <option value="Grower Group (ICS)">Grower Group (ICS FPO / Co-op)</option>
                      <option value="Commercial Estate">Commercial Large Estate (&gt;10 Ha)</option>
                      <option value="Input Manufacturer">Agricultural Bio-Input Manufacturer</option>
                      <option value="Processing Unit">Organic Packhouse / Processing Unit</option>
                      <option value="Wild Harvest">Wild Harvest / Tribal Collection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#18221D] mb-1">
                    Inquiry Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Fresh Form A application for Banaskantha Isabgol"
                    className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#18221D] mb-1">
                    Detailed Message / Farm Survey Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on your survey numbers 7/12, crops, hectarage, or specific technical question..."
                    className="w-full py-2.5 px-3.5 border border-[#D5D0C6] rounded-[2px] focus:border-[#1B3E2B] focus:outline-none text-xs sm:text-sm bg-white"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-lapland text-xs py-3.5 justify-center"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C49A5A]" />
                    <span>{isSubmitting ? 'Logging Inquiry...' : 'Submit Inquiry to Secretariat'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
