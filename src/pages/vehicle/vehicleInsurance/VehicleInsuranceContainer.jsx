import React, { useState } from 'react';
import axios from 'axios';

const VehicleInsuranceContainer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/test', formData);
      alert('Success');
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
    }
  };
  return (
    <div className='box-white'>
      <div className='p-4 border'>
        TESTING FILE UPLOAD
        <form onSubmit={handleSubmit}>
          <label className='m-2'>UPLOAD FILE</label>
          <input type='file' onChange={handleFileChange} />
          <button type={'submit'} className='btn-lte'>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleInsuranceContainer;
