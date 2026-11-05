import React from 'react';
import AboutSubNav from '../components/AboutSubNav';
import { 
  ShieldCheck, 
  Scale, 
  Lock, 
  CheckCircle2, 
  Quote, 
  AlertCircle
} from 'lucide-react';

export default function QualityPolicyPage() {
  const commitments = [
    {
      title: 'Impartiality & Independence',
      desc: 'Certification decisions are strictly separated from commercial, financial, or political pressures. GOPCA operates an autonomous Statutory Certification Committee that reviews dossiers anonymously without executive interference.',
      icon: Scale,
      points: [
        'Zero financial stake in certified operator revenues',
        'Independent multi-member decision committee',
        'Annual impartiality risk analysis audits'
      ]
    },
    {
      title: 'Non-Discrimination & Open Access',
      desc: 'Certification services are accessible to all agricultural producers across Gujarat regardless of farm acreage, cooperative affiliation, political association, or prior certification history.',
      icon: ShieldCheck,
      points: [
        'Equal fee scale for marginal, small, and large farmers',
        'No discriminatory geographical boundaries within Gujarat',
        'Universal access to appeal and grievance machinery'
      ]
    },
    {
      title: 'Conflict of Interest Prohibition',
      desc: 'All inspectors, lead auditors, and committee scientists sign legally binding declarations prohibiting consultancy, advisory work, or input supply to any operator they audit.',
      icon: AlertCircle,
      points: [
        'Mandatory 24-month cooling-off period for former advisors',
        'Rotational auditor assignment across agricultural zones',
        'Immediate disqualification for undisclosed relationships'
      ]
    },
    {
      title: 'Confidentiality & Proprietary Protection',
      desc: 'Commercial trade records, farm diary ledgers, proprietary input formulations, and sensitive revenue records are strictly protected under statutory confidentiality covenants.',
      icon: Lock,
      points: [
        'Secure APEDA Tracenet encrypted document custody',
        'Staff legally bound under Official Secrets provisions',
        'Transparency limited to statutory registry validity'
      ]
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
              <span>Statutory Quality Charter</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
              Quality Policy & Impartiality
            </h1>
            <p className="text-sm sm:text-base text-[#D0E2D7] leading-relaxed max-w-2xl">
              Our sovereign commitments to absolute impartiality, ethical audit governance, and unwavering ecological verification under ISO/IEC 17065.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Governing Board Resolution Quote */}
        <section className="bg-[#163A2B] rounded-[3px] p-8 sm:p-12 text-white shadow-md relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full border border-[#C49A5A]/50 flex items-center justify-center text-[#C49A5A]">
              <Quote className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B57E]">
              Governing Board Resolution No. 04/2014
            </p>
            <blockquote className="font-editorial text-xl sm:text-2xl md:text-3xl font-normal italic text-white leading-relaxed">
              “GOPCA is committed to an aggressive and dedicated approach toward quality, consumer confidence, and customer satisfaction. Quality is considered our core organizational strategy for sustainable growth and ecological integrity.”
            </blockquote>
            <div className="pt-2 text-xs text-[#CBD8D1] font-medium">
              — Resolution of the Apex Governing Board, Gandhinagar
            </div>
          </div>
        </section>

        {/* Sovereign Commitments to Impartiality */}
        <section className="space-y-8">
          <div>
            <div className="lapland-subtitle mb-2">
              ISO/IEC 17065 Mandates
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#18221D]">
              Sovereign commitments to impartiality.
            </h2>
            <p className="mt-1 text-sm text-[#5A6860]">
              Rigorous institutional checks ensuring every audit report and certificate is uncompromised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-[3px] p-7 border border-[#EAE6DE] shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[2px] bg-[#FAF8F5] border border-[#EAE6DE] flex items-center justify-center text-[#1B3E2B]">
                        <Icon className="w-4 h-4 text-[#1B3E2B]" />
                      </div>
                      <h3 className="font-editorial text-xl text-[#18221D]">
                        {c.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4E5B53] leading-relaxed">
                      {c.desc}
                    </p>

                    <div className="pt-3 space-y-2 border-t border-[#EAE6DE]">
                      {c.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#2A3730]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A5A] flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Impartiality Committee Structure Card */}
        <section className="bg-white rounded-[3px] p-8 border border-[#EAE6DE] shadow-sm space-y-3">
          <h3 className="font-editorial text-2xl text-[#18221D]">
            Impartiality Committee Structure & Surveillance
          </h3>
          <p className="text-xs sm:text-sm text-[#4E5B53] leading-relaxed">
            In compliance with Clause 5.2 of ISO/IEC 17065:2012, GOPCA maintains an independent Impartiality Committee consisting of university scientists, organic consumer representatives, and agricultural legal experts. This committee possesses full authority to inspect audit dossiers, examine financial records, investigate stakeholder complaints, and report any compromise directly to the National Accreditation Body (NAB / APEDA).
          </p>
        </section>

      </div>
    </div>
  );
}
