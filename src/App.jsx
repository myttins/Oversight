import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import Navbar from './util/navbars/Navbar';
import Sidebar from './util/navbars/Sidebar';

const App = () => {
  const [language, setLanguage] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

  const navigate = useNavigate();

  // Handles dynamic sidebar visibility
  // useEffect(() => {
  //   const handleResize = () => {
  //     setSidebarVisible(window.innerWidth > 768);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching data:', err);
        }
      }
    };

    fetchAuth();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={sidebarVisible} />
        <main
          className={`relative overflow-auto transition-all duration-300 p-4 min-w-[576px] max-w-[1200px] ${
            sidebarVisible ? 'ml-64' : 'ml-0'
          }`}
        >
          <Outlet context={{ language }} />
        </main>
      </div>
    </div>
  );
};

export default App;
