import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="px-6 min-w-[448px] max-w-5xl m-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
