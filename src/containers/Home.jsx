import React, { useEffect, useState } from 'react';
import axios from 'axios';

import VehicleRow from '../pages/vehicle/components/VehicleRow';

const Home = () => {
  const [vehicleRows, setVehicleRows] = useState([]);
  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchData = async () => {
    const response = await axios.get('/api/vehicle');
    setVehicleRows(response.data);
  };

  return (
    <div>
      <h1 className="mt-6 text-2xl">Vehicle</h1>
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

export default Home;
