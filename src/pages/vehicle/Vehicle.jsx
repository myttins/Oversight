import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { useMessageBanner } from '../../contexts/MessageBannerContext';

import axios from 'axios';
import Loading from '../../util/Loading';

const Vehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { showBanner } = useMessageBanner();
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndStoreState = async () => {
      try {
        const response = await axios.get(`/api/vehicle/${id}`);
        setVehicle(response.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        showBanner({ style: 'error', message: error.response.data.message });
      }
    };
    fetchDataAndStoreState();
  }, [id]);

  return (
    <div>
      <div className='p-4 bg-white '>
        {loading ? (
          <Loading />
        ) : (
          <>
            <header className='align-middle flex items-center py-6 px-4'>
              <h1>
                <span>吉</span>
                <span className='text-base mr-2'>A</span>
                {vehicle.plate}
              </h1>
              {vehicle.active ? (
                <div className='text-sm font-bold py-1 px-2 mx-4 rounded text-white bg-green-500'>ACTIVE</div>
              ) : (
                <div className='text-sm font-bold py-1 px-2 mx-4 rounded text-white bg-red-500'>INACTIVE</div>
              )}
            </header>
            <div className='my-2 text-zinc-500'>ACTIVATION DATE: {vehicle.activation_date}</div>
            <button className='btn' onClick={() => navigate(`/vehicle/${id}/info`)}>
              INFO
            </button>
            <button className='btn ml-2' onClick={() => navigate(`/vehicle/${id}/payments`)}>
              PAYMENTS
            </button>
            <button className='btn ml-2'>
              INSURANCE
            </button>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Vehicle;
