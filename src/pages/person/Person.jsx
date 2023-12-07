import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useMessageBanner } from '../../contexts/MessageBannerContext';
import AvatarManager from './AvatarManager';
import { useAxios } from '../../hooks/useAxios';
import ButtonWithIcon from '../../util/buttons/ButtonWithIcon';
import EditIcon from '../../assets/icons/edit.svg';

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

    const response = await fetchData(`/api/people/${id}`, { method: 'patch', data: formData }, false);

    if (response) {
      showBanner({ style: 'success' });
      setEdit(false);
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
        <header className='m-2 relative flex px-4'>
          <div className='absolute right-0 top-0'>
            {edit ? (
              <div>
                <button className='btn-lte mx-2' onClick={() => setEdit(false)}>
                  CANCEL
                </button>
                <button className='btn' onClick={handleUpdatePerson}>
                  SAVE
                </button>
              </div>
            ) : (
              <ButtonWithIcon
                icon={EditIcon}
                onClick={() => {
                  setEdit(true);
                }}
                alt={'edit'}
              />
            )}
          </div>

          <div className='mx-6'>
            <AvatarManager path={personInfo.photo} onFileSelected={handleFileSelected} active={edit} />
          </div>
          <div className=''>
            <span className='text-color-light1 m-2'>ID: {personInfo.id_no}</span>
            {edit ? (
              <div className='flex flex-col'>
                <input
                  className='input text-2xl m-2'
                  type='text'
                  value={personInfo.name}
                  onChange={(e) => setPersonInfo({ ...personInfo, name: e.target.value.toUpperCase() })}
                />
                <input
                  className='input m-2'
                  type='text'
                  value={personInfo.phone_no}
                  onChange={(e) => setPersonInfo({ ...personInfo, phone_no: e.target.value.toUpperCase() })}
                />
              </div>
            ) : (
              <div>
                <h1 className='m-2'>{personInfo.name}</h1>
                <span className='m-2'>{personInfo.phone_no}</span>
              </div>
            )}
          </div>
        </header>
        <div className='mt-6 ml-12'>
          <button className='btn'>INFO</button>
          <button className='btn mx-2'>VEHICLES</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Person;
