import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const VehicleHome = () => {
  const { id } = useParams();
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [driverInfo, setDriverInfo] = useState([]);

  useEffect(() => {
    try {
      if (id === 'new'){
        return
      } else {
        fetchData();
      }
    } catch (e) {
      setVehicleInfo({
        id: null,
        plate: null,
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
        <h1 className="mt-6 text-2xl">Vehicle Information</h1>
        <ul className='mt-2'>
          <li>
            <a>Plate: </a> <input placeholder="plate" value={vehicleInfo.plate} readOnly={false}></input>
          </li>
          <li>
            <a>Convoy: </a> <input placeholder="convoy" value={vehicleInfo.convoy}></input>
          </li>
          <li>
            <a>Model: </a> <input placeholder="Model" value={vehicleInfo.vehicle_model}></input>
          </li>
          <li>
            <a>Color: </a> <input placeholder="Color" value={vehicleInfo.vehicle_color}></input>
          </li>
          <li>
            <a>VIN: </a> <input placeholder="VIN" value={vehicleInfo.vin}></input>
          </li>
          <li>
            <a>Fuel Type: </a> <input placeholder="Fuel Type" value={vehicleInfo.fuel_type ? 'GAS' : 'ELECTRIC'}></input>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Driver Information</h1>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Files</h1>
        <input type="file"></input>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Transactions</h1>
        <a></a>
      </div>
    </div>
  );
};

export default VehicleHome;
