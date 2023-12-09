import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router';
import { MessageBannerContext } from '../../contexts/MessageBannerContext';

export const VehicleRow = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full cursor-pointer py-2 hover:bg-zinc-100"
      onClick={() => navigate(`/vehicle/${data.id}`)}
    >
      <a className="w-1/6">{data.plate}</a>
      <a className="w-2/6">{data.owner_name}</a>
      <a className="w-3/6">{data.driver_name}</a>
    </div>
  );
};

export const AllVehicles = () => {
  const [vehicleRows, setVehicleRows] = useState([]);

  const { showBanner } = useContext(MessageBannerContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/vehicle');
        setVehicleRows(response.data);
      } catch (error) {
        showBanner({ style: 'error', message: error.response.data.message });
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="box-white">
      <h1>ALL VEHICLES</h1>
      <div className="mt-6 flex w-full border-b-2">
        <a className="w-1/6">PLATE</a>
        <a className="w-2/6">OWNER</a>
        <a className="w-3/6">DRIVER</a>
      </div>
      <div>
        {vehicleRows.map((data, index) => {
          return <VehicleRow key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
};
