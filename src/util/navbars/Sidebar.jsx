import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from '../../assets/icons/nav-arrow-down.svg';

const StyledLink = ({ to, children }) => (
  <Link to={to} className="block px-3 py-1 rounded-md  hover:bg-zinc-100">
    {children}
  </Link>
);

const StyledTitle = ({ toggle, isOpen, children }) => (
  <div
    className="flex items-center justify-between cursor-pointer px-3 py-1 rounded-md hover:bg-zinc-100"
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
      } transition-transform ease-in-out duration-300 bg-zinc-200 p-2 w-64 overflow-auto`}
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
          <StyledLink to={'/vehicle/1'}>TEST</StyledLink>
          <StyledLink to={'/vehicle/search'}>SEARCH</StyledLink>
          <StyledLink to={'/vehicle/all'}>ALL VEHICLES</StyledLink>
          <StyledLink to={'/vehicle/new'}>ADD NEW</StyledLink>
        </div>
        {/* TODO: PEOPLE CATEGORY */}
        {/* <StyledTitle
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
        </div> */}
        <StyledTitle
          toggle={() => toggleCategory('payments')}
          isOpen={openCategory['payments']}
        >
          PAYMENTS
        </StyledTitle>
        <div
          className={`pl-4 transition-all duration-300 ease-in-out ${
            openCategory['payments'] ? 'max-h-40' : 'max-h-0'
          } overflow-hidden`}
        >
          <StyledLink to={'/payments/all'}>ALL PAYMENTS</StyledLink>
          <StyledLink to={'/payments/schedules/new'}>NEW FEE SCHEDULE</StyledLink>
          <StyledLink to={'/payments/schedules'}>ALL SCHEDULES</StyledLink>
        </div>
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
