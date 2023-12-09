import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLogin } from '../../contexts/LoginContext';
import { MessageBanner, useMessageBanner } from '../../contexts/MessageBannerContext';

const Navbar = ({ toggleSidebar }) => {
  const { language, setLanguage } = useLanguage();
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { showBanner } = useMessageBanner();

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
    } catch (error) {
      console.error(error);
    }
    setIsLoggedIn(false);
  };
  return (
    <div className='sticky top-0 z-50'>
      <div className='z-50 relative flex place-content-between items-center m-auto w-full border-b p-4 bg-white h-[55px]'>
        <div className='flex'>
          <ButtonWithIcon alt={'menu'} icon={MenuIcon} onClick={toggleSidebar} />
          <h1 className='mx-4'>YINGBIN</h1>
        </div>
        <div>
          <button
            className='pr-4 inline-block hover:underline underline-offset-4'
            onClick={() => {
              const newLanguage = !language;
              setLanguage(newLanguage);
              localStorage.setItem('language', newLanguage);
            }}
          >
            {language ? '中文' : 'English'}
          </button>
          <button className='btn mx-2' onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
      <MessageBanner />
    </div>
  );
};

export default Navbar;
