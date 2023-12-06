import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useMessageBanner } from '../../contexts/MessageBannerContext';
import AvatarManager from './AvatarManager';
import { useAxios } from '../../hooks/useAxios';

const Person = () => {
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [personInfo, setPersonInfo] = useState({});

  const { fetchData, loading } = useAxios();

  const handleUpdatePerson = async () => {
    try {
    } catch (error) {
      // showBanner({style: 'error', message: axios.isAxiosError(error) ? error.})
    }
  };

  // http://localhost:8080/person/1
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData(`/api/people/${id}?type=header`, { method: 'get' });
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
          <button className='btn'>EDIT</button>
          <AvatarManager path={personInfo.photo} />
          <span className='text-color-light1'>ID: {personInfo.id_no}</span>

          <h1>{personInfo.name}</h1>
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
