import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

const App = () => {
  const [language, setLanguage] = useState();

  useEffect(() => {
    if (localStorage.getItem('language') === null) {
      setLanguage(true);
    } else {
      setLanguage(JSON.parse(localStorage.getItem('language')));
    }
  }, []);

  return (
    <div className="px-6 min-w-[448px] max-w-5xl m-auto">
      <Navbar language={language} setLanguage={setLanguage} />
      <Outlet context={[language]} />
    </div>
  );
};

export default App;
