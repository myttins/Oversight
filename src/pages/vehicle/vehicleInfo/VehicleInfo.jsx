import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import VehicleInfoForm from './VehicleInfoForm';
import PersonContainer from './PersonContainer';
import InsurerContainer from './InsurerContainer';

const VehicleInfo = () => {
  const { id } = useParams();

  const [vehicleInfo, setVehicleInfo] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [owner, setOwner] = useState([]);
  const [insurer, setInsurer] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicleDataAndSetState();
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

  if (loading) return null;

  return (
    <div className='box-white'>
      <VehicleInfoForm vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo} newVehicle={false} />
      <PersonContainer people={owner} setPeople={setOwner} driverOrOwner={'owner'} />

      <PersonContainer people={drivers} setPeople={setDrivers} driverOrOwner={'driver'} />
      <InsurerContainer insurer={insurer} setInsurer={setInsurer} />
    </div>
  );
};

export default VehicleInfo;
