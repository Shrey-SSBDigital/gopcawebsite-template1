import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AboutSubNav() {
  const tabs = [
    { name: 'About Us & Mandate', path: '/about' },
    { name: 'Apex Governing Board', path: '/governing-board' },
    { name: 'Personnel & Auditors Cadre', path: '/personnel' },
    { name: 'Quality Policy & Impartiality', path: '/policy' },
    { name: 'NPOP Accreditation', path: '/accreditation' },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] border-b border-[#EAE6DE] py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-start overflow-x-auto space-x-1 sm:space-x-2 scrollbar-none py-1 text-xs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `whitespace-nowrap px-4 py-1.5 rounded-[2px] transition-all font-medium ${
                isActive
                  ? 'bg-[#1B3E2B] text-white shadow-sm'
                  : 'text-[#48564E] hover:text-[#18221D] hover:bg-[#EFECE5]'
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
