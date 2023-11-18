import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = (props) => {
  const { language, setLanguage, toggleSidebar } = props;
  const navigate = useNavigate();
  const linkStyle = 'pr-4 inline-block hover:underline underline-offset-4';

  const handleLogout = async () => {
    await axios.get('/api/auth/logout');
    navigate('/login');
  };
  return (
    <div className="sticky top-0 flex place-content-between m-auto w-full border-b px-4 py-4 bg-white ">
      <div>
        <Link to={'/search'} className={linkStyle}>
          Search
        </Link>
        <Link to={'/'} className={linkStyle}>
          Vehicle
        </Link>
      </div>
      <button className='btn' onClick={toggleSidebar}>TOGGLE</button>
      <div>
        <button
          className="pr-4 inline-block hover:underline underline-offset-4"
          onClick={() => {
            const newLanguage = !language;
            setLanguage(newLanguage);
            localStorage.setItem('language', newLanguage);
          }}
        >
          {language ? '中文' : 'English'}
        </button>
        <Link to={'/vehicle/new'} className={linkStyle}>
          New
        </Link>
        <button className="btn mx-2" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Navbar;
