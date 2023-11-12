import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import axios from 'axios';

import translate from '../assets/translate';
import Error from '../error/Error';
import InsurerInfoForm from './InsurerInfoForm';
import FormElement from './FormElement';
import PersonContainer from './PersonContainer';

const VehicleHome = () => {
  const { id } = useParams();
  const { language } = useOutletContext();
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [vehicleInfoReadOnly, setVehicleInfoReadOnly] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [owner, setOwner] = useState([]);
  const [person, setPerson] = useState({});

  useEffect(() => {
    if (id === 'new') {
      setVehicleInfoReadOnly(false);
      return;
    }
    try {
      fetchVehicleData();
    } catch (e) {
      console.log('Logged Error: ', e);
    }
  }, []);

  const fetchVehicleData = async () => {
    const response = await axios.get('/api/vehicle/' + id);
    if (response.status !== 200) {
      return;
    }
    setVehicleInfo(response.data.vehicle);
    setDrivers(response.data.drivers);
    setOwner(response.data.owner);
  };

  return (
    <div>
      <div>
        <div className="mt-6 flex justify-between">
          <a className="text-2xl">
            {language ? translate.vehicle_info[0] : translate.vehicle_info[1]}
          </a>
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

        {/* @TODO
        Refactor FormElement elements into map function
         */}

        <FormElement
          label={'plate'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'category'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vehicle_model'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'engine_no'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vehicle_color'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'vin'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'fuel_type'}
          type={'text'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
        <FormElement
          label={'registration_date'}
          type={'date'}
          readOnly={vehicleInfoReadOnly}
          formInfo={vehicleInfo}
          setFormInfo={setVehicleInfo}
        />
      </div>

      <InsurerInfoForm />

      <PersonContainer key={'owner_info'} type={'owner_info'} people={owner} />
      
      <PersonContainer
        key={'driver_info'}
        type={'driver_info'}
        people={drivers}
      />

      <div>
        <h1 className="mt-6">Transactions</h1>
      </div>
    </div>
  );
};

export default VehicleHome;
