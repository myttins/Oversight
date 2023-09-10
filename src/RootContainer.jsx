import React, { useState } from 'react';
import Toolbar from './Components/Toolbar';
import { Outlet } from 'react-router';

const Root = () => {
  const [english, setEnglish] = useState(true)
  return (
    <div>
      <Toolbar english={english} setEnglish={setEnglish} />
      <Outlet context={[english, setEnglish]} />
    </div>
  );
};

export default Root;
