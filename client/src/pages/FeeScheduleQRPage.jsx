import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Building, 
  Calculator, 
  Check, 
  Copy, 
  AlertCircle
} from 'lucide-react';

export default function FeeScheduleQRPage() {
  const [copiedField, setCopiedField] = useState(null);

  // Calculator State
  const [operatorType, setOperatorType] = useState('individual');
  const [hectarage, setHectarage] = useState(2.0);

  // Fee calculation logic
  const calculateFees = () => {
    let scrutiny = 1500;
    let inspection = 3000;

    if (operatorType === 'individual') {
      if (hectarage <= 2.0) {
        scrutiny = 1500;
        inspection = 3000;
      } else if (hectarage <= 10.0) {
        scrutiny = 2500;
        inspection = 5000;
      } else {
        scrutiny = 4000;
        inspection = 8000;
      }
    } else if (operatorType === 'ics') {
      scrutiny = 5000;
      inspection = 7000;
    } else if (operatorType === 'processing') {
      scrutiny = 6000;
      inspection = 10000;
    } else if (operatorType === 'input') {
      scrutiny = 7500;
      inspection = 12000;
    }

    const subtotal = scrutiny + inspection;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    return { scrutiny, inspection, subtotal, gst, total };
  };

  const fees = calculateFees();

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const scheduleData = [
    {
      category: 'Individual Farmers (≤2 Hectares)',
      scrutiny: '₹1,500',
      inspection: '₹3,000',
      subtotal: '₹4,500',
      gst: '18% (₹810)',
      total: '₹5,310',
      note: 'Subsidised tariff for small and marginal landholders'
    },
    {
      category: 'Individual Farmers (2.1 to 10 Hectares)',
      scrutiny: '₹2,500',
      inspection: '₹5,000',
      subtotal: '₹7,500',
      gst: '18% (₹1,350)',
      total: '₹8,850',
      note: 'Medium farmers with contiguous or scattered parcels'
    },
    {
      category: 'Large Estates (>10 Hectares)',
      scrutiny: '₹4,000',
      inspection: '₹8,000',
      subtotal: '₹12,000',
      gst: '18% (₹2,160)',
      total: '₹14,160',
      note: 'Commercial agricultural estates and institutional holdings'
    },
    {
      category: 'Grower Groups / ICS (up to 500 farmers)',
      scrutiny: '₹5,000',
      inspection: '₹7,000',
      subtotal: '₹12,000',
      gst: '18% (₹2,160)',
      total: '₹14,160',
      note: 'Farmer Producer Organizations (FPOs) & Co-operatives'
    },
    {
      category: 'Processing Units / Packhouses',
      scrutiny: '₹6,000',
      inspection: '₹10,000',
      subtotal: '₹16,000',
      gst: '18% (₹2,880)',
      total: '₹18,880',
      note: 'Grading, packing, milling, and spice extraction facilities'
    },
    {
      category: 'Agricultural Input Manufacturers',
      scrutiny: '₹7,500',
      inspection: '₹12,000',
      subtotal: '₹19,500',
      gst: '18% (₹3,510)',
      total: '₹23,010',
      note: 'Vermicompost, microbial bio-fertilizers & botanical inputs'
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#18221D]">
      
      {/* Page Header */}
      <section className="bg-[#163A2B] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#23503B]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              <span className="w-5 h-[1.5px] bg-[#C49A5A]"></span>
              <span>Government Gazetted Tariffs</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Fee Schedule & Bharat QR
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Official statutory tariff structure, State Bank of India account credentials, and Bharat QR digital remittance portal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Top Split: Bharat QR Code + SBI Bank Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bharat QR Code Card */}
          <div className="lg:col-span-5 bg-white rounded-[3px] p-7 border border-[#EAE6DE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE6DE]">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-[#C49A5A]" />
                  <h3 className="font-editorial text-xl text-[#18221D]">
                    Official Bharat QR Code
                  </h3>
                </div>
                <span className="text-[10px] font-semibold bg-[#FAF4E8] text-[#8C6221] border border-[#EEDDBF] px-2 py-0.5 rounded-[2px]">
                  Instant UPI
                </span>
              </div>

              {/* Graphic QR Card */}
              <div className="my-5 p-5 bg-[#FAF8F5] rounded-[3px] border border-dashed border-[#D5D0C6] flex flex-col items-center text-center">
                <div className="w-44 h-44 bg-white p-3 rounded-[2px] shadow-sm border border-gray-200 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#18221D]">
                    <rect x="0" y="0" width="30" height="30" rx="2" fill="#18221D" />
                    <rect x="5" y="5" width="20" height="20" rx="1" fill="#ffffff" />
                    <rect x="9" y="9" width="12" height="12" fill="#18221D" />

                    <rect x="70" y="0" width="30" height="30" rx="2" fill="#18221D" />
                    <rect x="75" y="5" width="20" height="20" rx="1" fill="#ffffff" />
                    <rect x="79" y="9" width="12" height="12" fill="#18221D" />

                    <rect x="0" y="70" width="30" height="30" rx="2" fill="#18221D" />
                    <rect x="5" y="75" width="20" height="20" rx="1" fill="#ffffff" />
                    <rect x="9" y="79" width="12" height="12" fill="#18221D" />

                    <rect x="36" y="8" width="6" height="6" fill="#18221D" />
                    <rect x="46" y="8" width="8" height="6" fill="#C49A5A" />
                    <rect x="58" y="8" width="6" height="6" fill="#18221D" />

                    <rect x="36" y="20" width="10" height="6" fill="#18221D" />
                    <rect x="52" y="20" width="8" height="8" fill="#18221D" />

                    <rect x="8" y="38" width="6" height="10" fill="#18221D" />
                    <rect x="20" y="38" width="8" height="6" fill="#18221D" />
                    <rect x="34" y="34" width="32" height="32" rx="3" fill="#1B3E2B" />
                    <text x="50" y="54" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">GOPCA</text>
                    <text x="50" y="62" fill="#D8B57E" fontSize="5" fontWeight="bold" textAnchor="middle">BHARAT QR</text>

                    <rect x="72" y="38" width="8" height="8" fill="#18221D" />
                    <rect x="84" y="38" width="8" height="12" fill="#18221D" />

                    <rect x="36" y="72" width="8" height="6" fill="#18221D" />
                    <rect x="48" y="72" width="6" height="12" fill="#C49A5A" />
                    <rect x="58" y="72" width="8" height="8" fill="#18221D" />
                    <rect x="72" y="72" width="10" height="8" fill="#18221D" />
                    <rect x="86" y="72" width="6" height="16" fill="#18221D" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-[#18221D] mt-3">
                  Scan with any UPI / Banking App
                </p>
                <p className="text-[11px] text-[#69766F]">
                  BHIM, Google Pay, PhonePe, Paytm, SBI Yono
                </p>
              </div>

              {/* Instructions */}
              <div className="space-y-1.5 text-xs text-[#525E57]">
                <p className="font-semibold text-[#18221D] text-[11px] uppercase tracking-wider">Instructions:</p>
                <p>1. Open your UPI app and scan the Bharat QR code above.</p>
                <p>2. Enter exact fee amount cited on your official Inspection Estimate.</p>
                <p>3. In remarks, enter: <code>OP-[NAME]-[DISTRICT]</code>.</p>
                <p>4. Email payment receipt to <code>dirgopca@gmail.com</code>.</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAE6DE] flex items-center justify-between text-[11px] text-[#6E7B74]">
              <span>Accepted: UPI, Net Banking, NEFT/RTGS</span>
              <span className="font-medium text-[#1B3E2B]">Instant Receipt</span>
            </div>
          </div>

          {/* SBI Bank Credentials */}
          <div className="lg:col-span-7 bg-white rounded-[3px] p-7 border border-[#EAE6DE] shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE6DE]">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#C49A5A]" />
                  <h3 className="font-editorial text-xl text-[#18221D]">
                    State Bank of India (SBI) Credentials
                  </h3>
                </div>
                <span className="text-[10px] font-semibold bg-[#EBF3ED] text-[#1B3E2B] border border-[#D0E2D5] px-2 py-0.5 rounded-[2px]">
                  Official Account
                </span>
              </div>

              <p className="text-xs text-[#525E57] leading-relaxed">
                For NEFT, RTGS, and direct branch remittances, operators must transfer funds to GOPCA’s statutory current account maintained with State Bank of India.
              </p>

              {/* Account Details Box */}
              <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-[2px] border border-[#EAE6DE] text-xs sm:text-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EAE6DE]">
                  <span className="text-[#6E7B74] font-medium text-xs">Account Name:</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-[#18221D]">Gujarat Organic Products Certification Agency (GOPCA)</strong>
                    <button 
                      onClick={() => handleCopy('Gujarat Organic Products Certification Agency (GOPCA)', 'name')}
                      className="text-[#6E7B74] hover:text-[#18221D] p-1"
                      title="Copy Name"
                    >
                      {copiedField === 'name' ? <Check className="w-3.5 h-3.5 text-[#1B3E2B]" /> : <Copy className="w-3.5 h-3.5 text-[#C49A5A]" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EAE6DE]">
                  <span className="text-[#6E7B74] font-medium text-xs">Bank Name:</span>
                  <strong className="text-[#18221D]">State Bank of India (SBI)</strong>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EAE6DE]">
                  <span className="text-[#6E7B74] font-medium text-xs">Branch:</span>
                  <span className="text-[#18221D]">Shyamal Cross Road, Satellite, Ahmedabad - 380015</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EAE6DE]">
                  <span className="text-[#6E7B74] font-medium text-xs">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-[#18221D] font-mono font-bold text-base tracking-wider">31245678901</strong>
                    <button 
                      onClick={() => handleCopy('31245678901', 'acc')}
                      className="text-[#6E7B74] hover:text-[#18221D] p-1"
                      title="Copy Account Number"
                    >
                      {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-[#1B3E2B]" /> : <Copy className="w-3.5 h-3.5 text-[#C49A5A]" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EAE6DE]">
                  <span className="text-[#6E7B74] font-medium text-xs">IFSC Code:</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-[#8C6221] font-mono font-bold text-base tracking-wider">SBIN0011748</strong>
                    <button 
                      onClick={() => handleCopy('SBIN0011748', 'ifsc')}
                      className="text-[#6E7B74] hover:text-[#18221D] p-1"
                      title="Copy IFSC Code"
                    >
                      {copiedField === 'ifsc' ? <Check className="w-3.5 h-3.5 text-[#1B3E2B]" /> : <Copy className="w-3.5 h-3.5 text-[#C49A5A]" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[#6E7B74] font-medium text-xs">Account Type:</span>
                  <strong className="text-[#18221D]">Current Account</strong>
                </div>

              </div>
            </div>

            <div className="mt-4 p-3 bg-[#FAF4E8] rounded-[2px] border border-[#EEDDBF] text-xs text-[#8C6221] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C49A5A]" />
              <span>Please preserve your bank UTR / transaction receipt. The transaction ID must be written on Form A/B during physical submission.</span>
            </div>
          </div>

        </div>

        {/* Interactive Fee Calculator Tool */}
        <section className="bg-white rounded-[3px] p-8 sm:p-10 border border-[#EAE6DE] shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-[2px] bg-[#FAF8F5] text-[#1B3E2B]">
              <Calculator className="w-5 h-5 text-[#C49A5A]" />
            </div>
            <div>
              <h2 className="font-editorial text-3xl text-[#18221D]">
                Interactive certification fee calculator.
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6760]">
                Calculate your exact statutory Scrutiny Fee, Inspection Fee, and 18% GST.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18221D] mb-2">
                  Select Operator Scope / Entity Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'individual', label: 'Individual Farmer' },
                    { id: 'ics', label: 'Grower Group (ICS)' },
                    { id: 'processing', label: 'Packhouse / Mill' },
                    { id: 'input', label: 'Bio-Inputs Mfg' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setOperatorType(tab.id)}
                      className={`p-3 rounded-[2px] border text-center font-medium transition-all ${
                        operatorType === tab.id
                          ? 'bg-[#1B3E2B] text-white border-[#1B3E2B] shadow-sm'
                          : 'bg-white text-[#18221D] border-[#D5D0C6] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {operatorType === 'individual' && (
                <div className="space-y-2 bg-[#FAF8F5] p-5 rounded-[2px] border border-[#EAE6DE]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#18221D] uppercase tracking-wider">
                      Farm Land Hectarage:
                    </label>
                    <span className="font-mono font-bold text-[#18221D] text-base">
                      {hectarage.toFixed(1)} Hectares ({ (hectarage * 2.471).toFixed(1) } Acres)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="25"
                    step="0.5"
                    value={hectarage}
                    onChange={(e) => setHectarage(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#EAE6DE] rounded-lg appearance-none cursor-pointer accent-[#1B3E2B]"
                  />
                  <div className="flex justify-between text-[10px] text-[#69766F]">
                    <span>0.5 Ha (Marginal)</span>
                    <span>2.0 Ha (Subsidised Tier)</span>
                    <span>10.0 Ha (Medium)</span>
                    <span>25.0+ Ha (Estate)</span>
                  </div>
                </div>
              )}

              {operatorType === 'ics' && (
                <div className="bg-[#EBF3ED] p-4 rounded-[2px] border border-[#D0E2D5] text-xs text-[#1B3E2B]">
                  <strong>Grower Group (ICS) Rate:</strong> Covers up to 500 smallholder member farmers under an organized FPO or Co-operative internal control system.
                </div>
              )}
            </div>

            {/* Calculation Output Card */}
            <div className="lg:col-span-5 bg-[#163A2B] text-white p-6 sm:p-7 rounded-[3px] shadow-lg space-y-4">
              <h3 className="font-editorial text-xl text-[#D8B57E] border-b border-[#23503B] pb-2">
                Statutory Fee Breakdown
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-[#D0E0D6]">
                  <span>Dossier Scrutiny Fee:</span>
                  <span className="font-mono font-medium text-white text-sm">₹{fees.scrutiny.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[#D0E0D6]">
                  <span>Physical Field Inspection Fee:</span>
                  <span className="font-mono font-medium text-white text-sm">₹{fees.inspection.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-white pt-1 border-t border-[#23503B] font-semibold">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-white text-sm">₹{fees.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[#D0E0D6]">
                  <span>Statutory GST (18%):</span>
                  <span className="font-mono font-bold text-sm text-[#D8B57E]">+₹{fees.gst.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#23503B] flex justify-between items-center">
                <div>
                  <span className="text-[11px] text-[#D8B57E] uppercase font-semibold tracking-wider block">Total Payable:</span>
                  <span className="text-[10px] text-[#A6C4B5]">(All Statutory Taxes Included)</span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-normal text-[#D8B57E]">
                  ₹{fees.total.toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Statutory Fee Schedule Table */}
        <section className="space-y-6">
          <div>
            <div className="lapland-subtitle mb-2">
              Government Gazetted Tariffs
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
              Official statutory fee tariff matrix.
            </h2>
          </div>

          <div className="w-full bg-white rounded-[3px] border border-[#EAE6DE] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F6F3EC] text-[#34413A] border-b border-[#E5E1D8]">
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Category / Land Holding</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Scrutiny Fee</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Inspection Fee</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Subtotal</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">18% GST</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Total Payable</th>
                    <th className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px]">Applicability Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE5] text-[#2C3831]">
                  {scheduleData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#18221D]">{row.category}</td>
                      <td className="py-3.5 px-4 font-mono">{row.scrutiny}</td>
                      <td className="py-3.5 px-4 font-mono">{row.inspection}</td>
                      <td className="py-3.5 px-4 font-mono font-medium">{row.subtotal}</td>
                      <td className="py-3.5 px-4 font-mono text-[#8C6221]">{row.gst}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#1B3E2B] text-sm">{row.total}</td>
                      <td className="py-3.5 px-4 text-xs text-[#525E57] max-w-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
