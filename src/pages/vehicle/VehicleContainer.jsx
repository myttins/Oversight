import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

// import Error from '../../error/Error';
import VehicleInfoContainer from './VehicleInfoContainer';
import PersonContainer from './people/PersonContainer';
import InsurerContainer from './insurer/InsurerContainer';

export const VehicleContext = createContext(null);

const VehicleContainer = () => {
  const { id } = useParams();

  const [vehicleInfo, setVehicleInfo] = useState({activation_date: ''});
  const [drivers, setDrivers] = useState([]);
  const [owner, setOwner] = useState([]);
  const [insurer, setInsurer] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id === 'new') {
      clearState()
    } else {
      fetchVehicleDataAndSetState()
    }
  }, [id]);

  const fetchVehicleDataAndSetState = async () => {
    try {
      const response = await axios.get('/api/vehicle/' + id);
      setIsLoading(false);
      setVehicleInfo(response.data.vehicle);
      setDrivers(response.data.drivers);
      setOwner(response.data.owner);
      setInsurer(response.data.insurer);
    } catch (error) {
      console.error(error);
    }
  };

  const clearState = () => {
    setVehicleInfo({});
    setDrivers([]);
    setOwner([]);
    setInsurer([]);
  }

  if (id === 'new') {
    return (
      <div>
        <VehicleInfoContainer
          vehicleInfo={vehicleInfo}
          setVehicleInfo={setVehicleInfo}
          newVehicle={true}
        />
      </div>
    );
  }

  return (
    <VehicleContext.Provider value={id}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <VehicleInfoContainer
            vehicleInfo={vehicleInfo}
            setVehicleInfo={setVehicleInfo}
            newVehicle={false}
          />
          <PersonContainer
            people={owner}
            setPeople={setOwner}
            driverOrOwner={'owner'}
          />

          <PersonContainer
            people={drivers}
            setPeople={setDrivers}
            driverOrOwner={'driver'}
          />
          <InsurerContainer insurer={insurer} setInsurer={setInsurer} />
        </div>
      )}
    </VehicleContext.Provider>
  );
};

export default VehicleContainer;
