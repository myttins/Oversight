import React from 'react';
import Toolbar from './Components/Toolbar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div>
      <Toolbar />
      <Outlet />
    </div>
  );
};

export default Root;
