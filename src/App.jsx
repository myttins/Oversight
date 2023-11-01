import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

const App = () => {
    const [language, setLanguage] = useState(true)

  return (
    <div className="px-6 min-w-[448px] max-w-5xl m-auto">
      <Navbar language={language} setLanguage={setLanguage}/>
      <Outlet context={[language, setLanguage]}/>
    </div>
  );
};

export default App;
