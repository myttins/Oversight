import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import axios from 'axios';

import Error from '../error/Error';
import InsurerInfoForm from './InsurerInfoForm';
import FormElement from './FormElement';
import PersonContainer from './PersonContainer';
import VehicleInfoForm from './VehicleInfoForm';

const VehicleHome = () => {
  const { id } = useParams();

  const { language } = useOutletContext();

  const [vehicleInfo, setVehicleInfo] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [owner, setOwner] = useState([]);

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      const response = await axios.get('/api/vehicle/' + id);
      setVehicleInfo(response.data.vehicle);
      setDrivers(response.data.drivers);
      setOwner(response.data.owner);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <VehicleInfoForm
        vehicleInfo={vehicleInfo}
        setVehicleInfo={setVehicleInfo}
      />

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
