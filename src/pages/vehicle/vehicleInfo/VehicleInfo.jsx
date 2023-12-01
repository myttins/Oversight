import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import VehicleInfoContainer from './VehicleInfoContainer';
import PersonContainer from './PersonContainer';
import InsurerContainer from './InsurerContainer';
import Loading from '../../../util/Loading';

const VehicleInfo = () => {
  const { id } = useParams();

  const [vehicleInfo, setVehicleInfo] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [owner, setOwner] = useState([]);
  const [insurer, setInsurer] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === 'new') {
      clearState();
    } else {
      fetchVehicleDataAndSetState();
    }
  }, [id]);

  const fetchVehicleDataAndSetState = async () => {
    try {
      const response = await axios.get(`/api/vehicle/info/${id}`);
      setVehicleInfo(response.data.vehicle);
      setDrivers(response.data.drivers);
      setOwner(response.data.owner);
      setInsurer(response.data.insurer);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const clearState = () => {
    setVehicleInfo({
      fuel_type: 'GAS',
    });
    setDrivers([]);
    setOwner([]);
    setInsurer([]);
  };

  if (id === 'new') {
    return (
      <div>
        <VehicleInfoContainer vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo} newVehicle={true} />
      </div>
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <VehicleInfoContainer vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo} newVehicle={false} />
      <PersonContainer people={owner} setPeople={setOwner} driverOrOwner={'owner'} />

      <PersonContainer people={drivers} setPeople={setDrivers} driverOrOwner={'driver'} />
      <InsurerContainer insurer={insurer} setInsurer={setInsurer} />
    </>
  );
};
export default VehicleInfo;