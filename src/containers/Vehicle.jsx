import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const VehicleHome = () => {
  const { id } = useParams();
  const [vehicleInfo, setVehicleInfo] = useState({
    registration_date: '1900-01-01',
  });
  const [vehicleInfoEdit, setVehicleInfoEdit] = useState(true);

  const [driverInfo, setDriverInfo] = useState([]);

  useEffect(() => {
    try {
      if (id === 'new') {
        return;
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
  };

  return (
    <div>
      <div>
        <h1 className="mt-6 text-2xl">Vehicle Information</h1>
        <button
          className="border p-1 active:bg-slate-300"
          onClick={() => setVehicleInfoEdit(!vehicleInfoEdit)}
        >
          EDIT
        </button>
        <ul className="mt-2 border">
          <li>
            <a>Plate: </a>
            <input
              className={`${vehicleInfoEdit || 'border'}`}
              placeholder="plate"
              value={vehicleInfo.plate || ''}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, plate: e.target.value })
              }
              readOnly={vehicleInfoEdit}
            ></input>
          </li>
          {/* <li>
            <a>Convoy: </a> <input placeholder="convoy" value={vehicleInfo.convoy} readOnly={vehicleInfoEdit}></input>
          </li>
          <li>
            <a>Model: </a> <input placeholder="Model" value={vehicleInfo.vehicle_model} readOnly={vehicleInfoEdit}></input>
          </li>
          <li>
            <a>Color: </a> <input placeholder="Color" value={vehicleInfo.vehicle_color}></input>
          </li>
          <li>
            <a>VIN: </a> <input placeholder="VIN" value={vehicleInfo.vin}></input>
          </li>
          <li>
            <a>Fuel Type: </a> <input placeholder="Fuel Type" value={vehicleInfo.fuel_type ? 'GAS' : 'ELECTRIC'}></input>
          </li> */}
          <a>Registration Date: </a>{' '}
          <input
            className={`${vehicleInfoEdit || 'border'}`}
            type="date"
            value={vehicleInfo.registration_date || '2000-01-01'}
            onChange={(e) =>
              setVehicleInfo({
                ...vehicleInfo,
                registration_date: e.target.value,
              })
            }
            readOnly={vehicleInfoEdit}
          ></input>
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
