import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from './util/Navbar';

const App = () => {
  const [language, setLanguage] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('language') === null
      ? setLanguage(true)
      : setLanguage(JSON.parse(localStorage.getItem('language')));
  }, []);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await axios.get('/api/auth/');
      } catch (err) {
        if (err.response && err.response.status === 401){
          navigate('/login')
        } else {
          console.error('Error fetching data:', err);
        }
      }
    };

    fetchAuth();
  }, []);

  return (
    <div className="sticky top-0 pb-4 min-w-[448px] max-w-7xl m-auto bg-slate-100 min-h-screen">
      <Navbar language={language} setLanguage={setLanguage} />
      <Outlet context={{ language }} />
    </div>
  );
};

export default App;
