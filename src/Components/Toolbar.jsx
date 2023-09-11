import React from 'react';
import { useNavigate, useOutletContext } from 'react-router';

const Toolbar = (props) => {
  const navigate = useNavigate();
  const { english, setEnglish } = props;

  return (
    <div className="">
      <button
        className="m-2 p-2 bg-slate-400"
        onClick={() => navigate('/home')}
      >
        Home
      </button>
      <button
        className="m-2 p-2 bg-slate-400"
        onClick={() => navigate('/vehicle/1')}
      >
        Vehicle
      </button>
      <button
        className="m-2 p-2 bg-slate-400"
        onClick={() => navigate('/new')}
      >
        New
      </button>
      <button
        className="m-2 p-2 bg-slate-400"
        onClick={() => {
          setEnglish(!english);
        }}
      >
        {english ? 'English' : '中文'}
      </button>
    </div>
  );
};

export default Toolbar;
