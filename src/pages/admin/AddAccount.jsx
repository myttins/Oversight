import React from 'react';
import { useNavigate } from 'react-router';

const AddAccount = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {};
  return (
    <div className='box-white'>
      <header>
        <h2>ADD ACCOUNT</h2>
      </header>
      <div className='flex justify-end'>
        <button className='btn-lte mx-2' onClick={() => navigate(-1)}>
          CANCEL
        </button>
        <button className='btn' onClick={handleSubmit}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default AddAccount;
