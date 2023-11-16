import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import Error from '../../error/Error';
import DriverContainer from './containers/DriverContainer';
import OwnerContainer from './containers/OwnerContainer';
import VehicleInfoContainer from './containers/VehicleInfoContainer';

const VehiclePage = () => {
  const { id } = useParams();

  const [vehicleInfo, setVehicleInfo] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [owner, setOwner] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      const response = await axios.get('/api/vehicle/' + id);
      setIsLoading(false);
      setVehicleInfo(response.data.vehicle);
      setDrivers(response.data.drivers);
      setOwner(response.data.owner);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <VehicleInfoContainer
            vehicleInfo={vehicleInfo}
            setVehicleInfo={setVehicleInfo}
          />

          {/* <InsurerInfoForm /> */}
          <OwnerContainer owner={owner} setOwner={setOwner} vehicleid={id} />
          <DriverContainer
            drivers={drivers}
            setDrivers={setDrivers}
            vehicleid={id}
          />
        </div>
      )}
    </>
  );
};

export default VehiclePage;
