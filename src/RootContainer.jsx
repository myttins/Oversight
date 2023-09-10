import React, { useState } from 'react';
import Toolbar from './Components/Toolbar';
import { Outlet } from 'react-router';

const Root = () => {
  const [state, setState] = useState(1)
  return (
    <div>
      <Toolbar />
      <Outlet context={[state, setState]} />
    </div>
  );
};

export default Root;
