import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLogin } from '../../contexts/LoginContext';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const handleLogout = async () => {
    await axios.get('/api/auth/logout');
    setIsLoggedIn(false);
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
