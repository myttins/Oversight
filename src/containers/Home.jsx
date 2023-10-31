import React, { useEffect, useState } from 'react';
import VehicleRow from '../components/VehicleRow';

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
    const response = await fetch('http://localhost:3000/vehicle');
    const data = await response.json();
    setVehicleRows(data);
  };

  return (
    <div>
      <h1 className="mt-6 text-2xl">Vehicle</h1>
      <div className="mt-6 flex w-full border-b-2">
        <a className="w-2/6">Plate</a>
        <a className="w-4/6">Drivers</a>
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