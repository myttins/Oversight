import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useMessageBanner } from '../../contexts/MessageBannerContext';
import AvatarManager from './AvatarManager';
import { useAxios } from '../../hooks/useAxios';

const Person = () => {
  const { id } = useParams();

  const { showBanner } = useMessageBanner();

  const [edit, setEdit] = useState(false);
  const [personInfo, setPersonInfo] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);

  const { fetchData, loading } = useAxios();

  const handleUpdatePerson = async () => {
    const formData = new FormData();
    for (const key in personInfo) {
      formData.append(key, personInfo[key]);
    }

    // formData.append('body', { message: 'body' });
    if (uploadedImage) {
      formData.append('image', uploadedImage); // Add the uploaded image to formData
    }

    const response = await fetchData(
      `/api/people/${id}?type=header`,
      {
        method: 'patch',
        data: formData,
      },
      false,
    );

    if (response) {
      console.log(response)
      showBanner({ style: 'success' });
    }
  };

  const handleFileSelected = (file) => {
    setUploadedImage(file);
  };

  // http://localhost:8080/person/1
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData(`/api/people/${id}?type=header`, { method: 'get' }, true);
      if (data) {
        setPersonInfo(data.person);
      }
    };

    fetchDataAndSetState();
  }, []);

  if (loading) return null;

  return (
    <div>
      <div className='box-white'>
        <header className='m-2'>
          <button className='btn' onClick={() => setEdit(!edit)}>
            EDIT
          </button>
          <AvatarManager path={personInfo.photo} onFileSelected={handleFileSelected} active={edit}/>
          <span className='text-color-light1'>ID: {personInfo.id_no}</span>
          {edit ? (
            <input
              className='input'
              type='text'
              value={personInfo.name}
              onChange={(e) => setPersonInfo({ ...personInfo, name: e.target.value })}
            />
          ) : (
            <h1>{personInfo.name}</h1>
          )}
          {edit && (
            <button onClick={handleUpdatePerson} className='btn'>
              SAVE
            </button>
          )}
        </header>
        <div>
          <button className='btn'>INFO</button>
          <button className='btn mx-2'>VEHICLES</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Person;
