import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import MenuIcon from '../../assets/icons/menu_icon.svg';

const Navbar = (props) => {
  const { language, setLanguage, toggleSidebar } = props;
  const navigate = useNavigate();
  const linkStyle = 'pr-4 inline-block hover:underline underline-offset-4';

  const handleLogout = async () => {
    await axios.get('/api/auth/logout');
    navigate('/login');
  };
  return (
    <div className="z-10 sticky top-0 flex place-content-between align-middle m-auto w-full border-b p-4 bg-white ">
      <div className="flex align-middle">
        <ButtonWithIcon alt={'menu'} icon={MenuIcon} onClick={toggleSidebar} />
        <Link to={'/'}>
          <h1 className="mx-4">YINGBIN</h1>
        </Link>
      </div>
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
        <button className="btn mx-2" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Navbar;
