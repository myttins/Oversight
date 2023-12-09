import React, { useState } from 'react';
import FormElement from '../../../util/FormElement';
import { useNavigate, useParams } from 'react-router';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import axios from 'axios';

const AddVehicleFile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileInfo, setFileInfo] = useState({ label: 1 });
  const [selectedFile, setSelectedFile] = useState(null);

  const { showBanner } = useMessageBanner();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    if (!selectedFile || !fileInfo.label) {
      showBanner({ style: 'error', message: 'Invalid input' });
      return;
    }

    const formData = new FormData();
    for (const key in fileInfo) {
      formData.append(key, fileInfo[key]);
    }

    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`/api/vehicle/${id}/files`, formData);
      showBanner({ style: 'success', message: 'File saved' });
      navigate(`/vehicle/${id}/files`);
    } catch (error) {
      console.error(error);
      showBanner({ style: 'error' });
    }
    return;
  };

  return (
    <div className='box-white'>
      <header>
        <h1>ADD FILE</h1>
      </header>
      <div>
        <FormElement label={'label'} type='text' readOnly={false} formInfo={fileInfo} setFormInfo={setFileInfo} />
        <FormElement
          label={'category'}
          type='dropdown'
          options={[
            { label: 'DOCUMENTS', value: 'DOCUMENTS' },
            { label: 'CLAIMS', value: 'CLAIMS' },
            { label: 'OTHER', value: 'OTHER' },
          ]}
          readOnly={false}
          formInfo={fileInfo}
          setFormInfo={setFileInfo}
        />
        <div className='flex my-2'>
          <label htmlFor={'file'} className='w-1/3'>
            FILE
          </label>
          <input type='file' onChange={handleFileChange} />
        </div>
      </div>
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

export default AddVehicleFile;
