import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from '../../assets/icons/nav-arrow-down.svg';

const StyledLink = ({ to, children }) => (
  <Link to={to} className="block py-1 hover:text-gray-300">
    {children}
  </Link>
);

const StyledTitle = ({ toggle, isOpen, children }) => (
  <div
    className="flex items-center justify-between cursor-pointer py-1"
    onClick={toggle}
  >
    <p>{children}</p>
    <img
      className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
      src={arrowIcon}
      alt={'expand / collapse'}
    ></img>
  </div>
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

        <StyledTitle
          toggle={() => toggleCategory('vehicles')}
          isOpen={openCategory['vehicles']}
        >
          VEHICLES
        </StyledTitle>
        <div
          className={`pl-4 transition-all duration-300 ease-in-out ${
            openCategory['vehicles'] ? 'max-h-40' : 'max-h-0'
          } overflow-hidden`}
        >
          <StyledLink to={'/vehicle/search'}>SEARCH</StyledLink>
          <StyledLink to={'/vehicle'}>ALL VEHICLES</StyledLink>
          <StyledLink to={'/vehicle/new'}>ADD NEW</StyledLink>
        </div>

        <StyledTitle
          toggle={() => toggleCategory('people')}
          isOpen={openCategory['people']}
        >
          PEOPLE
        </StyledTitle>
        <div
          className={`pl-4 transition-all duration-300 ease-in-out ${
            openCategory['people'] ? 'max-h-40' : 'max-h-0'
          } overflow-hidden`}
        >
          <StyledLink to={''}>ALL PEOPLE</StyledLink>
          <StyledLink to={''}>SEARCH</StyledLink>
          <StyledLink to={'/person/new'}>ADD NEW</StyledLink>
        </div>

        <StyledLink to={''}>TRANSACTIONS</StyledLink>
        <StyledTitle
          toggle={() => toggleCategory('admin')}
          isOpen={openCategory['admin']}
        >
          ADMIN
        </StyledTitle>
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
