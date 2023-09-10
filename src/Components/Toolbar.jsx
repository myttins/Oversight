import React from 'react';
import { useNavigate } from 'react-router';

const Toolbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="m-2 bg-slate-400" onClick={() => navigate('/vehicle')}>
        /vehicle
      </button>
      <button className="m-2 bg-slate-400" onClick={() => navigate('/home')}>/home</button>
    </div>
  );
};

export default Toolbar;
