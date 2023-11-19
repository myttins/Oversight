import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledLink = ({ to, children }) => (
  <Link to={to} className="block py-1 hover:text-gray-300">
    {children}
  </Link>
);

const Sidebar = ({ isVisible }) => {
  const [openCategory, setOpenCategory] = useState({});

  const toggleCategory = (category) => {
    setOpenCategory((prev) => ({ ...prev, [category]: !prev[category] }));
  };
  return (
    <aside
      className={`fixed h-full transform ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } transition-transform ease-in-out duration-300 bg-slate-200 p-5 w-64 overflow-auto`}
    >
      <div className="mb-4">
        <StyledLink to={'/'}>DASHBOARD</StyledLink>
        <StyledLink to={'/search'}>SEARCH</StyledLink>
        <p
          className="cursor-pointer py-2"
          onClick={() => toggleCategory('vehicles')}
        >
          VEHICLES
        </p>
        <div
          className={`pl-4 transition-all duration-300 ease-in-out ${
            openCategory['vehicles'] ? 'max-h-40' : 'max-h-0'
          } overflow-hidden`}
        >
          <StyledLink to={'/vehicle'}>ALL VEHICLES</StyledLink>
          <StyledLink to={'/vehicle/new'}>ADD NEW</StyledLink>
        </div>
        <p>TRANSACTIONS</p>
        <p>REPORTS</p>
        <p>INFO</p>
        <p
          className="cursor-pointer py-2"
          onClick={() => toggleCategory('admin')}
        >
          ADMIN
        </p>
        <div
          className={`pl-4 transition-all duration-300 ease-in-out ${
            openCategory['admin'] ? 'max-h-40' : 'max-h-0'
          } overflow-hidden`}
        >
          <StyledLink to={''}>ACCOUNTS</StyledLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
