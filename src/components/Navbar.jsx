import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = 'pt-4 pr-4 inline-block hover:underline underline-offset-4';
  return (
    <div className="flex place-content-between m-auto max-w-5xl">
      <Link to={'/'} className={linkStyle}>
        Home
      </Link>
      <Link to={'/new'} className={linkStyle}>
        New
      </Link>
    </div>
  );
};

export default Navbar;
