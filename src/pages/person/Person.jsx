import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useMessageBanner } from '../../contexts/MessageBannerContext';

const Person = () => {
  const { id } = useParams();
  const {showBanner} = useMessageBanner();
  const [personInfo, setPersonInfo] = useState({});
  const [loading, setLoading] = useState(true)

  const fetchPersonHeaderInfo = async () => {
    try {
      const response = await axios.get(`/api/people/${id}?type=header`)
      setPersonInfo(response.data.person)
      setLoading(false)
    } catch (error) {
      console.error(error)
      showBanner({style: 'error'})
    }
  };

  useEffect(() => {
    fetchPersonHeaderInfo();
  }, [])


  

  if (loading) return;

  return (
    <div>
      <div className='box-white'>
        <header className='m-2'>
          <h1>{personInfo.name}</h1>
          <span>ID: {personInfo.id_no}</span>
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
