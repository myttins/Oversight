import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { language, setLanguage } = props;
  const linkStyle = 'pt-4 pr-4 inline-block hover:underline underline-offset-4';
  return (
    <div className="flex place-content-between m-auto max-w-5xl">
      <div>
        <Link to={'/search'} className={linkStyle}>
          Search
        </Link>
        <Link to={'/'} className={linkStyle}>
          Vehicle
        </Link>
        {/* <Link to={''} className={linkStyle}>
          Drivers
        </Link>
        <Link to={''} className={linkStyle}>
          Transactions
        </Link> */}
      </div>
      <div>
        <button className="pt-4 pr-4 inline-block hover:underline underline-offset-4" onClick={() => setLanguage(!language)}>
          {language ? 'English' : '中文'}
        </button>
        <Link to={'/vehicle/new'} className={linkStyle}>
          New
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
