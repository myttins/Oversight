import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const VehicleHome = () => {
  const { id } = useParams();
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [driverInfo, setDriverInfo] = useState([]);

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      setVehicleInfo({
        id: null,
        plate: null,
        year: null,
        model: null,
      });
      setDriverInfo([]);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/vehicle/${id}`);
    const data = await response.json();
    setVehicleInfo(data.vehicle);
    setDriverInfo(data.drivers);
    // console.log(data);
  };

  return (
    <div>
      <div>
        <h1 className="mt-6 text-2xl">{vehicleInfo.plate}</h1>
        <span className="mr-2">{vehicleInfo.year}</span>
        <span>{vehicleInfo.model}</span>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Drivers</h1>
        <span className="mr-2">{vehicleInfo.year}</span>
        <span>{vehicleInfo.model}</span>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Files</h1>
        <input type='file'></input>
      </div>
    </div>
  );
};

export default VehicleHome;
