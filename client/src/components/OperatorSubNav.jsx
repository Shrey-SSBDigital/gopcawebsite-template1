import React from 'react';
import { NavLink } from 'react-router-dom';

export default function OperatorSubNav() {
  const tabs = [
    { name: 'Active ICS Operators', path: '/operators/active', count: '84+ Groups' },
    { name: 'Grower Group Farmers', path: '/operators/farmers', count: '12,450+ Farmers' },
    { name: 'Suspended Operators', path: '/operators/suspended', count: 'Surveillance' },
    { name: 'Terminated Operators', path: '/operators/terminated', count: 'De-registered' },
    { name: 'Discontinued Operators', path: '/operators/discontinued', count: 'Cessations' },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] border-b border-[#EAE6DE] py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-start overflow-x-auto space-x-1 sm:space-x-2 scrollbar-none py-1 text-xs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `whitespace-nowrap flex items-center gap-2 px-4 py-1.5 rounded-[2px] transition-all font-medium ${
                isActive
                  ? 'bg-[#1B3E2B] text-white shadow-sm'
                  : 'text-[#48564E] hover:text-[#18221D] hover:bg-[#EFECE5]'
              }`
            }
          >
            <span>{tab.name}</span>
            <span className="text-[10px] opacity-75 font-normal px-1.5 py-0.2 bg-black/10 rounded">
              {tab.count}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
