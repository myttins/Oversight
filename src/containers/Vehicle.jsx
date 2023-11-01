import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import translate from '../assets/translate';

const VehicleHome = () => {
  const { id } = useParams();

  const [language, setLanguage] = useOutletContext();

  const [vehicleInfo, setVehicleInfo] = useState({});
  const [vehicleInfoReadOnly, setVehicleInfoReadOnly] = useState(true);

  const [driverInfo, setDriverInfo] = useState([]);

  useEffect(() => {
    if (id === 'new') {
      setVehicleInfoReadOnly(false);
      return;
    }

    try {
      fetchData();
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
        <div className="mt-6 flex justify-between">
          <a className="text-2xl">Vehicle Information</a>
          <div className="">
            {vehicleInfoReadOnly ? (
              <button
                className="btn"
                onClick={() => setVehicleInfoReadOnly(!vehicleInfoReadOnly)}
              >
                EDIT
              </button>
            ) : (
              <>
                <button
                  className="btn mx-2"
                  onClick={() => setVehicleInfoReadOnly(!vehicleInfoReadOnly)}
                >
                  CANCEL
                </button>
                <button
                  className="btn mx-2"
                  onClick={() => setVehicleInfoReadOnly(!vehicleInfoReadOnly)}
                >
                  SAVE
                </button>
              </>
            )}
          </div>
        </div>

        <ul className="mt-2">
          <li className="flex my-2">
            <span className="w-1/3">{language ? translate.plate[0] : translate.plate[1] }</span>
            吉<input
              className="input w-2/3"
              placeholder="Plate"
              value={vehicleInfo.plate || ''}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, plate: e.target.value })
              }
              readOnly={vehicleInfoReadOnly}
            />
          </li>
          <li className="flex my-2">
            <a className="w-1/3">{language ? translate.category[0] : translate.category[1]}</a>
            <input
              className="input w-2/3"
              placeholder="Category"
              value={vehicleInfo.category || ''}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, category: e.target.value })
              }
              readOnly={vehicleInfoReadOnly}
            />
          </li>
          <li className="flex my-2">
            <a className="w-1/3">{language ? translate.vehicle_model[0] : translate.vehicle_model[1]}</a>
            <input
              className="input w-2/3"
              placeholder="Model"
              value={vehicleInfo.vehicle_model || ''}
              onChange={(e) =>
                setVehicleInfo({
                  ...vehicleInfo,
                  vehicle_model: e.target.value,
                })
              }
              readOnly={vehicleInfoReadOnly}
            />
          </li>
          <li className="flex my-2">
            <a className="w-1/3">{language ? translate.vehicle_color[0] : translate.vehicle_color[1]}</a>
            <input
              className="input w-2/3"
              placeholder="Color"
              value={vehicleInfo.vehicle_color || ''}
              onChange={(e) =>
                setVehicleInfo({
                  ...vehicleInfo,
                  vehicle_color: e.target.value,
                })
              }
              readOnly={vehicleInfoReadOnly}
            />
          </li>
          <li className="flex my-2">
            <a className="w-1/3">{language ? translate.vin[0] : translate.vin[1]}</a>
            <input
              className="input w-2/3"
              placeholder="VIN"
              value={vehicleInfo.vin || ''}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, vin: e.target.value })
              }
              readOnly={vehicleInfoReadOnly}
            />
          </li>
          <li className="flex my-2">
            <a className="w-1/3">{language ? translate.fuel_type[0] : translate.fuel_type[1]}</a>
            {vehicleInfoReadOnly ? (
              <span className="w 2/3">
                {vehicleInfo.fuel_type ? '汽油' : 'ELECTRIC'}
              </span>
            ) : (
              <select
                className="w-2/3"
                name="fuel_type"
                value={vehicleInfo.fuel_type ? '汽油' : 'ELECTRIC'}
                onChange={(e) =>
                  setVehicleInfo({
                    ...vehicleInfo,
                    fuel_type: e.target.value === '汽油',
                  })
                }
              >
                <option value="汽油">汽油</option>
                <option value="ELECTRIC">ELECTRIC</option>
              </select>
            )}
          </li>
          <li className="flex my-2">
            <a className="w-1/3">Reg Date: </a>
            <input
              className="input w-2/3"
              type="date"
              value={vehicleInfo.registration_date || '2000-01-01'}
              onChange={(e) =>
                setVehicleInfo({
                  ...vehicleInfo,
                  registration_date: e.target.value,
                })
              }
              readOnly={vehicleInfoReadOnly}
            />
          </li>
        </ul>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Owner Information</h1>
        <button className='btn'>Add</button>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Insurer Information</h1>
        <button className='btn'>Add</button>
      </div>
      <div>
        <h1 className="mt-6 text-2xl">Drivers Information</h1>
        <button className='btn'>Add</button>
      </div>
      {/* <div>
        <h1 className="mt-6 text-2xl">Files</h1>
        <input type="file"></input>
      </div> */}
      <div>
        <h1 className="mt-6 text-2xl">Transactions</h1>
      </div>
    </div>
  );
};

export default VehicleHome;
