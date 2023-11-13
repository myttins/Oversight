import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Navbar from './util/Navbar';

const App = () => {
  const [language, setLanguage] = useState(true);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('language') === null
      ? setLanguage(true)
      : setLanguage(JSON.parse(localStorage.getItem('language')));

    // const storedToken = localStorage.getItem('token');
    // storedToken === 'password' ? setToken(storedToken) : navigate('/login');
  }, []);

  const validateToken = () => {

    return false;
  }

  return (
    <div className="px-6 min-w-[448px] max-w-5xl m-auto">
      <Navbar language={language} setLanguage={setLanguage} />
      <Outlet context={{ language, token, setToken }} />
    </div>
  );
};

export default App;
