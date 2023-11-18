import React from 'react';

const Sidebar = ({ isVisible }) => {
  return (
    <div
      className={`fixed h-full z-10 transform ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } transition-transform ease-in-out duration-300 bg-slate-200 p-5 w-64 overflow-auto`}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
